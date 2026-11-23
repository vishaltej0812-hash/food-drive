<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC");
    $rows = $stmt->fetchAll();

    $orders = [];
    foreach ($rows as $o) {
        $orders[] = [
            'id' => $o['id'],
            'restaurantId' => $o['restaurant_id'],
            'restaurantName' => $o['restaurant_name'],
            'items' => json_decode($o['items_json'], true) ?: [],
            'total' => (int)$o['total'],
            'address' => $o['address'],
            'customerName' => $o['customer_name'],
            'status' => $o['status'],
            'timestamp' => $o['order_time'],
            'etaMinutes' => (int)$o['eta_minutes']
        ];
    }

    echo json_encode(['success' => true, 'data' => $orders]);
    exit;
}

if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    $action = $body['action'] ?? '';

    if ($action === 'create' && !empty($body['id'])) {
        $stmt = $pdo->prepare("
            INSERT INTO orders (id, restaurant_id, restaurant_name, items_json, total, address, customer_name, status, order_time, eta_minutes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $body['id'],
            $body['restaurantId'],
            $body['restaurantName'],
            json_encode($body['items'] ?? []),
            (int)$body['total'],
            $body['address'] ?? 'Bengaluru',
            $body['customerName'] ?? 'Guest',
            $body['status'] ?? 'placed',
            $body['timestamp'] ?? date('h:i A'),
            (int)($body['etaMinutes'] ?? 24)
        ]);
        echo json_encode(['success' => true]);
        exit;
    }

    if ($action === 'update_status' && !empty($body['id']) && !empty($body['status'])) {
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$body['status'], $body['id']]);
        echo json_encode(['success' => true]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid action']);
    exit;
}
