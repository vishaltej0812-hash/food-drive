<?php
require_once __DIR__ . '/../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM restaurants ORDER BY id ASC");
    $restaurants = $stmt->fetchAll();

    $menuStmt = $pdo->query("SELECT * FROM menu_items ORDER BY id ASC");
    $allItems = $menuStmt->fetchAll();

    $itemsByRest = [];
    foreach ($allItems as $item) {
        $itemsByRest[$item['restaurant_id']][] = [
            'id' => $item['id'],
            'name' => $item['name'],
            'category' => $item['category'],
            'price' => (int)$item['price'],
            'isVeg' => (bool)$item['is_veg'],
            'inStock' => (bool)$item['in_stock'],
            'desc' => $item['description'],
            'bestseller' => (bool)$item['bestseller'],
            'image' => $item['image_url']
        ];
    }

    $result = [];
    foreach ($restaurants as $r) {
        $result[] = [
            'id' => $r['id'],
            'name' => $r['name'],
            'area' => $r['area'],
            'city' => $r['city'],
            'isOpen' => (bool)$r['is_open'],
            'cuisines' => json_decode($r['cuisines_json'], true) ?: [],
            'cuisineTag' => $r['cuisine_tag'],
            'offerTag' => $r['offer_tag'],
            'rating' => (float)$r['rating'],
            'reviewCount' => $r['review_count'],
            'deliveryTime' => $r['delivery_time'],
            'deliveryTimeMins' => (int)$r['delivery_time_mins'],
            'distance' => $r['distance'],
            'costForTwo' => (int)$r['cost_for_two'],
            'isVeg' => (bool)$r['is_veg'],
            'image' => $r['image_url'],
            'menu' => $itemsByRest[$r['id']] ?? []
        ];
    }

    echo json_encode(['success' => true, 'data' => $result]);
    exit;
}

if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    $action = $body['action'] ?? '';

    if ($action === 'toggle_open' && !empty($body['id'])) {
        $stmt = $pdo->prepare("UPDATE restaurants SET is_open = ? WHERE id = ?");
        $stmt->execute([(int)$body['isOpen'], $body['id']]);
        echo json_encode(['success' => true]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid action']);
    exit;
}
