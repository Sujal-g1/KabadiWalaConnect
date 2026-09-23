// ============================================================
// REWARDS PAGE DATA
// ============================================================

export const TRANSLATIONS = {
  app_title: {
    en: "Kabadi Connect : E-Waste Sathi",
    hi: "कबाड़ी कनेक्ट : ई-कचरा साथी",
    mr: "कबाडी कनेक्ट : ई-कचरा साथी",
  },

  app_subtitle: {
    en: "Authorized E-Waste Channelization & Informal Recycler Formalization",
    hi: "अधिकृत ई-कचरा संकलन, EPR क्रेडिट व डिजिटल लेजर नेटवर्क",
    mr: "अधिकृत ई-कचरा संकलन व EPR क्रेडिट नेटवर्क",
  },

  tab_rewards: {
    en: "E-Waste Rewards",
    hi: "ई-कचरा इनाम व वजन",
    mr: "ई-कचरा बक्षिसे व वजन",
  },

  tab_nature: {
    en: "Toxic Audit & Impact",
    hi: "पर्यावरण व टॉक्सिक ऑडिट",
    mr: "पर्यावरण व विषारी कचरा ऑडिट",
  },

  tab_schemes: {
    en: "E-Waste Govt Schemes",
    hi: "सरकारी ई-कचरा योजनाएं",
    mr: "सरकारी ई-कचरा योजना",
  },

  wallet_title: {
    en: "E-Waste Points Wallet",
    hi: "ई-कचरा वॉलेट बैलेंस",
    mr: "ई-कचरा वॉलेट शिल्लक",
  },

  points_unit: {
    en: "Points",
    hi: "पॉइंट्स",
    mr: "पॉइंट्स",
  },

  weight_target_title: {
    en: "Monthly E-Waste Recovery Target",
    hi: "मासिक ई-कचरा संकलन लक्ष्य",
    mr: "मासिक ई-कचरा संकलन लक्ष्य",
  },

  rewards_catalog_title: {
    en: "Field Utility Vouchers & Cash",
    hi: "उपयोगी वाउचर, पेट्रोल व रिचार्ज रिडीम करें",
    mr: "उपयुक्त व्हाउचर, पेट्रोल व रिचार्ज रिडीम करा",
  },

  referral_title: {
    en: "Refer an E-Waste Collector (+100 ⭐)",
    hi: "ई-कचरा संग्रहक साथी को रेफर करें (+100 ⭐)",
    mr: "ई-कचरा साथीदाराला रेफर करा (+100 ⭐)",
  },

  referral_desc: {
    en: "Share your referral link on WhatsApp to onboard an electronic scrap collector and get 100 points.",
    hi: "व्हाट्सएप पर साथी कबाड़ी को जोड़ें और ई-कचरा नेटवर्क से जुड़ते ही 100 पॉइंट्स पाएं।",
    mr: "ई-कचरा गोळा करणाऱ्या सहकाऱ्याला व्हॉट्सॲपवर जोडा आणि 100 पॉइंट्स मिळवा.",
  },

  refer_btn: {
    en: "Share & Earn (+100 ⭐)",
    hi: "शेयर करें (+100 ⭐)",
    mr: "शेअर करा (+100 ⭐)",
  },

  copied_msg: {
    en: "Referral link shared! +100 Points added to your wallet.",
    hi: "रेफरल लिंक शेयर हुआ! आपके वॉलेट में +100 पॉइंट्स जुड़ गए।",
    mr: "रेफरल लिंक शेअर झाली! वॉलेटमध्ये +100 पॉइंट्स जमा झाले.",
  },

  btn_redeem: {
    en: "Claim Voucher",
    hi: "रिडीम करें",
    mr: "रिडीम करा",
  },

  btn_locked: {
    en: "Locked",
    hi: "पॉइंट्स कम हैं",
    mr: "शिल्लक कमी आहे",
  },

  listen_btn: {
    en: "Listen",
    hi: "सुनें",
    mr: "ऐका",
  },
};


// ============================================================
// MILESTONES
// ============================================================

