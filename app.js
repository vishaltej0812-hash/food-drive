/**
 * FOODDRIVE ARCHITECTURE & REACTIVE STATE ENGINE
 * Features:
 * - Dual-Portal Navigation (Customer View vs Restaurant Partner Portal)
 * - Persistent Shared State in localStorage
 * - Simulated Google OAuth Flow
 * - Interactive Shopping Cart, Coupons & Instant Checkout
 * - Live Order Tracking with animated Rider simulation
 * - Restaurant Master Online/Offline Status Switch
 * - Menu Inventory Item-level In-Stock / Sold-Out Real-time sync
 * - Web Audio API pleasant micro-interaction synthesis
 * - 3D Card Tilt with specular reflections
 * - Canvas Aurora Background & Confetti
 */

// 1. DEFAULT DATASET (Iconic Bengaluru Restaurants & Dishes)
const INITIAL_RESTAURANTS = [
  {
    id: "vidyarthi",
    name: "Vidyarthi Bhavan",
    area: "Basavanagudi",
    city: "Bengaluru",
    isOpen: true,
    cuisines: ["South Indian", "Tiffin", "Heritage"],
    cuisineTag: "South Indian",
    offerTag: "10% OFF",
    rating: 4.6,
    reviewCount: "8.4k",
    deliveryTime: "20-25 min",
    deliveryTimeMins: 22,
    distance: "1.8 km",
    costForTwo: 200,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "vb_1",
        name: "Masala Dose",
        category: "Tiffin & Dosa",
        price: 65,
        isVeg: true,
        inStock: true,
        desc: "Signature thick crispy golden dose roasted in pure ghee, stuffed with seasoned potato palya and served with coconut chutney.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "vb_2",
        name: "Khali Dose (2 Pcs)",
        category: "Tiffin & Dosa",
        price: 55,
        isVeg: true,
        inStock: true,
        desc: "Pillow-soft spongy rice pancakes served with dollop of fresh churned white butter and spiced lentil chutney.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "vb_3",
        name: "Crispy Rava Vada",
        category: "Tiffin & Dosa",
        price: 45,
        isVeg: true,
        inStock: true,
        desc: "Crunchy deep-fried semolina fritter flavored with whole peppercorns, curry leaves, and ginger.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "vb_4",
        name: "Kesari Bath",
        category: "Desserts & Sundaes",
        price: 45,
        isVeg: true,
        inStock: true,
        desc: "Traditional saffron and ghee infused semolina dessert loaded with cashew nuts and golden raisins.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "vb_5",
        name: "Authentic Filter Coffee",
        category: "Beverages",
        price: 35,
        isVeg: true,
        inStock: true,
        desc: "Freshly brewed Kumbakonam degree filter coffee frothed in traditional brass dabara-tumbler.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "ctr",
    name: "CTR (Shri Sagar)",
    area: "Malleshwaram",
    city: "Bengaluru",
    isOpen: true,
    cuisines: ["Tiffin", "Udupi", "South Indian"],
    cuisineTag: "Tiffin · Udupi",
    offerTag: "FREE COFFEE",
    rating: 4.7,
    reviewCount: "9.1k",
    deliveryTime: "25-30 min",
    deliveryTimeMins: 26,
    distance: "3.2 km",
    costForTwo: 220,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "ctr_1",
        name: "Benne Masala Dose",
        category: "Tiffin & Dosa",
        price: 85,
        isVeg: true,
        inStock: true,
        desc: "CTR's legendary butter masala dose with ultra-crisp exterior, melt-in-mouth core, and mildly sweet-spiced potato.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "ctr_2",
        name: "Steamed Rava Idli",
        category: "Tiffin & Dosa",
        price: 45,
        isVeg: true,
        inStock: true,
        desc: "Semolina cake steamed with mustard temper, cashew nut, served with spiced potato saagu and coriander chutney.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "ctr_3",
        name: "Mangalore Bajji (4 Pcs)",
        category: "Tiffin & Dosa",
        price: 50,
        isVeg: true,
        inStock: false,
        desc: "Crisp and fluffy deep-fried tiffin fritters made of seasoned flour and sour curd.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "ctr_4",
        name: "Strong Filter Kaapi",
        category: "Beverages",
        price: 30,
        isVeg: true,
        inStock: true,
        desc: "Strong chicory and arabica blend brewed fresh on order with piping hot cow milk.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "meghana",
    name: "Meghana Foods",
    area: "Indiranagar",
    city: "Bengaluru",
    isOpen: true,
    cuisines: ["Andhra", "Biryani", "Non-Veg"],
    cuisineTag: "Andhra · Biryani",
    offerTag: "FLAT ₹50 OFF",
    rating: 4.5,
    reviewCount: "14.2k",
    deliveryTime: "30-35 min",
    deliveryTimeMins: 32,
    distance: "2.1 km",
    costForTwo: 550,
    isVeg: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "meg_1",
        name: "Meghana Special Chicken Biryani",
        category: "Starters & Biryani",
        price: 360,
        isVeg: false,
        inStock: true,
        desc: "Fragrant seasoned basmati rice layered with juicy fried boneless chicken pieces and fiery Andhra masala.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "meg_2",
        name: "Paneer Biryani",
        category: "Starters & Biryani",
        price: 310,
        isVeg: true,
        inStock: true,
        desc: "Slow-cooked spiced long grain basmati rice loaded with fried cottage cheese cubes and fried onions.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "meg_3",
        name: "Andhra Chicken 65",
        category: "Starters & Biryani",
        price: 320,
        isVeg: false,
        inStock: true,
        desc: "Tender boneless chicken morsels flash fried and tossed with green chilies, yogurt, and aromatic curry leaves.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "meg_4",
        name: "Boneless Mutton Biryani",
        category: "Starters & Biryani",
        price: 420,
        isVeg: false,
        inStock: false,
        desc: "Succulent tender mutton cubes cooked in Andhra chili paste served over royal dum rice.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "empire",
    name: "Empire Restaurant",
    area: "Koramangala",
    city: "Bengaluru",
    isOpen: true,
    cuisines: ["Multi-Cuisine", "Kebabs", "Late Night"],
    cuisineTag: "Multi-Cuisine",
    offerTag: "15% OFF",
    rating: 4.3,
    reviewCount: "11k",
    deliveryTime: "25-30 min",
    deliveryTimeMins: 28,
    distance: "2.8 km",
    costForTwo: 480,
    isVeg: false,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "emp_1",
        name: "Empire Special Chicken Kebab",
        category: "Starters & Biryani",
        price: 290,
        isVeg: false,
        inStock: true,
        desc: "Empire's crown jewel: crisp deep-fried chicken marinated overnight with signature garlic-ginger and chili spice paste.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "emp_2",
        name: "Butter Chicken Curry",
        category: "Main Course",
        price: 340,
        isVeg: false,
        inStock: true,
        desc: "Tender tandoori chicken cooked in velvety tomato, butter, and cashew gravy infused with fenugreek.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "emp_3",
        name: "Rumali Roti (2 Pcs)",
        category: "Main Course",
        price: 40,
        isVeg: true,
        inStock: true,
        desc: "Paper-thin soft flatbread skillfully stretched and baked over an inverted wok.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "emp_4",
        name: "Chicken Shawarma Roll",
        category: "Starters & Biryani",
        price: 140,
        isVeg: false,
        inStock: true,
        desc: "Thinly sliced rotisserie chicken wrapped in warm bread with creamy garlic toum and pickles.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "punjabi",
    name: "Punjabi Rasoi Dhaba",
    area: "Hosur Road",
    city: "Bengaluru",
    isOpen: true,
    cuisines: ["North Indian", "Dhaba", "Tandoori"],
    cuisineTag: "Dhaba · Highway",
    offerTag: "20% OFF",
    rating: 4.4,
    reviewCount: "5.2k",
    deliveryTime: "35-40 min",
    deliveryTimeMins: 35,
    distance: "4.5 km",
    costForTwo: 450,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "pun_1",
        name: "Dal Makhani Deluxe",
        category: "Main Course",
        price: 260,
        isVeg: true,
        inStock: true,
        desc: "Whole black lentils and kidney beans slow-simmered for 16 hours with butter, cream and gentle spices.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "pun_2",
        name: "Paneer Butter Masala",
        category: "Main Course",
        price: 310,
        isVeg: true,
        inStock: true,
        desc: "Fresh creamy cottage cheese chunks cooked in rich mildly spiced onion tomato gravy.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "pun_3",
        name: "Amritsari Kulcha with Chole",
        category: "Main Course",
        price: 220,
        isVeg: true,
        inStock: true,
        desc: "Clay oven baked stuffed spiced potato bread served with tangy chickpea curry and onion salad.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "pun_4",
        name: "Tandoori Butter Naan",
        category: "Main Course",
        price: 55,
        isVeg: true,
        inStock: true,
        desc: "Fluffy leavened flatbread baked in tandoor and glazed with melted salted butter.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80"
      }
    ]
  },
  {
    id: "cornerhouse",
    name: "Corner House Ice Cream",
    area: "Jayanagar",
    city: "Bengaluru",
    isOpen: false,
    cuisines: ["Bakery", "Desserts", "Sundaes"],
    cuisineTag: "Bakery · Snacks",
    offerTag: "BOGO SUNDAE",
    rating: 4.8,
    reviewCount: "16.8k",
    deliveryTime: "15-20 min",
    deliveryTimeMins: 18,
    distance: "1.4 km",
    costForTwo: 300,
    isVeg: true,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "ch_1",
        name: "Death by Chocolate (DBC)",
        category: "Desserts & Sundaes",
        price: 260,
        isVeg: true,
        inStock: true,
        desc: "Bengaluru's undisputed dessert legend: rich warm chocolate cake, dual scoops of vanilla, piping hot fudge sauce and toasted roasted peanuts.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "ch_2",
        name: "Hot Butterscotch Sundae",
        category: "Desserts & Sundaes",
        price: 190,
        isVeg: true,
        inStock: true,
        desc: "Velvety vanilla ice cream drenched in warm house-made caramel butterscotch fudge and cashew crunch.",
        bestseller: false,
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "ch_3",
        name: "Brown Bomb",
        category: "Desserts & Sundaes",
        price: 210,
        isVeg: true,
        inStock: true,
        desc: "Fresh baked chocolate walnut brownie served warm with a scoop of vanilla and dark chocolate syrup.",
        bestseller: true,
        image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80"
      }
    ]
  }
];

