const html = document.documentElement;
const body = document.body;

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
  const saved = localStorage.getItem("dodyStoreData");
  if (!saved) {
    return deepClone(defaultData);
  }
  try {
    const parsed = JSON.parse(saved);
    return mergeDeep(deepClone(defaultData), parsed);
  } catch (error) {
    return deepClone(defaultData);
  }
};

const translations = {
  ar: {
    navHome: "الرئيسية",
    navBundles: "الباقات",
    navAbout: "قصتنا",
    navContact: "تواصل",
    cartBtn: "السلة",
    filterAll: "الكل",
    filterMin: "السعر من",
    filterMax: "السعر إلى",
    filterAvailable: "متوفر فقط",
    filterClear: "مسح الفلتر",
    addToCart: "أضيفي للسلة",
    added: "تمت الإضافة",
    viewDetails: "تفاصيل",
    askProduct: "اسألي عن المنتج",
    statusAvailable: "متوفر",
    statusUnavailable: "غير متاح",
    outOfStock: "غير متاح",
    productsPageTitle: "كل المنتجات",
    productsPageDesc: "كل الأصناف متاحة مع تفاصيل كاملة وصور واضحة.",
    footerServices: "خدماتنا",
    footerContact: "التواصل",
    footerHours: "ساعات العمل",
    copyright: "© 2026 Dody Store. كل الحقوق محفوظة.",
    deliveryLabel: "وقت التوصيل"
  },
  en: {
    navHome: "Home",
    navBundles: "Bundles",
    navAbout: "Our story",
    navContact: "Contact",
    cartBtn: "Cart",
    filterAll: "All",
    filterMin: "Min price",
    filterMax: "Max price",
    filterAvailable: "Available only",
    filterClear: "Clear filters",
    addToCart: "Add to cart",
    added: "Added",
    viewDetails: "Details",
    askProduct: "Ask about this item",
    statusAvailable: "Available",
    statusUnavailable: "Unavailable",
    outOfStock: "Unavailable",
    productsPageTitle: "All products",
    productsPageDesc: "Browse the full catalog with clear details and images.",
    footerServices: "Services",
    footerContact: "Contact",
    footerHours: "Working hours",
    copyright: "© 2026 Dody Store. All rights reserved.",
    deliveryLabel: "Delivery time"
  }
};

const getLocale = (lang) => (lang === "ar" ? "ar-EG" : "en-US");
const formatCurrency = (amount, lang) =>
  lang === "ar" ? `${amount} جنيه` : `EGP ${amount}`;

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
};

const loadCart = () => {
  const raw = localStorage.getItem("dodyCart");
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
};

const persistCart = (cart) => {
  localStorage.setItem("dodyCart", JSON.stringify(cart));
};

const getWhatsAppNumber = (data) => {
  const direct = data.footer?.contact?.whatsappIntl;
  if (direct) {
    return direct;
  }
  const display = data.footer?.contact?.whatsappDisplay || "";
  const digits = display.replace(/\D/g, "");
  return digits || "201123456789";
};

let storeData = deepClone(defaultData);
let currentLang = localStorage.getItem("lang") || "ar";
let cart = loadCart();
let activeFilter = "all";
let minPrice = "";
let maxPrice = "";
let availableOnly = false;

const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const productGrid = document.getElementById("productGrid");
const filterTabs = document.getElementById("filterTabs");
const langToggle = document.getElementById("langToggle");
const toast = document.getElementById("toast");
const backToTopBtn = document.getElementById("backToTop");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const availableOnlyInput = document.getElementById("availableOnly");
const clearFiltersBtn = document.getElementById("clearFilters");

