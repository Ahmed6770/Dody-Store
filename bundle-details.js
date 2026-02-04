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

const loadStoreData = () => {
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
    backToBundles: "رجوع للباقات",
    notFoundTitle: "الباقة غير موجودة",
    notFoundDesc: "ارجعي للرئيسية لاختيار باقة أخرى.",
    bundleItemsTitle: "محتويات الباقة",
    bundleCountLabel: "عدد المنتجات",
    deliveryLabel: "وقت التوصيل"
  },
  en: {
    navHome: "Home",
    navAllProducts: "All products",
    navContact: "Contact",
    cartBtn: "Cart",
    addToCart: "Add to cart",
    added: "Added",
    backToBundles: "Back to bundles",
    notFoundTitle: "Bundle not found",
    notFoundDesc: "Go back to the homepage to choose another bundle.",
    bundleItemsTitle: "Bundle items",
    bundleCountLabel: "Items",
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

let storeData = loadStoreData();
let currentLang = localStorage.getItem("lang") || "ar";
let cart = loadCart();

const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const langToggle = document.getElementById("langToggle");
const bundleCard = document.getElementById("bundleCard");
const bundleNotFound = document.getElementById("bundleNotFound");
const bundleItemsCard = document.getElementById("bundleItemsCard");
const bundleImage = document.getElementById("bundleImage");
const bundleName = document.getElementById("bundleName");
const bundleDesc = document.getElementById("bundleDesc");
const bundlePrice = document.getElementById("bundlePrice");
const bundleCount = document.getElementById("bundleCount");
const bundleDelivery = document.getElementById("bundleDelivery");
const bundleItems = document.getElementById("bundleItems");
const bundleAddBtn = document.getElementById("bundleAddBtn");
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
      ? `${storeData.brand?.name || "Dody Store"} | تفاصيل الباقة`
      : `${storeData.brand?.name || "Dody Store"} | Bundle details`;
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

const renderBundle = () => {
  const params = new URLSearchParams(window.location.search);
  const bundleId = params.get("id");
  const bundle = storeData.hero?.featured;
  const isFeatured = bundleId === "featured" || bundleId === bundle?.id;

  if (!bundle || !isFeatured) {
    if (bundleCard) {
      bundleCard.hidden = true;
    }
    if (bundleItemsCard) {
      bundleItemsCard.hidden = true;
    }
    if (bundleNotFound) {
      bundleNotFound.hidden = false;
    }
    return;
  }

  if (bundleNotFound) {
    bundleNotFound.hidden = true;
  }
  if (bundleCard) {
    bundleCard.hidden = false;
  }
  if (bundleItemsCard) {
    bundleItemsCard.hidden = false;
  }

  const deliveryText =
    storeData.delivery?.time?.[currentLang] ||
    storeData.delivery?.time?.ar ||
    storeData.delivery?.time?.en ||
    "";

  bundleImage.src = bundle.image || "assets/products/bundle.svg";
  bundleImage.alt = bundle.name?.[currentLang] || "Bundle";
  bundleName.textContent = bundle.name?.[currentLang] || "";
  bundleDesc.textContent = bundle.desc?.[currentLang] || "";
  bundlePrice.textContent = formatCurrency(bundle.price || 0, currentLang);

  if (bundleCount) {
    const count = (bundle.items || []).length;
    bundleCount.textContent = `${translations[currentLang].bundleCountLabel}: ${count}`;
  }

  if (bundleDelivery) {
    bundleDelivery.textContent = deliveryText
      ? `${translations[currentLang].deliveryLabel}: ${deliveryText}`
      : "";
    bundleDelivery.style.display = deliveryText ? "inline-flex" : "none";
  }

  if (bundleItems) {
    bundleItems.innerHTML = "";
    const productsMap = new Map(
      (storeData.products || [])
        .filter((product) => product?.active !== false)
        .map((p) => [String(p.id).toLowerCase(), p])
    );
    (bundle.items || []).forEach((itemId) => {
      const product = productsMap.get(String(itemId).toLowerCase());
      if (!product) {
        return;
      }
      const card = document.createElement("div");
      card.className = "bundle-item-card";

      const img = document.createElement("img");
      img.src = product.image || "assets/products/bundle.svg";
      img.alt = product.name?.[currentLang] || "Item";

      const name = document.createElement("h4");
      name.textContent = product.name?.[currentLang] || "";

      const desc = document.createElement("p");
      desc.textContent = product.desc?.[currentLang] || "";

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(desc);
      bundleItems.appendChild(card);
    });
  }

  if (bundleAddBtn) {
    bundleAddBtn.onclick = () => {
      const existing = cart.find((item) => item.id === bundle.id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: bundle.id,
          nameAr: bundle.name?.ar || "",
          nameEn: bundle.name?.en || "",
          price: Number(bundle.price || 0),
          qty: 1
        });
      }
      persistCart(cart);
      updateCartCount();
      showToast(translations[currentLang].added);
    };
  }
};

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    renderBundle();
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

applyTranslations();
renderBundle();
updateCartCount();
