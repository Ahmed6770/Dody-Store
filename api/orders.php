<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    dody_require_auth();
    $orders = dody_get_orders();
    dody_json_response(['ok' => true, 'orders' => $orders]);
}

if ($method !== 'POST') {
    dody_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$body = dody_read_json_body();
$action = trim((string)($body['action'] ?? ''));

if ($action === 'clear') {
    dody_require_auth();
    dody_save_orders([]);
    dody_json_response(['ok' => true]);
}

$name = trim((string)($body['name'] ?? ''));
$phone = trim((string)($body['phone'] ?? ''));
$address = trim((string)($body['address'] ?? ''));
$notes = trim((string)($body['notes'] ?? ''));
$items = $body['items'] ?? [];
$lang = trim((string)($body['lang'] ?? 'ar'));

if ($name === '' || $phone === '' || $address === '') {
    dody_json_response(['ok' => false, 'error' => 'missing_fields'], 400);
}

if (!is_array($items) || count($items) === 0) {
    dody_json_response(['ok' => false, 'error' => 'empty_items'], 400);
}

$sanitizedItems = [];
$total = 0.0;
foreach ($items as $item) {
    if (!is_array($item)) {
        continue;
    }
    $id = trim((string)($item['id'] ?? ''));
    $nameAr = trim((string)($item['nameAr'] ?? ''));
    $nameEn = trim((string)($item['nameEn'] ?? ''));
    $price = (float)($item['price'] ?? 0);
    $qty = (int)($item['qty'] ?? 1);
    if ($id === '' || $qty <= 0) {
        continue;
    }
    $lineTotal = max($price, 0) * $qty;
    $total += $lineTotal;
    $sanitizedItems[] = [
        'id' => $id,
        'nameAr' => $nameAr,
        'nameEn' => $nameEn,
        'price' => $price,
        'qty' => $qty,
    ];
}

if (count($sanitizedItems) === 0) {
    dody_json_response(['ok' => false, 'error' => 'invalid_items'], 400);
}

$orderId = dody_next_order_id();
$order = [
    'id' => $orderId,
    'date' => gmdate('c'),
    'name' => $name,
    'phone' => $phone,
    'address' => $address,
    'notes' => $notes,
    'total' => $total,
    'status' => 'new',
    'shippingStatus' => 'pending',
    'deliveryFee' => 0,
    'items' => $sanitizedItems,
    'meta' => [
        'lang' => $lang ?: 'ar',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
    ],
];

$orders = dody_get_orders();
array_unshift($orders, $order);
dody_save_orders($orders);

$store = dody_get_store_data() ?? [];
$storeName = $store['brand']['name'] ?? 'Dody Store';
$emailTo = trim((string)($store['orders']['email'] ?? ''));
$useArabic = $lang !== 'en';

$itemsLines = array_map(function ($item) use ($useArabic) {
    $name = $useArabic ? ($item['nameAr'] ?: $item['nameEn']) : ($item['nameEn'] ?: $item['nameAr']);
    $lineTotal = (float)$item['price'] * (int)$item['qty'];
    return sprintf('- %s × %d = %s', $name, $item['qty'], $lineTotal);
}, $sanitizedItems);

if ($useArabic) {
    $subject = "طلب جديد #{$orderId} - {$storeName}";
    $messageLines = [
        "طلب جديد من {$storeName}",
        "رقم الطلب: {$orderId}",
        "الاسم: {$name}",
        "الهاتف: {$phone}",
        "العنوان: {$address}",
        $notes ? "ملاحظات: {$notes}" : "ملاحظات: -",
        "المنتجات:",
        implode("\n", $itemsLines),
        "الإجمالي: {$total} جنيه",
        "الدفع: كاش عند الاستلام",
    ];
} else {
    $subject = "New order #{$orderId} - {$storeName}";
    $messageLines = [
        "New order from {$storeName}",
        "Order ID: {$orderId}",
        "Name: {$name}",
        "Phone: {$phone}",
        "Address: {$address}",
        $notes ? "Notes: {$notes}" : "Notes: -",
        "Items:",
        implode("\n", $itemsLines),
        "Total: EGP {$total}",
        "Payment: Cash on delivery",
    ];
}

$message = implode("\n", $messageLines);

if ($emailTo) {
    dody_send_email($emailTo, $subject, $message, $storeName);
}

dody_send_whatsapp($message);

dody_json_response(['ok' => true, 'order' => $order]);
