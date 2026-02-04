const adminGate = document.getElementById("adminGate");
const adminEmailInput = document.getElementById("adminEmailInput");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminLoginHint = document.getElementById("adminLoginHint");
const ordersLangToggle = document.getElementById("ordersLangToggle");
const summaryCards = document.getElementById("summaryCards");
const ordersSummary = document.getElementById("ordersSummary");
const ordersTable = document.getElementById("ordersTable");
const ordersStatusFilter = document.getElementById("ordersStatusFilter");
const ordersSearchInput = document.getElementById("ordersSearchInput");
const exportOrdersBtn = document.getElementById("exportOrders");
const clearOrdersBtn = document.getElementById("clearOrders");
const brandLogo = document.getElementById("brandLogo");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const backToTopBtn = document.getElementById("backToTop");

let dashLang = localStorage.getItem("dodyDashLang") || "ar";

const i18n = {
  ar: {
    adminTitle: "Ø¯Ø®ÙˆÙ„ Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…",
    adminDesc: "سجّل الدخول بحساب الإدارة",
    adminLogin: "Ø¯Ø®ÙˆÙ„",
    adminHint: "تأكد من البريد وكلمة المرور",
    adminPinError: "Ø§Ù„Ø±Ù…Ø² ØºÙŠØ± ØµØ­ÙŠØ­.",
    adminPinPlaceholder: "â€¢â€¢â€¢â€¢",
    adminLoginError: "بيانات الدخول غير صحيحة.",
    adminEmailPlaceholder: "البريد الإلكتروني",
    adminPasswordPlaceholder: "كلمة المرور",
    dashTitle: "Ù„ÙˆØ­Ø© ØªØ­ÙƒÙ… Dody Store",
    dashSubtitle: "Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø­ØªÙˆÙ‰ ÙˆØ§Ù„Ø·Ù„Ø¨Ø§Øª Ø¨Ø³Ù‡ÙˆÙ„Ø©",
    navOverview: "Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©",
    navGeneral: "Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø©",
    navHero: "Ø§Ù„Ù‡ÙŠØ±Ùˆ ÙˆØ§Ù„Ø¨Ø§Ù‚Ø§Øª",
    navSections: "Ø¹Ù†Ø§ÙˆÙŠÙ† Ø§Ù„Ø£Ù‚Ø³Ø§Ù…",
    navCategories: "Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª",
    navCollections: "Ø§Ù„Ø¨Ø§Ù‚Ø§Øª Ø§Ù„Ø¬Ø§Ù‡Ø²Ø©",
    navProducts: "Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª",
    navIngredients: "Ø§Ù„Ù…ÙƒÙˆÙ†Ø§Øª",
    navTestimonials: "Ø¢Ø±Ø§Ø¡ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡",
    navAbout: "Ø¹Ù† Ø§Ù„Ù…ØªØ¬Ø±",
    navContactCta: "ØªÙˆØ§ØµÙ„ ÙˆØ§ØªØ³Ø§Ø¨",
    navOrders: "Ø§Ù„Ø·Ù„Ø¨Ø§Øª",
    navToggle: "Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©",
    ordersPageTitle: "Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø·Ù„Ø¨Ø§Øª",
    ordersPageSubtitle: "ØªØ§Ø¨Ø¹ÙŠ Ø§Ù„Ø­Ø§Ù„Ø§ØªØŒ Ø§Ù„Ø´Ø­Ù†ØŒ ÙˆØ§Ù„ØªÙØ§ØµÙŠÙ„ Ø¨Ø³Ø±Ø¹Ø©.",
    exportExcel: "ØªØµØ¯ÙŠØ± Excel",
    backToDashboard: "Ø±Ø¬ÙˆØ¹ Ù„Ù„ÙˆØ­Ø©",
    backToSite: "Ø±Ø¬ÙˆØ¹ Ù„Ù„Ù…ÙˆÙ‚Ø¹",
    ordersTitle: "Ø§Ù„Ø·Ù„Ø¨Ø§Øª",
    clearOrders: "Ù…Ø³Ø­ ÙƒÙ„ Ø§Ù„Ø·Ù„Ø¨Ø§Øª",
    summaryOrders: "Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø·Ù„Ø¨Ø§Øª",
    summaryNew: "Ø·Ù„Ø¨Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©",
    summaryProcessing: "Ù‚ÙŠØ¯ Ø§Ù„ØªÙ†ÙÙŠØ°",
    summaryRevenue: "Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª",
    summaryCancelled: "Ù…Ù„ØºØ§Ø©",
    ordersSummary: "Ø¹Ø¯Ø¯ Ø§Ù„Ø·Ù„Ø¨Ø§Øª",
    ordersSummaryNew: "Ø¬Ø¯ÙŠØ¯Ø©",
    ordersSummaryCancelled: "Ù…Ù„ØºØ§Ø©",
    ordersSummaryFiltered: "Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶",
    ordersFilterLabel: "ÙÙ„ØªØ±Ø© Ø§Ù„Ø·Ù„Ø¨Ø§Øª",
    ordersSearchLabel: "Ø¨Ø­Ø«",
    ordersSearchPlaceholder: "Ø§Ø³Ù… / Ø±Ù‚Ù… / Ù‡Ø§ØªÙ",
    filterAll: "Ø§Ù„ÙƒÙ„",
    ordersHeaderCustomer: "Ø§Ù„Ø¹Ù…ÙŠÙ„",
    ordersHeaderId: "Ø±Ù‚Ù… Ø§Ù„Ø·Ù„Ø¨",
    ordersHeaderDate: "Ø§Ù„ØªØ§Ø±ÙŠØ®",
    ordersHeaderTotals: "Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø§Øª",
    ordersHeaderStatus: "Ø§Ù„Ø­Ø§Ù„Ø©",
    ordersHeaderActions: "Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª",
    ordersHeaderShipping: "Ø§Ù„Ø´Ø­Ù†",
    ordersHeaderItems: "Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª",
    ordersTotalLabel: "Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ",
    ordersDeliveryLabel: "Ø§Ù„ØªÙˆØµÙŠÙ„",
    ordersNetLabel: "Ø§Ù„ØµØ§ÙÙŠ",
    statusNew: "Ø¬Ø¯ÙŠØ¯",
    statusProcessing: "Ù‚ÙŠØ¯ Ø§Ù„ØªÙ†ÙÙŠØ°",
    statusDone: "ØªÙ… Ø§Ù„ØªØ³Ù„ÙŠÙ…",
    statusCancelled: "Ù…Ù„ØºÙŠ",
    shippingPending: "Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø´Ø­Ù†",
    shippingShipped: "ØªÙ… Ø§Ù„Ø´Ø­Ù†",
    viewDetails: "ØªÙØ§ØµÙŠÙ„",
    whatsappAction: "ÙˆØ§ØªØ³Ø§Ø¨",
    removeOrder: "Ø­Ø°Ù",
    confirmRemoveOrder: "Ù‡Ù„ ØªØ±ÙŠØ¯ Ø­Ø°Ù Ø§Ù„Ø·Ù„Ø¨ØŸ",
    noOrders: "Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø·Ù„Ø¨Ø§Øª Ø­ØªÙ‰ Ø§Ù„Ø¢Ù†.",
    confirmClearOrders: "Ù‡Ù„ ØªØ±ÙŠØ¯ Ù…Ø³Ø­ ÙƒÙ„ Ø§Ù„Ø·Ù„Ø¨Ø§ØªØŸ",
    exportEmpty: "Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ù„ØªØµØ¯ÙŠØ±Ù‡Ø§."
  },
  en: {
    adminTitle: "Admin Access",
    adminDesc: "Sign in with your admin account.",
    adminLogin: "Login",
    adminHint: "Check your email and password.",
    adminPinError: "Incorrect PIN.",
    adminPinPlaceholder: "â€¢â€¢â€¢â€¢",
    adminLoginError: "Incorrect login details.",
    adminEmailPlaceholder: "Email address",
    adminPasswordPlaceholder: "Password",
    dashTitle: "Dody Store Dashboard",
    dashSubtitle: "Manage content and orders with ease",
    navOverview: "Overview",
    navGeneral: "General settings",
    navHero: "Hero & bundles",
    navSections: "Section headings",
    navCategories: "Product types",
    navCollections: "Bundles",
    navProducts: "Products",
    navIngredients: "Ingredients",
    navTestimonials: "Testimonials",
    navAbout: "About",
    navContactCta: "WhatsApp CTA",
    navOrders: "Orders",
    navToggle: "Menu",
    ordersPageTitle: "Orders management",
    ordersPageSubtitle: "Track status, shipping, and details quickly.",
    exportExcel: "Export Excel",
    backToDashboard: "Back to dashboard",
    backToSite: "Back to site",
    ordersTitle: "Orders",
    clearOrders: "Clear all orders",
    summaryOrders: "Total orders",
    summaryNew: "New orders",
    summaryProcessing: "Processing",
    summaryRevenue: "Total revenue",
    summaryCancelled: "Cancelled",
    ordersSummary: "Orders",
    ordersSummaryNew: "New",
    ordersSummaryCancelled: "Cancelled",
    ordersSummaryFiltered: "Shown",
    ordersFilterLabel: "Filter orders",
    ordersSearchLabel: "Search",
    ordersSearchPlaceholder: "Name / ID / phone",
    filterAll: "All",
    ordersHeaderCustomer: "Customer",
    ordersHeaderId: "Order ID",
    ordersHeaderDate: "Date",
    ordersHeaderTotals: "Payments",
    ordersHeaderStatus: "Status",
    ordersHeaderActions: "Actions",
    ordersHeaderShipping: "Shipping",
    ordersHeaderItems: "Items",
    ordersTotalLabel: "Total",
    ordersDeliveryLabel: "Delivery",
    ordersNetLabel: "Net",
    statusNew: "New",
    statusProcessing: "Processing",
    statusDone: "Delivered",
    statusCancelled: "Cancelled",
    shippingPending: "Not shipped",
    shippingShipped: "Shipped",
    viewDetails: "Details",
    whatsappAction: "WhatsApp",
    removeOrder: "Remove",
    confirmRemoveOrder: "Remove this order?",
    noOrders: "No orders yet.",
    confirmClearOrders: "Clear all orders?",
    exportEmpty: "No data to export."
  }
};