// 2. GLOBAL REACTIVE APP STATE
let APP_STATE = {
  restaurants: [],
  cart: [],
  appliedCoupon: null,
  activePortal: 'customer', // 'customer' | 'admin' | 'tracking'
  user: null, // Logged in user profile
  activeAdminRestId: 'vidyarthi',
  adminTab: 'orders', // 'orders' | 'menu'
  orders: [],
  activeTrackingOrderId: null,
  activeFilter: 'all',
  searchQuery: '',
  activeSort: 'recommended',
  soundEnabled: true,
  currentLocation: 'Indiranagar, Bengaluru'
};

// INITIALIZE STATE FROM LOCALSTORAGE
function loadStateFromStorage() {
  try {
    const savedRest = localStorage.getItem('fooddrive_restaurants_v2');
    if (savedRest) {
      APP_STATE.restaurants = JSON.parse(savedRest);
    } else {
      APP_STATE.restaurants = JSON.parse(JSON.stringify(INITIAL_RESTAURANTS));
      saveRestaurants();
    }

    const savedCart = localStorage.getItem('fooddrive_cart_v2');
    if (savedCart) APP_STATE.cart = JSON.parse(savedCart);

    const savedUser = localStorage.getItem('fooddrive_user_v2');
    if (savedUser) APP_STATE.user = JSON.parse(savedUser);

    const savedOrders = localStorage.getItem('fooddrive_orders_v2');
    if (savedOrders) {
      APP_STATE.orders = JSON.parse(savedOrders);
    } else {
      // Sample starter live order for demo
      APP_STATE.orders = [
        {
          id: "FD-71829",
          restaurantId: "vidyarthi",
          restaurantName: "Vidyarthi Bhavan",
          items: [
            { name: "Masala Dose", quantity: 2, price: 65 },
            { name: "Authentic Filter Coffee", quantity: 2, price: 35 }
          ],
          total: 242,
          address: "14/A, 100ft Road, Indiranagar",
          customerName: "Rahul Sharma",
          status: "preparing", // 'placed', 'preparing', 'out_for_delivery', 'delivered'
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          etaMinutes: 18
        }
      ];
      saveOrders();
    }
  } catch (err) {
    console.error("Storage load error:", err);
    APP_STATE.restaurants = JSON.parse(JSON.stringify(INITIAL_RESTAURANTS));
  }
}

function saveRestaurants() {
  localStorage.setItem('fooddrive_restaurants_v2', JSON.stringify(APP_STATE.restaurants));
}
function saveCart() {
  localStorage.setItem('fooddrive_cart_v2', JSON.stringify(APP_STATE.cart));
}
function saveOrders() {
  localStorage.setItem('fooddrive_orders_v2', JSON.stringify(APP_STATE.orders));
}
function saveUser() {
  if (APP_STATE.user) {
    localStorage.setItem('fooddrive_user_v2', JSON.stringify(APP_STATE.user));
  } else {
    localStorage.removeItem('fooddrive_user_v2');
  }
}

// RESET DEMO DATA
function resetToDefaultData() {
  localStorage.clear();
  APP_STATE.restaurants = JSON.parse(JSON.stringify(INITIAL_RESTAURANTS));
  APP_STATE.cart = [];
  APP_STATE.orders = [];
  APP_STATE.appliedCoupon = null;
  saveRestaurants();
  saveCart();
  renderAllViews();
  showToast("Demo state reset to clean Bengaluru pilot defaults! 🔄");
}

// ==============================================
// 3. SOUND SYNTHESIZER (WEB AUDIO API)
// ==============================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!APP_STATE.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'pop') {
      // Cheerful pop when adding to cart
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'success') {
      // Celebratory chime when checkout completes
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (e) {
    // Audio context may require explicit click
  }
}

function toggleSound() {
  APP_STATE.soundEnabled = !APP_STATE.soundEnabled;
  const btn = document.getElementById('soundToggleBtn');
  btn.textContent = APP_STATE.soundEnabled ? '🔊' : '🔇';
  showToast(APP_STATE.soundEnabled ? 'Sound FX enabled 🔊' : 'Sound FX muted 🔇');
}

