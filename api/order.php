<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    dody_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

dody_require_auth();

$body = dody_read_json_body();
$orderId = trim((string)($body['id'] ?? ''));
$action = trim((string)($body['action'] ?? 'update'));

if ($orderId === '') {
    dody_json_response(['ok' => false, 'error' => 'missing_id'], 400);
}

$orders = dody_get_orders();
$index = null;
foreach ($orders as $i => $order) {
    if (($order['id'] ?? '') === $orderId) {
        $index = $i;
        break;
    }
}

if ($index === null) {
    dody_json_response(['ok' => false, 'error' => 'not_found'], 404);
}

if ($action === 'delete') {
    array_splice($orders, $index, 1);
    $saved = dody_save_orders($orders);
    if (!$saved) {
        dody_send_telegram("❌ فشل حذف الطلب رقم {$orderId}.");
        dody_json_response(['ok' => false, 'error' => 'save_failed'], 500);
    }
    dody_send_telegram("🗑️ تم حذف الطلب رقم {$orderId}.");
    dody_json_response(['ok' => true]);
}

$status = trim((string)($body['status'] ?? ''));
$shippingStatus = trim((string)($body['shippingStatus'] ?? ''));
$deliveryFee = isset($body['deliveryFee']) ? (float)$body['deliveryFee'] : null;

$allowedStatus = ['new', 'processing', 'done', 'cancelled'];
$allowedShipping = ['pending', 'shipped'];

if ($status !== '' && !in_array($status, $allowedStatus, true)) {
    dody_json_response(['ok' => false, 'error' => 'invalid_status'], 400);
}
if ($shippingStatus !== '' && !in_array($shippingStatus, $allowedShipping, true)) {
    dody_json_response(['ok' => false, 'error' => 'invalid_shipping'], 400);
}

if ($status !== '') {
    $orders[$index]['status'] = $status;
}
if ($shippingStatus !== '') {
    $orders[$index]['shippingStatus'] = $shippingStatus;
}
if ($deliveryFee !== null) {
    $orders[$index]['deliveryFee'] = max($deliveryFee, 0);
}

$saved = dody_save_orders($orders);
if (!$saved) {
    dody_send_telegram("❌ فشل تحديث الطلب رقم {$orderId}.");
    dody_json_response(['ok' => false, 'error' => 'save_failed'], 500);
}

$statusText = $status !== '' ? "الحالة: {$status}" : "";
$shippingText = $shippingStatus !== '' ? "الشحن: {$shippingStatus}" : "";
$feeText = $deliveryFee !== null ? "التوصيل: {$orders[$index]['deliveryFee']}" : "";
$lines = array_filter([$statusText, $shippingText, $feeText]);
if (count($lines) > 0) {
    dody_send_telegram("✏️ تحديث الطلب رقم {$orderId}.\n" . implode("\n", $lines));
}

dody_json_response(['ok' => true, 'order' => $orders[$index]]);
