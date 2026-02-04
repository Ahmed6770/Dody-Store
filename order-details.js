const detailsLangToggle = document.getElementById("detailsLangToggle");
const orderCard = document.getElementById("orderCard");
const orderIdEl = document.getElementById("orderId");
const orderDateEl = document.getElementById("orderDate");
const orderCustomerEl = document.getElementById("orderCustomer");
const orderPhoneEl = document.getElementById("orderPhone");
const orderAddressEl = document.getElementById("orderAddress");
const orderNotesEl = document.getElementById("orderNotes");
const orderPaymentEl = document.getElementById("orderPayment");
const orderTotalEl = document.getElementById("orderTotal");
const orderItemsEl = document.getElementById("orderItems");
const orderStatusEl = document.getElementById("orderStatus");
const shippingStatusEl = document.getElementById("shippingStatus");
const deliveryFeeInput = document.getElementById("deliveryFeeInput");
const orderNetEl = document.getElementById("orderNet");
const orderWhatsappEl = document.getElementById("orderWhatsapp");
const brandLogo = document.getElementById("brandLogo");
const removeOrderBtn = document.getElementById("removeOrderBtn");
const backToTopBtn = document.getElementById("backToTop");

const i18n = {
  ar: {
    pageTitle: "تفاصيل الطلب",
    pageSubtitle: "متابعة وإدارة الطلب",
    backToDashboard: "رجوع للطلبات",
    orderInfoTitle: "تفاصيل الطلب",
    customerLabel: "العميل",
    phoneLabel: "الهاتف",
    addressLabel: "العنوان",
    notesLabel: "ملاحظات",
    paymentLabel: "طريقة الدفع",
    paymentValue: "كاش عند الاستلام",
    totalLabel: "الإجمالي",
    itemsTitle: "المنتجات المطلوبة",
    statusNew: "جديد",
    statusProcessing: "قيد التنفيذ",
    statusDone: "تم التسليم",
    statusCancelled: "ملغي",
    shippingPending: "لم يتم الشحن",
    shippingShipped: "تم الشحن",
    whatsappAction: "واتساب",
    notesEmpty: "لا يوجد",
    deliveryFeeLabel: "سعر التوصيل",
    netLabel: "صافي الربح",
    removeOrder: "حذف الطلب",
    confirmRemoveOrder: "هل تريد حذف الطلب؟"
  },
  en: {
    pageTitle: "Order details",
    pageSubtitle: "Track and manage the order",
    backToDashboard: "Back to orders",
    orderInfoTitle: "Order details",
    customerLabel: "Customer",
    phoneLabel: "Phone",
    addressLabel: "Address",
    notesLabel: "Notes",
    paymentLabel: "Payment",
    paymentValue: "Cash on delivery",
    totalLabel: "Total",
    itemsTitle: "Ordered items",
    statusNew: "New",
    statusProcessing: "Processing",
    statusDone: "Delivered",
    statusCancelled: "Cancelled",
    shippingPending: "Not shipped",
    shippingShipped: "Shipped",
    whatsappAction: "WhatsApp",
    notesEmpty: "None",
    deliveryFeeLabel: "Delivery fee",
    netLabel: "Net",
    removeOrder: "Remove order",
    confirmRemoveOrder: "Remove this order?"
  }
};

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

let lang = localStorage.getItem("dodyDashLang") || "ar";
let storeData = deepClone(defaultData);
let currentOrder = null;

const t = (key) => i18n[lang]?.[key] || key;
const getLocale = () => (lang === "ar" ? "ar-EG" : "en-US");
const formatCurrency = (value) => `${value} ${lang === "ar" ? "جنيه" : "EGP"}`;

const formatPhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) {
    return `20${digits.slice(1)}`;
  }
  return digits;
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

const fetchOrders = async () => {
  const orders = await window.DodyApi?.fetchOrders?.();
  return Array.isArray(orders) ? orders : [];
};

const updateStatusOptions = () => {
  if (!orderStatusEl) {
    return;
  }
  orderStatusEl.innerHTML = "";
  const options = [
    { value: "new", label: t("statusNew") },
    { value: "processing", label: t("statusProcessing") },
    { value: "done", label: t("statusDone") },
    { value: "cancelled", label: t("statusCancelled") }
  ];
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.label;
    orderStatusEl.appendChild(opt);
  });
  if (currentOrder) {
    orderStatusEl.value = currentOrder.status || "new";
  }
};

const updateShippingOptions = () => {
  if (!shippingStatusEl) {
    return;
  }
  shippingStatusEl.innerHTML = "";
  const options = [
    { value: "pending", label: t("shippingPending") },
    { value: "shipped", label: t("shippingShipped") }
  ];
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.label;
    shippingStatusEl.appendChild(opt);
  });
  if (currentOrder) {
    shippingStatusEl.value = currentOrder.shippingStatus || "pending";
  }
};