export const TARGET_MILESTONES = [
  {
    target: 50,

    title: {
      en: "Bronze E-Sathi Milestone (50 kg)",
      hi: "ब्रॉन्ज ई-साथी लक्ष्य (50 kg)",
      mr: "कांस्य ई-साथी लक्ष्य (50 kg)",
    },

    reward: "₹100 Petrol Pump Fuel Voucher",
  },

  {
    target: 150,

    title: {
      en: "Silver E-Sathi Milestone (150 kg)",
      hi: "सिल्वर ई-साथी लक्ष्य (150 kg)",
      mr: "रौप्य ई-साथी लक्ष्य (150 kg)",
    },

    reward: "Anti-Static & Cut-Proof Dismantling Kit",
  },

  {
    target: 300,

    title: {
      en: "Gold E-Waste Champion (300 kg)",
      hi: "गोल्ड ई-वेस्ट चैंपियन (300 kg)",
      mr: "सुवर्ण ई-कचरा चॅम्पियन (300 kg)",
    },

    reward:
      "₹500 Direct Bank Transfer + CPCB EPR Partner Badge",
  },
];


// ============================================================
// E-WASTE CATALOG
// ============================================================

export const EWASTE_CATALOG = {
  phone: {
    type: "unit",

    name: {
      en: "Smartphones / Mobile Handsets (~200g)",
      hi: "स्मार्टफोन / मोबाइल हैंडसेट (~200 ग्राम)",
      mr: "स्मार्टफोन / मोबाईल (~200 ग्रॅम)",
    },

    unitRate: 150,
    avgWeightKg: 0.2,

    purity: "PCB Attached",
  },

  laptop: {
    type: "unit",

    name: {
      en: "Laptops / Notebook Computers",
      hi: "लैपटॉप / नोटबुक कंप्यूटर",
      mr: "लॅपटॉप / कॉम्प्युटर",
    },

    unitRate: 450,
    avgWeightKg: 2.1,

    purity: "Motherboard & RAM",
  },

  monitor: {
    type: "unit",

    name: {
      en: "LED / LCD Display Monitors",
      hi: "एलईडी / एलसीडी मॉनिटर",
      mr: "एलईडी / एलसीडी मॉनिटर",
    },

    unitRate: 300,
    avgWeightKg: 3.5,

    purity: "Display Panel & Inverter Board",
  },

  bulk_pcb: {
    type: "weight",

    name: {
      en: "Loose Circuit Boards & Motherboards (Bulk)",
      hi: "मिश्रित मदरबोर्ड व सर्किट बोर्ड (थोक)",
      mr: "मदरबोर्ड व सर्किट बोर्ड (थोक)",
    },

    ratePerKg: 420,

    purity: "Gold/Palladium IC Traces",
  },

  bulk_copper: {
    type: "weight",

    name: {
      en: "Stripped Copper Wire (No Burning)",
      hi: "छीला हुआ शुद्ध तांबा तार (बिना जलाया)",
      mr: "तांबे वायर (न जाळता)",
    },

    ratePerKg: 760,

    purity: "99.8% Pure Electrolytic Copper",
  },

  bulk_smps: {
    type: "weight",

    name: {
      en: "SMPS, Transformers & Power Chokes",
      hi: "एसएमपीएस, ट्रांसफार्मर व कॉपर चोक",
      mr: "एसएमपीएस व ट्रान्सफॉर्मर",
    },

    ratePerKg: 240,

    purity: "Copper Magnet Coils",
  },
};


// ============================================================
// E-WASTE MANDI RATES
// ============================================================

