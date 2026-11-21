(() => {
  "use strict";

  const categories = [
    { name: "Dairy, Bread & Eggs", icon: "🥛" },
    { name: "Fruits & Vegetables", icon: "🥦" },
    { name: "Cold Drinks & Juices", icon: "🥤" },
    { name: "Snacks & Munchies", icon: "🍿" },
    { name: "Breakfast & Instant Food", icon: "🍳" },
    { name: "Sweet Tooth", icon: "🍫" },
    { name: "Bakery & Biscuits", icon: "🍪" },
    { name: "Tea, Coffee & Milk Drinks", icon: "☕" },
    { name: "Atta, Rice & Dal", icon: "🍚" }
  ];

  const products = [
    { id: 1, category: "Dairy, Bread & Eggs", name: "Amul Taaza Toned Milk", size: "1 litre", price: 74, oldPrice: 78, icon: "🥛" },
    { id: 2, category: "Fruits & Vegetables", name: "Fresh Bananas - Robusta", size: "500 g", price: 38, oldPrice: 45, icon: "🍌" },
    { id: 3, category: "Dairy, Bread & Eggs", name: "Freshly Baked Brown Bread", size: "400 g", price: 55, oldPrice: 60, icon: "🍞" },
    { id: 4, category: "Dairy, Bread & Eggs", name: "Farm Fresh Brown Eggs", size: "6 pieces", price: 72, oldPrice: 79, icon: "🥚" },
    { id: 5, category: "Fruits & Vegetables", name: "Green Capsicum", size: "250 g", price: 32, oldPrice: 40, icon: "🫑" },
    { id: 6, category: "Fruits & Vegetables", name: "Sweet Nagpur Oranges", size: "4 pieces", price: 89, oldPrice: 99, icon: "🍊" },
    { id: 7, category: "Snacks & Munchies", name: "Classic Salted Potato Chips", size: "90 g", price: 40, oldPrice: 50, icon: "🥔" },
    { id: 8, category: "Cold Drinks & Juices", name: "Fresh Orange Juice", size: "1 litre", price: 119, oldPrice: 130, icon: "🍹" },
    { id: 9, category: "Breakfast & Instant Food", name: "Honey & Almond Granola", size: "400 g", price: 245, oldPrice: 279, icon: "🥣" },
    { id: 10, category: "Breakfast & Instant Food", name: "Authentic Masala Noodles", size: "280 g", price: 60, oldPrice: 70, icon: "🍜" },
    { id: 11, category: "Fruits & Vegetables", name: "Fresh Cherry Tomatoes", size: "200 g", price: 49, oldPrice: 55, icon: "🍅" },
    { id: 12, category: "Dairy, Bread & Eggs", name: "Greek Natural Yoghurt", size: "400 g", price: 105, oldPrice: 125, icon: "🥛" },
    { id: 13, category: "Fruits & Vegetables", name: "Seedless Green Grapes", size: "500 g", price: 79, oldPrice: 95, icon: "🍇" },
    { id: 14, category: "Snacks & Munchies", name: "Butter Salted Popcorn", size: "120 g", price: 35, oldPrice: 45, icon: "🍿" },
    { id: 15, category: "Cold Drinks & Juices", name: "Coconut Water", size: "200 ml", price: 48, oldPrice: 55, icon: "🥥" },
    { id: 16, category: "Electronics & Accessories", name: "Wireless Bluetooth Earbuds", size: "In-ear", price: 1499, oldPrice: 2499, icon: "🎧" },
    { id: 17, category: "Electronics & Accessories", name: "20W Fast Charging Adapter", size: "USB-C", price: 899, oldPrice: 1299, icon: "🔌" },
    { id: 18, category: "Electronics & Accessories", name: "Braided USB-C Fast Cable", size: "1 metre", price: 349, oldPrice: 499, icon: "〰️" },
    { id: 19, category: "Electronics & Accessories", name: "Portable Bluetooth Speaker", size: "Water resistant", price: 1299, oldPrice: 1999, icon: "🔊" },
    { id: 20, category: "Electronics & Accessories", name: "Smart Fitness Band", size: "AMOLED display", price: 2199, oldPrice: 3999, icon: "⌚" },
    { id: 21, category: "Electronics & Accessories", name: "5000mAh Power Bank", size: "Compact", price: 999, oldPrice: 1499, icon: "🔋" },
    { id: 22, category: "Atta, Rice & Dal", name: "Premium Basmati Rice", size: "5 kg", price: 599, oldPrice: 699, icon: "🍚" },
    { id: 23, category: "Atta, Rice & Dal", name: "Whole Wheat Atta", size: "5 kg", price: 265, oldPrice: 289, icon: "🌾" },
    { id: 24, category: "Atta, Rice & Dal", name: "Toor Dal", size: "1 kg", price: 180, oldPrice: 195, icon: "🫘" },
    { id: 25, category: "Sweet Tooth", name: "Milk Chocolate Bar", size: "175 g", price: 145, oldPrice: 170, icon: "🍫" },
    { id: 26, category: "Bakery & Biscuits", name: "Chocolate Cream Biscuits", size: "300 g", price: 95, oldPrice: 110, icon: "🍪" },
    { id: 27, category: "Personal Care", name: "Daily Moisturising Lotion", size: "400 ml", price: 299, oldPrice: 349, icon: "🧴" },
    { id: 28, category: "Personal Care", name: "Antibacterial Hand Wash", size: "750 ml", price: 149, oldPrice: 180, icon: "🫧" },
    { id: 29, category: "Cleaning Essentials", name: "Multipurpose Surface Cleaner", size: "1 litre", price: 199, oldPrice: 230, icon: "🧴" },
    { id: 30, category: "Cleaning Essentials", name: "Floor Cleaning Liquid", size: "2 litres", price: 279, oldPrice: 329, icon: "🧹" },
    { id: 31, category: "Baby Care", name: "Baby Wet Wipes", size: "72 wipes", price: 149, oldPrice: 179, icon: "👶" },
    { id: 32, category: "Baby Care", name: "Gentle Baby Shampoo", size: "200 ml", price: 245, oldPrice: 275, icon: "🧴" },
    { id: 33, category: "Pet Care", name: "Premium Dry Dog Food", size: "1.2 kg", price: 399, oldPrice: 449, icon: "🐕" },
    { id: 34, category: "Pet Care", name: "Cat Wet Food Pouch", size: "85 g", price: 75, oldPrice: 89, icon: "🐈" },
    { id: 35, category: "Health & Wellness", name: "Vitamin C Tablets", size: "30 tablets", price: 349, oldPrice: 399, icon: "💊" },
    { id: 36, category: "Health & Wellness", name: "Oral Rehydration Powder", size: "21 g", price: 45, oldPrice: 55, icon: "🧃" },
    { id: 37, category: "Home & Office Needs", name: "Rechargeable Desk Lamp", size: "USB powered", price: 699, oldPrice: 999, icon: "💡" },
    { id: 38, category: "Home & Office Needs", name: "Desktop Organiser", size: "A4 size", price: 449, oldPrice: 599, icon: "🗂️" },
    { id: 39, category: "Gifts & Toys", name: "Soft Teddy Bear", size: "Medium", price: 499, oldPrice: 699, icon: "🧸" },
    { id: 40, category: "Gifts & Toys", name: "Premium Gift Box", size: "Set of 3", price: 799, oldPrice: 999, icon: "🎁" }
  ];

  const cart = new Map();
  const MIN_ORDER_AMOUNT = 99;
  const MAX_ITEM_QUANTITY = 10;
  const MAX_CART_ITEMS = 30;
  let activeCategory = "All";
  let toastTimer;
  let verifiedPhone = "";
  let couponDiscount = 0;
  let orders = [
    { id: "ZC10482", status: "Active", stage: 3, total: 486, items: "Milk, Bread, Eggs", eta: "Arriving in 7 minutes" },
    { id: "ZC09831", status: "Delivered", stage: 4, total: 299, items: "Moisturising Lotion", eta: "Delivered yesterday" }
  ];

  const $ = (id) => document.getElementById(id);

  function renderCategories() {
    $("categoryList").innerHTML = "";
    const allCategories = [{ name: "All", icon: "🛍️" }, ...categories];
    allCategories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-card" + (activeCategory === category.name ? " active" : "");
      button.innerHTML = `<span>${category.icon}</span><strong>${category.name}</strong>`;
      button.addEventListener("click", () => {
        activeCategory = category.name;
        $("clearFilter").hidden = activeCategory === "All";
        $("productsTitle").textContent = activeCategory === "All" ? "Daily essentials" : category.name;
        renderCategories();
        renderProducts();
      });
      $("categoryList").appendChild(button);
    });
  }

  function getFilteredProducts() {
    const query = $("searchInput").value.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatches = activeCategory === "All" || product.category === activeCategory;
      const searchMatches = !query || `${product.name} ${product.category} ${product.size}`.toLowerCase().includes(query);
      return categoryMatches && searchMatches;
    });
  }

  function renderProducts() {
    const filtered = getFilteredProducts();
    $("productGrid").hidden = filtered.length === 0;
    $("emptyState").hidden = filtered.length !== 0;
    const productCard = (product) => {
      const quantity = cart.get(product.id)?.quantity || 0;
      const control = quantity
        ? `<div class="quantity-control"><button type="button" data-action="decrease" data-id="${product.id}" aria-label="Remove ${product.name}">−</button><span>${quantity}</span><button type="button" data-action="increase" data-id="${product.id}" aria-label="Add ${product.name}">+</button></div>`
        : `<button class="add-button" type="button" data-action="add" data-id="${product.id}">ADD</button>`;
      return `<article class="product-card" data-product="${product.id}">
        <div class="product-image" aria-label="${product.name}">${product.icon}</div>
        <div class="product-info">
          <span class="delivery-time">10 MIN</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-size">${product.size}</p>
          <div class="product-bottom">
            <div><span class="price">₹${product.price}</span><span class="old-price">₹${product.oldPrice}</span></div>
            ${control}
          </div>
        </div>
      </article>`;
    };

    const query = $("searchInput").value.trim();
    if (activeCategory === "All" && !query) {
      const grocery = filtered.filter((product) => product.category !== "Electronics & Accessories");
      const electronics = filtered.filter((product) => product.category === "Electronics & Accessories");
      $("productGrid").className = "product-grid shelves";
      $("productGrid").innerHTML = `
        <section class="product-shelf">
          <div class="shelf-heading"><div><p class="eyebrow">EVERYDAY SAVINGS</p><h2>Daily essentials</h2></div><button type="button" class="view-all" data-shelf-category="All">View all</button></div>
          <div class="product-shelf-grid">${grocery.map(productCard).join("")}</div>
        </section>
        <section class="product-shelf electronics-shelf">
          <div class="shelf-heading"><div><p class="eyebrow">SMART PICKS</p><h2>Electronics & accessories</h2></div><button type="button" class="view-all" data-shelf-category="Electronics & Accessories">View all</button></div>
          <div class="product-shelf-grid">${electronics.map(productCard).join("")}</div>
        </section>`;
    } else {
      $("productGrid").className = "product-grid";
      $("productGrid").innerHTML = filtered.map(productCard).join("");
    }
  }

  function updateCart(productId, delta) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const entry = cart.get(productId) || { product, quantity: 0 };
    const nextQuantity = entry.quantity + delta;
    if (delta > 0 && nextQuantity > MAX_ITEM_QUANTITY) {
      showToast(`Maximum ${MAX_ITEM_QUANTITY} units of this item`);
      return;
    }
    const currentCount = getCartSummary().count;
    if (delta > 0 && currentCount >= MAX_CART_ITEMS) {
      showToast(`Maximum ${MAX_CART_ITEMS} items in one order`);
      return;
    }
    entry.quantity = nextQuantity;
    if (entry.quantity <= 0) cart.delete(productId);
    else cart.set(productId, entry);
    renderCart();
    renderProducts();
  }

  function getCartSummary() {
    let count = 0;
    let subtotal = 0;
    cart.forEach((entry) => {
      count += entry.quantity;
      subtotal += entry.product.price * entry.quantity;
    });
    return { count, subtotal };
  }

  function renderCart() {
    const { count, subtotal } = getCartSummary();
    $("cartCount").textContent = `${count} item${count === 1 ? "" : "s"}`;
    $("cartTotal").textContent = `₹${subtotal}`;
    $("drawerSubtotal").textContent = `₹${subtotal}`;
    const delivery = subtotal > 0 ? 25 : 0;
    $("deliveryFee").textContent = subtotal > 0 ? "₹25" : "₹0";
    $("drawerTotal").textContent = `₹${subtotal + delivery}`;
    const belowMinimum = count > 0 && subtotal < MIN_ORDER_AMOUNT;
    const limitMessage = $("orderLimitMessage");
    if (count === 0) {
      limitMessage.textContent = `Minimum order ₹${MIN_ORDER_AMOUNT}`;
      limitMessage.className = "order-limit-message";
    } else if (belowMinimum) {
      limitMessage.textContent = `Add ₹${MIN_ORDER_AMOUNT - subtotal} more to place your order`;
      limitMessage.className = "order-limit-message warning";
    } else {
      limitMessage.textContent = `Ready to checkout · Up to ${MAX_CART_ITEMS} items per order`;
      limitMessage.className = "order-limit-message ready";
    }
    $("checkoutButton").disabled = count === 0 || belowMinimum;

    if (count === 0) {
      $("cartItems").innerHTML = `<div class="cart-empty"><div><span>🛒</span><p>Your cart is empty</p></div></div>`;
      return;
    }
    $("cartItems").innerHTML = [...cart.values()].map((entry) => `
      <div class="cart-line">
        <div class="cart-line-image">${entry.product.icon}</div>
        <div><h3 class="cart-line-name">${entry.product.name}</h3><strong class="cart-line-price">₹${entry.product.price}</strong></div>
        <div class="quantity-control"><button type="button" data-action="decrease" data-id="${entry.product.id}" aria-label="Remove ${entry.product.name}">−</button><span>${entry.quantity}</span><button type="button" data-action="increase" data-id="${entry.product.id}" aria-label="Add ${entry.product.name}">+</button></div>
      </div>`).join("");
  }

  function openCart() {
    $("cartDrawer").classList.add("open");
    $("drawerOverlay").classList.add("open");
    $("cartDrawer").setAttribute("aria-hidden", "false");
  }

  function closeCart() {
    $("cartDrawer").classList.remove("open");
    $("drawerOverlay").classList.remove("open");
    $("cartDrawer").setAttribute("aria-hidden", "true");
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    $("toast").textContent = message;
    $("toast").classList.add("show");
    toastTimer = setTimeout(() => $("toast").classList.remove("show"), 2200);
  }

  function openLogin() {
    $("loginModal").classList.add("open");
    $("loginModal").setAttribute("aria-hidden", "false");
    setTimeout(() => $("phoneInput").focus(), 100);
  }

  function closeLogin() {
    $("loginModal").classList.remove("open");
    $("loginModal").setAttribute("aria-hidden", "true");
  }

  function openProductDetail(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const quantity = cart.get(productId)?.quantity || 0;
    const control = quantity
      ? `<div class="quantity-control"><button type="button" data-action="decrease" data-id="${product.id}">−</button><span>${quantity}</span><button type="button" data-action="increase" data-id="${product.id}">+</button></div>`
      : `<button class="add-button" type="button" data-action="add" data-id="${product.id}">ADD</button>`;
    $("productDetail").innerHTML = `<div class="product-detail-grid"><div class="product-detail-image">${product.icon}</div><div class="product-detail-content"><span class="category">${product.category}</span><h2 id="productDetailName">${product.name}</h2><p class="size">${product.size}</p><div class="rating">★★★★☆ <span>4.5 · 128 reviews</span></div><p class="detail-description">Fresh, quality-checked and packed securely for quick delivery. Selected from trusted suppliers and handled with care.</p><div class="detail-bottom"><div><span class="price">₹${product.price}</span><span class="old-price">₹${product.oldPrice}</span></div>${control}</div></div></div>`;
    $("productModal").classList.add("open");
    $("productModal").setAttribute("aria-hidden", "false");
  }

  function closeProductDetail() {
    $("productModal").classList.remove("open");
    $("productModal").setAttribute("aria-hidden", "true");
  }

  function openCheckout() {
    const { subtotal } = getCartSummary();
    couponDiscount = couponDiscount > subtotal ? 0 : couponDiscount;
    $("checkoutSubtotal").textContent = `₹${subtotal}`;
    $("checkoutDelivery").textContent = "₹25";
    $("checkoutDiscount").textContent = `−₹${couponDiscount}`;
    $("discountRow").hidden = couponDiscount === 0;
    $("checkoutTotal").textContent = `₹${subtotal + 25 - couponDiscount}`;
    $("checkoutModal").classList.add("open");
    $("checkoutModal").setAttribute("aria-hidden", "false");
  }

  function closeCheckout() {
    $("checkoutModal").classList.remove("open");
    $("checkoutModal").setAttribute("aria-hidden", "true");
  }

  function openAccount(section = "Profile") {
    $("accountTitle").textContent = section;
    $("accountDrawer").classList.add("open");
    $("accountOverlay").classList.add("open");
    $("accountDrawer").setAttribute("aria-hidden", "false");
    renderAccount(section);
  }

  function closeAccount() {
    $("accountDrawer").classList.remove("open");
    $("accountOverlay").classList.remove("open");
    $("accountDrawer").setAttribute("aria-hidden", "true");
  }

  function renderAccount(section) {
    if (section === "Orders") {
      $("accountKicker").textContent = "YOUR ORDERS";
      $("accountContent").innerHTML = orders.map((order) => `<article class="order-card"><div class="order-card-head"><strong>Order #${order.id}</strong><span class="order-status">${order.status}</span></div><div class="order-track">${[1,2,3,4].map((stage) => `<span class="${stage <= order.stage ? "done" : ""}"></span>`).join("")}</div><p>${order.items}</p><p><strong>₹${order.total}</strong> · ${order.eta}</p></article>`).join("");
      return;
    }
    if (section === "Notifications") {
      $("accountKicker").textContent = "UPDATES";
      $("accountContent").innerHTML = `<div class="account-card"><h3>Order update</h3><p>Your active order is arriving soon.</p></div><div class="account-card"><h3>Special offer</h3><p>Use ZAP100 on orders above ₹99.</p></div>`;
      $("notificationDot")?.remove();
      return;
    }
    $("accountKicker").textContent = "YOUR ACCOUNT";
    $("accountContent").innerHTML = `<div class="account-card"><h3>Saved address</h3><p><strong>Home</strong></p><p>Sector 18, Noida, Uttar Pradesh 201301</p></div><div class="account-card"><h3>Payments</h3><p>UPI · Demo payment</p><p>Cards · No saved cards</p></div><div class="account-tabs"><button type="button" data-account-section="Address">🏠 Address</button><button type="button" data-account-section="Payments">💳 Payments</button><button type="button" data-account-section="Support">🎧 Support</button><button type="button" data-account-section="Settings">⚙ Settings</button></div>`;
  }

  $("loginButton").addEventListener("click", openLogin);
  $("closeLogin").addEventListener("click", closeLogin);
  $("loginModal").addEventListener("click", (event) => {
    if (event.target === $("loginModal")) closeLogin();
  });
  $("phoneForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const phone = $("phoneInput").value.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      $("loginError").textContent = "Enter a valid 10-digit Indian mobile number.";
      return;
    }
    $("loginError").textContent = "";
    verifiedPhone = "";
    $("phoneForm").hidden = true;
    $("otpForm").hidden = false;
    $("loginDescription").textContent = `Enter the 4-digit OTP sent to +91 ${phone}`;
    $("otpInput").focus();
  });
  $("otpForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const otp = $("otpInput").value.replace(/\D/g, "");
    if (!/^\d{4}$/.test(otp)) {
      $("otpError").textContent = "Enter a valid 4-digit OTP.";
      return;
    }
    verifiedPhone = $("phoneInput").value.replace(/\D/g, "");
    $("otpError").textContent = "";
    $("loginButton").textContent = `+91 ••••••${verifiedPhone.slice(-4)}`;
    closeLogin();
    showToast("Login successful");
  });
  $("changeNumber").addEventListener("click", () => {
    $("otpForm").hidden = true;
    $("phoneForm").hidden = false;
    $("otpInput").value = "";
    $("otpError").textContent = "";
    $("loginDescription").textContent = "Enter your mobile number to continue.";
    $("phoneInput").focus();
  });

  document.addEventListener("click", (event) => {
    const promoCategory = event.target.closest("[data-category]");
    if (promoCategory) {
      activeCategory = promoCategory.dataset.category;
      $("clearFilter").hidden = false;
      $("productsTitle").textContent = activeCategory;
      renderCategories();
      renderProducts();
      $("categoryTitle").scrollIntoView({ behavior: "smooth" });
      return;
    }
    const productCard = event.target.closest("[data-product]");
    if (productCard && !event.target.closest("[data-action]")) {
      openProductDetail(Number(productCard.dataset.product));
      return;
    }
    const shelfButton = event.target.closest("[data-shelf-category]");
    if (shelfButton) {
      activeCategory = shelfButton.dataset.shelfCategory;
      $("clearFilter").hidden = activeCategory === "All";
      $("productsTitle").textContent = activeCategory === "All" ? "Daily essentials" : "Electronics";
      renderCategories();
      renderProducts();
      $("productsTitle").scrollIntoView({ behavior: "smooth" });
      return;
    }
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const productId = Number(button.dataset.id);
    if (button.dataset.action === "add" || button.dataset.action === "increase") {
      updateCart(productId, 1);
      if (button.dataset.action === "add") showToast("Added to cart");
    } else {
      updateCart(productId, -1);
    }
  });

  $("searchInput").addEventListener("input", () => {
    $("clearFilter").hidden = false;
    renderProducts();
  });
  $("clearFilter").addEventListener("click", () => {
    activeCategory = "All";
    $("searchInput").value = "";
    $("clearFilter").hidden = true;
    $("productsTitle").textContent = "Daily essentials";
    renderCategories();
    renderProducts();
  });
  $("shopNow")?.addEventListener("click", () => $("categoryTitle").scrollIntoView({ behavior: "smooth" }));
  $("cartButton").addEventListener("click", openCart);
  $("mobileCart")?.addEventListener("click", openCart);
  $("mobileHome")?.addEventListener("click", () => { closeAccount(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  $("mobileOrders")?.addEventListener("click", () => openAccount("Orders"));
  $("mobileProfile")?.addEventListener("click", () => openAccount("Profile"));
  $("mobileNotifications")?.addEventListener("click", () => openAccount("Notifications"));
  $("profileButton")?.addEventListener("click", () => openAccount("Profile"));
  $("notificationButton")?.addEventListener("click", () => openAccount("Notifications"));
  $("closeAccount").addEventListener("click", closeAccount);
  $("accountOverlay").addEventListener("click", closeAccount);
  $("closeProduct").addEventListener("click", closeProductDetail);
  $("productModal").addEventListener("click", (event) => { if (event.target === $("productModal")) closeProductDetail(); });
  $("closeCheckout").addEventListener("click", closeCheckout);
  $("checkoutModal").addEventListener("click", (event) => { if (event.target === $("checkoutModal")) closeCheckout(); });
  $("applyCoupon").addEventListener("click", () => {
    const code = $("couponInput").value.trim().toUpperCase();
    const { subtotal } = getCartSummary();
    if (code === "ZAP100" && subtotal >= 99) {
      couponDiscount = 100;
      $("couponMessage").textContent = "ZAP100 applied: ₹100 saved";
      openCheckout();
    } else {
      couponDiscount = 0;
      $("couponMessage").textContent = code ? "Coupon is invalid or minimum order is not met" : "Enter a coupon code";
    }
  });
  $("changeAddress").addEventListener("click", () => showToast("Demo address editor ready"));
  $("closeCart").addEventListener("click", closeCart);
  $("drawerOverlay").addEventListener("click", closeCart);
  $("checkoutButton").addEventListener("click", () => {
    if (!verifiedPhone) {
      openLogin();
      showToast("Please login to continue");
      return;
    }
    closeCart();
    openCheckout();
  });
  $("placeOrder").addEventListener("click", () => {
    const { subtotal } = getCartSummary();
    if (subtotal < MIN_ORDER_AMOUNT) return;
    const payment = document.querySelector('input[name="payment"]:checked')?.value || "UPI";
    const newOrder = {
      id: "ZC" + String(Date.now()).slice(-5),
      status: "Active",
      stage: 1,
      total: subtotal + 25 - couponDiscount,
      items: [...cart.values()].map((entry) => entry.product.name).join(", "),
      eta: `Arriving in 10 minutes · ${payment}`
    };
    orders.unshift(newOrder);
    cart.clear();
    couponDiscount = 0;
    renderCart();
    renderProducts();
    closeCheckout();
    showToast("Order placed successfully");
    openAccount("Orders");
  });
  document.addEventListener("click", (event) => {
    const accountButton = event.target.closest("[data-account-section]");
    if (!accountButton) return;
    const section = accountButton.dataset.accountSection;
    $("accountTitle").textContent = section;
    $("accountContent").innerHTML = `<div class="account-card"><h3>${section}</h3><p>${section === "Address" ? "Home · Sector 18, Noida" : section === "Payments" ? "UPI, Cards and Cash on Delivery" : section === "Support" ? "Demo support available 24×7" : "Account preferences"}</p></div>`;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
      closeLogin();
      closeProductDetail();
      closeCheckout();
      closeAccount();
    }
  });

  renderCategories();
  renderProducts();
  renderCart();
})();