const renderOrder = () => {
  if (!currentOrder) {
    window.location.href = "orders.html";
    return;
  }

  currentOrder.status = currentOrder.status || "new";
  currentOrder.shippingStatus = currentOrder.shippingStatus || "pending";
  currentOrder.deliveryFee = Number(currentOrder.deliveryFee) || 0;

  if (orderCard) {
    orderCard.hidden = false;
  }

  orderIdEl.textContent = currentOrder.id || "";
  orderDateEl.textContent = currentOrder.date
    ? new Date(currentOrder.date).toLocaleString(getLocale())
    : "-";
  orderCustomerEl.textContent = currentOrder.name || "";
  orderPhoneEl.textContent = currentOrder.phone || "";
  orderAddressEl.textContent = currentOrder.address || "";
  orderNotesEl.textContent = currentOrder.notes || t("notesEmpty");
  orderPaymentEl.textContent = t("paymentValue");
  const total = Number(currentOrder.total) || 0;
  const deliveryFee = Number(currentOrder.deliveryFee) || 0;
  const net = Math.max(total - deliveryFee, 0);
  orderTotalEl.textContent = formatCurrency(total);
  if (deliveryFeeInput) {
    deliveryFeeInput.value = deliveryFee;
  }
  if (orderNetEl) {
    orderNetEl.textContent = formatCurrency(net);
  }

  orderItemsEl.innerHTML = "";
  (currentOrder.items || []).forEach((item) => {
    const name = lang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr;
    const li = document.createElement("li");
    li.textContent = `${name} × ${item.qty} — ${formatCurrency(item.price * item.qty)}`;
    orderItemsEl.appendChild(li);
  });

  updateStatusOptions();
  updateShippingOptions();

  if (orderWhatsappEl) {
    const message =
      lang === "ar"
        ? `مرحباً ${currentOrder.name}، بنأكد طلبك رقم ${currentOrder.id}.`
        : `Hi ${currentOrder.name}, we're confirming your order #${currentOrder.id}.`;
    orderWhatsappEl.href = `https://wa.me/${formatPhone(
      currentOrder.phone
    )}?text=${encodeURIComponent(message)}`;
  }
};

const applyLang = () => {
  const root = document.documentElement;
  root.lang = lang === "ar" ? "ar" : "en";
  root.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("ltr", lang === "en");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (i18n[lang]?.[key]) {
      element.textContent = t(key);
    }
  });

  if (detailsLangToggle) {
    detailsLangToggle.textContent = lang === "ar" ? "English" : "عربي";
  }

  const favicon = document.getElementById("siteFavicon");
  if (favicon) {
    favicon.href = storeData?.brand?.favicon || storeData?.brand?.logo || "assets/logo.svg";
  }

  document.title = `${t("pageTitle")} | Dody Store`;
  renderOrder();
};

const init = async () => {
  const authed = await window.DodyApi?.checkAuth?.();
  if (!authed) {
    window.location.href = "orders.html";
    return;
  }

  storeData = await loadStoreData();

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("id");
  const orders = await fetchOrders();
  currentOrder = orders.find((order) => order.id === orderId) || null;

  if (brandLogo && storeData?.brand?.logo) {
    brandLogo.src = storeData.brand.logo;
  }

  if (detailsLangToggle) {
    detailsLangToggle.addEventListener("click", () => {
      lang = lang === "ar" ? "en" : "ar";
      localStorage.setItem("dodyDashLang", lang);
      applyLang();
    });
  }

  if (orderStatusEl) {
    orderStatusEl.addEventListener("change", async () => {
      if (!currentOrder) {
        return;
      }
      const updated = await window.DodyApi?.updateOrder?.(currentOrder.id, {
        status: orderStatusEl.value
      });
      if (updated) {
        currentOrder = updated;
        renderOrder();
      }
    });
  }

  if (shippingStatusEl) {
    shippingStatusEl.addEventListener("change", async () => {
      if (!currentOrder) {
        return;
      }
      const updated = await window.DodyApi?.updateOrder?.(currentOrder.id, {
        shippingStatus: shippingStatusEl.value
      });
      if (updated) {
        currentOrder = updated;
        renderOrder();
      }
    });
  }

  if (deliveryFeeInput) {
    deliveryFeeInput.addEventListener("input", () => {
      if (!currentOrder) {
        return;
      }
      const fee = Number(deliveryFeeInput.value) || 0;
      const total = Number(currentOrder.total) || 0;
      const net = Math.max(total - fee, 0);
      if (orderNetEl) {
        orderNetEl.textContent = formatCurrency(net);
      }
    });
    deliveryFeeInput.addEventListener("change", async () => {
      if (!currentOrder) {
        return;
      }
      const fee = Number(deliveryFeeInput.value) || 0;
      const updated = await window.DodyApi?.updateOrder?.(currentOrder.id, {
        deliveryFee: fee
      });
      if (updated) {
        currentOrder = updated;
        renderOrder();
      }
    });
  }

  if (removeOrderBtn) {
    removeOrderBtn.addEventListener("click", async () => {
      if (!currentOrder) {
        return;
      }
      if (!confirm(t("confirmRemoveOrder"))) {
        return;
      }
      const ok = await window.DodyApi?.deleteOrder?.(currentOrder.id);
      if (ok) {
        window.location.href = "orders.html";
      }
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

  applyLang();
};

init();