export const EWASTE_MANDI_RATES = [
  {
    item: {
      en: "Stripped Copper Wire (No Burning)",
      hi: "छीला हुआ तांबा तार (बिना जलाया, शुद्ध)",
      mr: "तांबे वायर",
    },

    authorized: "₹760/kg",
    local: "₹450/kg",
    bonus: "+₹310 Extra",
    purity: "99.8% Pure",
  },

  {
    item: {
      en: "Phone & Server Motherboards (PCB)",
      hi: "मोबाइल व कंप्यूटर मदरबोर्ड (PCB)",
      mr: "मदरबोर्ड ई-कचरा",
    },

    authorized: "₹420/kg",
    local: "₹210/kg",
    bonus: "+₹210 Extra",
    purity: "Gold/Palladium",
  },

  {
    item: {
      en: "Dead Laptop Complete Unit",
      hi: "खराब लैपटॉप (प्रति नग)",
      mr: "खराब लॅपटॉप",
    },

    authorized: "₹450/pc",
    local: "₹250/pc",
    bonus: "+₹200 Extra",
    purity: "Full Unit",
  },

  {
    item: {
      en: "Dead Smartphone Complete Unit",
      hi: "खराब स्मार्टफोन (प्रति नग)",
      mr: "खराब स्मार्टफोन",
    },

    authorized: "₹150/pc",
    local: "₹70/pc",
    bonus: "+₹80 Extra",
    purity: "Full Unit",
  },
];


// ============================================================
// REWARDS CATALOG
// ============================================================

export const REWARDS_DATA = [
  {
    id: "rw_data",

    type: "recharge",

    title: {
      en: "Mobile 4G/5G Data Recharge (₹50)",
      hi: "मोबाइल 4G/5G डेटा रिचार्ज (₹50)",
      mr: "मोबाईल डेटा रिचार्ज (₹50)",
    },

    desc: {
      en: "Instant 4G data voucher for Jio, Airtel, Vi to keep digital weigh-bridge & UPI active.",
      hi: "Jio, Airtel या Vi के लिए 5GB डेटा पैक, ताकि ऑनलाइन ई-कचरा मंडी रेट कभी न रुके।",
      mr: "जिओ, एअरटेल किंवा व्हीआय साठी त्वरित 5GB डेटा व्हाउचर.",
    },

    pts: 250,

    icon: "📱",

    brand: "Jio / Airtel / Vi",

    code: "DATA-50-NET",

    rechargeAmount: "₹50",

    dataBenefit: "5 GB High-Speed 4G Data",
  },

  {
    id: "rw_petrol",

    type: "voucher",

    title: {
      en: "Fuel / Petrol Pump Voucher (₹100)",
      hi: "पेट्रोल पंप ईंधन वाउचर (₹100)",
      mr: "पेट्रोल पंप इंधन व्हाउचर (₹100)",
    },

    desc: {
      en: "Valid at IndianOil, HPCL & BPCL for bike, auto or loader carrying e-waste.",
      hi: "इंडियन ऑयल, HPCL या BPCL पर अपनी गाड़ी/ऑटो/लोडर में ₹100 का पेट्रोल भरवाएं।",
      mr: "कोणत्याही पेट्रोल पंपावर ₹100 चे इंधन भरण्यासाठी वैध.",
    },

    pts: 400,

    icon: "⛽",

    brand: "HPCL / IndianOil",

    code: "PETRO-2026-X89",
  },

  {
    id: "rw_safety",

    type: "voucher",

    title: {
      en: "Anti-Static & Cut-Proof Gloves + Eye Gear",
      hi: "एंटी-स्टैटिक ई-वेस्ट सेफ्टी किट",
      mr: "ई-कचरा सुरक्षा किट",
    },

    desc: {
      en: "Kevlar gloves & eye goggles for dismantling TVs, PC towers, and sharp circuit boards.",
      hi: "सर्किट बोर्ड, कांच और नुकीली धातु से हाथों और आंखों को सुरक्षित रखने के लिए सुरक्षा किट।",
      mr: "ई-कचऱ्याच्या कामात हाताच्या संरक्षणासाठी मजबूत हातमोजे.",
    },

    pts: 600,

    icon: "🧤",

    brand: "Swachh Tool",

    code: "SAFE-PCB-01",
  },

  {
    id: "rw_cash",

    type: "cash",

    title: {
      en: "Direct Bank Transfer Cash (₹150)",
      hi: "सीधे बैंक खाते में नकद (₹150)",
      mr: "थेट बँक खात्यात रोख (₹150)",
    },

    desc: {
      en: "Instant UPI bank payout credited directly to your registered bank account.",
      hi: "सीधे अपने जन-धन या किसी भी बैंक खाते में ₹150 UPI नकद ट्रांसफर पाएं।",
      mr: "नोंदणीकृत बँक खात्यात थेट ₹150 UPI ट्रान्सफर.",
    },

    pts: 800,

    icon: "💸",

    brand: "Direct UPI",

    code: "UPI-CASH-150",
  },
];


