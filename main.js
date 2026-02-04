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

let storeData = deepClone(defaultData);
let storeWhatsApp = storeData.footer?.contact?.whatsappIntl || "201123456789";

const translations = {
  ar: {
    navBundles: "الباقات",
    navProducts: "المنتجات",
    navAllProducts: "كل المنتجات",
    navRoutine: "روتينك",
    navAbout: "قصتنا",
    navContact: "تواصل",
    viewAllProducts: "عرض كل المنتجات",
    cartBtn: "السلة",
    cartTitle: "سلتك",
    cartEmpty: "سلتك فاضية حاليًا.",
    subtotal: "الإجمالي",
    filterAll: "الكل",
    filterSkin: "عناية بالبشرة",
    filterMakeup: "مكياج",
    filterHair: "شعر",
    routineTitle: "ابني روتينك خلال دقيقة",
    routineDesc: "اختاري نوع بشرتك، وسنقترح لك مجموعة منتجات مناسبة من المتجر.",
    skinDry: "جافة",
    skinOily: "دهنية",
    skinCombo: "مختلطة",
    skinSensitive: "حساسة",
    routineHint: "اختاري نوع بشرتك لرؤية الاقتراحات.",
    routineStepsTitle: "الخطوات الأساسية",
    step1: "تنظيف لطيف",
    step2: "تونر موازن",
    step3: "سيروم مركز",
    step4: "كريم ترطيب",
    step5: "واقي شمس",
    footerServices: "خدماتنا",
    footerContact: "التواصل",
    footerHours: "ساعات العمل",
    orderTitle: "بيانات الطلب",
    nameLabel: "الاسم الكامل",
    phoneLabel: "رقم الهاتف",
    addressLabel: "العنوان بالكامل",
    notesLabel: "ملاحظات (اختياري)",
    paymentLabel: "طريقة الدفع",
    placeOrder: "تأكيد الطلب",
    orderHint: "بعد التأكيد هنستلم طلبك وهنبعت لك تأكيد.",
    namePlaceholder: "اسمك بالكامل",
    phonePlaceholder: "رقم الهاتف",
    addressPlaceholder: "المنطقة - الشارع - رقم العمارة",
    notesPlaceholder: "أي ملاحظات للتوصيل",
    addToCart: "أضيفي للسلة",
    added: "تمت الإضافة",
    viewDetails: "تفاصيل",
    bundleDetails: "تفاصيل الباقة",
    paymentValue: "كاش عند الاستلام",
    deliveryLabel: "وقت التوصيل",
    giftAsk: "اطلبي الهدية على واتساب",
    giftShop: "ابدئي الطلب",
    statusAvailable: "متوفر",
    statusUnavailable: "غير متاح",
    askProduct: "اسألي عن المنتج",
    outOfStock: "غير متاح",
    orderErrorEmpty: "ضيفي منتجات للسلة أولاً.",
    orderErrorFields: "من فضلك اكملي البيانات المطلوبة.",
    orderSuccess: "تم استلام الطلب بنجاح.",
    orderSuccessWithId: "تم استلام طلبك رقم {id}.",
    orderSending: "جاري إرسال الطلب...",
    orderFailed: "حصل خطأ أثناء إرسال الطلب. جرّبي مرة أخرى.",
    copyright: "© 2026 Dody Store. كل الحقوق محفوظة."
  },
  en: {
    navBundles: "Bundles",
    navProducts: "Products",
    navAllProducts: "All products",
    navRoutine: "Routine",
    navAbout: "Our Story",
    navContact: "Contact",
    viewAllProducts: "View all products",
    cartBtn: "Cart",
    cartTitle: "Your cart",
    cartEmpty: "Your cart is empty right now.",
    subtotal: "Subtotal",
    filterAll: "All",
    filterSkin: "Skincare",
    filterMakeup: "Makeup",
    filterHair: "Hair",
    routineTitle: "Build your routine in a minute",
    routineDesc: "Choose your skin type and we’ll suggest a store-ready routine.",
    skinDry: "Dry",
    skinOily: "Oily",
    skinCombo: "Combination",
    skinSensitive: "Sensitive",
    routineHint: "Pick your skin type to see recommendations.",
    routineStepsTitle: "Core steps",
    step1: "Gentle cleanse",
    step2: "Balancing toner",
    step3: "Targeted serum",
    step4: "Moisturizer",
    step5: "Sunscreen",
    footerServices: "Services",
    footerContact: "Contact",
    footerHours: "Working hours",
    orderTitle: "Order details",
    nameLabel: "Full name",
    phoneLabel: "Phone number",
    addressLabel: "Full address",
    notesLabel: "Notes (optional)",
    paymentLabel: "Payment method",
    placeOrder: "Place order",
    orderHint: "After confirmation, we'll receive your order and follow up.",
    namePlaceholder: "Your full name",
    phonePlaceholder: "Your phone number",
    addressPlaceholder: "Street, area, city",
    notesPlaceholder: "Any delivery notes",
    addToCart: "Add to cart",
    added: "Added",
    viewDetails: "Details",
    bundleDetails: "Bundle details",
    paymentValue: "Cash on delivery",
    deliveryLabel: "Delivery time",
    giftAsk: "Request the gift on WhatsApp",
    giftShop: "Start order",
    statusAvailable: "Available",
    statusUnavailable: "Unavailable",
    askProduct: "Ask about this item",
    outOfStock: "Unavailable",
    orderErrorEmpty: "Please add items to the cart first.",
    orderErrorFields: "Please fill in the required fields.",
    orderSuccess: "Order received successfully.",
    orderSuccessWithId: "Order #{id} received successfully.",
    orderSending: "Sending order...",
    orderFailed: "Something went wrong. Please try again.",
    copyright: "© 2026 Dody Store. All rights reserved."
  }
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

const formatCurrency = (amount) =>
  currentLang === "ar" ? `${amount} جنيه` : `EGP ${amount}`;

const generateOrderId = () => {
  const key = "dodyOrderSeq";
  const current = Number(localStorage.getItem(key)) || 10000;
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return `DS-${next}`;
};

const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const orderForm = document.getElementById("orderForm");
const orderStatus = document.getElementById("orderStatus");
const paymentMethod = document.getElementById("paymentMethod");
const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");
const customerAddressInput = document.getElementById("customerAddress");
const customerNotesInput = document.getElementById("customerNotes");
const routineResult = document.getElementById("routineResult");
const langToggle = document.getElementById("langToggle");
const shopNow = document.getElementById("shopNow");
const seeBundles = document.getElementById("seeBundles");
const brandLogo = document.getElementById("brandLogo");
const toast = document.getElementById("toast");
const aboutCardBtn = document.getElementById("aboutCardBtn");
const giftModal = document.getElementById("giftModal");
const giftClose = document.getElementById("giftClose");
const giftTitle = document.getElementById("giftTitle");
const giftDesc = document.getElementById("giftDesc");
const giftWhatsAppBtn = document.getElementById("giftWhatsAppBtn");
const giftShopBtn = document.getElementById("giftShopBtn");
const emailFormMount = document.getElementById("emailFormMount");
const contactCtaTitle = document.getElementById("contactCtaTitle");
const contactCtaDesc = document.getElementById("contactCtaDesc");
const contactCtaBtn = document.getElementById("contactCtaBtn");
const contactCtaNote = document.getElementById("contactCtaNote");

const heroBadges = document.getElementById("heroBadges");
const stripList = document.getElementById("stripList");
const collectionGrid = document.getElementById("collectionGrid");
const productGrid = document.getElementById("productGrid");
const filterTabs = document.getElementById("filterTabs");
const ingredientGrid = document.getElementById("ingredientGrid");
const testimonialTrack = document.getElementById("testimonialTrack");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");
const aboutStats = document.getElementById("aboutStats");
const footerServicesList = document.getElementById("footerServicesList");
const featuredCard = document.getElementById("featuredCard");
const featuredImage = document.getElementById("featuredImage");
const featuredName = document.getElementById("featuredName");
const featuredDesc = document.getElementById("featuredDesc");
const featuredPrice = document.getElementById("featuredPrice");
const featuredAdd = document.getElementById("featuredAdd");
const featuredDetails = document.getElementById("featuredDetails");

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

const persistCart = () => {
  localStorage.setItem("dodyCart", JSON.stringify(cart));
};

const loadOrderDraft = () => {
  const raw = localStorage.getItem("dodyOrderDraft");
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const saveOrderDraft = (draft) => {
  localStorage.setItem("dodyOrderDraft", JSON.stringify(draft));
};

const clearOrderDraft = () => {
  localStorage.removeItem("dodyOrderDraft");
};

let cart = loadCart();
let activeSkin = null;
let currentLang = localStorage.getItem("lang") || "ar";
let activeFilter = "all";

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
  }, 2600);
};

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
};