let toastTimer;
const showToast = (message) => {
  if (!toast) {
    return;
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
};

const updateCartCount = () => {
  if (!cartCount) {
    return;
  }
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
};

const getCategoryLabel = (category) =>
  category?.label?.[currentLang] ||
  category?.label?.ar ||
  category?.label?.en ||
  category?.id ||
  "";

const renderFilterTabs = () => {
  if (!filterTabs) {
    return;
  }
  const categories = storeData.categories || [];
  filterTabs.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = "tab";
  allButton.dataset.filter = "all";
  allButton.textContent = translations[currentLang].filterAll;
  filterTabs.appendChild(allButton);

  categories.forEach((category) => {
    if (!category?.id) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tab";
    button.dataset.filter = category.id;
    button.textContent = getCategoryLabel(category);
    filterTabs.appendChild(button);
  });

  const availableIds = new Set(categories.map((category) => category.id));
  if (activeFilter !== "all" && !availableIds.has(activeFilter)) {
    activeFilter = "all";
  }

  const activeButton = filterTabs.querySelector(`[data-filter="${activeFilter}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }
};

const renderProducts = () => {
  if (!productGrid) {
    return;
  }
  productGrid.innerHTML = "";
  (storeData.products || [])
    .filter((product) => product?.active !== false)
    .forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.dataset.id = product.id;
      card.dataset.category = product.category;
      card.dataset.price = product.price;
      card.dataset.nameAr = product.name?.ar || "";
      card.dataset.nameEn = product.name?.en || "";
      card.dataset.available = product.available !== false ? "true" : "false";

      const img = document.createElement("img");
      img.className = "product-image";
      img.src = product.image || "assets/products/bundle.svg";
      img.alt = product.name?.[currentLang] || "Product";
      img.loading = "lazy";
      img.decoding = "async";

      const meta = document.createElement("div");
      meta.className = "product-meta";

      const tag = document.createElement("div");
      tag.className = "product-tag";
      tag.textContent = product.tag || "";
      if (product.tag) {
        meta.appendChild(tag);
      }

      const isAvailable = product.available !== false;
      const status = document.createElement("div");
      status.className = `product-status ${isAvailable ? "in" : "out"}`;
      status.textContent = isAvailable
        ? translations[currentLang].statusAvailable
        : translations[currentLang].statusUnavailable;
      meta.appendChild(status);

      const name = document.createElement("h3");
      name.textContent = product.name?.[currentLang] || "";

      const desc = document.createElement("p");
      desc.textContent = product.desc?.[currentLang] || "";

      const priceRow = document.createElement("div");
      priceRow.className = "price-row";

      const price = document.createElement("span");
      price.className = "price";
      price.textContent = formatCurrency(product.price || 0, currentLang);

      if (product.showComparePrice && Number(product.comparePrice) > Number(product.price || 0)) {
        const compare = document.createElement("span");
        compare.className = "compare-price";
        compare.textContent = formatCurrency(product.comparePrice || 0, currentLang);
        priceRow.appendChild(compare);
      }

      const button = document.createElement("button");
      button.className = "mini add-to-cart";
      button.type = "button";
      if (isAvailable) {
        button.textContent = translations[currentLang].addToCart;
      } else {
        button.textContent = translations[currentLang].outOfStock;
        button.disabled = true;
      }

    const details = document.createElement("button");
    details.className = "ghost view-details details-btn";
    details.type = "button";
    details.textContent = translations[currentLang].viewDetails;
    details.dataset.productId = product.id;

    const ask = document.createElement("button");
    ask.className = "ghost ask-product details-btn";
    ask.type = "button";
    ask.textContent = translations[currentLang].askProduct;
    ask.dataset.productId = product.id;

    const actionsRow = document.createElement("div");
    actionsRow.className = "product-actions-row";
    actionsRow.appendChild(details);
    actionsRow.appendChild(ask);

      priceRow.appendChild(price);
      priceRow.appendChild(button);

      card.appendChild(img);
      card.appendChild(meta);
      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(priceRow);
    card.appendChild(actionsRow);

      productGrid.appendChild(card);
    });
};

const applyFilter = () => {
  const min = minPrice === "" ? null : Number(minPrice);
  const max = maxPrice === "" ? null : Number(maxPrice);
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const price = Number(card.dataset.price || 0);
    const available = card.dataset.available !== "false";
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesAvailability = !availableOnly || available;
    const matchesMin = min === null || price >= min;
    const matchesMax = max === null || price <= max;

    if (matchesCategory && matchesAvailability && matchesMin && matchesMax) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
};

const addToCart = (product) => {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  persistCart(cart);
  updateCartCount();
  showToast(translations[currentLang].added);
};

const buildProductQuestion = (card) => {
  const nameAr = card.dataset.nameAr || "";
  const nameEn = card.dataset.nameEn || "";
  const name = currentLang === "ar" ? nameAr || nameEn : nameEn || nameAr;
  if (currentLang === "ar") {
    return `مرحباً، حابة أسأل عن المنتج: ${name}`;
  }
  return `Hi, I'd like to ask about: ${name}`;
};

const openProductQuestion = (card) => {
  const message = buildProductQuestion(card);
  const url = `https://wa.me/${getWhatsAppNumber(storeData)}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
};

const openProductDetails = (productId) => {
  if (!productId) {
    return;
  }
  window.location.href = `product-details.html?id=${encodeURIComponent(productId)}`;
};

const renderFooter = () => {
  const labels =
    currentLang === "ar"
      ? { whatsapp: "واتساب", insta: "إنستجرام", facebook: "فيسبوك" }
      : { whatsapp: "WhatsApp", insta: "Instagram", facebook: "Facebook" };
  setText("footerDesc", storeData.footer?.desc?.[currentLang] || "");
  const whatsappLink = document.getElementById("footerWhatsappLink");
  const instaLink = document.getElementById("footerInstaLink");
  const facebookLink = document.getElementById("footerFacebookLink");

  const whatsappIntl = storeData.footer?.contact?.whatsappIntl || "";
  const whatsappDisplay = storeData.footer?.contact?.whatsappDisplay || "";
  if (whatsappLink) {
    whatsappLink.textContent = `${labels.whatsapp}: ${whatsappDisplay || whatsappIntl}`;
    whatsappLink.href = whatsappIntl
      ? `https://wa.me/${whatsappIntl}`
      : "https://wa.me/201123456789";
  }

  const insta = storeData.footer?.contact?.instagram || "";
  if (instaLink) {
    instaLink.textContent = `${labels.insta}: ${insta}`;
    const handle = insta.replace(/^@/, "");
    instaLink.href = handle ? `https://instagram.com/${handle}` : "#";
  }

  const facebook = storeData.footer?.contact?.facebook || "";
  if (facebookLink) {
    facebookLink.textContent = `${labels.facebook}: ${facebook}`;
    const fbUrl = facebook.startsWith("http") ? facebook : `https://${facebook}`;
    facebookLink.href = facebook ? fbUrl : "#";
  }
  setText("footerHours", storeData.footer?.hours?.[currentLang] || "");

  const footerServicesList = document.getElementById("footerServicesList");
  if (footerServicesList) {
    footerServicesList.innerHTML = "";
    (storeData.footer?.services || []).forEach((service) => {
      const li = document.createElement("li");
      li.textContent = service?.[currentLang] || "";
      footerServicesList.appendChild(li);
    });
  }
};

const applyTranslations = () => {
  const pageTitle =
    currentLang === "ar"
      ? `${storeData.brand?.name || "Dody Store"} | كل المنتجات`
      : `${storeData.brand?.name || "Dody Store"} | All products`;
  document.title = pageTitle;
  html.setAttribute("lang", currentLang === "ar" ? "ar" : "en");
  html.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
  body.classList.toggle("ltr", currentLang === "en");

  const favicon = document.getElementById("siteFavicon");
  if (favicon) {
    favicon.href = storeData.brand?.favicon || storeData.brand?.logo || "assets/logo.svg";
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  const deliveryNote = document.getElementById("deliveryNote");
  if (deliveryNote) {
    const deliveryText =
      storeData.delivery?.time?.[currentLang] ||
      storeData.delivery?.time?.ar ||
      storeData.delivery?.time?.en ||
      "";
    if (deliveryText) {
      deliveryNote.textContent = `${translations[currentLang].deliveryLabel}: ${deliveryText}`;
      deliveryNote.style.display = "inline-flex";
    } else {
      deliveryNote.textContent = "";
      deliveryNote.style.display = "none";
    }
  }

  setText("brandName", storeData.brand?.name || "Dody Store");
  setText("brandTag", storeData.brand?.tag?.[currentLang] || "");
  const brandLogo = document.getElementById("brandLogo");
  if (brandLogo && storeData.brand?.logo) {
    brandLogo.src = storeData.brand.logo;
    brandLogo.alt = `${storeData.brand?.name || "Dody Store"} logo`;
  }

  renderFilterTabs();
  renderProducts();
  applyFilter();
  renderFooter();
  updateCartCount();
};

if (filterTabs) {
  filterTabs.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (!tab) {
      return;
    }
    filterTabs.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    activeFilter = tab.dataset.filter;
    applyFilter();
  });
}