const t = (key) => i18n[dashLang]?.[key] || key;
const getLocale = () => (dashLang === "ar" ? "ar-EG" : "en-US");
const formatCurrency = (value) => `${value} ${dashLang === "ar" ? "Ø¬Ù†ÙŠÙ‡" : "EGP"}`;

const defaultData = window.DODY_DEFAULT_DATA || {};
const deepClone = (data) => JSON.parse(JSON.stringify(data));

const mergeDeep = (target, source) => {
  if (!source) {
    return target;
  }
  Object.keys(source).forEach((key) => {
    const value = source[key];
    if (Array.isArray(value)) {
      target[key] = value;
    } else if (value && typeof value === "object") {
      target[key] = mergeDeep(target[key] || {}, value);
    } else {
      target[key] = value;
    }
  });
  return target;
};

const loadStoreData = async () => {
  const apiData = await window.DodyApi?.fetchStoreData?.();
  if (apiData && typeof apiData === "object") {
    try {
      localStorage.setItem("dodyStoreData", JSON.stringify(apiData));
    } catch (error) {
      // ignore storage errors
    }
    return mergeDeep(deepClone(defaultData), apiData);
  }
  const raw = localStorage.getItem("dodyStoreData");
  if (!raw) {
    return deepClone(defaultData);
  }
  try {
    const parsed = JSON.parse(raw);
    return mergeDeep(deepClone(defaultData), parsed);
  } catch (error) {
    return deepClone(defaultData);
  }
};