// ==============================================
// 4. TOAST NOTIFICATIONS & CONFETTI
// ==============================================
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// CONFETTI EFFECT
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#ff5da2', '#ff9d3d', '#ffd23f', '#3ddad7', '#a06bff', '#4be38a'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() * 200 - 100),
      y: canvas.height / 2 + (Math.random() * 100 - 50),
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let animationId;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98;
      p.alpha -= 0.012;
      p.rotation += p.vRot;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (alive) {
      animationId = requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
    }
  }
  updateConfetti();
}

// ==============================================
// 5. CINEMATIC AURORA MESH BACKGROUND
// ==============================================
function initAuroraCanvas() {
  const canvas = document.getElementById('auroraCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const orbs = [
    { x: 0.2, y: 0.15, r: 0.45, color: 'rgba(255, 93, 162, 0.16)', vx: 0.0003, vy: 0.0002 },
    { x: 0.85, y: 0.2, r: 0.4, color: 'rgba(61, 218, 215, 0.14)', vx: -0.0002, vy: 0.0003 },
    { x: 0.5, y: 0.85, r: 0.5, color: 'rgba(160, 107, 255, 0.18)', vx: 0.0002, vy: -0.0002 },
    { x: 0.1, y: 0.8, r: 0.35, color: 'rgba(255, 157, 61, 0.12)', vx: 0.0003, vy: -0.0003 }
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;

      if (orb.x < 0 || orb.x > 1) orb.vx *= -1;
      if (orb.y < 0 || orb.y > 1) orb.vy *= -1;

      const px = orb.x * canvas.width;
      const py = orb.y * canvas.height;
      const radius = orb.r * Math.min(canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
      grad.addColorStop(0, orb.color);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ==============================================
// 6. DUAL-PORTAL SWITCHING ARCHITECTURE
// ==============================================
function switchPortal(portalName) {
  APP_STATE.activePortal = portalName;
  playSound('click');

  const customerView = document.getElementById('customerPortalView');
  const adminView = document.getElementById('adminPortalView');
  const trackingView = document.getElementById('trackingPortalView');

  const btnCust = document.getElementById('portalBtnCustomer');
  const btnAdmin = document.getElementById('portalBtnAdmin');

  customerView.style.display = 'none';
  adminView.classList.remove('active');
  trackingView.classList.remove('active');

  btnCust.classList.remove('active');
  btnAdmin.classList.remove('active');

  if (portalName === 'customer') {
    customerView.style.display = 'block';
    btnCust.classList.add('active');
    renderRestaurantGrid();
    renderLiveTicker();
    updateFloatingCartBanner();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (portalName === 'admin') {
    adminView.classList.add('active');
    btnAdmin.classList.add('active');
    renderAdminPortal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (portalName === 'tracking') {
    trackingView.classList.add('active');
    renderLiveOrderTracking();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==============================================
// 7. SIMULATED GOOGLE OAUTH AUTHENTICATION
// ==============================================
function openAuthModal() {
  playSound('click');
  const overlay = document.getElementById('authModalOverlay');
  const selectScreen = document.getElementById('oauthSelectScreen');
  const loadingScreen = document.getElementById('oauthLoadingScreen');

  selectScreen.style.display = 'block';
  loadingScreen.style.display = 'none';
  overlay.classList.add('open');
}

function handleAuthOverlayClick(e) {
  if (e.target.id === 'authModalOverlay') {
    document.getElementById('authModalOverlay').classList.remove('open');
  }
}

function selectMockAccount(accountKey) {
  const accounts = {
    rahul: {
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      phone: "+91 98450 12891"
    },
    priya: {
      name: "Priya Patel",
      email: "priya.foodie@gmail.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      phone: "+91 97412 88390"
    },
    ananya: {
      name: "Ananya Rao",
      email: "ananya.rao.blr@gmail.com",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      phone: "+91 99001 44512"
    }
  };

  const selected = accounts[accountKey] || accounts.rahul;

  document.getElementById('oauthSelectScreen').style.display = 'none';
  document.getElementById('oauthLoadingScreen').style.display = 'flex';

  // Simulate Google OAuth handshake delay
  setTimeout(() => {
    APP_STATE.user = selected;
    saveUser();
    updateAuthNavbar();
    document.getElementById('authModalOverlay').classList.remove('open');
    playSound('success');
    showToast(`Signed in as ${selected.name} (${selected.email}) 🎉`);
  }, 900);
}

function updateAuthNavbar() {
  const loggedOutNav = document.getElementById('navAuthLoggedOut');
  const loggedInNav = document.getElementById('navAuthLoggedIn');

  if (APP_STATE.user) {
    loggedOutNav.style.display = 'none';
    loggedInNav.style.display = 'block';

    document.getElementById('navAvatarImg').src = APP_STATE.user.avatar;
    document.getElementById('navUserName').textContent = APP_STATE.user.name.split(' ')[0];
    document.getElementById('dropdownFullName').textContent = APP_STATE.user.name;
    document.getElementById('dropdownEmail').textContent = APP_STATE.user.email;
  } else {
    loggedOutNav.style.display = 'flex';
    loggedInNav.style.display = 'none';
  }
}

function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.classList.toggle('open');
}

// Close dropdown on outside click
window.addEventListener('click', (e) => {
  if (!e.target.closest('.user-profile-wrap')) {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.remove('open');
  }
});

function signOutUser() {
  APP_STATE.user = null;
  saveUser();
  updateAuthNavbar();
  document.getElementById('profileDropdown').classList.remove('open');
  playSound('click');
  showToast("You've been safely signed out. See you soon! 👋");
}

function simulateNewGoogleAccount() {
  document.getElementById('profileDropdown').classList.remove('open');
  openAuthModal();
}

// ==============================================
// 8. RESTAURANT GRID RENDERING WITH 3D TILT EFFECT
// ==============================================
function renderRestaurantGrid() {
  const grid = document.getElementById('restaurantGrid');
  grid.innerHTML = '';

  let list = [...APP_STATE.restaurants];

  // Filtering
  if (APP_STATE.activeFilter === 'veg') {
    list = list.filter(r => r.isVeg);
  } else if (APP_STATE.activeFilter === 'open') {
    list = list.filter(r => r.isOpen);
  } else if (APP_STATE.activeFilter === 'rating') {
    list = list.filter(r => r.rating >= 4.5);
  } else if (APP_STATE.activeFilter === 'fast') {
    list = list.filter(r => r.deliveryTimeMins <= 25);
  } else if (APP_STATE.activeFilter === 'offer') {
    list = list.filter(r => r.offerTag && r.offerTag.length > 0);
  }

  // Search input filtering
  if (APP_STATE.searchQuery.trim() !== '') {
    const q = APP_STATE.searchQuery.toLowerCase();
    list = list.filter(r => {
      const matchName = r.name.toLowerCase().includes(q);
      const matchArea = r.area.toLowerCase().includes(q);
      const matchCuisine = r.cuisines.some(c => c.toLowerCase().includes(q));
      const matchMenu = r.menu.some(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q));
      return matchName || matchArea || matchCuisine || matchMenu;
    });
  }

  // Sorting
  if (APP_STATE.activeSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (APP_STATE.activeSort === 'deliveryTime') {
    list.sort((a, b) => a.deliveryTimeMins - b.deliveryTimeMins);
  } else if (APP_STATE.activeSort === 'costLow') {
    list.sort((a, b) => a.costForTwo - b.costForTwo);
  } else if (APP_STATE.activeSort === 'costHigh') {
    list.sort((a, b) => b.costForTwo - a.costForTwo);
  }

  document.getElementById('listingCountText').textContent =
    `Showing ${list.length} of ${APP_STATE.restaurants.length} verified establishments`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🔍</div>
        <div class="empty-title">No matching restaurants found</div>
        <div class="empty-sub">Try searching for "Dosa", "Biryani", "Empire" or clearing active filters.</div>
        <button class="btn btn-ghost btn-sm" style="margin-top: 16px;" onclick="resetSearchAndFilters()">
          Reset Search & Filters
        </button>
      </div>
    `;
    return;
  }

  list.forEach(rest => {
    const card = document.createElement('div');
    card.className = `card ${rest.isOpen ? '' : 'card-closed'}`;
    card.setAttribute('data-id', rest.id);

    // Sample top 3 dishes for peek line
    const peekDishes = rest.menu.slice(0, 3).map(m => m.name).join(', ');

    card.innerHTML = `
      <div class="glare"></div>
      <div class="card-photo-wrap">
        <img src="${rest.image}" class="card-photo-img" alt="${rest.name}" loading="lazy">
        <div class="card-photo-overlay">
          <div class="card-photo-top">
            <span class="cuisine-tag">${rest.cuisineTag}</span>
            ${rest.offerTag ? `<span class="offer-tag">${rest.offerTag}</span>` : ''}
          </div>
          <div class="card-photo-bottom">
            <span class="eta-pill">⚡ ${rest.deliveryTime}</span>
            <span style="font-size: 11px; font-weight: 700; color: #fff; background: rgba(0,0,0,0.5); padding: 3px 8px; border-radius: 10px;">${rest.distance}</span>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="card-header-row">
          <div>
            <h3 class="card-title">${rest.name}</h3>
            <div class="card-area">${rest.area} · Bengaluru</div>
          </div>
          <div class="rating-badge">⭐ ${rest.rating}</div>
        </div>

        <div class="card-status-row">
          <div class="status-badge ${rest.isOpen ? 'open' : 'closed'}">
            <span class="dot ${rest.isOpen ? '' : 'closed'}"></span>
            ${rest.isOpen ? 'OPEN NOW' : 'CLOSED'}
          </div>
          <div class="cost-for-two">₹${rest.costForTwo} for two</div>
        </div>

        <div class="menu-peek">
          <span style="color: var(--pink); font-weight: 700;">Live: </span>${peekDishes}
        </div>

        <div class="card-footer">
          <span class="updated-time">Updated 2m ago</span>
          <span class="view-menu-btn">View Menu & Order →</span>
        </div>
      </div>
    `;

    // 3D Tilt interaction logic
    attachCardTilt(card);

    // Open detailed menu modal on card click
    card.addEventListener('click', () => openRestaurantMenu(rest.id));

    grid.appendChild(card);
  });
}

// 3D TILT INTERACTION ATTACHER
function attachCardTilt(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    const glare = card.querySelector('.glare');
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.18), transparent 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

function renderLiveTicker() {
  const container = document.getElementById('liveTickerStrip');
  container.innerHTML = '';
  APP_STATE.restaurants.forEach(r => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.innerHTML = `
      <span class="dot ${r.isOpen ? '' : 'closed'}"></span>
      <span>${r.name} — ${r.isOpen ? 'Open' : 'Closed'}</span>
    `;
    pill.addEventListener('click', () => openRestaurantMenu(r.id));
    container.appendChild(pill);
  });
}

// ==============================================
// 9. SEARCH, FILTER CHIPS & SORT HANDLERS
// ==============================================
function handleSearchInput(val) {
  APP_STATE.searchQuery = val;
  const clearBtn = document.getElementById('searchClearBtn');
  clearBtn.style.display = val.length > 0 ? 'flex' : 'none';
  renderRestaurantGrid();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  APP_STATE.searchQuery = '';
  document.getElementById('searchClearBtn').style.display = 'none';
  renderRestaurantGrid();
}

function toggleFilter(filterName) {
  playSound('click');
  APP_STATE.activeFilter = APP_STATE.activeFilter === filterName ? 'all' : filterName;

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-filter') === APP_STATE.activeFilter);
  });

  renderRestaurantGrid();
}

function handleSortChange(sortVal) {
  APP_STATE.activeSort = sortVal;
  renderRestaurantGrid();
}

function resetSearchAndFilters() {
  clearSearch();
  APP_STATE.activeFilter = 'all';
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('[data-filter="all"]').classList.add('active');
  renderRestaurantGrid();
}

function scrollToGrid() {
  document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
}

// ==============================================
// 10. RESTAURANT MENU MODAL & AVAILABILITY
// ==============================================
let activeModalRest = null;

function openRestaurantMenu(restId) {
  playSound('click');
  const rest = APP_STATE.restaurants.find(r => r.id === restId);
  if (!rest) return;

  activeModalRest = rest;
  const overlay = document.getElementById('menuModalOverlay');

  document.getElementById('modalRestName').textContent = rest.name;
  document.getElementById('modalCuisineTag').textContent = rest.cuisineTag;
  document.getElementById('modalRating').textContent = `⭐ ${rest.rating}`;
  document.getElementById('modalArea').textContent = `${rest.area}, Bengaluru`;
  document.getElementById('modalEta').textContent = rest.deliveryTime;
  document.getElementById('modalCost').textContent = `₹${rest.costForTwo} for two`;

  const statusBadge = document.getElementById('modalStatusBadge');
  statusBadge.className = `status-badge ${rest.isOpen ? 'open' : 'closed'}`;
  statusBadge.innerHTML = `<span class="dot ${rest.isOpen ? '' : 'closed'}"></span> ${rest.isOpen ? 'OPEN' : 'CLOSED'}`;

  const offerTag = document.getElementById('modalOfferTag');
  if (rest.offerTag) {
    offerTag.style.display = 'inline-block';
    offerTag.textContent = rest.offerTag;
  } else {
    offerTag.style.display = 'none';
  }

  // Show notice if kitchen is closed
  document.getElementById('modalClosedNotice').style.display = rest.isOpen ? 'none' : 'flex';

  renderModalMenuItems(rest);
  overlay.classList.add('open');
}

function renderModalMenuItems(rest) {
  const container = document.getElementById('modalMenuContent');
  container.innerHTML = '';

  // Group items by category
  const categories = {};
  rest.menu.forEach(item => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });

  Object.keys(categories).forEach(cat => {
    const sec = document.createElement('div');
    sec.className = 'menu-category-section';

    sec.innerHTML = `
      <div class="menu-category-title">
        <span>🍲</span> ${cat} (${categories[cat].length})
      </div>
      <div class="menu-items-list" id="catList_${cat.replace(/\s+/g, '')}"></div>
    `;

    container.appendChild(sec);
    const itemsList = sec.querySelector('.menu-items-list');

    categories[cat].forEach(dish => {
      const row = document.createElement('div');
      row.className = `menu-item-row ${dish.inStock ? '' : 'sold-out'}`;

      // Check current quantity in cart
      const cartItem = APP_STATE.cart.find(c => c.itemId === dish.id);
      const currentQty = cartItem ? cartItem.quantity : 0;

      row.innerHTML = `
        <div class="item-left">
          <div class="item-name-row">
            <span class="diet-badge ${dish.isVeg ? 'veg' : 'nonveg'}">
              <span class="diet-circle"></span>
            </span>
            <span class="item-name">${dish.name}</span>
            ${dish.bestseller ? '<span class="bestseller-badge">BESTSELLER</span>' : ''}
          </div>
          <div class="item-price">₹${dish.price}</div>
          <div class="item-desc">${dish.desc}</div>

          <div class="stock-status-pill ${dish.inStock ? 'instock' : 'soldout'}">
            <span class="stock-dot ${dish.inStock ? 'green' : 'red'}"></span>
            <span>${dish.inStock ? 'In Stock · Freshly Prepared' : 'Sold Out for Today'}</span>
          </div>
        </div>

        <div class="item-right">
          <div class="item-thumb-wrap">
            <img src="${dish.image}" class="item-thumb-img" alt="${dish.name}" loading="lazy">
          </div>
          <div class="add-btn-wrap" id="actionBtnWrap_${dish.id}">
            ${renderAddButtonHtml(rest, dish, currentQty)}
          </div>
        </div>
      `;

      itemsList.appendChild(row);
    });
  });
}

function renderAddButtonHtml(rest, dish, qty) {
  if (!rest.isOpen) {
    return `<button class="btn-add" disabled>CLOSED</button>`;
  }
  if (!dish.inStock) {
    return `<button class="btn-add" disabled>SOLD OUT</button>`;
  }

  if (qty > 0) {
    return `
      <div class="qty-stepper">
        <button class="qty-btn" onclick="updateItemQty('${rest.id}', '${dish.id}', -1)">-</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-btn" onclick="updateItemQty('${rest.id}', '${dish.id}', 1)">+</button>
      </div>
    `;
  } else {
    return `
      <button class="btn-add" onclick="updateItemQty('${rest.id}', '${dish.id}', 1)">
        + ADD
      </button>
    `;
  }
}

function closeMenuModal() {
  playSound('click');
  document.getElementById('menuModalOverlay').classList.remove('open');
  activeModalRest = null;
}

function handleMenuOverlayClick(e) {
  if (e.target.id === 'menuModalOverlay') {
    closeMenuModal();
  }
}

// ==============================================
// 11. SHOPPING CART ENGINE & STICKY BANNER
// ==============================================
function updateItemQty(restId, dishId, delta) {
  playSound('pop');

  const rest = APP_STATE.restaurants.find(r => r.id === restId);
  const dish = rest ? rest.menu.find(d => d.id === dishId) : null;
  if (!dish || !dish.inStock || !rest.isOpen) return;

  // Single restaurant cart enforcement (standard Swiggy/Zomato rule)
  if (APP_STATE.cart.length > 0 && APP_STATE.cart[0].restaurantId !== restId) {
    const confirmSwitch = confirm(
      `Your cart contains items from "${APP_STATE.cart[0].restaurantName}". Discard cart and start a fresh order from "${rest.name}"?`
    );
    if (confirmSwitch) {
      APP_STATE.cart = [];
    } else {
      return;
    }
  }

  const existingIdx = APP_STATE.cart.findIndex(c => c.itemId === dishId);

  if (existingIdx >= 0) {
    APP_STATE.cart[existingIdx].quantity += delta;
    if (APP_STATE.cart[existingIdx].quantity <= 0) {
      APP_STATE.cart.splice(existingIdx, 1);
    }
  } else if (delta > 0) {
    APP_STATE.cart.push({
      restaurantId: rest.id,
      restaurantName: rest.name,
      itemId: dish.id,
      name: dish.name,
      price: dish.price,
      isVeg: dish.isVeg,
      quantity: 1
    });
  }

  saveCart();
  updateFloatingCartBanner();

  // If menu modal is open, re-render the button without flicker
  if (activeModalRest && activeModalRest.id === restId) {
    const btnWrap = document.getElementById(`actionBtnWrap_${dish.id}`);
    if (btnWrap) {
      const currentCartItem = APP_STATE.cart.find(c => c.itemId === dish.id);
      const newQty = currentCartItem ? currentCartItem.quantity : 0;
      btnWrap.innerHTML = renderAddButtonHtml(rest, dish, newQty);
    }
  }

  // Update cart drawer if it is currently open
  if (document.getElementById('cartDrawerOverlay').classList.contains('open')) {
    renderCartDrawer();
  }
}

function updateFloatingCartBanner() {
  const banner = document.getElementById('floatingCartBanner');
  const totalCount = APP_STATE.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalCount > 0 && APP_STATE.activePortal === 'customer') {
    const subtotal = APP_STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('floatingCartCount').textContent = `${totalCount} Item${totalCount > 1 ? 's' : ''}`;
    document.getElementById('floatingCartTotal').textContent = `₹${subtotal}`;
    banner.classList.add('visible');
  } else {
    banner.classList.remove('visible');
  }
}

// CART DRAWER
function openCartDrawer() {
  playSound('click');
  if (APP_STATE.cart.length === 0) {
    showToast("Your cart is empty! Add items from any kitchen. 🍛");
    return;
  }
  renderCartDrawer();
  document.getElementById('cartDrawerOverlay').classList.add('open');
}

function closeCartDrawer() {
  playSound('click');
  document.getElementById('cartDrawerOverlay').classList.remove('open');
}

function handleCartOverlayClick(e) {
  if (e.target.id === 'cartDrawerOverlay') {
    closeCartDrawer();
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cartItemsList');
  container.innerHTML = '';

  if (APP_STATE.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--muted);">
        <div style="font-size: 36px; margin-bottom: 10px;">🛒</div>
        <div>Your cart is empty</div>
      </div>
    `;
    closeCartDrawer();
    return;
  }

  const restName = APP_STATE.cart[0].restaurantName;
  document.getElementById('cartRestNameLabel').textContent = `Ordering from ${restName}`;

  APP_STATE.cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-info">
        <span class="diet-badge ${item.isVeg ? 'veg' : 'nonveg'}">
          <span class="diet-circle"></span>
        </span>
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} each</div>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 14px;">
        <div class="qty-stepper">
          <button class="qty-btn" onclick="updateItemQty('${item.restaurantId}', '${item.itemId}', -1)">-</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn" onclick="updateItemQty('${item.restaurantId}', '${item.itemId}', 1)">+</button>
        </div>
        <div style="font-size: 14px; font-weight: 800; min-width: 48px; text-align: right;">
          ₹${item.price * item.quantity}
        </div>
      </div>
    `;
    container.appendChild(row);
  });

  calculateCartBill();
}

function calculateCartBill() {
  const subtotal = APP_STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = subtotal > 350 ? 0 : 35; // Free delivery above 350
  const tax = Math.round(subtotal * 0.05); // 5% GST

  let discount = 0;
  if (APP_STATE.appliedCoupon === 'FOODDRIVE30' && subtotal >= 150) {
    discount = Math.min(Math.round(subtotal * 0.3), 150);
  }

  const grandTotal = Math.max(0, subtotal + delivery + tax - discount);

  document.getElementById('billSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('billDelivery').textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
  document.getElementById('billTax').textContent = `₹${tax}`;

  const discountRow = document.getElementById('billDiscountRow');
  if (discount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('billDiscount').textContent = `-₹${discount}`;
  } else {
    discountRow.style.display = 'none';
  }

  document.getElementById('billGrandTotal').textContent = `₹${grandTotal}`;
}

function applyCouponCode() {
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  if (code === 'FOODDRIVE30') {
    APP_STATE.appliedCoupon = 'FOODDRIVE30';
    document.getElementById('couponAppliedBadge').style.display = 'block';
    playSound('success');
    showToast("Coupon FOODDRIVE30 applied! 30% discount deducted 🎉");
    calculateCartBill();
  } else {
    showToast("Invalid coupon code! Try 'FOODDRIVE30'");
  }
}

function claimLaunchDiscount(e) {
  e.stopPropagation();
  playSound('pop');
  APP_STATE.appliedCoupon = 'FOODDRIVE30';
  document.getElementById('couponInput').value = 'FOODDRIVE30';
  document.getElementById('couponAppliedBadge').style.display = 'block';
  showToast("Launch offer code FOODDRIVE30 applied to your order! 🏷️");
  openCartDrawer();
}

function dismissDiscount(e) {
  e.stopPropagation();
  document.getElementById('discountPop').style.display = 'none';
}

// ==============================================
// 12. CHECKOUT SIMULATION & REAL-TIME ORDER QUEUE
// ==============================================
function initiateCheckout() {
  if (APP_STATE.cart.length === 0) return;

  // Ensure user is authenticated
  if (!APP_STATE.user) {
    closeCartDrawer();
    openAuthModal();
    showToast("Please sign in with Google to confirm your delivery address!");
    return;
  }

  playSound('click');
  closeCartDrawer();

  // Show cinematic gateway simulation
  const paymentOverlay = document.getElementById('paymentOverlay');
  paymentOverlay.classList.add('open');

  setTimeout(() => {
    paymentOverlay.classList.remove('open');

    // Create the order
    const restId = APP_STATE.cart[0].restaurantId;
    const restName = APP_STATE.cart[0].restaurantName;
    const subtotal = APP_STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    const delivery = subtotal > 350 ? 0 : 35;
    let discount = 0;
    if (APP_STATE.appliedCoupon === 'FOODDRIVE30') discount = Math.min(Math.round(subtotal * 0.3), 150);
    const grandTotal = subtotal + tax + delivery - discount;

    const orderId = `FD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      id: orderId,
      restaurantId: restId,
      restaurantName: restName,
      items: [...APP_STATE.cart],
      total: grandTotal,
      address: APP_STATE.currentLocation,
      customerName: APP_STATE.user.name,
      status: 'placed', // 'placed' -> 'preparing' -> 'out_for_delivery' -> 'delivered'
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      etaMinutes: 24
    };

    APP_STATE.orders.unshift(newOrder);
    saveOrders();

    // Clear cart
    APP_STATE.cart = [];
    saveCart();
    updateFloatingCartBanner();

    // Sound & celebratory confetti
    playSound('success');
    launchConfetti();

    // Navigate to Live Order Tracking
    APP_STATE.activeTrackingOrderId = orderId;
    switchPortal('tracking');
    showToast(`Order #${orderId} confirmed! Sent to ${restName} kitchen 🛵`);

    // Auto simulate progression after 6s for demo wonder
    setTimeout(() => {
      advanceOrderStatus(orderId, 'preparing');
    }, 6000);
  }, 1600);
}

// ==============================================
// 13. LIVE ORDER TRACKING (CINEMATIC VIEW)
// ==============================================
function renderLiveOrderTracking() {
  const currentOrder = APP_STATE.orders.find(o => o.id === APP_STATE.activeTrackingOrderId) || APP_STATE.orders[0];

  if (!currentOrder) {
    document.getElementById('trackingPortalView').innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2>No Active Orders</h2>
        <p style="color: var(--muted); margin-top: 8px;">Explore open kitchens and place a live order!</p>
        <button class="btn btn-solid" style="margin-top: 20px;" onclick="switchPortal('customer')">Explore Kitchens</button>
      </div>
    `;
    return;
  }

  document.getElementById('trackingOrderIdHeader').textContent = `#${currentOrder.id}`;
  document.getElementById('trackRestName').textContent = currentOrder.restaurantName;
  document.getElementById('trackCustomerLoc').textContent = APP_STATE.currentLocation.split(',')[0];

  // Update steps
  const s1 = document.getElementById('stepNode1');
  const s2 = document.getElementById('stepNode2');
  const s3 = document.getElementById('stepNode3');
  const s4 = document.getElementById('stepNode4');

  [s1, s2, s3, s4].forEach(s => {
    s.className = 'step-node';
  });

  const mapFill = document.getElementById('trackMapFill');
  const riderPin = document.getElementById('trackRiderPin');
  const statusMsg = document.getElementById('trackingStatusMsg');
  const countdown = document.getElementById('trackingCountdown');

  if (currentOrder.status === 'placed') {
    s1.className = 'step-node active';
    mapFill.style.width = '10%';
    riderPin.style.left = '20%';
    countdown.textContent = '26m 40s';
    statusMsg.textContent = 'Order received! Transmitting to restaurant dashboard...';
  } else if (currentOrder.status === 'preparing') {
    s1.className = 'step-node completed';
    s2.className = 'step-node active';
    mapFill.style.width = '35%';
    riderPin.style.left = '35%';
    countdown.textContent = '21m 15s';
    statusMsg.textContent = 'Chef is preparing your meal with live ingredients.';
  } else if (currentOrder.status === 'out_for_delivery') {
    s1.className = 'step-node completed';
    s2.className = 'step-node completed';
    s3.className = 'step-node active';
    mapFill.style.width = '75%';
    riderPin.style.left = '75%';
    countdown.textContent = '08m 30s';
    statusMsg.textContent = 'Ramesh is on his way with your hot meal!';
  } else if (currentOrder.status === 'delivered') {
    s1.className = 'step-node completed';
    s2.className = 'step-node completed';
    s3.className = 'step-node completed';
    s4.className = 'step-node completed';
    mapFill.style.width = '100%';
    riderPin.style.left = '85%';
    countdown.textContent = 'Delivered! 🎉';
    statusMsg.textContent = 'Order successfully delivered. Enjoy your feast!';
  }

  // Populate items
  const itemsContainer = document.getElementById('trackingItemsList');
  itemsContainer.innerHTML = currentOrder.items.map(item => `
    <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--line-subtle);">
      <span>${item.name} × ${item.quantity}</span>
      <span style="font-weight: 700;">₹${item.price * item.quantity}</span>
    </div>
  `).join('') + `
    <div style="display: flex; justify-content: space-between; padding-top: 10px; font-weight: 800; color: var(--teal); font-size: 15px;">
      <span>Grand Total Paid</span>
      <span>₹${currentOrder.total}</span>
    </div>
  `;
}

// ==============================================
// 14. ADMIN PORTAL (LIVE ORDERS & MENU MANAGEMENT)
// ==============================================
function renderAdminPortal() {
  // Populate restaurant selector
  const select = document.getElementById('adminRestaurantSelect');
  select.innerHTML = '';
  APP_STATE.restaurants.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = `${r.name} (${r.area})`;
    if (r.id === APP_STATE.activeAdminRestId) opt.selected = true;
    select.appendChild(opt);
  });

  const activeRest = APP_STATE.restaurants.find(r => r.id === APP_STATE.activeAdminRestId);
  if (!activeRest) return;

  // Master Global Online/Offline Switch
  const toggle = document.getElementById('adminGlobalStoreToggle');
  const label = document.getElementById('adminStoreStatusLabel');
  toggle.checked = activeRest.isOpen;

  if (activeRest.isOpen) {
    label.textContent = "STORE ONLINE (ACCEPTING ORDERS)";
    label.className = "switch-label open-text";
  } else {
    label.textContent = "STORE OFFLINE (CLOSED)";
    label.className = "switch-label closed-text";
  }

  // Update KPIs
  const restOrders = APP_STATE.orders.filter(o => o.restaurantId === activeRest.id);
  const revenue = restOrders.reduce((sum, o) => sum + o.total, 0) + 12450;
  document.getElementById('adminKpiRevenue').textContent = `₹${revenue.toLocaleString()}`;
  document.getElementById('adminKpiOrders').textContent = `${restOrders.length} Today`;

  const inStockCount = activeRest.menu.filter(m => m.inStock).length;
  document.getElementById('adminKpiDishes').textContent = `${inStockCount} / ${activeRest.menu.length} In Stock`;
  document.getElementById('adminKpiRating').textContent = `⭐ ${activeRest.rating}`;

  document.getElementById('adminOrdersCountBadge').textContent = restOrders.length;

  if (APP_STATE.adminTab === 'orders') {
    renderAdminOrders(activeRest);
  } else {
    renderAdminMenuTable(activeRest);
  }
}

