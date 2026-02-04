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

let storeData = loadStoreData();

let dashLang = localStorage.getItem("dodyDashLang") || "ar";
const dashI18n = {
  ar: {
    adminTitle: "دخول لوحة التحكم",
    adminDesc: "أدخل الرمز السري للوصول إلى لوحة الإدارة.",
    adminLogin: "دخول",
    adminHint: "اسأل المسؤول عن الرمز.",
    adminPinError: "الرمز غير صحيح.",
    adminPinPlaceholder: "••••",
    dashTitle: "لوحة تحكم Dody Store",
    dashSubtitle: "إدارة المحتوى والطلبات بسهولة",
    navToggle: "القائمة",
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
    exportData: "تصدير Excel",
    exportEmpty: "لا يوجد بيانات لتصديرها.",
    importData: "استيراد",
    backToSite: "رجوع للموقع",
    logout: "تسجيل خروج",
    saveAll: "حفظ التغييرات",
    saveSuccess: "تم حفظ التغييرات بنجاح ✔",
    importSuccess: "تم استيراد البيانات بنجاح ✔",
    importError: "فشل استيراد البيانات. تأكد من الملف.",
    generalSettings: "الإعدادات العامة",
    storeName: "اسم المتجر",
    storeTagAr: "وصف المتجر (عربي)",
    storeTagEn: "وصف المتجر (إنجليزي)",
    whatsappDisplay: "واتساب (عرض)",
    whatsappIntl: "واتساب دولي (بدون +)",
    instagramLabel: "إنستجرام",
    hoursAr: "ساعات العمل (عربي)",
    hoursEn: "ساعات العمل (إنجليزي)",
    deliveryTimeAr: "وقت التوصيل (عربي)",
    deliveryTimeEn: "وقت التوصيل (إنجليزي)",
    homeSamplesCount: "عدد منتجات المعاينة بالرئيسية",
    footerDescAr: "وصف الفوتر (عربي)",
    footerDescEn: "وصف الفوتر (إنجليزي)",
    adminPinLabel: "رمز دخول اللوحة",
    logoTitle: "شعار المتجر",
    logoDesc: "ارفع صورة الشعار وسيتم حفظها داخل المتصفح.",
    faviconTitle: "أيقونة المتصفح",
    faviconDesc: "ارفع أيقونة صغيرة تظهر في تبويب المتصفح.",
    footerServicesTitle: "خدمات الفوتر (3 عناصر)",
    heroSectionTitle: "الهيرو والباقات",
    heroEyebrowAr: "عنوان صغير (عربي)",
    heroEyebrowEn: "عنوان صغير (إنجليزي)",
    heroTitleAr: "عنوان الهيرو (عربي)",
    heroTitleEn: "عنوان الهيرو (إنجليزي)",
    heroDescAr: "وصف الهيرو (عربي)",
    heroDescEn: "وصف الهيرو (إنجليزي)",
    heroPrimaryAr: "زر رئيسي (عربي)",
    heroPrimaryEn: "زر رئيسي (إنجليزي)",
    heroSecondaryAr: "زر ثانوي (عربي)",
    heroSecondaryEn: "زر ثانوي (إنجليزي)",
    heroBadgesTitle: "شريط المميزات (3 عناصر)",
    stripTitle: "شريط الأرقام (4 عناصر)",
    featuredTitle: "المجموعة المميزة",
    featuredNameAr: "اسم (عربي)",
    featuredNameEn: "اسم (إنجليزي)",
    featuredDescAr: "وصف (عربي)",
    featuredDescEn: "وصف (إنجليزي)",
    featuredPrice: "السعر",
    featuredImagePath: "صورة (مسار اختياري)",
    featuredImageTitle: "صورة المجموعة المميزة",
    featuredImageDesc: "اختاري صورة من جهازك بدل كتابة المسار.",
    featuredItemsTitle: "مكونات باقة الدودي اليومية",
    addFeaturedItem: "إضافة منتج للباقة",
    sectionsTitle: "عناوين الأقسام",
    collectionsTitleAr: "عنوان الباقات (عربي)",
    collectionsTitleEn: "عنوان الباقات (إنجليزي)",
    collectionsDescAr: "وصف الباقات (عربي)",
    collectionsDescEn: "وصف الباقات (إنجليزي)",
    productsTitleAr: "عنوان المنتجات (عربي)",
    productsTitleEn: "عنوان المنتجات (إنجليزي)",
    productsDescAr: "وصف المنتجات (عربي)",
    productsDescEn: "وصف المنتجات (إنجليزي)",
    ingredientsTitleAr: "عنوان المكونات (عربي)",
    ingredientsTitleEn: "عنوان المكونات (إنجليزي)",
    ingredientsDescAr: "وصف المكونات (عربي)",
    ingredientsDescEn: "وصف المكونات (إنجليزي)",
    testimonialsTitleAr: "عنوان التقييمات (عربي)",
    testimonialsTitleEn: "عنوان التقييمات (إنجليزي)",
    testimonialsDescAr: "وصف التقييمات (عربي)",
    testimonialsDescEn: "وصف التقييمات (إنجليزي)",
    categoriesTitle: "أنواع المنتجات",
    addCategory: "إضافة نوع",
    collectionsSectionTitle: "الباقات الجاهزة",
    addCollection: "إضافة باقة",
    productsSectionTitle: "المنتجات",
    addProduct: "إضافة منتج",
    ingredientsSectionTitle: "المكونات",
    addIngredient: "إضافة مكون",
    testimonialsSectionTitle: "آراء العملاء",
    addTestimonial: "إضافة رأي",
    aboutSectionTitle: "قسم عن المتجر",
    aboutTitleAr: "العنوان (عربي)",
    aboutTitleEn: "العنوان (إنجليزي)",
    aboutDescAr: "الوصف (عربي)",
    aboutDescEn: "الوصف (إنجليزي)",
    statsTitle: "الأرقام",
    addStat: "إضافة رقم",
    aboutCardTitle: "كارت العرض",
    aboutCardTitleAr: "العنوان (عربي)",
    aboutCardTitleEn: "العنوان (إنجليزي)",
    aboutCardDescAr: "الوصف (عربي)",
    aboutCardDescEn: "الوصف (إنجليزي)",
    aboutCardBtnAr: "زر الكارت (عربي)",
    aboutCardBtnEn: "زر الكارت (إنجليزي)",
    aboutCardMessageAr: "رسالة واتساب (عربي)",
    aboutCardMessageEn: "رسالة واتساب (إنجليزي)",
    ordersTitle: "الطلبات",
    clearOrders: "مسح كل الطلبات",
    saveNote: "لم يتم الحفظ بعد.",
    summaryOrders: "إجمالي الطلبات",
    summaryNew: "طلبات جديدة",
    summaryProcessing: "قيد التنفيذ",
    summaryRevenue: "إجمالي المبيعات",
    summaryProducts: "عدد المنتجات",
    ordersSummary: "عدد الطلبات",
    ordersSummaryNew: "جديدة",
    ordersSummaryCancelled: "ملغاة",
    ordersHeaderCustomer: "العميل",
    ordersHeaderId: "رقم الطلب",
    ordersHeaderDate: "التاريخ",
    ordersHeaderTotal: "الإجمالي",
    ordersHeaderStatus: "الحالة",
    ordersHeaderActions: "الإجراءات",
    ordersHeaderShipping: "الشحن",
    ordersHeaderItems: "المنتجات",
    ordersDeliveryLabel: "التوصيل",
    ordersNetLabel: "الصافي",
    shippingPending: "لم يتم الشحن",
    shippingShipped: "تم الشحن",
    statusNew: "جديد",
    statusProcessing: "قيد التنفيذ",
    statusDone: "تم التسليم",
    statusCancelled: "ملغي",
    viewDetails: "تفاصيل",
    whatsappAction: "واتساب",
    noOrders: "لا يوجد طلبات حتى الآن.",
    confirmClearOrders: "هل تريد مسح كل الطلبات؟",
    remove: "حذف",
    clearImage: "مسح الصورة",
    uploadImage: "رفع صورة",
    productStatusLabel: "حالة المنتج",
    statusVisible: "ظاهر",
    statusHidden: "مخفي",
    availabilityLabel: "التوفر",
    availabilityAvailable: "متوفر",
    availabilityUnavailable: "غير متاح",
    badgeArPlaceholder: "ميزة بالعربي",
    badgeEnPlaceholder: "Badge in English",
    stripArPlaceholder: "عنصر بالعربي",
    stripEnPlaceholder: "Item in English",
    serviceArPlaceholder: "خدمة بالعربي",
    serviceEnPlaceholder: "Service in English",
    categoryIdPlaceholder: "الكود",
    categoryNameArPlaceholder: "الاسم بالعربي",
    categoryNameEnPlaceholder: "Name EN",
    collectionTitleArPlaceholder: "عنوان بالعربي",
    collectionTitleEnPlaceholder: "Title in English",
    collectionDescArPlaceholder: "وصف بالعربي",
    collectionDescEnPlaceholder: "Description in English",
    collectionTagArPlaceholder: "الوسم بالعربي",
    collectionTagEnPlaceholder: "Tag in English",
    productIdPlaceholder: "id",
    productTagPlaceholder: "Tag",
    productPricePlaceholder: "السعر",
    productImagePlaceholder: "مسار الصورة (اختياري)",
    productNameArPlaceholder: "اسم عربي",
    productNameEnPlaceholder: "Name EN",
    productDescArPlaceholder: "وصف عربي",
    productDescEnPlaceholder: "Description EN",
    ingredientTitleArPlaceholder: "عنوان عربي",
    ingredientTitleEnPlaceholder: "Title EN",
    ingredientDescArPlaceholder: "وصف عربي",
    ingredientDescEnPlaceholder: "Description EN",
    testimonialQuoteArPlaceholder: "التعليق بالعربي",
    testimonialQuoteEnPlaceholder: "Quote EN",
    testimonialNameArPlaceholder: "الاسم بالعربي",
    testimonialNameEnPlaceholder: "Name EN",
    testimonialImagePlaceholder: "مسار صورة التعليق (اختياري)",
    statValuePlaceholder: "القيمة",
    statLabelArPlaceholder: "الوصف عربي",
    statLabelEnPlaceholder: "Label EN",
    contactCtaSectionTitle: "دعوة واتساب",
    contactCtaTitleAr: "عنوان الدعوة (عربي)",
    contactCtaTitleEn: "عنوان الدعوة (إنجليزي)",
    contactCtaDescAr: "وصف الدعوة (عربي)",
    contactCtaDescEn: "وصف الدعوة (إنجليزي)",
    contactCtaButtonAr: "زر الدعوة (عربي)",
    contactCtaButtonEn: "زر الدعوة (إنجليزي)",
    contactCtaNoteAr: "ملاحظة أسفل الزر (عربي)",
    contactCtaNoteEn: "ملاحظة أسفل الزر (إنجليزي)",
    contactCtaMessageAr: "رسالة واتساب الجاهزة (عربي)",
    contactCtaMessageEn: "رسالة واتساب الجاهزة (إنجليزي)",
    homeSamplesTitle: "منتجات الصفحة الرئيسية",
    addHomeSample: "إضافة منتج",
    homeSamplesHint: "لو القائمة فاضية سيتم عرض أول المنتجات تلقائيًا."
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
    navToggle: "Menu",
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
    exportData: "Export Excel",
    exportEmpty: "No data to export.",
    importData: "Import",
    backToSite: "Back to site",
    logout: "Logout",
    saveAll: "Save changes",
    saveSuccess: "Changes saved ✔",
    importSuccess: "Data imported ✔",
    importError: "Import failed. Check the file.",
    generalSettings: "General settings",
    storeName: "Store name",
    storeTagAr: "Store tagline (AR)",
    storeTagEn: "Store tagline (EN)",
    whatsappDisplay: "WhatsApp (display)",
    whatsappIntl: "WhatsApp international (no +)",
    instagramLabel: "Instagram",
    hoursAr: "Working hours (AR)",
    hoursEn: "Working hours (EN)",
    deliveryTimeAr: "Delivery time (AR)",
    deliveryTimeEn: "Delivery time (EN)",
    homeSamplesCount: "Homepage sample count",
    footerDescAr: "Footer description (AR)",
    footerDescEn: "Footer description (EN)",
    adminPinLabel: "Dashboard PIN",
    logoTitle: "Store logo",
    logoDesc: "Upload the logo and it will be saved in the browser.",
    faviconTitle: "Browser icon",
    faviconDesc: "Upload a small icon shown in the browser tab.",
    footerServicesTitle: "Footer services (3 items)",
    heroSectionTitle: "Hero & bundles",
    heroEyebrowAr: "Eyebrow (AR)",
    heroEyebrowEn: "Eyebrow (EN)",
    heroTitleAr: "Hero title (AR)",
    heroTitleEn: "Hero title (EN)",
    heroDescAr: "Hero description (AR)",
    heroDescEn: "Hero description (EN)",
    heroPrimaryAr: "Primary button (AR)",
    heroPrimaryEn: "Primary button (EN)",
    heroSecondaryAr: "Secondary button (AR)",
    heroSecondaryEn: "Secondary button (EN)",
    heroBadgesTitle: "Hero badges (3 items)",
    stripTitle: "Stats strip (4 items)",
    featuredTitle: "Featured bundle",
    featuredNameAr: "Name (AR)",
    featuredNameEn: "Name (EN)",
    featuredDescAr: "Description (AR)",
    featuredDescEn: "Description (EN)",
    featuredPrice: "Price",
    featuredImagePath: "Image path (optional)",
    featuredImageTitle: "Featured image",
    featuredImageDesc: "Pick an image instead of typing a path.",
    featuredItemsTitle: "Daily bundle items",
    addFeaturedItem: "Add bundle item",
    sectionsTitle: "Section headings",
    collectionsTitleAr: "Bundles title (AR)",
    collectionsTitleEn: "Bundles title (EN)",
    collectionsDescAr: "Bundles description (AR)",
    collectionsDescEn: "Bundles description (EN)",
    productsTitleAr: "Products title (AR)",
    productsTitleEn: "Products title (EN)",
    productsDescAr: "Products description (AR)",
    productsDescEn: "Products description (EN)",
    ingredientsTitleAr: "Ingredients title (AR)",
    ingredientsTitleEn: "Ingredients title (EN)",
    ingredientsDescAr: "Ingredients description (AR)",
    ingredientsDescEn: "Ingredients description (EN)",
    testimonialsTitleAr: "Testimonials title (AR)",
    testimonialsTitleEn: "Testimonials title (EN)",
    testimonialsDescAr: "Testimonials description (AR)",
    testimonialsDescEn: "Testimonials description (EN)",
    categoriesTitle: "Product types",
    addCategory: "Add type",
    collectionsSectionTitle: "Bundles",
    addCollection: "Add bundle",
    productsSectionTitle: "Products",
    addProduct: "Add product",
    ingredientsSectionTitle: "Ingredients",
    addIngredient: "Add ingredient",
    testimonialsSectionTitle: "Testimonials",
    addTestimonial: "Add testimonial",
    aboutSectionTitle: "About section",
    aboutTitleAr: "Title (AR)",
    aboutTitleEn: "Title (EN)",
    aboutDescAr: "Description (AR)",
    aboutDescEn: "Description (EN)",
    statsTitle: "Stats",
    addStat: "Add stat",
    aboutCardTitle: "Promo card",
    aboutCardTitleAr: "Card title (AR)",
    aboutCardTitleEn: "Card title (EN)",
    aboutCardDescAr: "Card description (AR)",
    aboutCardDescEn: "Card description (EN)",
    aboutCardBtnAr: "Card button (AR)",
    aboutCardBtnEn: "Card button (EN)",
    aboutCardMessageAr: "WhatsApp message (AR)",
    aboutCardMessageEn: "WhatsApp message (EN)",
    ordersTitle: "Orders",
    clearOrders: "Clear all orders",
    saveNote: "Not saved yet.",
    summaryOrders: "Total orders",
    summaryNew: "New orders",
    summaryProcessing: "Processing",
    summaryRevenue: "Total revenue",
    summaryProducts: "Total products",
    ordersSummary: "Orders",
    ordersSummaryNew: "New",
    ordersSummaryCancelled: "Cancelled",
    ordersHeaderCustomer: "Customer",
    ordersHeaderId: "Order ID",
    ordersHeaderDate: "Date",
    ordersHeaderTotal: "Total",
    ordersHeaderStatus: "Status",
    ordersHeaderActions: "Actions",
    ordersHeaderShipping: "Shipping",
    ordersHeaderItems: "Items",
    ordersDeliveryLabel: "Delivery",
    ordersNetLabel: "Net",
    shippingPending: "Not shipped",
    shippingShipped: "Shipped",
    statusNew: "New",
    statusProcessing: "Processing",
    statusDone: "Delivered",
    statusCancelled: "Cancelled",
    viewDetails: "Details",
    whatsappAction: "WhatsApp",
    noOrders: "No orders yet.",
    confirmClearOrders: "Clear all orders?",
    remove: "Remove",
    clearImage: "Remove image",
    uploadImage: "Upload image",
    productStatusLabel: "Product status",
    statusVisible: "Visible",
    statusHidden: "Hidden",
    availabilityLabel: "Availability",
    availabilityAvailable: "Available",
    availabilityUnavailable: "Unavailable",
    badgeArPlaceholder: "Badge (AR)",
    badgeEnPlaceholder: "Badge (EN)",
    stripArPlaceholder: "Stat (AR)",
    stripEnPlaceholder: "Stat (EN)",
    serviceArPlaceholder: "Service (AR)",
    serviceEnPlaceholder: "Service (EN)",
    categoryIdPlaceholder: "ID",
    categoryNameArPlaceholder: "Name (AR)",
    categoryNameEnPlaceholder: "Name (EN)",
    collectionTitleArPlaceholder: "Title (AR)",
    collectionTitleEnPlaceholder: "Title (EN)",
    collectionDescArPlaceholder: "Description (AR)",
    collectionDescEnPlaceholder: "Description (EN)",
    collectionTagArPlaceholder: "Tag (AR)",
    collectionTagEnPlaceholder: "Tag (EN)",
    productIdPlaceholder: "ID",
    productTagPlaceholder: "Tag",
    productPricePlaceholder: "Price",
    productImagePlaceholder: "Image path (optional)",
    productNameArPlaceholder: "Name (AR)",
    productNameEnPlaceholder: "Name (EN)",
    productDescArPlaceholder: "Description (AR)",
    productDescEnPlaceholder: "Description (EN)",
    ingredientTitleArPlaceholder: "Title (AR)",
    ingredientTitleEnPlaceholder: "Title (EN)",
    ingredientDescArPlaceholder: "Description (AR)",
    ingredientDescEnPlaceholder: "Description (EN)",
    testimonialQuoteArPlaceholder: "Quote (AR)",
    testimonialQuoteEnPlaceholder: "Quote (EN)",
    testimonialNameArPlaceholder: "Name (AR)",
    testimonialNameEnPlaceholder: "Name (EN)",
    testimonialImagePlaceholder: "Testimonial image path (optional)",
    statValuePlaceholder: "Value",
    statLabelArPlaceholder: "Label (AR)",
    statLabelEnPlaceholder: "Label (EN)",
    contactCtaSectionTitle: "WhatsApp CTA",
    contactCtaTitleAr: "Title (AR)",
    contactCtaTitleEn: "Title (EN)",
    contactCtaDescAr: "Description (AR)",
    contactCtaDescEn: "Description (EN)",
    contactCtaButtonAr: "Button text (AR)",
    contactCtaButtonEn: "Button text (EN)",
    contactCtaNoteAr: "Note (AR)",
    contactCtaNoteEn: "Note (EN)",
    contactCtaMessageAr: "WhatsApp message (AR)",
    contactCtaMessageEn: "WhatsApp message (EN)",
    homeSamplesTitle: "Home page products",
    addHomeSample: "Add product",
    homeSamplesHint: "If empty, the first products will be shown automatically."
  }
};