const updateOrderStatus = (key, type = "hint", customMessage = "") => {
  orderStatus.dataset.key = key;
  orderStatus.dataset.type = type;

  if (key !== "orderSuccess") {
    delete orderStatus.dataset.orderId;
  }

  const orderId = orderStatus.dataset.orderId;
  if (customMessage) {
    orderStatus.textContent = customMessage;
  } else if (key === "orderSuccess" && orderId) {
    const template =
      translations[currentLang].orderSuccessWithId || translations[currentLang].orderSuccess;
    orderStatus.textContent = template.replace("{id}", orderId);
  } else {
    orderStatus.textContent = translations[currentLang][key] || orderStatus.textContent;
  }

  orderStatus.className = `order-status ${type}`;
};

const toggleGiftModal = (open) => {
  if (!giftModal) {
    return;
  }
  giftModal.classList.toggle("show", open);
  giftModal.setAttribute("aria-hidden", (!open).toString());
};

const renderHeroBadges = () => {
  heroBadges.innerHTML = "";
  const badges = storeData.hero?.badges?.[currentLang] || [];
  badges.forEach((badge) => {
    const span = document.createElement("span");
    span.textContent = badge;
    heroBadges.appendChild(span);
  });
};

const renderStrip = () => {
  stripList.innerHTML = "";
  const items = storeData.strip?.[currentLang] || [];
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "strip-item";
    div.textContent = item;
    stripList.appendChild(div);
  });
};

