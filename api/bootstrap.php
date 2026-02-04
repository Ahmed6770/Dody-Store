<?php
declare(strict_types=1);

const DODY_DATA_DIR = __DIR__ . '/../storage';
const DODY_UPLOAD_DIR = __DIR__ . '/../uploads';

function dody_ensure_dir(string $dir): void
{
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

dody_ensure_dir(DODY_DATA_DIR);
dody_ensure_dir(DODY_UPLOAD_DIR);

function dody_start_session(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
        session_set_cookie_params([
            'lifetime' => 0,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Lax',
            'secure' => $secure,
        ]);
        session_start();
    }
}

dody_start_session();

function dody_json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function dody_read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function dody_read_json_file(string $path, $fallback)
{
    if (!file_exists($path)) {
        return $fallback;
    }
    $raw = file_get_contents($path);
    if ($raw === false) {
        return $fallback;
    }
    $data = json_decode($raw, true);
    return is_array($data) || is_null($data) ? $data : $fallback;
}

function dody_write_json_file(string $path, $data): bool
{
    $encoded = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($encoded === false) {
        return false;
    }
    return file_put_contents($path, $encoded, LOCK_EX) !== false;
}

function dody_get_settings(): array
{
    $path = DODY_DATA_DIR . '/settings.json';
    if (!file_exists($path)) {
        $defaults = [
            'admin_pin_hash' => password_hash('2026', PASSWORD_DEFAULT),
            'order_seq' => 10000,
            'whatsapp' => [
                'token' => '',
                'phone_id' => '',
                'to' => '',
            ],
            'telegram' => [
                'token' => '',
                'chat_id' => '',
                'enabled' => true,
            ],
        ];
        dody_write_json_file($path, $defaults);
        return $defaults;
    }

    $settings = dody_read_json_file($path, []);
    if (!is_array($settings)) {
        $settings = [];
    }

    if (empty($settings['admin_pin_hash'])) {
        $settings['admin_pin_hash'] = password_hash('2026', PASSWORD_DEFAULT);
    }
    if (!isset($settings['order_seq'])) {
        $settings['order_seq'] = 10000;
    }
    if (!isset($settings['whatsapp']) || !is_array($settings['whatsapp'])) {
        $settings['whatsapp'] = [
            'token' => '',
            'phone_id' => '',
            'to' => '',
        ];
    }
    if (!isset($settings['telegram']) || !is_array($settings['telegram'])) {
        $settings['telegram'] = [
            'token' => '',
            'chat_id' => '',
            'enabled' => true,
        ];
    }

    dody_write_json_file($path, $settings);
    return $settings;
}

function dody_save_settings(array $settings): void
{
    $path = DODY_DATA_DIR . '/settings.json';
    dody_write_json_file($path, $settings);
}

function dody_is_authed(): bool
{
    return !empty($_SESSION['dody_admin']);
}

function dody_require_auth(): void
{
    if (!dody_is_authed()) {
        dody_json_response(['ok' => false, 'error' => 'unauthorized'], 401);
    }
}

function dody_get_store_data(): ?array
{
    $path = DODY_DATA_DIR . '/store.json';
    $data = dody_read_json_file($path, null);
    return is_array($data) ? $data : null;
}

function dody_save_store_data(array $data): bool
{
    $path = DODY_DATA_DIR . '/store.json';
    return dody_write_json_file($path, $data);
}

function dody_get_orders(): array
{
    $path = DODY_DATA_DIR . '/orders.json';
    $data = dody_read_json_file($path, []);
    return is_array($data) ? $data : [];
}

function dody_save_orders(array $orders): bool
{
    $path = DODY_DATA_DIR . '/orders.json';
    return dody_write_json_file($path, $orders);
}

function dody_next_order_id(): string
{
    $settings = dody_get_settings();
    $seq = (int)($settings['order_seq'] ?? 10000);
    $seq += 1;
    $settings['order_seq'] = $seq;
    dody_save_settings($settings);
    return 'DS-' . $seq;
}

function dody_send_email(string $to, string $subject, string $message, string $fromName = 'Dody Store'): bool
{
    if (!$to) {
        return false;
    }
    $domain = $_SERVER['SERVER_NAME'] ?? 'localhost';
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/plain; charset=utf-8',
        'From: ' . $fromName . ' <no-reply@' . $domain . '>',
    ];
    return @mail($to, $subject, $message, implode("\r\n", $headers));
}

function dody_send_whatsapp(string $message): bool
{
    $settings = dody_get_settings();
    $whatsapp = $settings['whatsapp'] ?? [];
    $token = trim((string)($whatsapp['token'] ?? ''));
    $phoneId = trim((string)($whatsapp['phone_id'] ?? ''));
    $to = trim((string)($whatsapp['to'] ?? ''));

    if (!$token || !$phoneId || !$to) {
        return false;
    }
    if (!function_exists('curl_init')) {
        return false;
    }

    $payload = [
        'messaging_product' => 'whatsapp',
        'to' => $to,
        'type' => 'text',
        'text' => ['body' => $message],
    ];

    $ch = curl_init('https://graph.facebook.com/v18.0/' . $phoneId . '/messages');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $response !== false && $status >= 200 && $status < 300;
}

function dody_get_telegram_config(): array
{
    $settings = dody_get_settings();
    $telegram = $settings['telegram'] ?? [];
    $token = trim((string)(getenv('TELEGRAM_BOT_TOKEN') ?: ($telegram['token'] ?? '')));
    $chatId = trim((string)(getenv('TELEGRAM_CHAT_ID') ?: ($telegram['chat_id'] ?? '')));
    $enabled = $telegram['enabled'] ?? true;
    return [
        'token' => $token,
        'chat_id' => $chatId,
        'enabled' => (bool)$enabled,
    ];
}

function dody_send_telegram(string $message): bool
{
    $config = dody_get_telegram_config();
    if (!$config['enabled']) {
        return false;
    }
    $token = $config['token'];
    $chatId = $config['chat_id'];
    if (!$token || !$chatId) {
        return false;
    }
    if (!function_exists('curl_init')) {
        return false;
    }

    $text = trim($message);
    if (function_exists('mb_substr')) {
        $text = mb_substr($text, 0, 3800);
    } else {
        $text = substr($text, 0, 3800);
    }

    $payload = [
        'chat_id' => $chatId,
        'text' => $text,
        'disable_web_page_preview' => true,
    ];

    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $response !== false && $status >= 200 && $status < 300;
}