const t = (key) => dashI18n[dashLang]?.[key] || key;
const getLocale = () => (dashLang === "ar" ? "ar-EG" : "en-US");
const formatCurrency = (value) => `${value} ${dashLang === "ar" ? "جنيه" : "EGP"}`;

const getValue = (id) => document.getElementById(id)?.value.trim() || "";
const setValue = (id, value) => {
  const element = document.getElementById(id);
  if (element) {
    element.value = value ?? "";
  }
};

const adminGate = document.getElementById("adminGate");
const adminPinInput = document.getElementById("adminPinInput");
const adminPinBtn = document.getElementById("adminPinBtn");
const adminPinHint = document.getElementById("adminPinHint");
const logoutBtn = document.getElementById("logoutBtn");
const dashLangToggle = document.getElementById("dashLangToggle");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const dashSections = document.querySelectorAll(".dash-main > section");
const navLinks = document.querySelectorAll(".dash-nav .nav-link");

const summaryCards = document.getElementById("summaryCards");
const heroBadgesInputs = document.getElementById("heroBadgesInputs");
const stripInputs = document.getElementById("stripInputs");
const servicesInputs = document.getElementById("servicesInputs");
const categoriesInputs = document.getElementById("categoriesInputs");
const collectionsInputs = document.getElementById("collectionsInputs");
const productsInputs = document.getElementById("productsInputs");
const ingredientsInputs = document.getElementById("ingredientsInputs");
const testimonialsInputs = document.getElementById("testimonialsInputs");
const statsInputs = document.getElementById("statsInputs");
const ordersTable = document.getElementById("ordersTable");
const ordersSummary = document.getElementById("ordersSummary");
const saveNote = document.getElementById("saveNote");
const brandLogoFile = document.getElementById("brandLogoFile");
const brandLogoPreview = document.getElementById("brandLogoPreview");
const brandFaviconFile = document.getElementById("brandFaviconFile");
const brandFaviconPreview = document.getElementById("brandFaviconPreview");
const featuredImageFile = document.getElementById("featuredImageFile");
const featuredImagePreview = document.getElementById("featuredImagePreview");
const deliveryTimeArInput = document.getElementById("deliveryTimeArInput");
const deliveryTimeEnInput = document.getElementById("deliveryTimeEnInput");
const homeSamplesInput = document.getElementById("homeSamplesInput");
const homeSamplesInputs = document.getElementById("homeSamplesInputs");
const addHomeSampleBtn = document.getElementById("addHomeSample");
const featuredItemsInputs = document.getElementById("featuredItemsInputs");
const contactCtaTitleArInput = document.getElementById("contactCtaTitleArInput");
const contactCtaTitleEnInput = document.getElementById("contactCtaTitleEnInput");
const contactCtaDescArInput = document.getElementById("contactCtaDescArInput");
const contactCtaDescEnInput = document.getElementById("contactCtaDescEnInput");
const contactCtaButtonArInput = document.getElementById("contactCtaButtonArInput");
const contactCtaButtonEnInput = document.getElementById("contactCtaButtonEnInput");
const contactCtaNoteArInput = document.getElementById("contactCtaNoteArInput");
const contactCtaNoteEnInput = document.getElementById("contactCtaNoteEnInput");
const contactCtaMessageArInput = document.getElementById("contactCtaMessageArInput");
const contactCtaMessageEnInput = document.getElementById("contactCtaMessageEnInput");
const backToTopBtn = document.getElementById("backToTop");

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

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