const renderCollections = () => {
  collectionGrid.innerHTML = "";
  (storeData.collections || []).forEach((collection, index) => {
    const article = document.createElement("article");
    article.className = "collection-card";
    if (index === 1) {
      article.classList.add("dark");
    }

    const title = document.createElement("h3");
    title.textContent = collection.title?.[currentLang] || "";
    const desc = document.createElement("p");
    desc.textContent = collection.desc?.[currentLang] || "";
    const tag = document.createElement("span");
    tag.textContent = collection.tag?.[currentLang] || "";

    article.appendChild(title);
    article.appendChild(desc);
    article.appendChild(tag);
    collectionGrid.appendChild(article);
  });
};

const renderProducts = () => {
  productGrid.innerHTML = "";
  const products = (storeData.products || []).filter((product) => product?.active !== false);
  const sampleIds = Array.isArray(storeData.home?.sampleIds)
    ? storeData.home.sampleIds.filter(Boolean)
    : [];
  const sampleCount = Number(storeData.home?.samplesCount);
  const limit = Number.isFinite(sampleCount) && sampleCount > 0 ? sampleCount : products.length;
  const visibleProducts =
    sampleIds.length > 0
      ? sampleIds
          .map((id) =>
            products.find(
              (product) =>
                String(product.id).toLowerCase() === String(id).toLowerCase()
            )
          )
          .filter(Boolean)
      : products.slice(0, limit);
  const viewAllBtn = document.getElementById("viewAllProducts");
  if (viewAllBtn) {
    viewAllBtn.style.display = products.length > visibleProducts.length ? "inline-flex" : "none";
  }
  visibleProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;
    card.dataset.category = product.category;
    card.dataset.price = product.price;
    card.dataset.nameAr = product.name?.ar || "";
    card.dataset.nameEn = product.name?.en || "";
    card.dataset.descAr = product.desc?.ar || "";
    card.dataset.descEn = product.desc?.en || "";
    card.dataset.available = product.available !== false ? "true" : "false";

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = product.image || "assets/products/bundle.svg";
    img.alt = product.name?.[currentLang] || "Product";

    const meta = document.createElement("div");
    meta.className = "product-meta";

    const tag = document.createElement("div");
    tag.className = "product-tag";
    tag.textContent = product.tag || "";
    if (product.tag) {
      meta.appendChild(tag);
    }

    const status = document.createElement("div");
    const isAvailable = product.available !== false;
    status.className = `product-status ${isAvailable ? "in" : "out"}`;
    status.textContent = isAvailable
      ? translations[currentLang].statusAvailable
      : translations[currentLang].statusUnavailable;
    meta.appendChild(status);

    const name = document.createElement("h3");
    name.setAttribute("data-product-name", "");
    name.textContent = product.name?.[currentLang] || "";

    const desc = document.createElement("p");
    desc.setAttribute("data-product-desc", "");
    desc.textContent = product.desc?.[currentLang] || "";

    const priceRow = document.createElement("div");
    priceRow.className = "price-row";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = formatCurrency(product.price || 0);

    const button = document.createElement("button");
    button.className = "mini add-to-cart";
    button.type = "button";
    if (isAvailable) {
      button.textContent = translations[currentLang].addToCart;
    } else {
      button.textContent = translations[currentLang].outOfStock;
      button.disabled = true;
    }

    priceRow.appendChild(price);
    priceRow.appendChild(button);

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

    card.appendChild(img);
    card.appendChild(meta);
    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(priceRow);
    card.appendChild(actionsRow);

    productGrid.appendChild(card);
  });
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

const renderIngredients = () => {
  ingredientGrid.innerHTML = "";
  (storeData.ingredients || []).forEach((ingredient) => {
    const card = document.createElement("div");
    card.className = "ingredient-card";

    const title = document.createElement("h3");
    title.textContent = ingredient.title?.[currentLang] || "";
    const desc = document.createElement("p");
    desc.textContent = ingredient.desc?.[currentLang] || "";

    card.appendChild(title);
    card.appendChild(desc);
    ingredientGrid.appendChild(card);
  });
};