function handleAdminRestaurantChange(newRestId) {
  APP_STATE.activeAdminRestId = newRestId;
  playSound('click');
  renderAdminPortal();
}

function handleAdminGlobalToggle(isOpen) {
  const rest = APP_STATE.restaurants.find(r => r.id === APP_STATE.activeAdminRestId);
  if (!rest) return;

  rest.isOpen = isOpen;
  saveRestaurants();
  playSound('pop');

  const label = document.getElementById('adminStoreStatusLabel');
  if (isOpen) {
    label.textContent = "STORE ONLINE (ACCEPTING ORDERS)";
    label.className = "switch-label open-text";
    showToast(`🟢 ${rest.name} is now ONLINE and receiving customer orders!`);
  } else {
    label.textContent = "STORE OFFLINE (CLOSED)";
    label.className = "switch-label closed-text";
    showToast(`🔴 ${rest.name} is marked CLOSED.`);
  }

  // Live reflect in customer view
  renderLiveTicker();
}

function switchAdminTab(tabName) {
  APP_STATE.adminTab = tabName;
  playSound('click');

  document.getElementById('adminTabOrdersBtn').classList.toggle('active', tabName === 'orders');
  document.getElementById('adminTabMenuBtn').classList.toggle('active', tabName === 'menu');

  document.getElementById('adminOrdersSection').style.display = tabName === 'orders' ? 'block' : 'none';
  document.getElementById('adminMenuSection').style.display = tabName === 'menu' ? 'block' : 'none';

  renderAdminPortal();
}

