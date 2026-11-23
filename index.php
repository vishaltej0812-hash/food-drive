<?php
// FoodDrive — XAMPP Entry Point
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FoodDrive — Cinematic Food Ordering & Live Restaurant Portal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- CINEMATIC AURORA MESH BACKGROUND -->
<canvas id="auroraCanvas"></canvas>
<!-- CELEBRATORY CONFETTI CANVAS -->
<canvas id="confettiCanvas"></canvas>

<div class="app-shell">

  <!-- TOP NAVIGATION BAR -->
  <nav>
    <div class="nav-left">
      <div class="logo" onclick="switchPortal('customer')">
        <div class="logo-icon">⚡</div>
        <div>Food<span>Drive</span></div>
      </div>

      <div class="location-pill" onclick="openLocationPicker()" title="Change Bengaluru Delivery Area">
        <span>📍</span>
        <span class="loc-city" id="currentLocationLabel">Indiranagar</span>
        <span style="font-size: 10px;">▼</span>
      </div>
    </div>

    <!-- SEAMLESS DUAL-PORTAL SWITCH TOGGLE -->
    <div class="portal-switcher">
      <button class="portal-btn active" id="portalBtnCustomer" onclick="switchPortal('customer')">
        <span>🍽️</span> Customer View
      </button>
      <button class="portal-btn" id="portalBtnAdmin" onclick="switchPortal('admin')">
        <span>🏪</span> Partner Dashboard
      </button>
    </div>

    <div class="nav-right">
      <!-- Sound FX Toggle -->
      <button class="sound-btn" id="soundToggleBtn" onclick="toggleSound()" title="Sound Effects (On/Off)">
        🔊
      </button>

      <!-- Dynamic Auth Section: Google Log In vs User Profile -->
      <div id="navAuthLoggedOut" style="display: flex; gap: 10px;">
        <button class="btn btn-ghost btn-sm" onclick="openAuthModal()" style="display: flex; align-items: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
          Log in with Google
        </button>
      </div>

      <div id="navAuthLoggedIn" class="user-profile-wrap" style="display: none;">
        <button class="user-avatar-btn" onclick="toggleProfileDropdown()">
          <img src="" id="navAvatarImg" class="user-avatar-img" alt="Avatar">
          <span class="user-name-label" id="navUserName">Rahul</span>
          <span style="font-size: 10px; color: var(--muted);">▼</span>
        </button>

        <!-- Dropdown Menu -->
        <div class="profile-dropdown" id="profileDropdown">
          <div class="profile-header">
            <div class="user-full-name" id="dropdownFullName">Rahul Sharma</div>
            <div class="user-email" id="dropdownEmail">rahul.sharma@gmail.com</div>
          </div>
          <div class="dropdown-item" onclick="openOrdersDrawer()">
            <span>📦</span> My Orders & History
          </div>
          <div class="dropdown-item" onclick="switchPortal('admin'); toggleProfileDropdown();">
            <span>🏪</span> Switch to Restaurant Portal
          </div>
          <div class="dropdown-item" onclick="simulateNewGoogleAccount()">
            <span>🔄</span> Switch Google Account
          </div>
          <div class="dropdown-item danger" onclick="signOutUser()">
            <span>🚪</span> Sign Out
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- FLOATING DISCOUNT POPUP -->
  <div class="discount-pop" id="discountPop" onclick="claimLaunchDiscount(event)">
    <div class="badge-top">
      <span>🚀 Launch Offer</span>
      <span class="close-x" onclick="dismissDiscount(event)">✕</span>
    </div>
    <div class="big">30% OFF</div>
    <div class="desc">On orders above ₹199 across all Bengaluru pilot kitchens!</div>
    <div class="code-chip">
      <span>FOODDRIVE30</span>
      <span style="color: #fff; font-size: 11px;">TAP TO APPLY</span>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- 1. CUSTOMER PORTAL INTERFACE                   -->
  <!-- ============================================== -->
  <main id="customerPortalView">
    
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="eyebrow">
        <span class="pulse-flame">🔥</span> Bengaluru · Real-Time Pilot 2026
      </div>
      <h1>Know it's <span class="grad">actually open</span><br>before you order or walk in.</h1>
      <p>FoodDrive bridges verified restaurant hardware toggles with live doorstep ordering. Real status straight from Bangalore's iconic kitchens — with dynamic menus and 24-minute blitz delivery.</p>
      
      <div class="hero-actions">
        <button class="btn btn-solid" onclick="scrollToGrid()">
          <span>🍽️</span> Explore Open Kitchens
        </button>
        <button class="btn btn-ghost" onclick="switchPortal('admin')">
          <span>🏪</span> Restaurant Owner Portal
        </button>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-num">6</span>
          <span class="stat-lbl">Iconic Bengaluru Spots</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">24 min</span>
          <span class="stat-lbl">Avg. Delivery Time</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">100%</span>
          <span class="stat-lbl">Live Kitchen Sync</span>
        </div>
      </div>

      <div class="live-strip" id="liveTickerStrip">
        <!-- Rendered dynamically from state -->
      </div>
    </section>

    <!-- STICKY SEARCH & HORIZONTAL FILTER CHIPS -->
    <div class="discovery-bar-wrap">
      <div class="search-and-controls">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" id="searchInput" class="search-input" placeholder="Search Vidyarthi Bhavan, Biryani, Dosa, Corner House..." oninput="handleSearchInput(this.value)">
          <button class="search-clear" id="searchClearBtn" onclick="clearSearch()">✕</button>
        </div>

        <div class="filter-chips-scroll" id="filterChipsContainer">
          <div class="filter-chip" data-filter="all" onclick="toggleFilter('all')">All Kitchens</div>
          <div class="filter-chip" data-filter="veg" onclick="toggleFilter('veg')">
            <span class="diet-badge veg"><span class="diet-circle"></span></span> Pure Veg
          </div>
          <div class="filter-chip" data-filter="open" onclick="toggleFilter('open')">
            <span class="dot"></span> Open Now
          </div>
          <div class="filter-chip" data-filter="rating" onclick="toggleFilter('rating')">⭐ 4.5+ Rated</div>
          <div class="filter-chip" data-filter="fast" onclick="toggleFilter('fast')">⚡ Fast Delivery</div>
          <div class="filter-chip" data-filter="offer" onclick="toggleFilter('offer')">🏷️ Great Offers</div>
        </div>

        <select class="sort-select" id="sortSelect" onchange="handleSortChange(this.value)">
          <option value="recommended">Sort: Recommended</option>
          <option value="rating">Rating: High to Low</option>
          <option value="deliveryTime">Delivery Time: Fastest</option>
          <option value="costLow">Cost: Low to High</option>
          <option value="costHigh">Cost: High to Low</option>
        </select>
      </div>
    </div>

    <!-- RESTAURANT LISTINGS SECTION -->
    <section class="section" id="hotels">
      <div class="section-head">
        <div>
          <h2>Live Kitchens in Bengaluru 🍛</h2>
          <p id="listingCountText">Showing 6 verified establishments with real-time open status</p>
        </div>
      </div>

      <div class="grid" id="restaurantGrid">
        <!-- Injected via JavaScript with 3D tilt effects -->
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="section">
      <div class="section-head">
        <div>
          <h2>How FoodDrive Works</h2>
          <p>Real-time verification from restaurant tablet straight to your table</p>
        </div>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-emoji">📍</div>
          <h4>1. Owner Marks Status</h4>
          <p>Restaurant owners flip their open/closed toggle and item stock on their live tablet with zero delay.</p>
        </div>
        <div class="step-card">
          <div class="step-emoji">🔍</div>
          <h4>2. You Order Live</h4>
          <p>Browse authentic Bengaluru spots, customize dishes, and watch stock adjust with glowing neon indicators.</p>
        </div>
        <div class="step-card">
          <div class="step-emoji">🛵</div>
          <h4>3. 24m Fast Track</h4>
          <p>Cinematic GPS-simulated tracking takes you from kitchen prep directly to doorstep delivery.</p>
        </div>
      </div>
    </section>

  </main>

  <!-- ============================================== -->
  <!-- 2. ADMIN / RESTAURANT DASHBOARD PORTAL         -->
  <!-- ============================================== -->
  <main id="adminPortalView" class="admin-view-wrap">
    
    <div class="admin-top-bar">
      <div class="admin-rest-selector">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); font-weight: 700;">Managing Kitchen</span>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
            <select class="admin-select" id="adminRestaurantSelect" onchange="handleAdminRestaurantChange(this.value)">
              <!-- Populated dynamically -->
            </select>
          </div>
        </div>
      </div>

      <!-- MASTER STORE ONLINE / OFFLINE TOGGLE -->
      <div class="store-status-switch">
        <span class="switch-label" id="adminStoreStatusLabel">STORE ONLINE</span>
        <label class="toggle-switch">
          <input type="checkbox" id="adminGlobalStoreToggle" checked onchange="handleAdminGlobalToggle(this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div>
        <button class="btn btn-purple btn-sm" onclick="openAddDishModal()">
          <span>➕</span> Add New Menu Dish
        </button>
      </div>
    </div>

    <!-- ADMIN KPI STATS -->
    <div class="admin-kpis">
      <div class="kpi-card">
        <div class="kpi-title">Today's Revenue</div>
        <div class="kpi-val" id="adminKpiRevenue">₹14,820</div>
        <div class="kpi-sub">↑ 18.4% from yesterday</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Active Orders</div>
        <div class="kpi-val" id="adminKpiOrders">3 Live</div>
        <div class="kpi-sub" style="color: var(--teal);">Avg prep time: 14 mins</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Menu Dishes in Stock</div>
        <div class="kpi-val" id="adminKpiDishes">5 / 5 Active</div>
        <div class="kpi-sub">Real-time sync enabled</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Customer Rating</div>
        <div class="kpi-val" id="adminKpiRating">⭐ 4.6</div>
        <div class="kpi-sub">From 2,840+ foodies</div>
      </div>
    </div>

    <!-- TABS: LIVE ORDERS & MENU MANAGER -->
    <div class="admin-tabs">
      <button class="admin-tab-btn active" id="adminTabOrdersBtn" onclick="switchAdminTab('orders')">
        🔔 Live Incoming Orders (<span id="adminOrdersCountBadge">0</span>)
      </button>
      <button class="admin-tab-btn" id="adminTabMenuBtn" onclick="switchAdminTab('menu')">
        📋 Menu & Item Stock Controls
      </button>
    </div>

    <!-- TAB 1: LIVE ORDERS QUEUE -->
    <div id="adminOrdersSection">
      <div class="admin-orders-grid" id="adminOrdersList">
        <!-- Rendered dynamically -->
      </div>
    </div>

    <!-- TAB 2: MENU CONTROLS & AVAILABILITY TOGGLES -->
    <div id="adminMenuSection" style="display: none;">
      <div class="admin-menu-manager">
        <div class="menu-table-toolbar">
          <div style="font-weight: 800; font-size: 16px;">Dish Inventory & Real-Time Availability</div>
          <div style="font-size: 13px; color: var(--muted);">Toggling an item instantly syncs with all customer cards</div>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Type</th>
              <th>Live Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="adminMenuTableBody">
            <!-- Rendered dynamically -->
          </tbody>
        </table>
      </div>
    </div>

  </main>

  <!-- ============================================== -->
  <!-- 3. LIVE ORDER TRACKING CINEMATIC VIEW          -->
  <!-- ============================================== -->
  <main id="trackingPortalView" class="tracking-view-wrap">
    <div style="margin-bottom: 20px;">
      <button class="btn btn-ghost btn-sm" onclick="switchPortal('customer')">
        ← Back to Kitchens
      </button>
    </div>

    <div class="tracking-card">
      <div class="tracking-hero">
        <div class="tracking-eta-tag">
          <span class="dot"></span> Live Order Tracking · <span id="trackingOrderIdHeader">#FD-84920</span>
        </div>
        <div class="tracking-eta-time" id="trackingCountdown">24m 12s</div>
        <div class="tracking-status-msg" id="trackingStatusMsg">Kitchen has accepted your order and started cooking!</div>
      </div>

      <!-- MAP SIMULATION -->
      <div class="tracking-map-sim">
        <div class="map-grid-lines"></div>
        <div style="position: absolute; left: 16%; color: #fff; font-size: 12px; font-weight: 700;">
          🏪 <span id="trackRestName">Vidyarthi Bhavan</span>
        </div>
        <div style="position: absolute; right: 16%; color: #fff; font-size: 12px; font-weight: 700;">
          🏡 Your Doorstep (<span id="trackCustomerLoc">Indiranagar</span>)
        </div>
        <div class="map-route-track">
          <div class="map-route-fill" id="trackMapFill"></div>
        </div>
        <div class="map-rider-pin" id="trackRiderPin">🛵</div>
      </div>

      <!-- STEP NODES -->
      <div class="tracking-steps">
        <div class="step-node completed" id="stepNode1">
          <div class="step-icon-bubble">✓</div>
          <div class="step-title">Order Placed</div>
          <div class="step-desc">Payment confirmed</div>
        </div>
        <div class="step-node active" id="stepNode2">
          <div class="step-icon-bubble">🍳</div>
          <div class="step-title">In Kitchen</div>
          <div class="step-desc">Chef preparing food</div>
        </div>
        <div class="step-node" id="stepNode3">
          <div class="step-icon-bubble">🛵</div>
          <div class="step-title">Out for Delivery</div>
          <div class="step-desc">Valet on the way</div>
        </div>
        <div class="step-node" id="stepNode4">
          <div class="step-icon-bubble">🎉</div>
          <div class="step-title">Delivered</div>
          <div class="step-desc">Enjoy your feast!</div>
        </div>
      </div>

      <!-- RIDER CARD -->
      <div class="rider-details-card">
        <div class="rider-left">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" class="rider-avatar" alt="Rider">
          <div>
            <div class="rider-name">Ramesh Kumar · ⭐ 4.9</div>
            <div class="rider-vehicle">Honda Activa 6G (KA-04-EK-2938) · Vaccinated</div>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-ghost btn-sm" onclick="showToast('📞 Calling delivery executive Ramesh...')">
            📞 Call Valet
          </button>
        </div>
      </div>

      <!-- ORDER ITEMS SUMMARY IN TRACKING -->
      <div style="padding: 0 36px 36px;">
        <h4 style="font-size: 16px; margin-bottom: 12px;">Order Summary</h4>
        <div id="trackingItemsList" style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 14px 18px; font-size: 13.5px;">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>
  </main>

  <!-- ============================================== -->
  <!-- FLOATING VIEW CART STICKY BANNER               -->
  <!-- ============================================== -->
  <div class="floating-cart-banner" id="floatingCartBanner" onclick="openCartDrawer()">
    <div class="cart-banner-left">
      <span class="cart-items-count-badge" id="floatingCartCount">2 Items</span>
      <span class="cart-total-price" id="floatingCartTotal">₹240</span>
    </div>
    <div class="cart-banner-right">
      <span>View Cart & Checkout</span>
      <span style="font-size: 18px;">🛒 →</span>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- RESTAURANT MENU MODAL                          -->
  <!-- ============================================== -->
  <div class="modal-overlay" id="menuModalOverlay" onclick="handleMenuOverlayClick(event)">
    <div class="menu-modal-dialog" id="menuModalDialog">
      <div class="menu-hero-header">
        <div class="menu-hero-info">
          <div class="eyebrow" id="modalCuisineTag" style="margin-bottom: 8px;">South Indian</div>
          <h2 id="modalRestName">Vidyarthi Bhavan</h2>
          <div class="menu-hero-meta">
            <span class="rating-badge" id="modalRating">⭐ 4.6</span>
            <span id="modalArea">Basavanagudi, Bengaluru</span>
            <span>•</span>
            <span id="modalEta">25-30 min</span>
            <span>•</span>
            <span id="modalCost">₹250 for two</span>
          </div>
          <div class="menu-hero-pills">
            <span class="status-badge open" id="modalStatusBadge"><span class="dot"></span> OPEN</span>
            <span class="offer-tag" id="modalOfferTag">10% OFF</span>
          </div>
        </div>
        <button class="close-modal-btn" onclick="closeMenuModal()">✕</button>
      </div>

      <div class="menu-body-scroll" id="menuModalBody">
        <!-- STORE CLOSED ALERT -->
        <div class="store-closed-banner" id="modalClosedNotice" style="display: none;">
          <span style="font-size: 20px;">⚠️</span>
          <div>
            <strong>Kitchen Currently Closed</strong>
            <div style="font-size: 12px;">This restaurant is currently not accepting new orders. Please check back shortly.</div>
          </div>
        </div>

        <!-- CATEGORIES AND DISH ROWS INJECTED HERE -->
        <div id="modalMenuContent"></div>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- SHOPPING CART & CHECKOUT DRAWER                -->
  <!-- ============================================== -->
  <div class="modal-overlay" id="cartDrawerOverlay" onclick="handleCartOverlayClick(event)">
    <div class="cart-drawer-dialog" id="cartDrawerDialog">
      <div class="cart-drawer-head">
        <div>
          <h3>Shopping Cart</h3>
          <div class="cart-restaurant-name" id="cartRestNameLabel">Ordering from Vidyarthi Bhavan</div>
        </div>
        <button class="close-modal-btn" onclick="closeCartDrawer()">✕</button>
      </div>

      <div class="cart-drawer-body">
        <div id="cartItemsList">
          <!-- Rendered dynamically -->
        </div>

        <!-- COUPON CODE BOX -->
        <div class="coupon-box">
          <input type="text" class="coupon-input" id="couponInput" placeholder="ENTER COUPON CODE" value="">
          <button class="btn-coupon" onclick="applyCouponCode()">Apply</button>
        </div>
        <div id="couponAppliedBadge" style="display: none; font-size: 12px; color: var(--open); font-weight: 700; margin-top: -10px; margin-bottom: 12px;">
          ✓ Coupon FOODDRIVE30 applied! 30% OFF up to ₹150
        </div>

        <!-- BILL SUMMARY -->
        <div class="bill-details-card">
          <div class="bill-row">
            <span>Item Subtotal</span>
            <span id="billSubtotal">₹0</span>
          </div>
          <div class="bill-row">
            <span>Delivery Partner Fee</span>
            <span id="billDelivery">₹35</span>
          </div>
          <div class="bill-row">
            <span>Govt. Taxes & GST (5%)</span>
            <span id="billTax">₹12</span>
          </div>
          <div class="bill-row discount" id="billDiscountRow" style="display: none;">
            <span>Launch Offer Savings</span>
            <span id="billDiscount">-₹40</span>
          </div>
          <div class="bill-row total">
            <span>Grand Total</span>
            <span id="billGrandTotal" style="color: var(--teal);">₹0</span>
          </div>
        </div>
      </div>

      <div class="cart-drawer-footer">
        <button class="btn btn-solid" style="width: 100%; padding: 14px; font-size: 15px;" onclick="initiateCheckout()">
          <span>🔒</span> Proceed to Pay & Place Order
        </button>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- AUTHENTICATION (SIMULATED GOOGLE OAUTH POPUP) -->
  <!-- ============================================== -->
  <div class="modal-overlay" id="authModalOverlay" onclick="handleAuthOverlayClick(event)">
    <div class="auth-modal-dialog">
      <!-- GOOGLE ACCOUNT SELECTOR SCREEN -->
      <div id="oauthSelectScreen">
        <div class="auth-header">
          <div class="auth-logo-row">
            <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/></svg>
          </div>
          <h3>Sign in with Google</h3>
          <p>to continue to FoodDrive Bengaluru</p>
        </div>

        <div class="google-accounts-list">
          <div class="google-account-card" onclick="selectMockAccount('rahul')">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" class="google-account-avatar" alt="Rahul">
            <div class="google-account-details">
              <div class="google-acc-name">Rahul Sharma</div>
              <div class="google-acc-email">rahul.sharma@gmail.com</div>
            </div>
          </div>

          <div class="google-account-card" onclick="selectMockAccount('priya')">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" class="google-account-avatar" alt="Priya">
            <div class="google-account-details">
              <div class="google-acc-name">Priya Patel</div>
              <div class="google-acc-email">priya.foodie@gmail.com</div>
            </div>
          </div>

          <div class="google-account-card" onclick="selectMockAccount('ananya')">
            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80" class="google-account-avatar" alt="Ananya">
            <div class="google-account-details">
              <div class="google-acc-name">Ananya Rao</div>
              <div class="google-acc-email">ananya.rao.blr@gmail.com</div>
            </div>
          </div>
        </div>

        <div style="font-size: 11.5px; color: #5f6368; line-height: 1.4; text-align: center;">
          To continue, Google will share your name, email address, language preference, and profile picture with FoodDrive.
        </div>
      </div>

      <!-- OAUTH LOADING STATE -->
      <div class="oauth-loading-state" id="oauthLoadingScreen">
        <div class="oauth-spinner"></div>
        <h4 style="font-size: 17px; color: #202124;">Authenticating with Google...</h4>
        <p style="font-size: 13px; color: #5f6368; margin-top: 6px;">Syncing profile & session securely</p>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- PAYMENT GATEWAY & ORDER PLACEMENT OVERLAY      -->
  <!-- ============================================== -->
  <div class="payment-processing-overlay" id="paymentOverlay">
    <div class="gateway-loader">
      <div class="gateway-ring"></div>
    </div>
    <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 8px;">Connecting to Payment Gateway...</h2>
    <p style="color: var(--muted); font-size: 15px; max-width: 440px;">
      Simulating Google Pay instant 2-step verification and sending real-time notification to the restaurant tablet.
    </p>
  </div>

  <!-- ============================================== -->
  <!-- ADD NEW DISH MODAL (ADMIN)                     -->
  <!-- ============================================== -->
  <div class="modal-overlay" id="addDishModalOverlay" onclick="handleAddDishOverlayClick(event)">
    <div class="cart-drawer-dialog" style="max-width: 460px;">
      <div class="cart-drawer-head">
        <h3>Add New Dish to Menu</h3>
        <button class="close-modal-btn" onclick="closeAddDishModal()">✕</button>
      </div>
      <div class="cart-drawer-body">
        <form id="addDishForm" onsubmit="handleCreateDish(event)">
          <div style="margin-bottom: 14px;">
            <label style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Dish Name</label>
            <input type="text" id="newDishName" required placeholder="e.g. Ghee Podi Roast Dosa" class="search-input" style="padding-left: 14px; margin-top: 6px;">
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Category</label>
            <select id="newDishCategory" class="admin-select" style="width: 100%; margin-top: 6px;">
              <option value="Tiffin & Dosa">Tiffin & Dosa</option>
              <option value="Main Course">Main Course</option>
              <option value="Starters & Biryani">Starters & Biryani</option>
              <option value="Desserts & Sundaes">Desserts & Sundaes</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>
          <div style="margin-bottom: 14px; display: flex; gap: 12px;">
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Price (₹)</label>
              <input type="number" id="newDishPrice" required min="10" placeholder="95" class="search-input" style="padding-left: 14px; margin-top: 6px;">
            </div>
            <div style="flex: 1;">
              <label style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Dietary Type</label>
              <select id="newDishDiet" class="admin-select" style="width: 100%; margin-top: 6px;">
                <option value="veg">🌱 Pure Veg</option>
                <option value="nonveg">🍗 Non-Veg</option>
              </select>
            </div>
          </div>
          <div style="margin-bottom: 20px;">
            <label style="font-size: 12px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Short Description</label>
            <input type="text" id="newDishDesc" placeholder="Crispy golden crepe with spiced podi and homemade white butter" class="search-input" style="padding-left: 14px; margin-top: 6px;">
          </div>
          <button type="submit" class="btn btn-solid" style="width: 100%; padding: 12px;">
            Publish to Live Menu
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="toastContainer"></div>

  <!-- FOOTER -->
  <footer>
    <div>
      <div style="font-weight: 800; color: #fff; font-size: 15px; margin-bottom: 4px;">FOODDRIVE · BENGALURU LIVE PILOT</div>
      <div>Real-time sync platform for Bengaluru restaurants & foodies · 2026 Edition</div>
    </div>
    <div style="display: flex; gap: 14px; align-items: center;">
      <span>Indiranagar · Koramangala · Malleshwaram · Basavanagudi</span>
      <button class="btn btn-ghost btn-sm" onclick="resetToDefaultData()">Reset Demo Data</button>
    </div>
  </footer>

</div>

<!-- SCRIPT: APPLICATION LOGIC & STATE ENGINE -->
<script src="js/app.js"></script>

</body>
</html>