const renderTestimonials = () => {
  if (!testimonialTrack) {
    return;
  }
  testimonialTrack.innerHTML = "";
  const items = storeData.testimonials || [];
  items.forEach((testimonial) => {
    const article = document.createElement("article");
    article.className = "testimonial-card";

    if (testimonial.image) {
      const img = document.createElement("img");
      img.src = testimonial.image;
      img.alt = testimonial.name?.[currentLang] || "Customer message";
      article.appendChild(img);
    }

    const quoteText = testimonial.quote?.[currentLang] || "";
    const nameText = testimonial.name?.[currentLang] || "";
    if (quoteText || nameText) {
      const caption = document.createElement("div");
      caption.className = "testimonial-caption";
      if (quoteText) {
        const quote = document.createElement("p");
        quote.textContent = quoteText;
        caption.appendChild(quote);
      }
      if (nameText) {
        const name = document.createElement("span");
        name.textContent = nameText;
        caption.appendChild(name);
      }
      article.appendChild(caption);
    }

    testimonialTrack.appendChild(article);
  });

  if (testimonialPrev && testimonialNext) {
    const hasMany = items.length > 2;
    testimonialPrev.style.display = hasMany ? "inline-flex" : "none";
    testimonialNext.style.display = hasMany ? "inline-flex" : "none";
  }
};

const renderAbout = () => {
  setText("aboutTitle", storeData.about?.title?.[currentLang] || "");
  setText("aboutDesc", storeData.about?.desc?.[currentLang] || "");
  setText("aboutCardTitle", storeData.about?.card?.title?.[currentLang] || "");
  setText("aboutCardDesc", storeData.about?.card?.desc?.[currentLang] || "");
  setText("aboutCardBtn", storeData.about?.card?.button?.[currentLang] || "");

  aboutStats.innerHTML = "";
  (storeData.about?.stats || []).forEach((stat) => {
    const card = document.createElement("div");
    const value = document.createElement("h3");
    value.textContent = stat.value || "";
    const label = document.createElement("p");
    label.textContent = stat.label?.[currentLang] || "";
    card.appendChild(value);
    card.appendChild(label);
    aboutStats.appendChild(card);
  });
};

const renderGiftModal = () => {
  if (!giftModal) {
    return;
  }
  const card = storeData.about?.card || {};
  if (giftTitle) {
    giftTitle.textContent = card.title?.[currentLang] || card.title?.ar || card.title?.en || "";
  }
  if (giftDesc) {
    giftDesc.textContent = card.desc?.[currentLang] || card.desc?.ar || card.desc?.en || "";
  }
  if (giftWhatsAppBtn) {
    giftWhatsAppBtn.textContent = translations[currentLang].giftAsk;
  }
  if (giftShopBtn) {
    giftShopBtn.textContent = translations[currentLang].giftShop;
  }
};

const getGiftMessage = () => {
  const card = storeData.about?.card || {};
  return (
    card.message?.[currentLang] ||
    card.message?.ar ||
    card.message?.en ||
    (currentLang === "ar"
      ? "مرحباً، عايزة هدية أول طلب."
      : "Hi, I'd like the first order gift.")
  );
};

const renderFooter = () => {
  const labels =
    currentLang === "ar"
      ? { whatsapp: "واتساب", insta: "إنستجرام", facebook: "فيسبوك" }
      : { whatsapp: "WhatsApp", insta: "Instagram", facebook: "Facebook" };
  setText("footerDesc", storeData.footer?.desc?.[currentLang] || "");
  setText(
    "footerWhatsapp",
    `${labels.whatsapp}: ${storeData.footer?.contact?.whatsappDisplay || ""}`
  );
  setText(
    "footerInsta",
    `${labels.insta}: ${storeData.footer?.contact?.instagram || ""}`
  );
  setText(
    "footerFacebook",
    `${labels.facebook}: ${storeData.footer?.contact?.facebook || ""}`
  );
  setText("footerHours", storeData.footer?.hours?.[currentLang] || "");

  footerServicesList.innerHTML = "";
  (storeData.footer?.services || []).forEach((service) => {
    const li = document.createElement("li");
    li.textContent = service?.[currentLang] || "";
    footerServicesList.appendChild(li);
  });
};

const renderContactCta = () => {
  if (!contactCtaTitle || !contactCtaBtn) {
    return;
  }
  const cta = storeData.contactCta || {};
  const message =
    cta.message?.[currentLang] ||
    cta.message?.ar ||
    cta.message?.en ||
    (currentLang === "ar"
      ? "مرحباً، محتاجة ترشيح روتين مناسب لبشرتي."
      : "Hi, I need help picking a routine for my skin.");

  setText("contactCtaTitle", cta.title?.[currentLang] || "");
  setText("contactCtaDesc", cta.desc?.[currentLang] || "");
  setText("contactCtaBtn", cta.button?.[currentLang] || "");
  setText("contactCtaNote", cta.note?.[currentLang] || "");

  const targetNumber = getWhatsAppNumber(storeData);
  contactCtaBtn.href = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
};