// ============================================================
// GOVERNMENT SCHEMES
// ============================================================

export const GOVT_SCHEMES = [
  {
    id: "sch_1",

    name: {
      en: "CPCB E-Waste EPR Framework (MoEFCC)",
      hi: "सीपीसीबी ई-कचरा ईपीआर योजना (CPCB EPR Portal)",
      mr: "सीपीसीबी ई-कचरा ईपीआर योजना",
    },

    tag: {
      en: "EPR Credit Incentive",
      hi: "ईपीआर क्रेडिट प्रोत्साहन",
      mr: "ईपीआर क्रेडिट",
    },

    tagColor:
      "bg-emerald-100 text-emerald-900 border-emerald-300",

    statusBadge:
      "Active CPCB Framework ✓",

    desc: {
      en: "E-Waste (Management) Rules 2022 channelization framework. Empowers informal collectors to supply to registered recyclers and earn government-backed EPR credits.",

      hi: "ई-कचरा प्रबंधन नियम 2022 के तहत अनौपचारिक कबाड़ियों को पंजीकृत रीसाइक्लर्स से जोड़ना, ताकि उन्हें हर किलो ई-कचरे पर कानूनी दाम और ईपीआर इंसेंटिव मिले।",

      mr: "ई-कचरा व्यवस्थापन नियम 2022 अंतर्गत अधिकृत नोंदणी आणि प्रोत्साहन.",
    },

    benefits: [
      {
        en: "Legal sale to CPCB registered dismantlers without police interference",
        hi: "सड़क पर पुलिस या प्रशासन की रोक-टोक से कानूनी सुरक्षा",
        mr: "कायदेशीर संरक्षण",
      },

      {
        en: "Direct electronic traceability certificate for every kilogram",
        hi: "हर किलो ई-कचरे की आधिकारिक डिजिटल पर्ची",
        mr: "अधिकृत डिजिटल पावती",
      },
    ],

    actionText:
      "Open Central Pollution Control Board Portal",

    officialUrl:
      "https://cpcb.nic.in",

    helpline:
      "1800-180-1975",
  },

  {
    id: "sch_2",

    name: {
      en: "MeitY E-Waste Dismantler Skill Certification",
      hi: "इलेक्ट्रॉनिक्स मंत्रालय (MeitY) ई-कचरा कौशल व टूल योजना",
      mr: "MeitY ई-कचरा कौशल्य योजना",
    },

    tag: {
      en: "Certified Dismantler",
      hi: "प्रमाणित तकनीशियन",
      mr: "प्रमाणित तंत्रज्ञ",
    },

    tagColor:
      "bg-blue-100 text-blue-900 border-blue-300",

    statusBadge:
      "Skill India Digital ✓",

    desc: {
      en: "Ministry of Electronics & IT training and modern tool-kit support for safe recovery of copper and motherboards without dangerous burning.",

      hi: "इलेक्ट्रॉनिक्स मंत्रालय द्वारा तार छीलने वाले ऑटोमैटिक वायर स्ट्रिपर और स्क्रू-गन किट की मुफ्त सहायता ताकि तार जलाने की जरूरत न पड़े।",

      mr: "तारा न जाळता तांबे काढण्यासाठी आधुनिक साधनांची मदत.",
    },

    benefits: [
      {
        en: "Free wire-stripper tools to stop open cable burning",
        hi: "तार छीलने का मुफ्त आधुनिक टूल-किट",
        mr: "मोफत आधुनिक टूल-किट",
      },

      {
        en: "Government skill certificate as authorized e-scrap handler",
        hi: "मान्यता प्राप्त ई-कचरा हैंडलर का सरकारी प्रमाण पत्र",
        mr: "सरकारी प्रमाणपत्र",
      },
    ],

    actionText:
      "Open Ministry of Electronics Portal (MeitY)",

    officialUrl:
      "https://www.meity.gov.in",

    helpline:
      "1800-11-2020",
  },

  {
    id: "sch_3",

    name: {
      en: "e-Shram (Hazardous E-Scrap Worker Category)",
      hi: "ई-श्रम असंगठित ई-कचरा कामगार सुरक्षा",
      mr: "ई-श्रम असंघटित कामगार कार्ड",
    },

    tag: {
      en: "₹2 Lakh Accidental Cover",
      hi: "₹2 लाख दुर्घटना बीमा",
      mr: "₹2 लाख अपघात विमा",
    },

    tagColor:
      "bg-amber-100 text-amber-900 border-amber-300",

    statusBadge:
      "Live Registration Active ✓",

    desc: {
      en: "National Database of Unorganized Workers. Free registration with ₹2,00,000 accidental death & disability insurance under PMSBY.",

      hi: "ई-कचरा छंटाई व कबाड़ी श्रेणी में 12-अंक UAN कार्ड और ₹2 लाख का मुफ्त सरकारी दुर्घटना बीमा।",

      mr: "मोफत नोंदणीसह ₹2 लाखांचा अपघात विमा.",
    },

    benefits: [
      {
        en: "12-digit Universal Account Number (UAN) Card",
        hi: "12 अंकों का स्थायी UAN नंबर कार्ड",
        mr: "12 अंकी कायमस्वरूपी UAN कार्ड",
      },

      {
        en: "Direct Benefit Transfer (DBT) during medical emergencies",
        hi: "आपातकालीन स्थिति में सीधे बैंक खाते में सहायता",
        mr: "थेट बँक खात्यात आर्थिक सहाय्य",
      },
    ],

    actionText:
      "Open e-Shram Portal",

    officialUrl:
      "https://eshram.gov.in",

    helpline:
      "14434",
  },

  {
    id: "sch_4",

    name: {
      en: "Ayushman Bharat PM-JAY (Toxic Health Cover)",
      hi: "आयुष्मान भारत स्वास्थ्य सुरक्षा (PM-JAY)",
      mr: "आयुष्मान भारत आरोग्य कार्ड",
    },

    tag: {
      en: "₹5 Lakh Free Treatment",
      hi: "₹5 लाख मुफ्त इलाज",
      mr: "₹5 लाख मोफत उपचार",
    },

    tagColor:
      "bg-rose-100 text-rose-900 border-rose-300",

    statusBadge:
      "Hospital Network Active 🏥",

    desc: {
      en: "Cashless secondary and tertiary hospitalization cover up to ₹5,00,000 per family per year for respiratory, heavy metal & cut injuries.",

      hi: "अस्पताल में भर्ती होने पर परिवार को ₹5 लाख तक का कैशलेस इलाज। कांच, तेजाब या फेफड़े के इन्फेक्शन का पूरा मुफ्त उपचार।",

      mr: "कुटुंबासाठी वर्षाला ₹5 लाखांपर्यंत मोफत कॅशलेस वैद्यकीय उपचार.",
    },

    benefits: [
      {
        en: "Cashless admission in private & govt hospitals",
        hi: "सरकारी व निजी दोनों अस्पतालों में पूर्ण कैशलेस",
        mr: "सरकारी व खाजगी रुग्णालयांत मोफत उपचार",
      },

      {
        en: "Medicine and testing expenses covered",
        hi: "दवाइयों और टेस्ट का पूरा खर्च शामिल",
        mr: "औषधांचा खर्च समाविष्ट",
      },
    ],

    actionText:
      "Open NHA PMJAY Portal",

    officialUrl:
      "https://pmjay.gov.in",

    helpline:
      "14555",
  },
];