let storeData = deepClone(defaultData);
let ordersCache = [];
let ordersPoll = null;
let orderStatusFilter = "all";
let orderSearchTerm = "";

const loadOrders = () => ordersCache;
const setOrders = (orders) => {
  ordersCache = Array.isArray(orders) ? orders : [];
};
const updateOrderCache = (order) => {
  if (!order || !order.id) {
    return;
  }
  const index = ordersCache.findIndex((item) => item.id === order.id);
  if (index === -1) {
    ordersCache.unshift(order);
  } else {
    ordersCache[index] = order;
  }
};

const normalizeOrder = (order) => ({
  ...order,
  status: order.status || "new",
  shippingStatus: order.shippingStatus || "pending",
  deliveryFee: Number(order.deliveryFee) || 0
});

const applyOrderFilters = (orders) => {
  let filtered = orders;
  if (orderStatusFilter && orderStatusFilter !== "all") {
    filtered = filtered.filter((order) => order.status === orderStatusFilter);
  }
  if (orderSearchTerm) {
    const term = orderSearchTerm.toLowerCase();
    filtered = filtered.filter((order) => {
      const haystack = [
        order.id,
        order.name,
        order.phone,
        order.address
      ]
        .map((value) => String(value || "").toLowerCase())
        .join(" ");
      return haystack.includes(term);
    });
  }
  return filtered;
};

const formatPhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) {
    return `20${digits.slice(1)}`;
  }
  return digits;
};

const showGate = (show) => {
  if (!adminGate) {
    return;
  }
  adminGate.classList.toggle("show", show);
  adminGate.setAttribute("aria-hidden", (!show).toString());
};

const checkAuth = async () => {
  const authed = await window.DodyApi?.checkAuth?.();
  showGate(!authed);
  return authed;
};

const applyLang = () => {
  const root = document.documentElement;
  root.lang = dashLang === "ar" ? "ar" : "en";
  root.dir = dashLang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("ltr", dashLang === "en");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (i18n[dashLang]?.[key]) {
      element.textContent = t(key);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (i18n[dashLang]?.[key]) {
      element.placeholder = t(key);
    }
  });

  if (ordersLangToggle) {
    ordersLangToggle.textContent = dashLang === "ar" ? "English" : "Ø¹Ø±Ø¨ÙŠ";
  }

  document.title = `${t("ordersPageTitle")} | Dody Store`;
  const favicon = document.getElementById("siteFavicon");
  if (favicon) {
    favicon.href = storeData?.brand?.favicon || storeData?.brand?.logo || "assets/logo.svg";
  }
  renderSummary();
  renderOrders();
};

const renderSummary = () => {
  if (!summaryCards) {
    return;
  }
  const orders = loadOrders().map(normalizeOrder);
  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + (order.total || 0), 0);
  const newOrders = orders.filter((order) => order.status === "new").length;
  const processingOrders = orders.filter((order) => order.status === "processing").length;
  const cancelledOrders = orders.filter((order) => order.status === "cancelled").length;

  summaryCards.innerHTML = `
    <div class="summary-card">
      <h4>${t("summaryOrders")}</h4>
      <span>${orders.length}</span>
    </div>
    <div class="summary-card">
      <h4>${t("summaryNew")}</h4>
      <span>${newOrders}</span>
    </div>
    <div class="summary-card">
      <h4>${t("summaryProcessing")}</h4>
      <span>${processingOrders}</span>
    </div>
    <div class="summary-card">
      <h4>${t("summaryRevenue")}</h4>
      <span>${formatCurrency(totalRevenue)}</span>
    </div>
    <div class="summary-card">
      <h4>${t("summaryCancelled")}</h4>
      <span>${cancelledOrders}</span>
    </div>
  `;
};

const buildOrdersRow = (order) => {
  const date = order.date ? new Date(order.date).toLocaleString(getLocale()) : "-";
  const deliveryFee = Number(order.deliveryFee) || 0;
  const total = Number(order.total) || 0;
  const net = Math.max(total - deliveryFee, 0);

  const waMessage =
    dashLang === "ar"
      ? `Ù…Ø±Ø­Ø¨Ø§Ù‹ ${order.name}ØŒ Ø¨Ù†Ø£ÙƒØ¯ Ø·Ù„Ø¨Ùƒ Ø±Ù‚Ù… ${order.id}.`
      : `Hi ${order.name}, we're confirming your order #${order.id}.`;
  const waLink = `https://wa.me/${formatPhone(order.phone)}?text=${encodeURIComponent(
    waMessage
  )}`;
  const detailsLink = `order-details.html?id=${encodeURIComponent(order.id)}`;

  return `
    <div class="table-row" data-details="${order.id}">
      <div>
        <strong>${order.name || ""}</strong><br />
        <span>${order.phone || ""}</span>
      </div>
      <div><span class="muted">${order.id || ""}</span></div>
      <div>${date}</div>
      <div class="order-metrics">
        <span>${t("ordersTotalLabel")}: <strong>${formatCurrency(total)}</strong></span>
        <span>${t("ordersDeliveryLabel")}: ${formatCurrency(deliveryFee)}</span>
        <span class="net">${t("ordersNetLabel")}: ${formatCurrency(net)}</span>
      </div>
      <div class="order-status-stack">
        <select data-order-id="${order.id}" data-field="status">
          <option value="new" ${order.status === "new" ? "selected" : ""}>${t(
            "statusNew"
          )}</option>
          <option value="processing" ${
            order.status === "processing" ? "selected" : ""
          }>${t("statusProcessing")}</option>
          <option value="done" ${order.status === "done" ? "selected" : ""}>${t(
            "statusDone"
          )}</option>
          <option value="cancelled" ${
            order.status === "cancelled" ? "selected" : ""
          }>${t("statusCancelled")}</option>
        </select>
        <select data-order-id="${order.id}" data-field="shipping">
          <option value="pending" ${
            order.shippingStatus === "pending" ? "selected" : ""
          }>${t("shippingPending")}</option>
          <option value="shipped" ${
            order.shippingStatus === "shipped" ? "selected" : ""
          }>${t("shippingShipped")}</option>
        </select>
      </div>
      <div class="order-tools">
        <a class="ghost" href="${detailsLink}">${t("viewDetails")}</a>
        <a class="whatsapp-btn" href="${waLink}" target="_blank" rel="noreferrer">${t(
          "whatsappAction"
        )}</a>
        <button class="ghost" type="button" data-action="remove-order" data-order-id="${order.id}">
          ${t("removeOrder")}
        </button>
      </div>
    </div>
  `;
};