const renderFeatured = () => {
  const featured = storeData.hero?.featured;
  if (!featured) {
    return;
  }

  featuredCard.dataset.id = featured.id || "featured";
  featuredCard.dataset.price = featured.price || 0;
  featuredCard.dataset.nameAr = featured.name?.ar || "";
  featuredCard.dataset.nameEn = featured.name?.en || "";
  featuredCard.dataset.descAr = featured.desc?.ar || "";
  featuredCard.dataset.descEn = featured.desc?.en || "";

  featuredImage.src = featured.image || "assets/products/bundle.svg";
  featuredImage.alt = featured.name?.[currentLang] || "";
  featuredName.textContent = featured.name?.[currentLang] || "";
  featuredDesc.textContent = featured.desc?.[currentLang] || "";
  featuredPrice.textContent = formatCurrency(featured.price || 0);
  featuredAdd.textContent = translations[currentLang].addToCart;
};

const renderContent = () => {
  setText("brandName", storeData.brand?.name || "Dody Store");
  setText("brandTag", storeData.brand?.tag?.[currentLang] || "");
  if (brandLogo && storeData.brand?.logo) {
    brandLogo.src = storeData.brand.logo;
    brandLogo.alt = `${storeData.brand?.name || "Dody Store"} logo`;
  }
  const favicon = document.getElementById("siteFavicon");
  if (favicon) {
    favicon.href = storeData.brand?.favicon || storeData.brand?.logo || "assets/logo.svg";
  }
  setText("heroEyebrow", storeData.hero?.eyebrow?.[currentLang] || "");
  setText("heroTitle", storeData.hero?.title?.[currentLang] || "");
  setText("heroCopy", storeData.hero?.copy?.[currentLang] || "");
  setText(
    "collectionsTitle",
    storeData.sections?.collections?.title?.[currentLang] || ""
  );
  setText(
    "collectionsDesc",
    storeData.sections?.collections?.desc?.[currentLang] || ""
  );
  setText(
    "productsTitle",
    storeData.sections?.products?.title?.[currentLang] || ""
  );
  setText(
    "productsDesc",
    storeData.sections?.products?.desc?.[currentLang] || ""
  );
  setText(
    "ingredientsTitle",
    storeData.sections?.ingredients?.title?.[currentLang] || ""
  );
  setText(
    "ingredientsDesc",
    storeData.sections?.ingredients?.desc?.[currentLang] || ""
  );
  setText(
    "testimonialsTitle",
    storeData.sections?.testimonials?.title?.[currentLang] || ""
  );
  setText(
    "testimonialsDesc",
    storeData.sections?.testimonials?.desc?.[currentLang] || ""
  );
  setText("shopNow", storeData.hero?.primary?.[currentLang] || translations[currentLang].addToCart);
  setText("seeBundles", storeData.hero?.secondary?.[currentLang] || "");

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

  renderHeroBadges();
  renderStrip();
  renderCollections();
  renderFilterTabs();
  renderProducts();
  renderIngredients();
  renderTestimonials();
  renderAbout();
  renderGiftModal();
  renderFooter();
  renderFeatured();
  renderContactCta();

  bindProductActions();
  applyFilter();
};

const updateCartCount = () => {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
};

const renderCart = () => {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = translations[currentLang].cartEmpty;
    cartItems.appendChild(empty);
    cartTotal.textContent = formatCurrency(0);
    updateCartCount();
    persistCart();
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";

    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = currentLang === "ar" ? item.nameAr : item.nameEn;
    const meta = document.createElement("span");
    meta.className = "cart-item-meta";
    meta.textContent = `x${item.qty}`;
    info.appendChild(name);
    info.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "cart-item-actions";
    const price = document.createElement("span");
    price.className = "cart-item-price";
    price.textContent = formatCurrency(item.price * item.qty);
    const remove = document.createElement("button");
    remove.className = "icon-btn remove-item";
    remove.type = "button";
    remove.dataset.id = item.id;
    remove.textContent = "×";
    actions.appendChild(price);
    actions.appendChild(remove);

    row.appendChild(info);
    row.appendChild(actions);
    cartItems.appendChild(row);
  });

  cartTotal.textContent = formatCurrency(total);
  updateCartCount();
  persistCart();
};

const toggleCart = (open) => {
  cartDrawer.classList.toggle("open", open);
  overlay.classList.toggle("show", open);
  cartDrawer.setAttribute("aria-hidden", (!open).toString());
};

const getProductData = (button) => {
  const card = button.closest("[data-id]");
  if (!card) {
    return null;
  }

  return {
    id: card.dataset.id,
    nameAr: card.dataset.nameAr,
    nameEn: card.dataset.nameEn,
    price: Number(card.dataset.price || 0)
  };
};

const addToCart = (button) => {
  if (button.disabled) {
    return;
  }
  const product = getProductData(button);
  if (!product) {
    return;
  }

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
  persistCart();
  button.textContent = translations[currentLang].added;
  setTimeout(() => {
    button.textContent = translations[currentLang].addToCart;
  }, 1200);
};