const setSaveNote = (stateKey, color) => {
  if (!saveNote) {
    return;
  }
  saveNote.dataset.state = stateKey;
  saveNote.dataset.i18n = stateKey;
  saveNote.textContent = t(stateKey);
  saveNote.style.color = color || "";
};

const applyDashLang = () => {
  const root = document.documentElement;
  root.lang = dashLang === "ar" ? "ar" : "en";
  root.dir = dashLang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("ltr", dashLang === "en");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dashI18n[dashLang]?.[key]) {
      element.textContent = t(key);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dashI18n[dashLang]?.[key]) {
      element.placeholder = t(key);
    }
  });

  if (dashLangToggle) {
    dashLangToggle.textContent = dashLang === "ar" ? "English" : "عربي";
  }

  const favicon = document.getElementById("siteFavicon");
  if (favicon) {
    favicon.href = storeData.brand?.favicon || storeData.brand?.logo || "assets/logo.svg";
  }

  renderSummary();
  renderOrders();
  refreshCategoryOptions();
  refreshStatusOptions();
  refreshAvailabilityOptions();
  refreshProductOptions();
};

const showDashSection = (sectionId) => {
  if (!dashSections || dashSections.length === 0) {
    return;
  }
  let found = false;
  dashSections.forEach((section) => {
    const isMatch = section.id === sectionId;
    if (isMatch) {
      found = true;
    }
    section.style.display = isMatch ? "block" : "none";
  });
  if (!found) {
    dashSections.forEach((section) => {
      section.style.display = "block";
    });
  }
  if (saveNote) {
    saveNote.style.display = "block";
  }
};

const setActiveNav = (targetLink) => {
  navLinks.forEach((link) => link.classList.remove("active"));
  if (targetLink) {
    targetLink.classList.add("active");
  }
};

