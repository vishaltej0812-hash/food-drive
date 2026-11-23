====================================================
FOODDRIVE — XAMPP FULL-STACK PACKAGE (PHP + MySQL)
====================================================

PROJECT STRUCTURE:
fooddrive/
├── index.php             (Main app entry point)
├── css/style.css         (Separated stylesheet)
├── js/app.js             (Separated JS + MySQL API sync)
├── config/db.php         (XAMPP MySQL PDO connection)
├── api/
│   ├── restaurants.php   (GET restaurants/menus, POST open/closed toggle)
│   ├── menu.php          (POST stock toggle, price edit, add dish)
│   └── orders.php        (GET orders, POST create/update order status)
├── database/
│   └── fooddrive.sql     (MySQL schema + seed data)
└── .htaccess             (Apache config)

HOW TO RUN ON XAMPP (WINDOWS):
1. Extract the 'fooddrive' folder into:
   C:\xampp\htdocs\fooddrive

2. Open XAMPP Control Panel and start:
   - Apache
   - MySQL

3. Import the database (for full MySQL persistence):
   - Open http://localhost/phpmyadmin
   - Click "Import" -> Choose 'database/fooddrive.sql' -> Click "Go"

4. Open the app in your browser:
   http://localhost/fooddrive/

NOTE:
Even before importing the SQL file, the app works immediately using
localStorage as a fallback. Once fooddrive.sql is imported, all
store toggles, dish stock updates, and orders sync with MySQL.