const buildProductQuestion = (product) => {
  const name =
    currentLang === "ar" ? product.nameAr || product.nameEn : product.nameEn || product.nameAr;
  if (currentLang === "ar") {
    return `مرحباً، حابة أسأل عن المنتج: ${name}`;
  }
  return `Hi, I'd like to ask about: ${name}`;
};

const openProductQuestion = (button) => {
  const product = getProductData(button);
  if (!product) {
    return;
  }
  const message = buildProductQuestion(product);
  const url = `https://wa.me/${storeWhatsApp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

const getOrdersEmail = (data) => {
  const raw = data?.orders?.email || "";
  const email = raw.trim();
  return email.includes("@") ? email : "";
};

const buildOrderEmailItems = (items) =>
  (items || [])
    .map((item) => {
      const name = currentLang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr;
      const total = (item.price || 0) * (item.qty || 0);
      return `- ${name} x${item.qty} (${formatCurrency(total)})`;
    })
    .join("\n");

const buildOrderEmailSubject = (orderId) => {
  const storeName = storeData.brand?.name || "Dody Store";
  if (currentLang === "ar") {
    return `طلب جديد #${orderId} - ${storeName}`;
  }
  return `New order #${orderId} - ${storeName}`;
};

const buildOrderEmailMessage = (formData, order) => {
  const itemsText = buildOrderEmailItems(order.items);
  if (currentLang === "ar") {
    return [
      `طلب جديد من ${storeData.brand?.name || "Dody Store"}`,
      `رقم الطلب: ${order.id}`,
      `الاسم: ${formData.name}`,
      `الهاتف: ${formData.phone}`,
      `العنوان: ${formData.address}`,
      formData.notes ? `ملاحظات: ${formData.notes}` : "ملاحظات: لا يوجد",
      "المنتجات:",
      itemsText,
      `الإجمالي: ${formatCurrency(order.total || 0)}`,
      `الدفع: ${translations[currentLang].paymentValue}`
    ].join("\n");
  }

  return [
    `New order from ${storeData.brand?.name || "Dody Store"}`,
    `Order ID: ${order.id}`,
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    `Address: ${formData.address}`,
    formData.notes ? `Notes: ${formData.notes}` : "Notes: None",
    "Items:",
    itemsText,
    `Total: ${formatCurrency(order.total || 0)}`,
    `Payment: ${translations[currentLang].paymentValue}`
  ].join("\n");
};

const buildEmailFormMarkup = () => `
  <div class="email-order-helper" id="emailOrderHelper" aria-hidden="true">
    <form id="emailOrderForm" method="POST" target="emailOrderFrame">
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_subject" id="emailOrderSubject" value="" />
      <input type="hidden" name="order_id" id="emailOrderId" value="" />
      <input type="hidden" name="customer_name" id="emailOrderName" value="" />
      <input type="hidden" name="customer_phone" id="emailOrderPhone" value="" />
      <input type="hidden" name="customer_address" id="emailOrderAddress" value="" />
      <input type="hidden" name="customer_notes" id="emailOrderNotes" value="" />
      <input type="hidden" name="order_items" id="emailOrderItems" value="" />
      <input type="hidden" name="order_total" id="emailOrderTotal" value="" />
      <input type="hidden" name="order_message" id="emailOrderMessage" value="" />
    </form>
    <iframe
      id="emailOrderFrame"
      name="emailOrderFrame"
      title="email-sender"
      style="display: none"
    ></iframe>
  </div>
`;

let emailFormReady = Promise.resolve();
const mountEmailForm = () => {
  if (!emailFormMount) {
    return;
  }
  emailFormReady = fetch("order-email-form.html", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("email form not found");
      }
      return response.text();
    })
    .then((htmlText) => {
      emailFormMount.innerHTML = htmlText;
    })
    .catch(() => {
      emailFormMount.innerHTML = buildEmailFormMarkup();
    });
};

const setEmailField = (id, value) => {
  const field = document.getElementById(id);
  if (field) {
    field.value = value || "";
  }
};

const sendOrderEmail = (formData, order) => {
  const email = getOrdersEmail(storeData);
  if (!email) {
    return;
  }
  emailFormReady.then(() => {
    const form = document.getElementById("emailOrderForm");
    if (!form) {
      return;
    }
    form.action = `https://formsubmit.co/${email}`;
    setEmailField("emailOrderSubject", buildOrderEmailSubject(order.id));
    setEmailField("emailOrderId", order.id);
    setEmailField("emailOrderName", formData.name);
    setEmailField("emailOrderPhone", formData.phone);
    setEmailField("emailOrderAddress", formData.address);
    setEmailField("emailOrderNotes", formData.notes || "");
    setEmailField("emailOrderItems", buildOrderEmailItems(order.items));
    setEmailField("emailOrderTotal", formatCurrency(order.total || 0));
    setEmailField("emailOrderMessage", buildOrderEmailMessage(formData, order));
    form.submit();
  });
};


