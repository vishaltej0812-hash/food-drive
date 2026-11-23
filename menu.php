<?php
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$action = $body['action'] ?? '';

if ($action === 'toggle_stock' && !empty($body['id'])) {
    $stmt = $pdo->prepare("UPDATE menu_items SET in_stock = ? WHERE id = ?");
    $stmt->execute([(int)$body['inStock'], $body['id']]);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'update_price' && !empty($body['id'])) {
    $stmt = $pdo->prepare("UPDATE menu_items SET price = ? WHERE id = ?");
    $stmt->execute([(int)$body['price'], $body['id']]);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'add_dish' && !empty($body['restaurantId']) && !empty($body['name'])) {
    $id = $body['id'] ?? ('dish_' . time());
    $stmt = $pdo->prepare("
        INSERT INTO menu_items (id, restaurant_id, name, category, price, is_veg, in_stock, description, bestseller, image_url)
        VALUES (?, ?, ?, ?, ?, ?, 1, ?, 0, ?)
    ");
    $stmt->execute([
        $id,
        $body['restaurantId'],
        $body['name'],
        $body['category'] ?? 'Main Course',
        (int)($body['price'] ?? 100),
        (int)($body['isVeg'] ?? 1),
        $body['desc'] ?? 'Freshly crafted chef specialty.',
        $body['image'] ?? ''
    ]);
    echo json_encode(['success' => true, 'id' => $id]);
    exit;
}

http_response_code(400);
echo json_encode(['success' => false, 'error' => 'Invalid action']);
