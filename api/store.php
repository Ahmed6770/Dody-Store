<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $data = dody_get_store_data();
    dody_json_response([
        'ok' => true,
        'exists' => $data !== null,
        'data' => $data,
    ]);
}

if ($method !== 'POST') {
    dody_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

dody_require_auth();

$body = dody_read_json_body();
$data = $body['data'] ?? null;

if (!is_array($data)) {
    dody_json_response(['ok' => false, 'error' => 'invalid_payload'], 400);
}

if (isset($data['admin'])) {
    unset($data['admin']);
}

$saved = dody_save_store_data($data);

if (!$saved) {
    dody_json_response(['ok' => false, 'error' => 'save_failed'], 500);
}

dody_json_response(['ok' => true]);

