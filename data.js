window.DODY_DEFAULT_DATA = {
  brand: {
    name: "Dody Store",
    logo: "assets/logo.svg",
    favicon: "assets/logo.svg",
    tag: {
      ar: "عناية ومكياج بإحساس عصري",
      en: "Modern skincare & makeup"
    }
  },
  admin: {
    pin: "2026"
  },
  orders: {
    email: ""
  },
  delivery: {
    time: {
      ar: "التوصيل خلال 24-48 ساعة داخل القاهرة والجيزة",
      en: "Delivery within 24-48 hours in Cairo & Giza"
    }
  },
  home: {
    samplesCount: 9,
    sampleIds: [
      "vitc15",
      "gel-cleanser",
      "spf50",
      "foundation",
      "concealer",
      "lipstick",
      "argan-oil",
      "keratin-mask",
      "silk-shampoo"
    ]
  },
  hero: {
    eyebrow: {
      ar: "اختيارات خبراء البشرة",
      en: "Expert Skin Picks"
    },
    title: {
      ar: "بشرة مرتاحة. مكياج ثابت. ثقة كل يوم.",
      en: "Calm skin. Lasting makeup. Everyday confidence."
    },
    copy: {
      ar:
        "في Dody Store بنجمع بين التركيبات الفعّالة واللمسة الجمالية. منتجات مختارة، أحجام واضحة، وأسعار مناسبة لكل روتين.",
      en:
        "At Dody Store we blend effective formulas with a beauty touch. Curated items, clear sizes, and fair prices for every routine."
    },
    primary: {
      ar: "تسوّقي الآن",
      en: "Shop now"
    },
    secondary: {
      ar: "شاهدي الباقات",
      en: "View bundles"
    },
    badges: {
      ar: ["شحن خلال 24-48 ساعة", "الدفع عند الاستلام", "تغليف هدايا مجاني"],
      en: ["Delivery in 24-48 hours", "Cash on delivery", "Free gift wrapping"]
    },
    featured: {
      id: "bundle-daily",
      name: {
        ar: "باقة الدودي اليومية",
        en: "Dody Daily Bundle"
      },
      desc: {
        ar: "5 منتجات أساسية لبشرة متوازنة",
        en: "5 essentials for balanced skin"
      },
      price: 990,
      image: "assets/products/bundle.svg",
      items: ["vitc15", "gel-cleanser", "balancing-toner", "ceramide-cream", "spf50"]
    }
  },
  strip: {
    ar: ["+4,800 طلب شهريًا", "تقييم 4.8/5 من العملاء", "استبدال خلال 14 يومًا", "دعم واتساب سريع"],
    en: ["4,800+ orders per month", "Rated 4.8/5 by customers", "14-day exchanges", "Fast WhatsApp support"]
  },
  categories: [
    {
      id: "skin",
      label: {
        ar: "عناية بالبشرة",
        en: "Skincare"
      }
    },
    {
      id: "makeup",
      label: {
        ar: "مكياج",
        en: "Makeup"
      }
    },
    {
      id: "hair",
      label: {
        ar: "شعر",
        en: "Hair"
      }
    }
  ],
  sections: {
    collections: {
      title: {
        ar: "باقات عملية لكل احتياج",
        en: "Bundles for every need"
      },
      desc: {
        ar: "اختاري باقة جاهزة ووفري وقتك مع خصم ثابت على المجموعة.",
        en: "Pick a ready routine and save time with a fixed bundle discount."
      }
    },
    products: {
      title: {
        ar: "منتجات ببيانات واضحة",
        en: "Products with clear details"
      },
      desc: {
        ar: "اختيارات بعناية مع تفاصيل الحجم والتركيز والأسعار.",
        en: "Carefully selected with sizes, concentrations, and prices."
      }
    },
    ingredients: {
      title: {
        ar: "مكونات فعّالة بتركيزات مناسبة",
        en: "Effective ingredients at right percentages"
      },
      desc: {
        ar: "نختار مكونات أساسية مدعومة بالبحوث للعناية اليومية.",
        en: "Core ingredients backed by research for daily care."
      }
    },
    testimonials: {
      title: {
        ar: "عملاؤنا قالوا",
        en: "What customers say"
      },
      desc: {
        ar: "آراء حقيقية من طلبات الشهر الحالي.",
        en: "Real feedback from this month’s orders."
      }
    }
  },
  collections: [
    {
      title: {
        ar: "روتين الجفاف الذكي",
        en: "Smart Dry-Skin Routine"
      },
      desc: {
        ar: "5 منتجات: غسول + سيروم + كريم + ماسك + واقي شمس.",
        en: "5 items: cleanser + serum + cream + mask + sunscreen."
      },
      tag: {
        ar: "خصم 15%",
        en: "15% off"
      }
    },
    {
      title: {
        ar: "روتين التوازن للبشرة الدهنية",
        en: "Balance for Oily Skin"
      },
      desc: {
        ar: "4 منتجات: غسول جل + تونر + سيروم نياسيناميد + مرطب جل.",
        en: "4 items: gel cleanser + toner + niacinamide + gel moisturizer."
      },
      tag: {
        ar: "الأكثر طلبًا",
        en: "Best seller"
      }
    },
    {
      title: {
        ar: "مكياج اللوك الناعم",
        en: "Soft Makeup Look"
      },
      desc: {
        ar: "6 منتجات: برايمر + فاونديشن + كونسيلر + روج + ماسكارا.",
        en: "6 items: primer + foundation + concealer + lipstick + mascara."
      },
      tag: {
        ar: "مناسب للمبتدئات",
        en: "Beginner friendly"
      }
    }
  ],
  products: [
    {
      id: "vitc15",
      category: "skin",
      tag: "15% C",
      price: 349,
      image: "assets/products/vitc.svg",
      name: {
        ar: "سيروم فيتامين C 15% - 30مل",
        en: "Vitamin C Serum 15% - 30ml"
      },
      desc: {
        ar: "يساعد على توحيد اللون وإضاءة البشرة مع الاستخدام المنتظم.",
        en: "Helps even tone and brighten with consistent use."
      }
    },
    {
      id: "gel-cleanser",
      category: "skin",
      tag: "pH 5.5",
      price: 220,
      image: "assets/products/cleanser.svg",
      name: {
        ar: "غسول جل لطيف - 150مل",
        en: "Gentle Gel Cleanser - 150ml"
      },
      desc: {
        ar: "تنظيف بدون شدّ، مناسب للبشرة الحساسة واليومية.",
        en: "Cleanses without tightness, suitable for sensitive skin."
      }
    },
    {
      id: "balancing-toner",
      category: "skin",
      tag: "Clean",
      price: 240,
      image: "assets/products/toner.svg",
      name: {
        ar: "تونر موازن بدون كحول - 200مل",
        en: "Alcohol-Free Balancing Toner - 200ml"
      },
      desc: {
        ar: "يهيئ البشرة للترطيب ويقلل الملمس الخشن.",
        en: "Preps skin for hydration and smooths texture."
      }
    },
    {
      id: "ceramide-cream",
      category: "skin",
      tag: "Ceramide",
      price: 330,
      image: "assets/products/cream.svg",
      name: {
        ar: "كريم ترطيب سيراميد - 50مل",
        en: "Ceramide Moisturizer - 50ml"
      },
      desc: {
        ar: "يقوي الحاجز الطبيعي ويرطب حتى 12 ساعة.",
        en: "Strengthens the barrier and hydrates up to 12 hours."
      }
    },
    {
      id: "spf50",
      category: "skin",
      tag: "SPF50",
      price: 360,
      image: "assets/products/spf.svg",
      name: {
        ar: "واقي شمس +SPF50 - 50مل",
        en: "SPF50 Sunscreen - 50ml"
      },
      desc: {
        ar: "حماية عالية بملمس خفيف بدون طبقة بيضاء.",
        en: "High protection with a lightweight, no-white-cast finish."
      }
    },
    {
      id: "foundation",
      category: "makeup",
      tag: "Soft",
      price: 420,
      image: "assets/products/foundation.svg",
      name: {
        ar: "فاونديشن خفيف الوزن - 30مل",
        en: "Lightweight Foundation - 30ml"
      },
      desc: {
        ar: "تغطية طبيعية قابلة للبناء بلمسة مطفية ناعمة.",
        en: "Buildable natural coverage with a soft matte finish."
      }
    },
    {
      id: "concealer",
      category: "makeup",
      tag: "Cover",
      price: 260,
      image: "assets/products/concealer.svg",
      name: {
        ar: "كونسيلر كريمي - 10مل",
        en: "Creamy Concealer - 10ml"
      },
      desc: {
        ar: "يخفي الهالات والعيوب بدون تكتل.",
        en: "Covers dark circles and blemishes without creasing."
      }
    },
    {
      id: "lipstick",
      category: "makeup",
      tag: "Velvet",
      price: 210,
      image: "assets/products/lipstick.svg",
      name: {
        ar: "روج سائل مات مخملي",
        en: "Velvet Matte Liquid Lipstick"
      },
      desc: {
        ar: "لون ثابت مع ترطيب خفيف يدوم لساعات.",
        en: "Long-wear color with light hydration."
      }
    },
    {
      id: "mascara",
      category: "makeup",
      tag: "Lift",
      price: 260,
      image: "assets/products/mascara.svg",
      name: {
        ar: "ماسكارا تكثيف - 12مل",
        en: "Volumizing Mascara - 12ml"
      },
      desc: {
        ar: "رفع للرموش بدون تلطخ أو تكتل.",
        en: "Lifts lashes without smudging or clumping."
      }
    },
    {
      id: "argan-oil",
      category: "hair",
      tag: "Repair",
      price: 260,
      image: "assets/products/argan.svg",
      name: {
        ar: "زيت أرجان نقي - 50مل",
        en: "Pure Argan Oil - 50ml"
      },
      desc: {
        ar: "يغذي الأطراف ويقلل الهيشان مع لمعان طبيعي.",
        en: "Nourishes ends and tames frizz with natural shine."
      }
    },
    {
      id: "keratin-mask",
      category: "hair",
      tag: "Keratin",
      price: 280,
      image: "assets/products/keratin.svg",
      name: {
        ar: "ماسك كيراتين إصلاحي - 250مل",
        en: "Keratin Repair Mask - 250ml"
      },
      desc: {
        ar: "نعومة ولمعان من أول استخدام بدون ثقل.",
        en: "Smoothness and shine from first use without weight."
      }
    },
    {
      id: "silk-shampoo",
      category: "hair",
      tag: "Soft",
      price: 240,
      image: "assets/products/cleanser.svg",
      name: {
        ar: "شامبو سيلك للتنعيم - 300مل",
        en: "Silk Smoothing Shampoo - 300ml"
      },
      desc: {
        ar: "ينظف بلطف ويقلل الهيشان مع ملمس حريري.",
        en: "Gently cleanses and reduces frizz with a silky feel."
      }
    },
    {
      id: "leave-in-cream",
      category: "hair",
      tag: "Leave-in",
      price: 260,
      image: "assets/products/cream.svg",
      name: {
        ar: "كريم ليف إن لترطيب الشعر - 120مل",
        en: "Leave-in Hair Cream - 120ml"
      },
      desc: {
        ar: "يرطب الأطراف ويحافظ على اللمعان طوال اليوم.",
        en: "Hydrates ends and keeps shine all day."
      }
    },
    {
      id: "niacinamide-serum",
      category: "skin",
      tag: "5% B3",
      price: 310,
      image: "assets/products/toner.svg",
      name: {
        ar: "سيروم نياسيناميد 5% - 30مل",
        en: "Niacinamide Serum 5% - 30ml"
      },
      desc: {
        ar: "يقلل مظهر المسام ويساعد على توحيد اللون.",
        en: "Minimizes pores and helps even skin tone."
      }
    },
    {
      id: "brow-gel",
      category: "makeup",
      tag: "Hold",
      price: 190,
      image: "assets/products/mascara.svg",
      name: {
        ar: "جل حواجب تثبيت - 8مل",
        en: "Brow Fix Gel - 8ml"
      },
      desc: {
        ar: "تثبيت طبيعي للشعيرات بدون تكتل.",
        en: "Natural hold without flakes."
      }
    }
  ],
  ingredients: [
    {
      title: {
        ar: "نياسيناميد 5%",
        en: "Niacinamide 5%"
      },
      desc: {
        ar: "يساعد على توازن إفراز الدهون ومظهر المسام.",
        en: "Helps balance oil and minimize the look of pores."
      }
    },
    {
      title: {
        ar: "حمض الهيالورونيك",
        en: "Hyaluronic Acid"
      },
      desc: {
        ar: "ترطيب متعدد الطبقات مع إحساس ممتلئ.",
        en: "Multi-layer hydration with a plump feel."
      }
    },
    {
      title: {
        ar: "سيراميد مركّز",
        en: "Concentrated Ceramides"
      },
      desc: {
        ar: "يقوي حاجز البشرة ويحافظ على الرطوبة.",
        en: "Strengthens the skin barrier and locks in moisture."
      }
    },
    {
      title: {
        ar: "مستخلص الشاي الأخضر",
        en: "Green Tea Extract"
      },
      desc: {
        ar: "يهدئ الاحمرار ويحمي من الإجهاد البيئي.",
        en: "Soothes redness and protects from environmental stress."
      }
    }
  ],
  routine: {
    dry: {
      ar: "غسول لطيف + سيروم فيتامين C صباحًا + كريم سيراميد + واقي شمس.",
      en: "Gentle cleanser + morning vitamin C + ceramide cream + sunscreen."
    },
    oily: {
      ar: "غسول جل pH 5.5 + تونر بدون كحول + مرطب خفيف + واقي شمس.",
      en: "Gel cleanser pH 5.5 + alcohol-free toner + light moisturizer + sunscreen."
    },
    combo: {
      ar: "غسول لطيف + سيروم خفيف + كريم سيراميد بكمية معتدلة.",
      en: "Gentle cleanser + lightweight serum + moderate ceramide cream."
    },
    sensitive: {
      ar: "منتجات خالية من العطور + غسول لطيف + كريم سيراميد.",
      en: "Fragrance-free products + gentle cleanser + ceramide cream."
    }
  },
  testimonials: [
    {
      image: "assets/testimonials/comment-1.svg",
      quote: {
        ar: "\"السيروم فرق معايا من الأسبوع الأول، والبشرة بقت أفتح.\"",
        en: "\"The serum made a difference from week one. My skin looks brighter.\""
      },
      name: {
        ar: "مها - مدينة نصر",
        en: "Maha - Nasr City"
      }
    },
    {
      image: "assets/testimonials/comment-2.svg",
      quote: {
        ar: "\"الفاونديشن خفيف وثابت، حبيت اللمسة الطبيعية جدًا.\"",
        en: "\"The foundation is light and long-lasting. Love the natural finish.\""
      },
      name: {
        ar: "سما - الزمالك",
        en: "Sama - Zamalek"
      }
    },
    {
      image: "assets/testimonials/comment-3.svg",
      quote: {
        ar: "\"وصلني الطلب تاني يوم والتغليف كان شيك جدًا.\"",
        en: "\"My order arrived next day and the packaging was lovely.\""
      },
      name: {
        ar: "يارا - الإسكندرية",
        en: "Yara - Alexandria"
      }
    }
  ],
  about: {
    title: {
      ar: "قصتنا مع الجمال الهادئ",
      en: "Our calm beauty story"
    },
    desc: {
      ar:
        "Dody Store علامة عربية بدأت بشغف العناية الواقعية: منتجات واضحة، روتين بسيط، وتجربة شراء مريحة بدون تعقيد. بنراجع كل منتج مع مختصين عشان نضمن نتائج تليق ببشرتك.",
      en:
        "Dody Store started with a passion for real-world skincare: clear products, simple routines, and a smooth shopping experience. Every item is reviewed with specialists to make sure it suits your skin."
    },
    stats: [
      {
        value: "4.8/5",
        label: {
          ar: "متوسط التقييمات",
          en: "Average rating"
        }
      },
      {
        value: "150+",
        label: {
          ar: "منتج متوفر",
          en: "Products available"
        }
      },
      {
        value: "24/7",
        label: {
          ar: "خدمة عملاء",
          en: "Customer support"
        }
      }
    ],
    card: {
      title: {
        ar: "هدية أول طلب",
        en: "First order gift"
      },
      desc: {
        ar: "عينة مجانية + تغليف هدية لأول طلب.",
        en: "Free sample + gift wrapping on your first order."
      },
      button: {
        ar: "احصلي عليها",
        en: "Claim it"
      },
      message: {
        ar: "مرحباً، عايزة هدية أول طلب.",
        en: "Hi, I'd like the first order gift."
      }
    }
  },
  contactCta: {
    title: {
      ar: "اسألي خبيرة دودي على واتساب",
      en: "Ask a Dody expert on WhatsApp"
    },
    desc: {
      ar: "رسالة واحدة ونساعدك تختاري الروتين والمنتجات المناسبة لبشرتك.",
      en: "One message and we’ll help you pick the right routine and products."
    },
    button: {
      ar: "ابدئي المحادثة الآن",
      en: "Start chatting now"
    },
    note: {
      ar: "رد سريع خلال ساعات العمل.",
      en: "Fast reply during working hours."
    },
    message: {
      ar: "مرحباً، محتاجة ترشيح روتين مناسب لبشرتي.",
      en: "Hi, I need help picking a routine for my skin."
    }
  },
  footer: {
    desc: {
      ar: "متجر عناية بالبشرة ومكياج بتجربة عربية عصرية.",
      en: "Skincare and makeup store with a modern Arabic touch."
    },
    services: [
      {
        ar: "توصيل سريع داخل القاهرة والجيزة",
        en: "Fast delivery in Cairo & Giza"
      },
      {
        ar: "سياسة استبدال خلال 14 يومًا",
        en: "14-day exchange policy"
      },
      {
        ar: "بطاقات هدايا إلكترونية",
        en: "Digital gift cards"
      }
    ],
    contact: {
      whatsappDisplay: "0112 345 6789",
      whatsappIntl: "201123456789",
      instagram: "@dody.store",
      facebook: "facebook.com/dody.store"
    },
    hours: {
      ar: "كل يوم من 10 صباحًا حتى 10 مساءً",
      en: "Daily from 10 AM to 10 PM"
    },
    dashboard: {
      ar: "لوحة التحكم",
      en: "Dashboard"
    }
  }
};

window.DODY_API_BASE = "api";
window.DODY_BACKEND = "supabase";
window.DODY_SUPABASE = {
  url: "https://pttzwbjyiebrcktjdjzp.supabase.co",
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0dHp3Ymp5aWVicmNrdGpkanpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMTYyMjgsImV4cCI6MjA4NTc5MjIyOH0.hzAHqiCRP4wChK1OJ4MBAlFXnbH2MZcYM6uFAxdlJOY",
  adminPin: localStorage.getItem("dodySupabasePin") || "2026"
};