const renderSummary = () => {
  const orders = loadOrders();
  const validOrders = orders.filter((order) => order.status !== "cancelled");
  const totalRevenue = validOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const newOrders = orders.filter((order) => order.status === "new").length;
  const processingOrders = orders.filter((order) => order.status === "processing").length;
  const productsCount = storeData.products?.length || 0;

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
      <h4>${t("summaryProducts")}</h4>
      <span>${productsCount}</span>
    </div>
  `;
};
const renderHeroBadges = () => {
  heroBadgesInputs.innerHTML = "";
  const badgesAr = storeData.hero?.badges?.ar || [];
  const badgesEn = storeData.hero?.badges?.en || [];
  const count = Math.max(badgesAr.length, badgesEn.length, 3);

  for (let i = 0; i < count; i += 1) {
    heroBadgesInputs.insertAdjacentHTML(
      "beforeend",
      `
        <div class="list-row" data-index="${i}" data-type="badge">
          <input type="text" data-lang="ar" data-i18n-placeholder="badgeArPlaceholder" placeholder="${t(
            "badgeArPlaceholder"
          )}" value="${badgesAr[i] || ""}" />
          <input type="text" data-lang="en" data-i18n-placeholder="badgeEnPlaceholder" placeholder="${t(
            "badgeEnPlaceholder"
          )}" value="${badgesEn[i] || ""}" />
        </div>
      `
    );
  }
};

const renderStrip = () => {
  stripInputs.innerHTML = "";
  const stripAr = storeData.strip?.ar || [];
  const stripEn = storeData.strip?.en || [];
  const count = Math.max(stripAr.length, stripEn.length, 4);

  for (let i = 0; i < count; i += 1) {
    stripInputs.insertAdjacentHTML(
      "beforeend",
      `
        <div class="list-row" data-index="${i}" data-type="strip">
          <input type="text" data-lang="ar" data-i18n-placeholder="stripArPlaceholder" placeholder="${t(
            "stripArPlaceholder"
          )}" value="${stripAr[i] || ""}" />
          <input type="text" data-lang="en" data-i18n-placeholder="stripEnPlaceholder" placeholder="${t(
            "stripEnPlaceholder"
          )}" value="${stripEn[i] || ""}" />
        </div>
      `
    );
  }
};

const renderServices = () => {
  servicesInputs.innerHTML = "";
  const services = storeData.footer?.services || [];
  const count = Math.max(services.length, 3);
  for (let i = 0; i < count; i += 1) {
    const service = services[i] || { ar: "", en: "" };
    servicesInputs.insertAdjacentHTML(
      "beforeend",
      `
        <div class="list-row" data-index="${i}" data-type="service">
          <input type="text" data-lang="ar" data-i18n-placeholder="serviceArPlaceholder" placeholder="${t(
            "serviceArPlaceholder"
          )}" value="${service.ar || ""}" />
          <input type="text" data-lang="en" data-i18n-placeholder="serviceEnPlaceholder" placeholder="${t(
            "serviceEnPlaceholder"
          )}" value="${service.en || ""}" />
        </div>
      `
    );
  }
};

const getCategoryLabel = (category) =>
  category?.label?.[dashLang] || category?.label?.ar || category?.label?.en || category?.id || "";

const getCategoriesFromInputs = () => {
  if (!categoriesInputs) {
    return storeData.categories || [];
  }
  const rows = categoriesInputs.querySelectorAll("[data-type='category']");
  if (rows.length === 0) {
    return storeData.categories || [];
  }

  return Array.from(rows)
    .map((row, index) => {
      const id = row.querySelector("[data-field='id']")?.value.trim() || "";
      const labelAr = row.querySelector("[data-field='label.ar']")?.value.trim() || "";
      const labelEn = row.querySelector("[data-field='label.en']")?.value.trim() || "";
      if (!id && !labelAr && !labelEn) {
        return null;
      }
      return {
        id: id || `category-${index + 1}`,
        label: { ar: labelAr, en: labelEn }
      };
    })
    .filter(Boolean);
};

const buildCategoryOptions = (selectedId = "") => {
  const categories = getCategoriesFromInputs();
  const options = categories
    .map((category) => {
      const label = getCategoryLabel(category);
      const selected = category.id === selectedId ? "selected" : "";
      return `<option value="${category.id}" ${selected}>${label}</option>`;
    })
    .join("");

  if (selectedId && !categories.some((category) => category.id === selectedId)) {
    return `<option value="${selectedId}" selected>${selectedId}</option>${options}`;
  }

  return options;
};

const refreshCategoryOptions = () => {
  if (!productsInputs) {
    return;
  }
  const selects = productsInputs.querySelectorAll("select[data-field='category']");
  selects.forEach((select) => {
    const current = select.value;
    select.innerHTML = buildCategoryOptions(current);
    if (current) {
      select.value = current;
    }
  });
};

const refreshStatusOptions = () => {
  if (!productsInputs) {
    return;
  }
  productsInputs.querySelectorAll("select[data-field='active']").forEach((select) => {
    const current = select.value;
    select.innerHTML = `
      <option value="true">${t("statusVisible")}</option>
      <option value="false">${t("statusHidden")}</option>
    `;
    if (current) {
      select.value = current;
    }
  });
};

const refreshAvailabilityOptions = () => {
  if (!productsInputs) {
    return;
  }
  productsInputs.querySelectorAll("select[data-field='available']").forEach((select) => {
    const current = select.value;
    select.innerHTML = `
      <option value="true">${t("availabilityAvailable")}</option>
      <option value="false">${t("availabilityUnavailable")}</option>
    `;
    if (current) {
      select.value = current;
    }
  });
};

const getProductLabel = (product) =>
  product?.name?.[dashLang] || product?.name?.ar || product?.name?.en || product?.id || "";

const getProductsFromInputs = () => {
  if (!productsInputs) {
    return storeData.products || [];
  }
  const rows = productsInputs.querySelectorAll("[data-type='product']");
  if (rows.length === 0) {
    return storeData.products || [];
  }

  return Array.from(rows)
    .map((row, index) => {
      const id = row.querySelector("[data-field='id']")?.value.trim() || "";
      const nameAr = row.querySelector("[data-field='name.ar']")?.value.trim() || "";
      const nameEn = row.querySelector("[data-field='name.en']")?.value.trim() || "";
      if (!id && !nameAr && !nameEn) {
        return null;
      }
      return {
        id: id || `product-${index + 1}`,
        name: { ar: nameAr, en: nameEn }
      };
    })
    .filter(Boolean);
};

const buildProductOptions = (selectedId = "") => {
  const products = getProductsFromInputs();
  const options = products
    .map((product) => {
      const label = getProductLabel(product);
      const selected = product.id === selectedId ? "selected" : "";
      return `<option value="${product.id}" ${selected}>${label}</option>`;
    })
    .join("");

  if (selectedId && !products.some((product) => product.id === selectedId)) {
    return `<option value="${selectedId}" selected>${selectedId}</option>${options}`;
  }

  return options;
};

const refreshProductOptions = () => {
  const refreshSelects = (container) => {
    if (!container) {
      return;
    }
    const selects = container.querySelectorAll("select[data-field='productId']");
    selects.forEach((select) => {
      const current = select.value;
      select.innerHTML = buildProductOptions(current);
      if (current) {
        select.value = current;
      }
    });
  };

  refreshSelects(featuredItemsInputs);
  refreshSelects(homeSamplesInputs);
};

const addCategoryRow = (category = {}, prepend = false) => {
  if (!categoriesInputs) {
    return;
  }
  const index = categoriesInputs.querySelectorAll(".list-row[data-type='category']").length;
  categoriesInputs.insertAdjacentHTML(
    prepend ? "afterbegin" : "beforeend",
    `
      <div class="list-row" data-type="category" data-index="${index}">
        <input type="text" data-field="id" data-i18n-placeholder="categoryIdPlaceholder" placeholder="${t(
          "categoryIdPlaceholder"
        )}" value="${category.id || ""}" />
        <input type="text" data-field="label.ar" data-i18n-placeholder="categoryNameArPlaceholder" placeholder="${t(
          "categoryNameArPlaceholder"
        )}" value="${category.label?.ar || ""}" />
        <input type="text" data-field="label.en" data-i18n-placeholder="categoryNameEnPlaceholder" placeholder="${t(
          "categoryNameEnPlaceholder"
        )}" value="${category.label?.en || ""}" />
        <div class="row-actions">
          <button class="ghost" data-action="remove-category" data-i18n="remove">${t(
            "remove"
          )}</button>
        </div>
      </div>
    `
  );
};

const renderCategories = () => {
  if (!categoriesInputs) {
    return;
  }
  categoriesInputs.innerHTML = "";
  const categories = storeData.categories || [];
  if (categories.length === 0) {
    addCategoryRow();
  } else {
    categories.forEach((category) => addCategoryRow(category));
  }
};

const addCollectionRow = (collection = {}, prepend = false) => {
  const index = collectionsInputs.querySelectorAll(".list-row[data-type='collection']").length;
  collectionsInputs.insertAdjacentHTML(
    prepend ? "afterbegin" : "beforeend",
    `
      <div class="list-row" data-type="collection" data-index="${index}">
        <input type="text" data-field="title.ar" data-i18n-placeholder="collectionTitleArPlaceholder" placeholder="${t(
          "collectionTitleArPlaceholder"
        )}" value="${collection.title?.ar || ""}" />
        <input type="text" data-field="title.en" data-i18n-placeholder="collectionTitleEnPlaceholder" placeholder="${t(
          "collectionTitleEnPlaceholder"
        )}" value="${collection.title?.en || ""}" />
        <textarea data-field="desc.ar" data-i18n-placeholder="collectionDescArPlaceholder" placeholder="${t(
          "collectionDescArPlaceholder"
        )}">${collection.desc?.ar || ""}</textarea>
        <textarea data-field="desc.en" data-i18n-placeholder="collectionDescEnPlaceholder" placeholder="${t(
          "collectionDescEnPlaceholder"
        )}">${collection.desc?.en || ""}</textarea>
        <input type="text" data-field="tag.ar" data-i18n-placeholder="collectionTagArPlaceholder" placeholder="${t(
          "collectionTagArPlaceholder"
        )}" value="${collection.tag?.ar || ""}" />
        <input type="text" data-field="tag.en" data-i18n-placeholder="collectionTagEnPlaceholder" placeholder="${t(
          "collectionTagEnPlaceholder"
        )}" value="${collection.tag?.en || ""}" />
        <div class="row-actions">
          <button class="ghost" data-action="remove-collection" data-i18n="remove">${t(
            "remove"
          )}</button>
        </div>
      </div>
    `
  );
};

const renderCollections = () => {
  collectionsInputs.innerHTML = "";
  (storeData.collections || []).forEach((collection) => addCollectionRow(collection));
};

const addProductRow = (product = {}, prepend = false) => {
  const index = productsInputs.querySelectorAll(".list-row[data-type='product']").length;
  const imageValue = product.image || "";
  const preview = imageValue || "assets/products/bundle.svg";
  const isData = imageValue.startsWith("data:");
  const categoryOptions = buildCategoryOptions(product.category || "");
  const isActive = product.active !== false;
  const isAvailable = product.available !== false;
  const statusOptions = `
    <option value="true" ${isActive ? "selected" : ""}>${t("statusVisible")}</option>
    <option value="false" ${!isActive ? "selected" : ""}>${t("statusHidden")}</option>
  `;
  const availabilityOptions = `
    <option value="true" ${isAvailable ? "selected" : ""}>${t("availabilityAvailable")}</option>
    <option value="false" ${!isAvailable ? "selected" : ""}>${t("availabilityUnavailable")}</option>
  `;

  const html = `
    <div class="list-row product-row" data-type="product" data-index="${index}" ${
      isData ? 'data-image-data="true"' : ""
    }>
      <input type="text" data-field="id" data-i18n-placeholder="productIdPlaceholder" placeholder="${t(
        "productIdPlaceholder"
      )}" value="${product.id || ""}" />
      <select data-field="category">
        ${categoryOptions}
      </select>
      <select data-field="active" aria-label="${t("productStatusLabel")}">
        ${statusOptions}
      </select>
      <select data-field="available" aria-label="${t("availabilityLabel")}">
        ${availabilityOptions}
      </select>
      <input type="text" data-field="tag" data-i18n-placeholder="productTagPlaceholder" placeholder="${t(
        "productTagPlaceholder"
      )}" value="${product.tag || ""}" />
      <input type="number" data-field="price" data-i18n-placeholder="productPricePlaceholder" placeholder="${t(
        "productPricePlaceholder"
      )}" value="${product.price || ""}" />
      <div class="image-cell">
        <img class="image-preview mini-preview" src="${preview}" alt="Product preview" />
        <div class="image-actions">
          <label class="ghost file-btn">
            <span data-i18n="uploadImage">${t("uploadImage")}</span>
            <input type="file" class="image-input" accept="image/*" />
          </label>
          <button class="ghost danger" type="button" data-action="clear-image" data-i18n="clearImage">${t(
            "clearImage"
          )}</button>
        </div>
        <input type="text" data-field="image" data-i18n-placeholder="productImagePlaceholder" placeholder="${t(
          "productImagePlaceholder"
        )}" value="${!isData ? imageValue : ""}" />
      </div>
      <input type="text" data-field="name.ar" data-i18n-placeholder="productNameArPlaceholder" placeholder="${t(
        "productNameArPlaceholder"
      )}" value="${product.name?.ar || ""}" />
      <input type="text" data-field="name.en" data-i18n-placeholder="productNameEnPlaceholder" placeholder="${t(
        "productNameEnPlaceholder"
      )}" value="${product.name?.en || ""}" />
      <textarea data-field="desc.ar" data-i18n-placeholder="productDescArPlaceholder" placeholder="${t(
        "productDescArPlaceholder"
      )}">${product.desc?.ar || ""}</textarea>
      <textarea data-field="desc.en" data-i18n-placeholder="productDescEnPlaceholder" placeholder="${t(
        "productDescEnPlaceholder"
      )}">${product.desc?.en || ""}</textarea>
      <div class="row-actions">
        <button class="ghost danger" data-action="remove-product" data-i18n="remove">${t(
          "remove"
        )}</button>
      </div>
    </div>
    `;

  if (prepend) {
    productsInputs.insertAdjacentHTML("afterbegin", html);
  } else {
    productsInputs.insertAdjacentHTML("beforeend", html);
  }

  const row = productsInputs.querySelector(`.list-row[data-type='product'][data-index='${index}']`);
  if (row && isData) {
    row.dataset.imageData = imageValue;
  }
};

const renderProducts = () => {
  productsInputs.innerHTML = "";
  (storeData.products || []).forEach((product) => addProductRow(product));
};

const addHomeSampleRow = (itemId = "", prepend = false) => {
  if (!homeSamplesInputs) {
    return;
  }
  const index = homeSamplesInputs.querySelectorAll(".list-row[data-type='home-sample']").length;
  const productOptions = buildProductOptions(itemId);
  homeSamplesInputs.insertAdjacentHTML(
    prepend ? "afterbegin" : "beforeend",
    `
      <div class="list-row" data-type="home-sample" data-index="${index}">
        <select data-field="productId">
          ${productOptions}
        </select>
        <div class="row-actions">
          <button class="ghost" data-action="remove-home-sample" data-i18n="remove">${t(
            "remove"
          )}</button>
        </div>
      </div>
    `
  );
};

const renderHomeSamples = () => {
  if (!homeSamplesInputs) {
    return;
  }
  homeSamplesInputs.innerHTML = "";
  const items = storeData.home?.sampleIds || [];
  if (items.length === 0) {
    addHomeSampleRow();
  } else {
    items.forEach((itemId) => addHomeSampleRow(itemId));
  }
};

const addFeaturedItemRow = (itemId = "", prepend = false) => {
  if (!featuredItemsInputs) {
    return;
  }
  const index = featuredItemsInputs.querySelectorAll(".list-row[data-type='featured-item']").length;
  const productOptions = buildProductOptions(itemId);
  featuredItemsInputs.insertAdjacentHTML(
    prepend ? "afterbegin" : "beforeend",
    `
      <div class="list-row" data-type="featured-item" data-index="${index}">
        <select data-field="productId">
          ${productOptions}
        </select>
        <div class="row-actions">
          <button class="ghost" data-action="remove-featured-item" data-i18n="remove">${t(
            "remove"
          )}</button>
        </div>
      </div>
    `
  );
};

const renderFeaturedItems = () => {
  if (!featuredItemsInputs) {
    return;
  }
  featuredItemsInputs.innerHTML = "";
  const items = storeData.hero?.featured?.items || [];
  if (items.length === 0) {
    addFeaturedItemRow();
  } else {
    items.forEach((itemId) => addFeaturedItemRow(itemId));
  }
  refreshProductOptions();
};

const addIngredientRow = (ingredient = {}, prepend = false) => {
  const index = ingredientsInputs.querySelectorAll(".list-row[data-type='ingredient']").length;
  ingredientsInputs.insertAdjacentHTML(
    prepend ? "afterbegin" : "beforeend",
    `
      <div class="list-row" data-type="ingredient" data-index="${index}">
        <input type="text" data-field="title.ar" data-i18n-placeholder="ingredientTitleArPlaceholder" placeholder="${t(
          "ingredientTitleArPlaceholder"
        )}" value="${ingredient.title?.ar || ""}" />
        <input type="text" data-field="title.en" data-i18n-placeholder="ingredientTitleEnPlaceholder" placeholder="${t(
          "ingredientTitleEnPlaceholder"
        )}" value="${ingredient.title?.en || ""}" />
        <textarea data-field="desc.ar" data-i18n-placeholder="ingredientDescArPlaceholder" placeholder="${t(
          "ingredientDescArPlaceholder"
        )}">${ingredient.desc?.ar || ""}</textarea>
        <textarea data-field="desc.en" data-i18n-placeholder="ingredientDescEnPlaceholder" placeholder="${t(
          "ingredientDescEnPlaceholder"
        )}">${ingredient.desc?.en || ""}</textarea>
        <div class="row-actions">
          <button class="ghost" data-action="remove-ingredient" data-i18n="remove">${t(
            "remove"
          )}</button>
        </div>
      </div>
    `
  );
};

const renderIngredients = () => {
  ingredientsInputs.innerHTML = "";
  (storeData.ingredients || []).forEach((ingredient) => addIngredientRow(ingredient));
};

const addTestimonialRow = (testimonial = {}, prepend = false) => {
  const index = testimonialsInputs.querySelectorAll(".list-row[data-type='testimonial']").length;
  const imageValue = testimonial.image || "";
  const preview = imageValue || "assets/testimonials/comment-1.svg";
  const isData = imageValue.startsWith("data:");
  testimonialsInputs.insertAdjacentHTML(
    prepend ? "afterbegin" : "beforeend",
    `
      <div class="list-row product-row" data-type="testimonial" data-index="${index}" ${
        isData ? 'data-image-data="true"' : ""
      }>
        <div class="image-cell">
          <img class="image-preview mini-preview" src="${preview}" alt="Testimonial preview" />
          <div class="image-actions">
            <label class="ghost file-btn">
              <span data-i18n="uploadImage">${t("uploadImage")}</span>
              <input type="file" class="image-input" accept="image/*" />
            </label>
            <button class="ghost danger" type="button" data-action="clear-testimonial-image" data-i18n="clearImage">${t(
              "clearImage"
            )}</button>
          </div>
          <input type="text" data-field="image" data-i18n-placeholder="testimonialImagePlaceholder" placeholder="${t(
            "testimonialImagePlaceholder"
          )}" value="${!isData ? imageValue : ""}" />
        </div>
        <textarea data-field="quote.ar" data-i18n-placeholder="testimonialQuoteArPlaceholder" placeholder="${t(
          "testimonialQuoteArPlaceholder"
        )}">${testimonial.quote?.ar || ""}</textarea>
        <textarea data-field="quote.en" data-i18n-placeholder="testimonialQuoteEnPlaceholder" placeholder="${t(
          "testimonialQuoteEnPlaceholder"
        )}">${testimonial.quote?.en || ""}</textarea>
        <input type="text" data-field="name.ar" data-i18n-placeholder="testimonialNameArPlaceholder" placeholder="${t(
          "testimonialNameArPlaceholder"
        )}" value="${testimonial.name?.ar || ""}" />
        <input type="text" data-field="name.en" data-i18n-placeholder="testimonialNameEnPlaceholder" placeholder="${t(
          "testimonialNameEnPlaceholder"
        )}" value="${testimonial.name?.en || ""}" />
        <div class="row-actions">
          <button class="ghost danger" data-action="remove-testimonial" data-i18n="remove">${t(
            "remove"
          )}</button>
        </div>
      </div>
    `
  );

  const row = testimonialsInputs.querySelector(
    `.list-row[data-type='testimonial'][data-index='${index}']`
  );
  if (row && isData) {
    row.dataset.imageData = imageValue;
  }
};

const renderTestimonials = () => {
  testimonialsInputs.innerHTML = "";
  (storeData.testimonials || []).forEach((testimonial) => addTestimonialRow(testimonial));
};

const addStatRow = (stat = {}, prepend = false) => {
  const index = statsInputs.querySelectorAll(".list-row[data-type='stat']").length;
  statsInputs.insertAdjacentHTML(
    prepend ? "afterbegin" : "beforeend",
    `
      <div class="list-row" data-type="stat" data-index="${index}">
        <input type="text" data-field="value" data-i18n-placeholder="statValuePlaceholder" placeholder="${t(
          "statValuePlaceholder"
        )}" value="${stat.value || ""}" />
        <input type="text" data-field="label.ar" data-i18n-placeholder="statLabelArPlaceholder" placeholder="${t(
          "statLabelArPlaceholder"
        )}" value="${stat.label?.ar || ""}" />
        <input type="text" data-field="label.en" data-i18n-placeholder="statLabelEnPlaceholder" placeholder="${t(
          "statLabelEnPlaceholder"
        )}" value="${stat.label?.en || ""}" />
        <div class="row-actions">
          <button class="ghost" data-action="remove-stat" data-i18n="remove">${t(
            "remove"
          )}</button>
        </div>
      </div>
    `
  );
};

const renderStats = () => {
  statsInputs.innerHTML = "";
  (storeData.about?.stats || []).forEach((stat) => addStatRow(stat));
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

const formatPhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) {
    return `20${digits.slice(1)}`;
  }
  return digits;
};

const renderOrders = () => {
  if (!ordersSummary || !ordersTable) {
    return;
  }
  const orders = loadOrders();
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
        <div>${t("ordersHeaderTotal")}</div>
        <div>${t("ordersHeaderStatus")}</div>
        <div>${t("ordersHeaderActions")}</div>
      </div>
    `
  );

  orders.forEach((order) => {
    const date = new Date(order.date).toLocaleString(getLocale());
    const waMessage =
      dashLang === "ar"
        ? `مرحباً ${order.name}، بنأكد طلبك رقم ${order.id}.`
        : `Hi ${order.name}, we're confirming your order #${order.id}.`;
    const waLink = `https://wa.me/${formatPhone(order.phone)}?text=${encodeURIComponent(
      waMessage
    )}`;
    const detailsLink = `order-details.html?id=${encodeURIComponent(order.id)}`;

    ordersTable.insertAdjacentHTML(
      "beforeend",
      `
        <div class="table-row">
          <div>
            <strong>${order.name}</strong><br />
            <span>${order.phone}</span>
          </div>
          <div><span class="muted">${order.id}</span></div>
          <div>${date}</div>
          <div>${formatCurrency(order.total || 0)}</div>
          <div>
            <select data-order-id="${order.id}">
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
          </div>
          <div class="order-tools">
            <a class="ghost" href="${detailsLink}">${t("viewDetails")}</a>
            <a class="whatsapp-btn" href="${waLink}" target="_blank" rel="noreferrer">${t(
              "whatsappAction"
            )}</a>
          </div>
        </div>
      `
    );
  });
};

