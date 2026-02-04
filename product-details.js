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
    navAllProducts: "كل المنتجات",
    navContact: "تواصل",
    cartBtn: "السلة",
    addToCart: "أضيفي للسلة",
    added: "تمت الإضافة",
    askProduct: "اسألي عن المنتج",
    statusAvailable: "متوفر",
    statusUnavailable: "غير متاح",
    outOfStock: "غير متاح",
    backToProducts: "رجوع للمنتجات",
    deliveryLabel: "وقت التوصيل"
  },
  en: {
    navHome: "Home",
    navAllProducts: "All products",
    navContact: "Contact",
    cartBtn: "Cart",
    addToCart: "Add to cart",
    added: "Added",
    askProduct: "Ask about this item",
    statusAvailable: "Available",
    statusUnavailable: "Unavailable",
    outOfStock: "Unavailable",
    backToProducts: "Back to products",
    deliveryLabel: "Delivery time"
  }
};

const formatCurrency = (amount, lang) =>
  lang === "ar" ? `${amount} جنيه` : `EGP ${amount}`;

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

const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const langToggle = document.getElementById("langToggle");
const productCard = document.getElementById("productCard");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const productComparePrice = document.getElementById("productComparePrice");
const productTag = document.getElementById("productTag");
const productStatus = document.getElementById("productStatus");
const productDelivery = document.getElementById("productDelivery");
const addToCartBtn = document.getElementById("addToCartBtn");
const askProductBtn = document.getElementById("askProductBtn");
const toast = document.getElementById("toast");
const backToTopBtn = document.getElementById("backToTop");

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
  }, 2200);
};

const updateCartCount = () => {
  if (!cartCount) {
    return;
  }
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
};

const applyTranslations = () => {
  const pageTitle =
    currentLang === "ar"
      ? `${storeData.brand?.name || "Dody Store"} | تفاصيل المنتج`
      : `${storeData.brand?.name || "Dody Store"} | Product details`;
  document.title = pageTitle;
  html.setAttribute("lang", currentLang === "ar" ? "ar" : "en");
  html.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
  body.classList.toggle("ltr", currentLang === "en");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  const brandLogo = document.getElementById("brandLogo");
  if (brandLogo && storeData.brand?.logo) {
    brandLogo.src = storeData.brand.logo;
    brandLogo.alt = `${storeData.brand?.name || "Dody Store"} logo`;
  }
  const favicon = document.getElementById("siteFavicon");
  if (favicon) {
    favicon.href = storeData.brand?.favicon || storeData.brand?.logo || "assets/logo.svg";
  }
  const brandName = document.getElementById("brandName");
  if (brandName) {
    brandName.textContent = storeData.brand?.name || "Dody Store";
  }
  const brandTag = document.getElementById("brandTag");
  if (brandTag) {
    brandTag.textContent = storeData.brand?.tag?.[currentLang] || "";
  }
};

const renderProduct = () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const normalizedId = (productId || "").toString().trim().toLowerCase();
  const product = (storeData.products || []).find(
    (item) => String(item.id).toLowerCase() === normalizedId
  );

  if (!product || product.active === false) {
    if (productCard) {
      productCard.hidden = true;
    }
    window.location.href = "products.html";
    return;
  }

  if (productCard) {
    productCard.hidden = false;
  }

  const deliveryText =
    storeData.delivery?.time?.[currentLang] ||
    storeData.delivery?.time?.ar ||
    storeData.delivery?.time?.en ||
    "";

  productImage.src = product.image || "assets/products/bundle.svg";
  productImage.alt = product.name?.[currentLang] || "Product";
  productImage.loading = "eager";
  productImage.decoding = "async";
  productName.textContent = product.name?.[currentLang] || "";
  productDesc.textContent = product.desc?.[currentLang] || "";
  productPrice.textContent = formatCurrency(product.price || 0, currentLang);
  if (productComparePrice) {
    const compareOk =
      product.showComparePrice && Number(product.comparePrice) > Number(product.price || 0);
    productComparePrice.textContent = compareOk
      ? formatCurrency(product.comparePrice || 0, currentLang)
      : "";
    productComparePrice.hidden = !compareOk;
  }

  if (productTag) {
    productTag.textContent = product.tag || "";
    productTag.style.display = product.tag ? "inline-flex" : "none";
  }

  const isAvailable = product.available !== false;
  if (productStatus) {
    productStatus.textContent = isAvailable
      ? translations[currentLang].statusAvailable
      : translations[currentLang].statusUnavailable;
    productStatus.className = `product-badge ${isAvailable ? "in" : "out"}`;
  }

  if (productDelivery) {
    productDelivery.textContent = deliveryText
      ? `${translations[currentLang].deliveryLabel}: ${deliveryText}`
      : "";
    productDelivery.style.display = deliveryText ? "inline-flex" : "none";
  }

  if (addToCartBtn) {
    if (!isAvailable) {
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = translations[currentLang].outOfStock;
    } else {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = translations[currentLang].addToCart;
      addToCartBtn.onclick = () => {
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({
            id: product.id,
            nameAr: product.name?.ar || "",
            nameEn: product.name?.en || "",
            price: Number(product.price || 0),
            qty: 1
          });
        }
        persistCart(cart);
        updateCartCount();
        showToast(translations[currentLang].added);
      };
    }
  }

  if (askProductBtn) {
    askProductBtn.onclick = () => {
      const name =
        currentLang === "ar" ? product.name?.ar || product.name?.en : product.name?.en || product.name?.ar;
      const message =
        currentLang === "ar"
          ? `مرحباً، حابة أسأل عن المنتج: ${name}`
          : `Hi, I'd like to ask about: ${name}`;
      const url = `https://wa.me/${getWhatsAppNumber(storeData)}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    };
  }
};

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    renderProduct();
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
  renderProduct();
  updateCartCount();
};

init();