const renderOrders = () => {
  if (!ordersSummary || !ordersTable) {
    return;
  }
  const rawOrders = loadOrders();
  const orders = rawOrders.map(normalizeOrder);
  const filteredOrders = applyOrderFilters(orders);
  const newCount = orders.filter((order) => order.status === "new").length;
  const cancelledCount = orders.filter((order) => order.status === "cancelled").length;

  ordersSummary.textContent = `${t("ordersSummary")}: ${orders.length} | ${t(
    "ordersSummaryNew"
  )}: ${newCount} | ${t("ordersSummaryCancelled")}: ${cancelledCount}`;
  if (orders.length !== filteredOrders.length) {
    ordersSummary.textContent += ` | ${t("ordersSummaryFiltered")}: ${filteredOrders.length}`;
  }

  ordersTable.innerHTML = "";
  if (filteredOrders.length === 0) {
    ordersTable.innerHTML = `<div class="table-row">${t("noOrders")}</div>`;
    return;
  }

  ordersTable.insertAdjacentHTML(
    "beforeend",
    `
      <div class="table-row header">
        <div>${t("ordersHeaderCustomer")}</div>
        <div>${t("ordersHeaderId")}</div>
        <div>${t("ordersHeaderDate")}</div>
        <div>${t("ordersHeaderTotals")}</div>
        <div>${t("ordersHeaderStatus")}</div>
        <div>${t("ordersHeaderActions")}</div>
      </div>
    `
  );

  filteredOrders.forEach((order) => {
    ordersTable.insertAdjacentHTML("beforeend", buildOrdersRow(order));
  });
};

const refreshOrders = async () => {
  const orders = await window.DodyApi?.fetchOrders?.();
  if (Array.isArray(orders)) {
    setOrders(orders);
  } else {
    setOrders([]);
  }
  renderSummary();
  renderOrders();
};

const startOrdersPolling = () => {
  if (ordersPoll) {
    clearInterval(ordersPoll);
  }
  ordersPoll = setInterval(() => {
    refreshOrders();
  }, 15000);
};

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return map[char];
  });

const exportOrdersToExcel = () => {
  const orders = loadOrders().map(normalizeOrder);
  if (orders.length === 0) {
    alert(t("exportEmpty"));
    return;
  }

  const headers = [
    t("ordersHeaderDate"),
    t("ordersHeaderId"),
    t("ordersHeaderCustomer"),
    t("ordersTotalLabel"),
    t("ordersDeliveryLabel"),
    t("ordersNetLabel"),
    t("ordersHeaderStatus"),
    t("ordersHeaderShipping"),
    t("ordersHeaderItems")
  ];

  const rows = orders.map((order) => {
    const total = Number(order.total) || 0;
    const deliveryFee = Number(order.deliveryFee) || 0;
    const net = Math.max(total - deliveryFee, 0);
    const items = (order.items || [])
      .map((item) => {
        const name =
          dashLang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr;
        return `${name} x${item.qty}`;
      })
      .join(" | ");

    const statusLabel =
      order.status === "processing"
        ? t("statusProcessing")
        : order.status === "done"
        ? t("statusDone")
        : order.status === "cancelled"
        ? t("statusCancelled")
        : t("statusNew");

    const shippingLabel =
      order.shippingStatus === "shipped" ? t("shippingShipped") : t("shippingPending");

    return [
      order.date ? new Date(order.date).toLocaleString(getLocale()) : "-",
      order.id || "",
      `${order.name || ""} (${order.phone || ""})`,
      formatCurrency(total),
      formatCurrency(deliveryFee),
      formatCurrency(net),
      statusLabel,
      shippingLabel,
      items
    ];
  });

  const tableRows = [headers, ...rows]
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`
    )
    .join("");

  const html = `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table>${tableRows}</table>
      </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dody-orders.xls";
  link.click();
  URL.revokeObjectURL(url);
};