const fillInputs = () => {
  setValue("brandNameInput", storeData.brand?.name || "");
  setValue("brandTagArInput", storeData.brand?.tag?.ar || "");
  setValue("brandTagEnInput", storeData.brand?.tag?.en || "");
  setValue("whatsappDisplayInput", storeData.footer?.contact?.whatsappDisplay || "");
  setValue("whatsappIntlInput", storeData.footer?.contact?.whatsappIntl || "");
  setValue("instagramInput", storeData.footer?.contact?.instagram || "");
  setValue("hoursArInput", storeData.footer?.hours?.ar || "");
  setValue("hoursEnInput", storeData.footer?.hours?.en || "");
  setValue("deliveryTimeArInput", storeData.delivery?.time?.ar || "");
  setValue("deliveryTimeEnInput", storeData.delivery?.time?.en || "");
  setValue("homeSamplesInput", storeData.home?.samplesCount ?? 6);
  setValue("footerDescArInput", storeData.footer?.desc?.ar || "");
  setValue("footerDescEnInput", storeData.footer?.desc?.en || "");
  setValue("adminPinSetting", storeData.admin?.pin || "");
  setValue("contactCtaTitleArInput", storeData.contactCta?.title?.ar || "");
  setValue("contactCtaTitleEnInput", storeData.contactCta?.title?.en || "");
  setValue("contactCtaDescArInput", storeData.contactCta?.desc?.ar || "");
  setValue("contactCtaDescEnInput", storeData.contactCta?.desc?.en || "");
  setValue("contactCtaButtonArInput", storeData.contactCta?.button?.ar || "");
  setValue("contactCtaButtonEnInput", storeData.contactCta?.button?.en || "");
  setValue("contactCtaNoteArInput", storeData.contactCta?.note?.ar || "");
  setValue("contactCtaNoteEnInput", storeData.contactCta?.note?.en || "");
  setValue("contactCtaMessageArInput", storeData.contactCta?.message?.ar || "");
  setValue("contactCtaMessageEnInput", storeData.contactCta?.message?.en || "");

  setValue("heroEyebrowArInput", storeData.hero?.eyebrow?.ar || "");
  setValue("heroEyebrowEnInput", storeData.hero?.eyebrow?.en || "");
  setValue("heroTitleArInput", storeData.hero?.title?.ar || "");
  setValue("heroTitleEnInput", storeData.hero?.title?.en || "");
  setValue("heroCopyArInput", storeData.hero?.copy?.ar || "");
  setValue("heroCopyEnInput", storeData.hero?.copy?.en || "");
  setValue("heroPrimaryArInput", storeData.hero?.primary?.ar || "");
  setValue("heroPrimaryEnInput", storeData.hero?.primary?.en || "");
  setValue("heroSecondaryArInput", storeData.hero?.secondary?.ar || "");
  setValue("heroSecondaryEnInput", storeData.hero?.secondary?.en || "");

  setValue("featuredNameArInput", storeData.hero?.featured?.name?.ar || "");
  setValue("featuredNameEnInput", storeData.hero?.featured?.name?.en || "");
  setValue("featuredDescArInput", storeData.hero?.featured?.desc?.ar || "");
  setValue("featuredDescEnInput", storeData.hero?.featured?.desc?.en || "");
  setValue("featuredPriceInput", storeData.hero?.featured?.price || "");
  setValue("featuredImageInput", storeData.hero?.featured?.image || "");

  if (brandLogoPreview && storeData.brand?.logo) {
    brandLogoPreview.src = storeData.brand.logo;
    if (storeData.brand.logo.startsWith("data:")) {
      brandLogoPreview.dataset.imageData = storeData.brand.logo;
    }
  }

  if (brandFaviconPreview && storeData.brand?.favicon) {
    brandFaviconPreview.src = storeData.brand.favicon;
    if (storeData.brand.favicon.startsWith("data:")) {
      brandFaviconPreview.dataset.imageData = storeData.brand.favicon;
    }
  }

  if (featuredImagePreview && storeData.hero?.featured?.image) {
    featuredImagePreview.src = storeData.hero.featured.image;
    if (storeData.hero.featured.image.startsWith("data:")) {
      featuredImagePreview.dataset.imageData = storeData.hero.featured.image;
    }
  }

  setValue("collectionsTitleArInput", storeData.sections?.collections?.title?.ar || "");
  setValue("collectionsTitleEnInput", storeData.sections?.collections?.title?.en || "");
  setValue("collectionsDescArInput", storeData.sections?.collections?.desc?.ar || "");
  setValue("collectionsDescEnInput", storeData.sections?.collections?.desc?.en || "");
  setValue("productsTitleArInput", storeData.sections?.products?.title?.ar || "");
  setValue("productsTitleEnInput", storeData.sections?.products?.title?.en || "");
  setValue("productsDescArInput", storeData.sections?.products?.desc?.ar || "");
  setValue("productsDescEnInput", storeData.sections?.products?.desc?.en || "");
  setValue("ingredientsTitleArInput", storeData.sections?.ingredients?.title?.ar || "");
  setValue("ingredientsTitleEnInput", storeData.sections?.ingredients?.title?.en || "");
  setValue("ingredientsDescArInput", storeData.sections?.ingredients?.desc?.ar || "");
  setValue("ingredientsDescEnInput", storeData.sections?.ingredients?.desc?.en || "");
  setValue("testimonialsTitleArInput", storeData.sections?.testimonials?.title?.ar || "");
  setValue("testimonialsTitleEnInput", storeData.sections?.testimonials?.title?.en || "");
  setValue("testimonialsDescArInput", storeData.sections?.testimonials?.desc?.ar || "");
  setValue("testimonialsDescEnInput", storeData.sections?.testimonials?.desc?.en || "");

  setValue("aboutTitleArInput", storeData.about?.title?.ar || "");
  setValue("aboutTitleEnInput", storeData.about?.title?.en || "");
  setValue("aboutDescArInput", storeData.about?.desc?.ar || "");
  setValue("aboutDescEnInput", storeData.about?.desc?.en || "");
  setValue("aboutCardTitleArInput", storeData.about?.card?.title?.ar || "");
  setValue("aboutCardTitleEnInput", storeData.about?.card?.title?.en || "");
  setValue("aboutCardDescArInput", storeData.about?.card?.desc?.ar || "");
  setValue("aboutCardDescEnInput", storeData.about?.card?.desc?.en || "");
  setValue("aboutCardBtnArInput", storeData.about?.card?.button?.ar || "");
  setValue("aboutCardBtnEnInput", storeData.about?.card?.button?.en || "");
  setValue("aboutCardMessageArInput", storeData.about?.card?.message?.ar || "");
  setValue("aboutCardMessageEnInput", storeData.about?.card?.message?.en || "");
};

