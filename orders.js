const adminGate = document.getElementById("adminGate");
const adminPinInput = document.getElementById("adminPinInput");
const adminPinBtn = document.getElementById("adminPinBtn");
const adminPinHint = document.getElementById("adminPinHint");
const ordersLangToggle = document.getElementById("ordersLangToggle");
const summaryCards = document.getElementById("summaryCards");
const ordersSummary = document.getElementById("ordersSummary");
const ordersTable = document.getElementById("ordersTable");
const exportOrdersBtn = document.getElementById("exportOrders");
const clearOrdersBtn = document.getElementById("clearOrders");
const brandLogo = document.getElementById("brandLogo");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const backToTopBtn = document.getElementById("backToTop");

let dashLang = localStorage.getItem("dodyDashLang") || "ar";

const i18n = {
  ar: {
    adminTitle: "دخول لوحة التحكم",
    adminDesc: "أدخل الرمز السري للوصول إلى لوحة الإدارة.",
    adminLogin: "دخول",
    adminHint: "اسأل المسؤول عن الرمز.",
    adminPinError: "الرمز غير صحيح.",
    adminPinPlaceholder: "••••",
    dashTitle: "لوحة تحكم Dody Store",
    dashSubtitle: "إدارة المحتوى والطلبات بسهولة",
    navOverview: "نظرة عامة",
    navGeneral: "الإعدادات العامة",
    navHero: "الهيرو والباقات",
    navSections: "عناوين الأقسام",
    navCategories: "أنواع المنتجات",
    navCollections: "الباقات الجاهزة",
    navProducts: "المنتجات",
    navIngredients: "المكونات",
    navTestimonials: "آراء العملاء",
    navAbout: "عن المتجر",
    navContactCta: "تواصل واتساب",
    navOrders: "الطلبات",
    navToggle: "القائمة",
    ordersPageTitle: "إدارة الطلبات",
    ordersPageSubtitle: "تابعي الحالات، الشحن، والتفاصيل بسرعة.",
    exportExcel: "تصدير Excel",
    backToDashboard: "رجوع للوحة",
    backToSite: "رجوع للموقع",
    ordersTitle: "الطلبات",
    clearOrders: "مسح كل الطلبات",
    summaryOrders: "إجمالي الطلبات",
    summaryNew: "طلبات جديدة",
    summaryProcessing: "قيد التنفيذ",
    summaryRevenue: "إجمالي المبيعات",
    summaryCancelled: "ملغاة",
    ordersSummary: "عدد الطلبات",
    ordersSummaryNew: "جديدة",
    ordersSummaryCancelled: "ملغاة",
    ordersHeaderCustomer: "العميل",
    ordersHeaderId: "رقم الطلب",
    ordersHeaderDate: "التاريخ",
    ordersHeaderTotals: "المدفوعات",
    ordersHeaderStatus: "الحالة",
    ordersHeaderActions: "الإجراءات",
    ordersHeaderShipping: "الشحن",
    ordersHeaderItems: "المنتجات",
    ordersTotalLabel: "الإجمالي",
    ordersDeliveryLabel: "التوصيل",
    ordersNetLabel: "الصافي",
    statusNew: "جديد",
    statusProcessing: "قيد التنفيذ",
    statusDone: "تم التسليم",
    statusCancelled: "ملغي",
    shippingPending: "لم يتم الشحن",
    shippingShipped: "تم الشحن",
    viewDetails: "تفاصيل",
    whatsappAction: "واتساب",
    removeOrder: "حذف",
    confirmRemoveOrder: "هل تريد حذف الطلب؟",
    noOrders: "لا يوجد طلبات حتى الآن.",
    confirmClearOrders: "هل تريد مسح كل الطلبات؟",
    exportEmpty: "لا يوجد بيانات لتصديرها."
  },
  en: {
    adminTitle: "Admin Access",
    adminDesc: "Enter the PIN to access the dashboard.",
    adminLogin: "Login",
    adminHint: "Ask the owner for the PIN.",
    adminPinError: "Incorrect PIN.",
    adminPinPlaceholder: "••••",
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
const formatCurrency = (value) => `${value} ${dashLang === "ar" ? "جنيه" : "EGP"}`;

const loadStoreData = () => {
  const raw = localStorage.getItem("dodyStoreData");
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const loadOrders = () => {
  const raw = localStorage.getItem("dodyOrders");
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem("dodyOrders", JSON.stringify(orders));
};

const normalizeOrder = (order) => ({
  ...order,
  status: order.status || "new",
  shippingStatus: order.shippingStatus || "pending",
  deliveryFee: Number(order.deliveryFee) || 0
});

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

const checkAuth = () => {
  const authed = localStorage.getItem("dodyAdminAuth") === "true";
  showGate(!authed);
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
    ordersLangToggle.textContent = dashLang === "ar" ? "English" : "عربي";
  }

  document.title = `${t("ordersPageTitle")} | Dody Store`;
  const favicon = document.getElementById("siteFavicon");
  if (favicon) {
    const stored = loadStoreData();
    favicon.href = stored?.brand?.favicon || stored?.brand?.logo || "assets/logo.svg";
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
      ? `مرحباً ${order.name}، بنأكد طلبك رقم ${order.id}.`
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
  const newCount = orders.filter((order) => order.status === "new").length;
  const cancelledCount = orders.filter((order) => order.status === "cancelled").length;

  ordersSummary.textContent = `${t("ordersSummary")}: ${orders.length} | ${t(
    "ordersSummaryNew"
  )}: ${newCount} | ${t("ordersSummaryCancelled")}: ${cancelledCount}`;

  ordersTable.innerHTML = "";
  if (orders.length === 0) {
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

  orders.forEach((order) => {
    ordersTable.insertAdjacentHTML("beforeend", buildOrdersRow(order));
  });
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

  if (adminPinBtn) {
    adminPinBtn.addEventListener("click", () => {
      const pin = adminPinInput.value.trim();
      const stored = loadStoreData();
      const realPin = stored?.admin?.pin || "2026";
      if (pin === realPin) {
        localStorage.setItem("dodyAdminAuth", "true");
        adminPinInput.value = "";
        adminPinHint.dataset.i18n = "adminHint";
        adminPinHint.textContent = "";
        showGate(false);
      } else {
        adminPinHint.dataset.i18n = "adminPinError";
        adminPinHint.textContent = t("adminPinError");
      }
    });
  }

  if (exportOrdersBtn) {
    exportOrdersBtn.addEventListener("click", exportOrdersToExcel);
  }

  if (clearOrdersBtn) {
    clearOrdersBtn.addEventListener("click", () => {
      if (confirm(t("confirmClearOrders"))) {
        localStorage.removeItem("dodyOrders");
        renderOrders();
        renderSummary();
      }
    });
  }

  if (ordersTable) {
    ordersTable.addEventListener("change", (event) => {
      const target = event.target;
      if (!target.matches("select[data-order-id]")) {
        return;
      }
      const orders = loadOrders().map(normalizeOrder);
      const order = orders.find((item) => item.id === target.dataset.orderId);
      if (!order) {
        return;
      }
      if (target.dataset.field === "shipping") {
        order.shippingStatus = target.value;
      } else {
        order.status = target.value;
      }
      saveOrders(orders);
      renderOrders();
      renderSummary();
    });

    ordersTable.addEventListener("click", (event) => {
      const removeBtn = event.target.closest("[data-action='remove-order']");
      if (removeBtn) {
        if (!confirm(t("confirmRemoveOrder"))) {
          return;
        }
        const orderId = removeBtn.dataset.orderId;
        const orders = loadOrders().map(normalizeOrder);
        const updated = orders.filter((order) => order.id !== orderId);
        saveOrders(updated);
        renderOrders();
        renderSummary();
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

const init = () => {
  checkAuth();
  const stored = loadStoreData();
  if (brandLogo && stored?.brand?.logo) {
    brandLogo.src = stored.brand.logo;
  }
  applyLang();
  bindEvents();
};

init();
