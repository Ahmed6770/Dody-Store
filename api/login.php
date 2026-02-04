<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    dody_json_response(['ok' => true, 'authed' => dody_is_authed()]);
}

if ($method !== 'POST') {
    dody_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$body = dody_read_json_body();
$pin = trim((string)($body['pin'] ?? ''));
$settings = dody_get_settings();
$hash = (string)($settings['admin_pin_hash'] ?? '');

if ($pin !== '' && $hash !== '' && password_verify($pin, $hash)) {
    session_regenerate_id(true);
    $_SESSION['dody_admin'] = true;
    dody_json_response(['ok' => true, 'authed' => true]);
}

dody_json_response(['ok' => false, 'error' => 'invalid_pin'], 401);