const buildOrderMessage = (formData, orderId) => {
  const itemsLines = cart
    .map((item) => {
      const name = currentLang === "ar" ? item.nameAr : item.nameEn;
      return `- ${name} x${item.qty} (${formatCurrency(item.price * item.qty)})`;
    })
    .join("\n");

  if (currentLang === "ar") {
    return [
      `طلب جديد من ${storeData.brand?.name || "Dody Store"}`,
      `رقم الطلب: ${orderId}`,
      `الاسم: ${formData.name}`,
      `الهاتف: ${formData.phone}`,
      `العنوان: ${formData.address}`,
      formData.notes ? `ملاحظات: ${formData.notes}` : "ملاحظات: لا يوجد",
      "المنتجات:",
      itemsLines,
      `الإجمالي: ${cartTotal.textContent}`,
      `الدفع: ${translations[currentLang].paymentValue}`
    ].join("\n");
  }

  return [
    `New order from ${storeData.brand?.name || "Dody Store"}`,
    `Order ID: ${orderId}`,
    `Name: ${formData.name}`,
    `Phone: ${formData.phone}`,
    `Address: ${formData.address}`,
    formData.notes ? `Notes: ${formData.notes}` : "Notes: None",
    "Items:",
    itemsLines,
    `Total: ${cartTotal.textContent}`,
    `Payment: ${translations[currentLang].paymentValue}`
  ].join("\n");
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

const saveOrder = (order) => {
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem("dodyOrders", JSON.stringify(orders));
};

let addButtonsBound = false;
const bindProductActions = () => {
  if (addButtonsBound) {
    return;
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (button) {
      addToCart(button);
    }
  });
  addButtonsBound = true;
};

const openProductDetails = (productId) => {
  if (!productId) {
    return;
  }
  window.location.href = `product-details.html?id=${encodeURIComponent(productId)}`;
};

const openFeaturedBundle = () => {
  window.location.href = "bundle-details.html?id=featured";
};

const applyFilter = () => {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    if (activeFilter === "all" || card.dataset.category === activeFilter) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
};

const scrollTestimonials = (direction) => {
  if (!testimonialTrack) {
    return;
  }
  const card = testimonialTrack.querySelector(".testimonial-card");
  const gap = 16;
  const amount = card ? card.offsetWidth + gap : 240;
  const langFactor = currentLang === "ar" ? -1 : 1;
  testimonialTrack.scrollBy({ left: direction * amount * langFactor, behavior: "smooth" });
};

const applyTranslations = () => {
  const pageTitle =
    currentLang === "ar"
      ? `${storeData.brand?.name || "Dody Store"} | متجر العناية بالبشرة والمكياج`
      : `${storeData.brand?.name || "Dody Store"} | Skincare & Makeup Store`;
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

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (translations[currentLang][key]) {
      element.placeholder = translations[currentLang][key];
    }
  });

  paymentMethod.value = translations[currentLang].paymentValue;
  langToggle.textContent = currentLang === "ar" ? "English" : "عربي";

  if (activeSkin && storeData.routine?.[activeSkin]) {
    routineResult.textContent = storeData.routine[activeSkin][currentLang];
  } else {
    routineResult.textContent = translations[currentLang].routineHint;
  }

  setText("copyright", translations[currentLang].copyright);

  renderContent();
  renderCart();
  updateOrderStatus(orderStatus.dataset.key || "orderHint", orderStatus.dataset.type || "hint");
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

if (productGrid) {
  productGrid.addEventListener("click", (event) => {
    const askButton = event.target.closest(".ask-product");
    if (askButton) {
      openProductQuestion(askButton);
      return;
    }
    const detailsButton = event.target.closest(".view-details");
    if (detailsButton) {
      openProductDetails(detailsButton.dataset.productId);
      return;
    }
    const card = event.target.closest(".product-card");
    if (!card) {
      return;
    }
    if (event.target.closest(".add-to-cart")) {
      return;
    }
    openProductDetails(card.dataset.id);
  });
}

if (testimonialPrev) {
  testimonialPrev.addEventListener("click", () => scrollTestimonials(-1));
}
if (testimonialNext) {
  testimonialNext.addEventListener("click", () => scrollTestimonials(1));
}

const chips = document.querySelectorAll(".chip");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const skinKey = chip.dataset.skin;
    activeSkin = skinKey;
    chips.forEach((item) => item.classList.remove("active-chip"));
    chip.classList.add("active-chip");
    routineResult.textContent = storeData.routine?.[skinKey]?.[currentLang] || "";
  });
});

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("lang", currentLang);
  applyTranslations();
});