if (minPriceInput) {
  minPriceInput.addEventListener("input", () => {
    minPrice = minPriceInput.value;
    applyFilter();
  });
}

if (maxPriceInput) {
  maxPriceInput.addEventListener("input", () => {
    maxPrice = maxPriceInput.value;
    applyFilter();
  });
}

if (availableOnlyInput) {
  availableOnlyInput.addEventListener("change", () => {
    availableOnly = availableOnlyInput.checked;
    applyFilter();
  });
}

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", () => {
    minPrice = "";
    maxPrice = "";
    availableOnly = false;
    if (minPriceInput) minPriceInput.value = "";
    if (maxPriceInput) maxPriceInput.value = "";
    if (availableOnlyInput) availableOnlyInput.checked = false;
    applyFilter();
  });
}

if (productGrid) {
  productGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-to-cart");
    if (addButton) {
      if (addButton.disabled) {
        return;
      }
      const card = addButton.closest(".product-card");
      if (!card) {
        return;
      }
      addToCart({
        id: card.dataset.id,
        nameAr: card.dataset.nameAr,
        nameEn: card.dataset.nameEn,
        price: Number(card.dataset.price || 0)
      });
      return;
    }

    const askButton = event.target.closest(".ask-product");
    if (askButton) {
      const card = askButton.closest(".product-card");
      if (card) {
        openProductQuestion(card);
      }
      return;
    }

    const detailsBtn = event.target.closest(".view-details");
    if (detailsBtn) {
      openProductDetails(detailsBtn.dataset.productId);
      return;
    }

    const card = event.target.closest(".product-card");
    if (card) {
      openProductDetails(card.dataset.id);
    }
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyTranslations();
  });
}

if (cartButton) {
  cartButton.addEventListener("click", () => {
    window.location.href = "index.html?cart=open";
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

const init = async () => {
  storeData = await loadStoreData();
  applyTranslations();
};

init();
