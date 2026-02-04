<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

dody_require_auth();

if ($method === 'GET') {
    $config = dody_get_telegram_config();
    dody_json_response([
        'ok' => true,
        'chatId' => $config['chat_id'],
        'enabled' => $config['enabled'],
        'hasToken' => $config['token'] !== '',
    ]);
}

if ($method !== 'POST') {
    dody_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$body = dody_read_json_body();
$chatId = trim((string)($body['chatId'] ?? ''));
$token = trim((string)($body['token'] ?? ''));
$enabled = isset($body['enabled']) ? (bool)$body['enabled'] : true;

$settings = dody_get_settings();
$settings['telegram'] = $settings['telegram'] ?? [];
if ($chatId !== '') {
    $settings['telegram']['chat_id'] = $chatId;
}
if ($token !== '') {
    $settings['telegram']['token'] = $token;
}
$settings['telegram']['enabled'] = $enabled;
dody_save_settings($settings);

dody_json_response([
    'ok' => true,
    'hasToken' => ($token !== '') || !empty(($settings['telegram']['token'] ?? '')),
]);