const saveAll = () => {
  const updated = loadStoreData();

  updated.brand.name = getValue("brandNameInput");
  updated.brand.tag.ar = getValue("brandTagArInput");
  updated.brand.tag.en = getValue("brandTagEnInput");

  const brandData = brandLogoPreview?.dataset.imageData;
  if (brandData) {
    updated.brand.logo = brandData;
  } else if (storeData.brand?.logo) {
    updated.brand.logo = storeData.brand.logo;
  }

  const faviconData = brandFaviconPreview?.dataset.imageData;
  if (faviconData) {
    updated.brand.favicon = faviconData;
  } else if (storeData.brand?.favicon) {
    updated.brand.favicon = storeData.brand.favicon;
  }

  const newPin = getValue("adminPinSetting");
  if (newPin) {
    updated.admin.pin = newPin;
  }

  updated.footer.contact.whatsappDisplay = getValue("whatsappDisplayInput");
  updated.footer.contact.whatsappIntl = getValue("whatsappIntlInput");
  updated.footer.contact.instagram = getValue("instagramInput");
  updated.footer.hours.ar = getValue("hoursArInput");
  updated.footer.hours.en = getValue("hoursEnInput");
  updated.delivery = updated.delivery || { time: { ar: "", en: "" } };
  updated.delivery.time.ar = getValue("deliveryTimeArInput");
  updated.delivery.time.en = getValue("deliveryTimeEnInput");
  updated.home = updated.home || {};
  updated.home.samplesCount = Number(getValue("homeSamplesInput")) || 6;
  updated.footer.desc.ar = getValue("footerDescArInput");
  updated.footer.desc.en = getValue("footerDescEnInput");

  if (homeSamplesInputs) {
    updated.home.sampleIds = Array.from(
      homeSamplesInputs.querySelectorAll("[data-type='home-sample']")
    )
      .map((row) => row.querySelector("[data-field='productId']")?.value || "")
      .filter(Boolean);
  }
  updated.contactCta = updated.contactCta || {};
  updated.contactCta.title = updated.contactCta.title || {};
  updated.contactCta.desc = updated.contactCta.desc || {};
  updated.contactCta.button = updated.contactCta.button || {};
  updated.contactCta.note = updated.contactCta.note || {};
  updated.contactCta.message = updated.contactCta.message || {};
  updated.contactCta.title.ar = getValue("contactCtaTitleArInput");
  updated.contactCta.title.en = getValue("contactCtaTitleEnInput");
  updated.contactCta.desc.ar = getValue("contactCtaDescArInput");
  updated.contactCta.desc.en = getValue("contactCtaDescEnInput");
  updated.contactCta.button.ar = getValue("contactCtaButtonArInput");
  updated.contactCta.button.en = getValue("contactCtaButtonEnInput");
  updated.contactCta.note.ar = getValue("contactCtaNoteArInput");
  updated.contactCta.note.en = getValue("contactCtaNoteEnInput");
  updated.contactCta.message.ar = getValue("contactCtaMessageArInput");
  updated.contactCta.message.en = getValue("contactCtaMessageEnInput");

  const serviceRows = servicesInputs.querySelectorAll("[data-type='service']");
  updated.footer.services = [];
  serviceRows.forEach((row) => {
    const arValue = row.querySelector("[data-lang='ar']").value.trim();
    const enValue = row.querySelector("[data-lang='en']").value.trim();
    if (arValue || enValue) {
      updated.footer.services.push({ ar: arValue, en: enValue });
    }
  });

  updated.hero.eyebrow.ar = getValue("heroEyebrowArInput");
  updated.hero.eyebrow.en = getValue("heroEyebrowEnInput");
  updated.hero.title.ar = getValue("heroTitleArInput");
  updated.hero.title.en = getValue("heroTitleEnInput");
  updated.hero.copy.ar = getValue("heroCopyArInput");
  updated.hero.copy.en = getValue("heroCopyEnInput");
  updated.hero.primary.ar = getValue("heroPrimaryArInput");
  updated.hero.primary.en = getValue("heroPrimaryEnInput");
  updated.hero.secondary.ar = getValue("heroSecondaryArInput");
  updated.hero.secondary.en = getValue("heroSecondaryEnInput");

  updated.hero.featured.name.ar = getValue("featuredNameArInput");
  updated.hero.featured.name.en = getValue("featuredNameEnInput");
  updated.hero.featured.desc.ar = getValue("featuredDescArInput");
  updated.hero.featured.desc.en = getValue("featuredDescEnInput");
  updated.hero.featured.price = Number(getValue("featuredPriceInput")) || 0;

  const featuredData = featuredImagePreview?.dataset.imageData;
  updated.hero.featured.image =
    featuredData || getValue("featuredImageInput") || storeData.hero?.featured?.image || "";

  if (featuredItemsInputs) {
    updated.hero.featured.items = Array.from(
      featuredItemsInputs.querySelectorAll("[data-type='featured-item']")
    )
      .map((row) => row.querySelector("[data-field='productId']")?.value || "")
      .filter(Boolean);
  }

  const badgesRows = heroBadgesInputs.querySelectorAll("[data-type='badge']");
  updated.hero.badges.ar = [];
  updated.hero.badges.en = [];
  badgesRows.forEach((row) => {
    const arValue = row.querySelector("[data-lang='ar']").value.trim();
    const enValue = row.querySelector("[data-lang='en']").value.trim();
    if (arValue) {
      updated.hero.badges.ar.push(arValue);
    }
    if (enValue) {
      updated.hero.badges.en.push(enValue);
    }
  });

  const stripRows = stripInputs.querySelectorAll("[data-type='strip']");
  updated.strip.ar = [];
  updated.strip.en = [];
  stripRows.forEach((row) => {
    const arValue = row.querySelector("[data-lang='ar']").value.trim();
    const enValue = row.querySelector("[data-lang='en']").value.trim();
    if (arValue) {
      updated.strip.ar.push(arValue);
    }
    if (enValue) {
      updated.strip.en.push(enValue);
    }
  });

  updated.sections.collections.title.ar = getValue("collectionsTitleArInput");
  updated.sections.collections.title.en = getValue("collectionsTitleEnInput");
  updated.sections.collections.desc.ar = getValue("collectionsDescArInput");
  updated.sections.collections.desc.en = getValue("collectionsDescEnInput");
  updated.sections.products.title.ar = getValue("productsTitleArInput");
  updated.sections.products.title.en = getValue("productsTitleEnInput");
  updated.sections.products.desc.ar = getValue("productsDescArInput");
  updated.sections.products.desc.en = getValue("productsDescEnInput");
  updated.sections.ingredients.title.ar = getValue("ingredientsTitleArInput");
  updated.sections.ingredients.title.en = getValue("ingredientsTitleEnInput");
  updated.sections.ingredients.desc.ar = getValue("ingredientsDescArInput");
  updated.sections.ingredients.desc.en = getValue("ingredientsDescEnInput");
  updated.sections.testimonials.title.ar = getValue("testimonialsTitleArInput");
  updated.sections.testimonials.title.en = getValue("testimonialsTitleEnInput");
  updated.sections.testimonials.desc.ar = getValue("testimonialsDescArInput");
  updated.sections.testimonials.desc.en = getValue("testimonialsDescEnInput");

  updated.categories = getCategoriesFromInputs();

  updated.collections = Array.from(
    collectionsInputs.querySelectorAll("[data-type='collection']")
  ).map((row) => ({
    title: {
      ar: row.querySelector("[data-field='title.ar']").value.trim(),
      en: row.querySelector("[data-field='title.en']").value.trim()
    },
    desc: {
      ar: row.querySelector("[data-field='desc.ar']").value.trim(),
      en: row.querySelector("[data-field='desc.en']").value.trim()
    },
    tag: {
      ar: row.querySelector("[data-field='tag.ar']").value.trim(),
      en: row.querySelector("[data-field='tag.en']").value.trim()
    }
  }));

  updated.products = Array.from(
    productsInputs.querySelectorAll("[data-type='product']")
  ).map((row, index) => {
    const id = row.querySelector("[data-field='id']").value.trim() || `product-${index}`;
    const imageData = row.dataset.imageData;
    return {
      id,
      category: row.querySelector("[data-field='category']").value,
      active: row.querySelector("[data-field='active']")?.value !== "false",
      available: row.querySelector("[data-field='available']")?.value !== "false",
      tag: row.querySelector("[data-field='tag']").value.trim(),
      price: Number(row.querySelector("[data-field='price']").value) || 0,
      image: imageData || row.querySelector("[data-field='image']").value.trim(),
      name: {
        ar: row.querySelector("[data-field='name.ar']").value.trim(),
        en: row.querySelector("[data-field='name.en']").value.trim()
      },
      desc: {
        ar: row.querySelector("[data-field='desc.ar']").value.trim(),
        en: row.querySelector("[data-field='desc.en']").value.trim()
      }
    };
  });

  updated.ingredients = Array.from(
    ingredientsInputs.querySelectorAll("[data-type='ingredient']")
  ).map((row) => ({
    title: {
      ar: row.querySelector("[data-field='title.ar']").value.trim(),
      en: row.querySelector("[data-field='title.en']").value.trim()
    },
    desc: {
      ar: row.querySelector("[data-field='desc.ar']").value.trim(),
      en: row.querySelector("[data-field='desc.en']").value.trim()
    }
  }));

  updated.testimonials = Array.from(
    testimonialsInputs.querySelectorAll("[data-type='testimonial']")
  ).map((row) => ({
    image: row.dataset.imageData || row.querySelector("[data-field='image']").value.trim(),
    quote: {
      ar: row.querySelector("[data-field='quote.ar']").value.trim(),
      en: row.querySelector("[data-field='quote.en']").value.trim()
    },
    name: {
      ar: row.querySelector("[data-field='name.ar']").value.trim(),
      en: row.querySelector("[data-field='name.en']").value.trim()
    }
  }));

  updated.about.title.ar = getValue("aboutTitleArInput");
  updated.about.title.en = getValue("aboutTitleEnInput");
  updated.about.desc.ar = getValue("aboutDescArInput");
  updated.about.desc.en = getValue("aboutDescEnInput");
  updated.about.card.title.ar = getValue("aboutCardTitleArInput");
  updated.about.card.title.en = getValue("aboutCardTitleEnInput");
  updated.about.card.desc.ar = getValue("aboutCardDescArInput");
  updated.about.card.desc.en = getValue("aboutCardDescEnInput");
  updated.about.card.button.ar = getValue("aboutCardBtnArInput");
  updated.about.card.button.en = getValue("aboutCardBtnEnInput");
  updated.about.card.message = updated.about.card.message || {};
  updated.about.card.message.ar = getValue("aboutCardMessageArInput");
  updated.about.card.message.en = getValue("aboutCardMessageEnInput");

  updated.about.stats = Array.from(
    statsInputs.querySelectorAll("[data-type='stat']")
  ).map((row) => ({
    value: row.querySelector("[data-field='value']").value.trim(),
    label: {
      ar: row.querySelector("[data-field='label.ar']").value.trim(),
      en: row.querySelector("[data-field='label.en']").value.trim()
    }
  }));

  localStorage.setItem("dodyStoreData", JSON.stringify(updated));
  storeData = updated;
  setSaveNote("saveSuccess", "#2f7a4f");
  renderSummary();
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

const exportData = () => {
  const orders = loadOrders();
  if (orders.length === 0) {
    alert(t("exportEmpty"));
    return;
  }

  const headers = [
    t("ordersHeaderDate"),
    t("ordersHeaderId"),
    t("ordersHeaderCustomer"),
    t("ordersHeaderTotal"),
    t("ordersDeliveryLabel") || "Delivery",
    t("ordersNetLabel") || "Net",
    t("ordersHeaderStatus"),
    t("ordersHeaderShipping"),
    t("ordersHeaderItems")
  ];

  const rows = orders.map((order) => {
    const total = Number(order.total) || 0;
    const deliveryFee = Number(order.deliveryFee) || 0;
    const net = Math.max(total - deliveryFee, 0);
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
    const items = (order.items || [])
      .map((item) => {
        const name =
          dashLang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr;
        return `${name} x${item.qty}`;
      })
      .join(" | ");

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

const importData = async (file) => {
  if (!file) {
    return;
  }
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    localStorage.setItem("dodyStoreData", JSON.stringify(parsed));
    storeData = mergeDeep(deepClone(defaultData), parsed);
    fillInputs();
    renderAll();
    setSaveNote("importSuccess", "#2f7a4f");
  } catch (error) {
    setSaveNote("importError", "#b24b47");
  }
};

const bindEvents = () => {
  document.getElementById("saveAll").addEventListener("click", saveAll);
  document.getElementById("exportData").addEventListener("click", exportData);
  document.getElementById("importData").addEventListener("change", (event) => {
    importData(event.target.files?.[0]);
    event.target.value = "";
  });
  document.getElementById("addCategory").addEventListener("click", () => {
    addCategoryRow({}, true);
    applyDashLang();
    refreshCategoryOptions();
  });
  document.getElementById("addProduct").addEventListener("click", () => {
    addProductRow({}, true);
    refreshProductOptions();
  });
  document
    .getElementById("addCollection")
    .addEventListener("click", () => addCollectionRow({}, true));
  document
    .getElementById("addIngredient")
    .addEventListener("click", () => addIngredientRow({}, true));
  document
    .getElementById("addTestimonial")
    .addEventListener("click", () => addTestimonialRow({}, true));
  document.getElementById("addStat").addEventListener("click", () => addStatRow({}, true));
  const addFeaturedItemBtn = document.getElementById("addFeaturedItem");
  if (addFeaturedItemBtn) {
    addFeaturedItemBtn.addEventListener("click", () => addFeaturedItemRow("", true));
  }
  const clearOrdersBtn = document.getElementById("clearOrders");
  if (clearOrdersBtn) {
    clearOrdersBtn.addEventListener("click", () => {
      if (confirm(t("confirmClearOrders"))) {
        localStorage.removeItem("dodyOrders");
        renderOrders();
        renderSummary();
      }
    });
  }
  if (dashLangToggle) {
    dashLangToggle.addEventListener("click", () => {
      dashLang = dashLang === "ar" ? "en" : "ar";
      localStorage.setItem("dodyDashLang", dashLang);
      applyDashLang();
    });
  }

  if (adminPinBtn) {
    adminPinBtn.addEventListener("click", () => {
      const pin = adminPinInput.value.trim();
      const realPin = storeData.admin?.pin || "2026";
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

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("dodyAdminAuth");
      showGate(true);
    });
  }

  if (brandLogoFile) {
    brandLogoFile.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      const dataUrl = await readFileAsDataUrl(file);
      brandLogoPreview.src = dataUrl;
      brandLogoPreview.dataset.imageData = dataUrl;
    });
  }

  if (brandFaviconFile) {
    brandFaviconFile.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      const dataUrl = await readFileAsDataUrl(file);
      brandFaviconPreview.src = dataUrl;
      brandFaviconPreview.dataset.imageData = dataUrl;
    });
  }

  if (featuredImageFile) {
    featuredImageFile.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      const dataUrl = await readFileAsDataUrl(file);
      featuredImagePreview.src = dataUrl;
      featuredImagePreview.dataset.imageData = dataUrl;
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

  document.querySelectorAll(".dash-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
    });
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("#")) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = href.replace("#", "");
        showDashSection(targetId);
        setActiveNav(link);
        history.replaceState(null, "", `#${targetId}`);
      });
    }
  });

  productsInputs.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.action === "remove-product") {
      target.closest(".list-row").remove();
      refreshProductOptions();
    }
    if (target.dataset.action === "clear-image") {
      const row = target.closest(".list-row");
      if (!row) {
        return;
      }
      delete row.dataset.imageData;
      const preview = row.querySelector(".image-preview");
      const pathInput = row.querySelector("[data-field='image']");
      if (pathInput) {
        pathInput.value = "";
      }
      preview.src = "assets/products/bundle.svg";
      const fileInput = row.querySelector(".image-input");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  });

  productsInputs.addEventListener("input", () => {
    refreshProductOptions();
  });

  if (featuredItemsInputs) {
    featuredItemsInputs.addEventListener("click", (event) => {
      const target = event.target;
      if (target.dataset.action === "remove-featured-item") {
        target.closest(".list-row").remove();
      }
    });
  }

  if (homeSamplesInputs) {
    homeSamplesInputs.addEventListener("click", (event) => {
      const target = event.target;
      if (target.dataset.action === "remove-home-sample") {
        target.closest(".list-row").remove();
      }
    });
  }

  if (addHomeSampleBtn) {
    addHomeSampleBtn.addEventListener("click", () => {
      addHomeSampleRow("", true);
    });
  }

  if (categoriesInputs) {
    categoriesInputs.addEventListener("click", (event) => {
      const target = event.target;
      if (target.dataset.action === "remove-category") {
        target.closest(".list-row").remove();
        refreshCategoryOptions();
      }
    });
    categoriesInputs.addEventListener("input", () => {
      refreshCategoryOptions();
    });
  }

  collectionsInputs.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.action === "remove-collection") {
      target.closest(".list-row").remove();
    }
  });

  ingredientsInputs.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.action === "remove-ingredient") {
      target.closest(".list-row").remove();
    }
  });

  testimonialsInputs.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.action === "remove-testimonial") {
      target.closest(".list-row").remove();
    }
    if (target.dataset.action === "clear-testimonial-image") {
      const row = target.closest(".list-row");
      if (!row) {
        return;
      }
      delete row.dataset.imageData;
      const preview = row.querySelector(".image-preview");
      const pathInput = row.querySelector("[data-field='image']");
      if (pathInput) {
        pathInput.value = "";
      }
      if (preview) {
        preview.src = "assets/testimonials/comment-1.svg";
      }
      const fileInput = row.querySelector(".image-input");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  });

  statsInputs.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.action === "remove-stat") {
      target.closest(".list-row").remove();
    }
  });

  productsInputs.addEventListener("change", async (event) => {
    const target = event.target;
    if (target.classList.contains("image-input")) {
      const file = target.files?.[0];
      if (!file) {
        return;
      }
      const row = target.closest(".list-row");
      const preview = row.querySelector(".image-preview");
      const pathInput = row.querySelector("[data-field='image']");
      const dataUrl = await readFileAsDataUrl(file);
      row.dataset.imageData = dataUrl;
      preview.src = dataUrl;
      if (pathInput) {
        pathInput.value = "";
      }
    }
  });

  testimonialsInputs.addEventListener("change", async (event) => {
    const target = event.target;
    if (target.classList.contains("image-input")) {
      const file = target.files?.[0];
      if (!file) {
        return;
      }
      const row = target.closest(".list-row");
      const preview = row.querySelector(".image-preview");
      const pathInput = row.querySelector("[data-field='image']");
      const dataUrl = await readFileAsDataUrl(file);
      row.dataset.imageData = dataUrl;
      if (preview) {
        preview.src = dataUrl;
      }
      if (pathInput) {
        pathInput.value = "";
      }
    }
  });

  if (ordersTable) {
    ordersTable.addEventListener("change", (event) => {
      const target = event.target;
      if (target.matches("select[data-order-id]")) {
        const orders = loadOrders();
        const order = orders.find((item) => item.id === target.dataset.orderId);
        if (order) {
          order.status = target.value;
          localStorage.setItem("dodyOrders", JSON.stringify(orders));
          renderOrders();
          renderSummary();
        }
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
};

const renderAll = () => {
  renderSummary();
  renderHeroBadges();
  renderStrip();
  renderServices();
  renderCategories();
  renderCollections();
  renderProducts();
  renderHomeSamples();
  renderFeaturedItems();
  renderIngredients();
  renderTestimonials();
  renderStats();
  renderOrders();
  refreshCategoryOptions();
  refreshProductOptions();
};

const init = () => {
  checkAuth();
  fillInputs();
  renderAll();
  bindEvents();
  setSaveNote("saveNote", "");
  applyDashLang();

  const hash = window.location.hash?.replace("#", "");
  if (hash) {
    const targetLink = Array.from(navLinks).find((link) => link.getAttribute("href") === `#${hash}`);
    showDashSection(hash);
    setActiveNav(targetLink);
  }
};

init();