const bindEvents = () => {
  if (ordersLangToggle) {
    ordersLangToggle.addEventListener("click", () => {
      dashLang = dashLang === "ar" ? "en" : "ar";
      localStorage.setItem("dodyDashLang", dashLang);
      applyLang();
    });
  }

  if (ordersStatusFilter) {
    ordersStatusFilter.addEventListener("change", () => {
      orderStatusFilter = ordersStatusFilter.value || "all";
      renderOrders();
    });
  }

  if (ordersSearchInput) {
    ordersSearchInput.addEventListener("input", () => {
      orderSearchTerm = ordersSearchInput.value.trim();
      renderOrders();
    });
  }

  if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", async () => {
      const email = adminEmailInput?.value.trim() || "";
      const password = adminPasswordInput?.value.trim() || "";
      const ok = await window.DodyApi?.login?.(email, password);
      if (ok) {
        if (adminEmailInput) adminEmailInput.value = "";
        if (adminPasswordInput) adminPasswordInput.value = "";
        adminLoginHint.dataset.i18n = "adminHint";
        adminLoginHint.textContent = "";
        showGate(false);
        await refreshOrders();
        startOrdersPolling();
      } else {
        adminLoginHint.dataset.i18n = "adminLoginError";
        adminLoginHint.textContent = t("adminLoginError");
      }
    });
  }

  if (exportOrdersBtn) {
    exportOrdersBtn.addEventListener("click", exportOrdersToExcel);
  }

  if (clearOrdersBtn) {
    clearOrdersBtn.addEventListener("click", async () => {
      if (!confirm(t("confirmClearOrders"))) {
        return;
      }
      const ok = await window.DodyApi?.clearOrders?.();
      if (ok) {
        setOrders([]);
        renderOrders();
        renderSummary();
      }
    });
  }

  if (ordersTable) {
    ordersTable.addEventListener("change", async (event) => {
      const target = event.target;
      if (!target.matches("select[data-order-id]")) {
        return;
      }
      const orderId = target.dataset.orderId;
      const patch =
        target.dataset.field === "shipping"
          ? { shippingStatus: target.value }
          : { status: target.value };
      const updated = await window.DodyApi?.updateOrder?.(orderId, patch);
      if (updated) {
        updateOrderCache(updated);
        renderOrders();
        renderSummary();
      }
    });

    ordersTable.addEventListener("click", async (event) => {
      const removeBtn = event.target.closest("[data-action='remove-order']");
      if (removeBtn) {
        if (!confirm(t("confirmRemoveOrder"))) {
          return;
        }
        const orderId = removeBtn.dataset.orderId;
        const ok = await window.DodyApi?.deleteOrder?.(orderId);
        if (ok) {
          setOrders(loadOrders().filter((order) => order.id !== orderId));
          renderOrders();
          renderSummary();
        }
        return;
      }
      const row = event.target.closest(".table-row[data-details]");
      if (!row) {
        return;
      }
      if (event.target.closest("a, button, select")) {
        return;
      }
      const orderId = row.dataset.details;
      if (orderId) {
        window.location.href = `order-details.html?id=${encodeURIComponent(orderId)}`;
      }
    });
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
    });
  }

  if (backToTopBtn) {
    const toggleBackToTop = () => {
      backToTopBtn.classList.toggle("show", window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop();
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll(".dash-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
    });
  });
};

const init = async () => {
  const authed = await checkAuth();
  storeData = await loadStoreData();
  if (brandLogo && storeData?.brand?.logo) {
    brandLogo.src = storeData.brand.logo;
  }
  if (authed) {
    await refreshOrders();
    startOrdersPolling();
  }
  applyLang();
  bindEvents();
};

init();
