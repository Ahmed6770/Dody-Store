<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    dody_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

dody_require_auth();

$body = dody_read_json_body();
$pin = trim((string)($body['pin'] ?? ''));

if (strlen($pin) < 4) {
    dody_json_response(['ok' => false, 'error' => 'invalid_pin'], 400);
}

$settings = dody_get_settings();
$settings['admin_pin_hash'] = password_hash($pin, PASSWORD_DEFAULT);
dody_save_settings($settings);

dody_json_response(['ok' => true]);

