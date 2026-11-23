-- FoodDrive Bengaluru — MySQL Database Schema & Seed Data
-- Import this file via phpMyAdmin (http://localhost/phpmyadmin)

CREATE DATABASE IF NOT EXISTS fooddrive_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fooddrive_db;

CREATE TABLE IF NOT EXISTS restaurants (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    area VARCHAR(100) NOT NULL,
    city VARCHAR(80) DEFAULT 'Bengaluru',
    is_open TINYINT(1) DEFAULT 1,
    cuisines_json TEXT,
    cuisine_tag VARCHAR(100),
    offer_tag VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 4.5,
    review_count VARCHAR(20) DEFAULT '1k',
    delivery_time VARCHAR(40),
    delivery_time_mins INT DEFAULT 25,
    distance VARCHAR(30),
    cost_for_two INT DEFAULT 300,
    is_veg TINYINT(1) DEFAULT 1,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS menu_items (
    id VARCHAR(60) PRIMARY KEY,
    restaurant_id VARCHAR(50) NOT NULL,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    is_veg TINYINT(1) DEFAULT 1,
    in_stock TINYINT(1) DEFAULT 1,
    description TEXT,
    bestseller TINYINT(1) DEFAULT 0,
    image_url TEXT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(40) PRIMARY KEY,
    restaurant_id VARCHAR(50) NOT NULL,
    restaurant_name VARCHAR(150) NOT NULL,
    items_json TEXT NOT NULL,
    total INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    customer_name VARCHAR(120) NOT NULL,
    status VARCHAR(40) DEFAULT 'placed',
    order_time VARCHAR(30),
    eta_minutes INT DEFAULT 24,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Restaurants
INSERT IGNORE INTO restaurants VALUES
('vidyarthi', 'Vidyarthi Bhavan', 'Basavanagudi', 'Bengaluru', 1, '["South Indian","Tiffin","Heritage"]', 'South Indian', '10% OFF', 4.6, '8.4k', '20-25 min', 22, '1.8 km', 200, 1, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80'),
('ctr', 'CTR (Shri Sagar)', 'Malleshwaram', 'Bengaluru', 1, '["Tiffin","Udupi","South Indian"]', 'Tiffin · Udupi', 'FREE COFFEE', 4.7, '9.1k', '25-30 min', 26, '3.2 km', 220, 1, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'),
('meghana', 'Meghana Foods', 'Indiranagar', 'Bengaluru', 1, '["Andhra","Biryani","Non-Veg"]', 'Andhra · Biryani', 'FLAT ₹50 OFF', 4.5, '14.2k', '30-35 min', 32, '2.1 km', 550, 0, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'),
('empire', 'Empire Restaurant', 'Koramangala', 'Bengaluru', 1, '["Multi-Cuisine","Kebabs","Late Night"]', 'Multi-Cuisine', '15% OFF', 4.3, '11k', '25-30 min', 28, '2.8 km', 480, 0, 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80'),
('punjabi', 'Punjabi Rasoi Dhaba', 'Hosur Road', 'Bengaluru', 1, '["North Indian","Dhaba","Tandoori"]', 'Dhaba · Highway', '20% OFF', 4.4, '5.2k', '35-40 min', 35, '4.5 km', 450, 1, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80'),
('cornerhouse', 'Corner House Ice Cream', 'Jayanagar', 'Bengaluru', 0, '["Bakery","Desserts","Sundaes"]', 'Bakery · Snacks', 'BOGO SUNDAE', 4.8, '16.8k', '15-20 min', 18, '1.4 km', 300, 1, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80');

-- Seed Menu Items
INSERT IGNORE INTO menu_items VALUES
('vb_1', 'vidyarthi', 'Masala Dose', 'Tiffin & Dosa', 65, 1, 1, 'Signature thick crispy golden dose roasted in pure ghee, stuffed with seasoned potato palya and served with coconut chutney.', 1, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80'),
('vb_2', 'vidyarthi', 'Khali Dose (2 Pcs)', 'Tiffin & Dosa', 55, 1, 1, 'Pillow-soft spongy rice pancakes served with dollop of fresh churned white butter and spiced lentil chutney.', 0, 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=300&q=80'),
('vb_3', 'vidyarthi', 'Crispy Rava Vada', 'Tiffin & Dosa', 45, 1, 1, 'Crunchy deep-fried semolina fritter flavored with whole peppercorns, curry leaves, and ginger.', 0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80'),
('vb_4', 'vidyarthi', 'Kesari Bath', 'Desserts & Sundaes', 45, 1, 1, 'Traditional saffron and ghee infused semolina dessert loaded with cashew nuts and golden raisins.', 0, 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80'),
('vb_5', 'vidyarthi', 'Authentic Filter Coffee', 'Beverages', 35, 1, 1, 'Freshly brewed Kumbakonam degree filter coffee frothed in traditional brass dabara-tumbler.', 1, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80'),
('ctr_1', 'ctr', 'Benne Masala Dose', 'Tiffin & Dosa', 85, 1, 1, 'CTR''s legendary butter masala dose with ultra-crisp exterior, melt-in-mouth core, and mildly sweet-spiced potato.', 1, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80'),
('ctr_2', 'ctr', 'Steamed Rava Idli', 'Tiffin & Dosa', 45, 1, 1, 'Semolina cake steamed with mustard temper, cashew nut, served with spiced potato saagu and coriander chutney.', 0, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80'),
('ctr_3', 'ctr', 'Mangalore Bajji (4 Pcs)', 'Tiffin & Dosa', 50, 1, 0, 'Crisp and fluffy deep-fried tiffin fritters made of seasoned flour and sour curd.', 0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80'),
('ctr_4', 'ctr', 'Strong Filter Kaapi', 'Beverages', 30, 1, 1, 'Strong chicory and arabica blend brewed fresh on order with piping hot cow milk.', 1, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80'),
('meg_1', 'meghana', 'Meghana Special Chicken Biryani', 'Starters & Biryani', 360, 0, 1, 'Fragrant seasoned basmati rice layered with juicy fried boneless chicken pieces and fiery Andhra masala.', 1, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80'),
('meg_2', 'meghana', 'Paneer Biryani', 'Starters & Biryani', 310, 1, 1, 'Slow-cooked spiced long grain basmati rice loaded with fried cottage cheese cubes and fried onions.', 0, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80'),
('meg_3', 'meghana', 'Andhra Chicken 65', 'Starters & Biryani', 320, 0, 1, 'Tender boneless chicken morsels flash fried and tossed with green chilies, yogurt, and aromatic curry leaves.', 1, 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=300&q=80'),
('meg_4', 'meghana', 'Boneless Mutton Biryani', 'Starters & Biryani', 420, 0, 0, 'Succulent tender mutton cubes cooked in Andhra chili paste served over royal dum rice.', 0, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80'),
('emp_1', 'empire', 'Empire Special Chicken Kebab', 'Starters & Biryani', 290, 0, 1, 'Empire''s crown jewel: crisp deep-fried chicken marinated overnight with signature garlic-ginger and chili spice paste.', 1, 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80'),
('emp_2', 'empire', 'Butter Chicken Curry', 'Main Course', 340, 0, 1, 'Tender tandoori chicken cooked in velvety tomato, butter, and cashew gravy infused with fenugreek.', 1, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80'),
('emp_3', 'empire', 'Rumali Roti (2 Pcs)', 'Main Course', 40, 1, 1, 'Paper-thin soft flatbread skillfully stretched and baked over an inverted wok.', 0, 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=300&q=80'),
('emp_4', 'empire', 'Chicken Shawarma Roll', 'Starters & Biryani', 140, 0, 1, 'Thinly sliced rotisserie chicken wrapped in warm bread with creamy garlic toum and pickles.', 0, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=300&q=80'),
('pun_1', 'punjabi', 'Dal Makhani Deluxe', 'Main Course', 260, 1, 1, 'Whole black lentils and kidney beans slow-simmered for 16 hours with butter, cream and gentle spices.', 1, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80'),
('pun_2', 'punjabi', 'Paneer Butter Masala', 'Main Course', 310, 1, 1, 'Fresh creamy cottage cheese chunks cooked in rich mildly spiced onion tomato gravy.', 1, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80'),
('pun_3', 'punjabi', 'Amritsari Kulcha with Chole', 'Main Course', 220, 1, 1, 'Clay oven baked stuffed spiced potato bread served with tangy chickpea curry and onion salad.', 0, 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80'),
('pun_4', 'punjabi', 'Tandoori Butter Naan', 'Main Course', 55, 1, 1, 'Fluffy leavened flatbread baked in tandoor and glazed with melted salted butter.', 0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80'),
('ch_1', 'cornerhouse', 'Death by Chocolate (DBC)', 'Desserts & Sundaes', 260, 1, 1, 'Bengaluru''s undisputed dessert legend: rich warm chocolate cake, dual scoops of vanilla, piping hot fudge sauce and toasted roasted peanuts.', 1, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=300&q=80'),
('ch_2', 'cornerhouse', 'Hot Butterscotch Sundae', 'Desserts & Sundaes', 190, 1, 1, 'Velvety vanilla ice cream drenched in warm house-made caramel butterscotch fudge and cashew crunch.', 0, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=300&q=80'),
('ch_3', 'cornerhouse', 'Brown Bomb', 'Desserts & Sundaes', 210, 1, 1, 'Fresh baked chocolate walnut brownie served warm with a scoop of vanilla and dark chocolate syrup.', 1, 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80');

-- Seed Sample Live Order
INSERT IGNORE INTO orders (id, restaurant_id, restaurant_name, items_json, total, address, customer_name, status, order_time, eta_minutes) VALUES
('FD-71829', 'vidyarthi', 'Vidyarthi Bhavan', '[{"name":"Masala Dose","quantity":2,"price":65},{"name":"Authentic Filter Coffee","quantity":2,"price":35}]', 242, '14/A, 100ft Road, Indiranagar', 'Rahul Sharma', 'preparing', '10:30 AM', 18);