cartButton.addEventListener("click", () => toggleCart(true));
closeCart.addEventListener("click", () => toggleCart(false));
overlay.addEventListener("click", () => toggleCart(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleCart(false);
    toggleGiftModal(false);
  }
});

cartItems.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("remove-item")) {
    const id = target.dataset.id;
    cart = cart.filter((item) => item.id !== id);
    renderCart();
    persistCart();
  }
});

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    updateOrderStatus("orderErrorEmpty", "error");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const notes = document.getElementById("customerNotes").value.trim();

  if (!name || !phone || !address) {
    updateOrderStatus("orderErrorFields", "error");
    return;
  }

  updateOrderStatus("orderSending", "hint");

  let waWindow = null;
  try {
    waWindow = window.open("", "_blank");
  } catch (error) {
    waWindow = null;
  }

  const orderPayload = {
    name,
    phone,
    address,
    notes,
    lang: currentLang,
    items: cart.map((item) => ({
      id: item.id,
      nameAr: item.nameAr,
      nameEn: item.nameEn,
      price: item.price,
      qty: item.qty
    }))
  };

  const savedOrder = await window.DodyApi?.createOrder?.(orderPayload);
  if (!savedOrder || !savedOrder.id) {
    updateOrderStatus("orderFailed", "error");
    if (waWindow && !waWindow.closed) {
      waWindow.close();
    }
    return;
  }

  orderStatus.dataset.orderId = savedOrder.id;
  updateOrderStatus("orderSuccess", "success");

  sendOrderEmail({ name, phone, address, notes }, savedOrder);

  const message = buildOrderMessage({ name, phone, address, notes }, savedOrder.id);
  const url = `https://wa.me/${storeWhatsApp}?text=${encodeURIComponent(message)}`;
  if (waWindow && !waWindow.closed) {
    waWindow.location.href = url;
  } else {
    window.open(url, "_blank");
  }

  cart = [];
  renderCart();
  orderForm.reset();
  clearOrderDraft();
  paymentMethod.value = translations[currentLang].paymentValue;
});

if (aboutCardBtn) {
  aboutCardBtn.addEventListener("click", () => {
    if (giftModal) {
      toggleGiftModal(true);
    } else {
      toggleCart(true);
    }
  });
}

if (giftClose) {
  giftClose.addEventListener("click", () => toggleGiftModal(false));
}

if (giftModal) {
  giftModal.addEventListener("click", (event) => {
    if (event.target === giftModal) {
      toggleGiftModal(false);
    }
  });
}

if (giftWhatsAppBtn) {
  giftWhatsAppBtn.addEventListener("click", () => {
    const targetNumber = getWhatsAppNumber(storeData);
    const message = getGiftMessage();
    if (targetNumber) {
      window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`, "_blank");
    }
    toggleGiftModal(false);
  });
}

if (giftShopBtn) {
  giftShopBtn.addEventListener("click", () => {
    toggleGiftModal(false);
    toggleCart(true);
  });
}

const initOrderDraft = () => {
  if (!orderForm) {
    return;
  }
  const draft = loadOrderDraft();
  if (draft) {
    if (customerNameInput) customerNameInput.value = draft.name || "";
    if (customerPhoneInput) customerPhoneInput.value = draft.phone || "";
    if (customerAddressInput) customerAddressInput.value = draft.address || "";
    if (customerNotesInput) customerNotesInput.value = draft.notes || "";
  }

  const syncDraft = () => {
    saveOrderDraft({
      name: customerNameInput?.value.trim() || "",
      phone: customerPhoneInput?.value.trim() || "",
      address: customerAddressInput?.value.trim() || "",
      notes: customerNotesInput?.value.trim() || ""
    });
  };

  [customerNameInput, customerPhoneInput, customerAddressInput, customerNotesInput].forEach(
    (input) => {
      if (!input) {
        return;
      }
      input.addEventListener("input", syncDraft);
      input.addEventListener("blur", syncDraft);
    }
  );
};

if (featuredDetails) {
  featuredDetails.addEventListener("click", () => {
    openFeaturedBundle();
  });
}

if (featuredCard) {
  featuredCard.addEventListener("click", (event) => {
    if (event.target.closest(".add-to-cart")) {
      return;
    }
    openFeaturedBundle();
  });
}

if (collectionGrid) {
  collectionGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".collection-card");
    if (!card) {
      return;
    }
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });
}

shopNow.addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

seeBundles.addEventListener("click", () => {
  document.getElementById("collections").scrollIntoView({ behavior: "smooth" });
});

const backToTopBtn = document.getElementById("backToTop");
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

const initApp = async () => {
  storeData = await loadStoreData();
  storeWhatsApp = getWhatsAppNumber(storeData);
  if (orderStatus) {
    orderStatus.dataset.key = "orderHint";
    orderStatus.dataset.type = "hint";
  }
  mountEmailForm();
  applyTranslations();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("cart") === "open") {
    toggleCart(true);
  }

  initOrderDraft();
};

initApp();