// ADMIN LIVE ORDERS SECTION
function renderAdminOrders(rest) {
  const container = document.getElementById('adminOrdersList');
  container.innerHTML = '';

  const relevantOrders = APP_STATE.orders.filter(o => o.restaurantId === rest.id);

  if (relevantOrders.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: rgba(0,0,0,0.2); border-radius: 16px;">
        <div style="font-size: 36px; margin-bottom: 10px;">🛎️</div>
        <div style="font-size: 18px; font-weight: 800;">No Pending Orders</div>
        <div style="color: var(--muted); font-size: 13.5px; margin-top: 4px;">Orders placed on the Customer Portal will ring in here instantly!</div>
      </div>
    `;
    return;
  }

  relevantOrders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'admin-order-card';

    const itemsSummary = order.items.map(i => `${i.name} × ${i.quantity}`).join(', ');

    let actionButton = '';
    if (order.status === 'placed') {
      actionButton = `
        <button class="btn btn-purple btn-sm" style="width: 100%;" onclick="advanceOrderStatus('${order.id}', 'preparing')">
          👩‍🍳 Accept & Start Preparing
        </button>
      `;
    } else if (order.status === 'preparing') {
      actionButton = `
        <button class="btn btn-solid btn-sm" style="width: 100%;" onclick="advanceOrderStatus('${order.id}', 'out_for_delivery')">
          🛵 Dispatch with Valet
        </button>
      `;
    } else if (order.status === 'out_for_delivery') {
      actionButton = `
        <button class="btn btn-success btn-sm" style="width: 100%;" onclick="advanceOrderStatus('${order.id}', 'delivered')">
          ✓ Mark Delivered
        </button>
      `;
    } else {
      actionButton = `
        <div style="text-align: center; color: var(--open); font-weight: 800; font-size: 13px;">
          ✓ Order Completed
        </div>
      `;
    }

    card.innerHTML = `
      <div class="order-card-header">
        <span class="order-id">${order.id}</span>
        <span class="status-badge ${order.status === 'delivered' ? 'open' : 'closed'}">
          ${order.status.toUpperCase().replace(/_/g, ' ')}
        </span>
      </div>

      <div>
        <div style="font-weight: 800; font-size: 15px;">${order.customerName}</div>
        <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">📍 ${order.address} · ${order.timestamp}</div>
      </div>

      <div class="order-items-summary">
        ${itemsSummary}
      </div>

      <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 14.5px;">
        <span>Bill Total</span>
        <span style="color: var(--teal);">₹${order.total}</span>
      </div>

      <div>
        ${actionButton}
      </div>
    `;

    container.appendChild(card);
  });
}

function advanceOrderStatus(orderId, newStatus) {
  const order = APP_STATE.orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  saveOrders();
  playSound('pop');

  showToast(`Order #${orderId} moved to "${newStatus.replace(/_/g, ' ').toUpperCase()}"!`);

  // Re-render admin orders
  const activeRest = APP_STATE.restaurants.find(r => r.id === APP_STATE.activeAdminRestId);
  if (activeRest) renderAdminOrders(activeRest);

  // If tracking portal is open, update tracking screen in real-time!
  if (APP_STATE.activePortal === 'tracking') {
    renderLiveOrderTracking();
  }
}

// ADMIN MENU TABLE & INSTANT AVAILABILITY TOGGLE
function renderAdminMenuTable(rest) {
  const tbody = document.getElementById('adminMenuTableBody');
  tbody.innerHTML = '';

  rest.menu.forEach(dish => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="diet-badge ${dish.isVeg ? 'veg' : 'nonveg'}">
            <span class="diet-circle"></span>
          </span>
          <span style="font-weight: 700;">${dish.name}</span>
        </div>
      </td>
      <td>${dish.category}</td>
      <td>
        <span style="font-weight: 800;">₹${dish.price}</span>
      </td>
      <td>${dish.isVeg ? '🌱 Pure Veg' : '🍗 Non-Veg'}</td>
      <td>
        <label class="stock-switch">
          <input type="checkbox" ${dish.inStock ? 'checked' : ''} onchange="toggleDishStock('${rest.id}', '${dish.id}', this.checked)">
          <span style="font-size: 12px; font-weight: 800; color: ${dish.inStock ? 'var(--open)' : 'var(--closed)'};">
            ${dish.inStock ? '● IN STOCK' : '○ SOLD OUT'}
          </span>
        </label>
      </td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="editDishPrice('${rest.id}', '${dish.id}')">
          ✏️ Price
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleDishStock(restId, dishId, inStock) {
  const rest = APP_STATE.restaurants.find(r => r.id === restId);
  const dish = rest ? rest.menu.find(d => d.id === dishId) : null;
  if (!dish) return;

  dish.inStock = inStock;
  saveRestaurants();
  playSound('pop');

  showToast(`${dish.name} is now marked ${inStock ? 'IN STOCK 🟢' : 'SOLD OUT 🔴'}`);

  // Re-render table to refresh colors
  renderAdminMenuTable(rest);
}

function editDishPrice(restId, dishId) {
  const rest = APP_STATE.restaurants.find(r => r.id === restId);
  const dish = rest ? rest.menu.find(d => d.id === dishId) : null;
  if (!dish) return;

  const newPrice = prompt(`Enter new price for "${dish.name}" (₹):`, dish.price);
  if (newPrice && !isNaN(newPrice) && Number(newPrice) > 0) {
    dish.price = Math.round(Number(newPrice));
    saveRestaurants();
    playSound('success');
    showToast(`Updated price of ${dish.name} to ₹${dish.price}`);
    renderAdminMenuTable(rest);
  }
}

// ADD NEW DISH MODAL
function openAddDishModal() {
  playSound('click');
  document.getElementById('addDishModalOverlay').classList.add('open');
}

function closeAddDishModal() {
  document.getElementById('addDishModalOverlay').classList.remove('open');
}

function handleAddDishOverlayClick(e) {
  if (e.target.id === 'addDishModalOverlay') {
    closeAddDishModal();
  }
}

function handleCreateDish(e) {
  e.preventDefault();
  const rest = APP_STATE.restaurants.find(r => r.id === APP_STATE.activeAdminRestId);
  if (!rest) return;

  const name = document.getElementById('newDishName').value.trim();
  const category = document.getElementById('newDishCategory').value;
  const price = Number(document.getElementById('newDishPrice').value);
  const diet = document.getElementById('newDishDiet').value;
  const desc = document.getElementById('newDishDesc').value.trim() || "Freshly crafted chef specialty.";

  const newDish = {
    id: `dish_${Date.now()}`,
    name: name,
    category: category,
    price: price,
    isVeg: diet === 'veg',
    inStock: true,
    desc: desc,
    bestseller: false,
    image: diet === 'veg'
      ? "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=300&q=80"
      : "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80"
  };

  rest.menu.unshift(newDish);
  saveRestaurants();
  playSound('success');
  closeAddDishModal();
  document.getElementById('addDishForm').reset();

  showToast(`Added "${name}" to ${rest.name}'s live menu! ✨`);
  renderAdminPortal();
}

// ==============================================
// 15. LOCATION SELECTOR SIMULATION
// ==============================================
function openLocationPicker() {
  const locations = [
    "Indiranagar, Bengaluru",
    "Koramangala 4th Block, Bengaluru",
    "Malleshwaram 8th Cross, Bengaluru",
    "Basavanagudi Gandhi Bazaar, Bengaluru",
    "Jayanagar 4th Block, Bengaluru",
    "Whitefield ITPL, Bengaluru"
  ];

  const current = APP_STATE.currentLocation;
  const choice = prompt(
    `Select your Bengaluru delivery location:\n\n1. Indiranagar\n2. Koramangala\n3. Malleshwaram\n4. Basavanagudi\n5. Jayanagar\n6. Whitefield\n\nEnter number (1-6):`,
    "1"
  );

  const idx = parseInt(choice) - 1;
  if (idx >= 0 && idx < locations.length) {
    APP_STATE.currentLocation = locations[idx];
    document.getElementById('currentLocationLabel').textContent = locations[idx].split(',')[0];
    showToast(`Delivery location set to ${locations[idx]} 📍`);
    playSound('pop');
  }
}

// MY ORDERS HISTORY DRAWER
function openOrdersDrawer() {
  toggleProfileDropdown();
  if (APP_STATE.orders.length === 0) {
    showToast("No previous orders found.");
    return;
  }
  // Open tracking view with the latest order
  APP_STATE.activeTrackingOrderId = APP_STATE.orders[0].id;
  switchPortal('tracking');
}

// ==============================================
// 16. INITIALIZATION CALL
// ==============================================
function renderAllViews() {
  renderRestaurantGrid();
  renderLiveTicker();
  updateAuthNavbar();
  updateFloatingCartBanner();
}

document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  initAuroraCanvas();
  renderAllViews();
});


// ==============================================
// 17. XAMPP PHP / MYSQL BACKEND SYNC LAYER
// ==============================================
const API_BASE = 'api';

async function syncFromBackend() {
  try {
    const [restRes, ordRes] = await Promise.all([
      fetch(`${API_BASE}/restaurants.php`),
      fetch(`${API_BASE}/orders.php`)
    ]);
    if (restRes.ok) {
      const restData = await restRes.json();
      if (restData.success && Array.isArray(restData.data) && restData.data.length > 0) {
        APP_STATE.restaurants = restData.data;
        saveRestaurants();
      }
    }
    if (ordRes.ok) {
      const ordData = await ordRes.json();
      if (ordData.success && Array.isArray(ordData.data)) {
        APP_STATE.orders = ordData.data;
        saveOrders();
      }
    }
    renderAllViews();
  } catch (err) {
    // Graceful fallback: runs smoothly on localStorage if MySQL isn't imported yet
    console.info('FoodDrive running in localStorage mode (import database/fooddrive.sql for MySQL sync).');
  }
}

async function postToApi(endpoint, payload) {
  try {
    await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Non-blocking fallback
  }
}

// Wrap existing state-mutating functions to also sync with MySQL
const _origHandleAdminGlobalToggle = handleAdminGlobalToggle;
handleAdminGlobalToggle = function(isOpen) {
  _origHandleAdminGlobalToggle(isOpen);
  postToApi('restaurants.php', {
    action: 'toggle_open',
    id: APP_STATE.activeAdminRestId,
    isOpen: isOpen ? 1 : 0
  });
};

const _origToggleDishStock = toggleDishStock;
toggleDishStock = function(restId, dishId, inStock) {
  _origToggleDishStock(restId, dishId, inStock);
  postToApi('menu.php', {
    action: 'toggle_stock',
    id: dishId,
    inStock: inStock ? 1 : 0
  });
};

const _origAdvanceOrderStatus = advanceOrderStatus;
advanceOrderStatus = function(orderId, newStatus) {
  _origAdvanceOrderStatus(orderId, newStatus);
  postToApi('orders.php', {
    action: 'update_status',
    id: orderId,
    status: newStatus
  });
};

document.addEventListener('DOMContentLoaded', () => {
  syncFromBackend();
});
