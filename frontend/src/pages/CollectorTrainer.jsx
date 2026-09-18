import React, { useState, useEffect, useRef } from 'react';

const TRANSLATIONS = {
  app_title: { en: "Kabadi Connect : E-Waste Sathi", hi: "कबाड़ी कनेक्ट : ई-कचरा साथी", mr: "कबाडी कनेक्ट : ई-कचरा साथी" },
  app_subtitle: { en: "Authorized E-Waste Channelization & Informal Recycler Formalization", hi: "अधिकृत ई-कचरा संकलन, EPR क्रेडिट व डिजिटल लेजर नेटवर्क", mr: "अधिकृत ई-कचरा संकलन व EPR क्रेडिट नेटवर्क" },
  tab_rewards: { en: "E-Waste Rewards", hi: "ई-कचरा इनाम व वजन (Rewards)", mr: "ई-कचरा बक्षिसे व वजन (Rewards)" },
  tab_nature: { en: "Toxic Audit & Impact", hi: "पर्यावरण व टॉक्सिक ऑडिट (Impact)", mr: "पर्यावरण व विषारी कचरा ऑडिट" },
  tab_schemes: { en: "E-Waste Govt Schemes", hi: "सरकारी ई-कचरा योजनाएं (Govt)", mr: "सरकारी ई-कचरा योजना (Govt)" },
  wallet_title: { en: "E-Waste Points Wallet", hi: "ई-कचरा वॉलेट बैलेंस", mr: "ई-कचरा वॉलेट शिल्लक" },
  points_unit: { en: "Points", hi: "पॉइंट्स", mr: "पॉइंट्स" },
  weight_target_title: { en: "Monthly E-Waste Recovery Target", hi: "मासिक ई-कचरा संकलन लक्ष्य (E-Waste Target)", mr: "मासिक ई-कचरा संकलन लक्ष्य" },
  rewards_catalog_title: { en: "Field Utility Vouchers & Cash", hi: "उपयोगी वाउचर, पेट्रोल व रिचार्ज रिडीम करें", mr: "उपयुक्त व्हाउचर, पेट्रोल व रिचार्ज रिडीम करा" },
  referral_title: { en: "Refer an E-Waste Collector (+100 ⭐)", hi: "ई-कचरा संग्रहक साथी को रेफर करें (+100 ⭐)", mr: "ई-कचरा साथीदाराला रेफर करा (+100 ⭐)" },
  referral_desc: { en: "Share your referral link on WhatsApp to onboard an electronic scrap collector and get 100 points.", hi: "व्हाट्सएप पर साथी कबाड़ी को जोड़ें और ई-कचरा नेटवर्क से जुड़ते ही 100 पॉइंट्स पाएं।", mr: "ई-कचरा गोळा करणाऱ्या सहकाऱ्याला व्हॉट्सॲपवर जोडा आणि 100 पॉइंट्स मिळवा." },
  refer_btn: { en: "Share & Earn (+100 ⭐)", hi: "शेयर करें (+100 ⭐)", mr: "शेअर करा (+100 ⭐)" },
  copied_msg: { en: "Referral link shared! +100 Points added to your wallet.", hi: "रेफरल लिंक शेयर हुआ! आपके वॉलेट में +100 पॉइंट्स जुड़ गए।", mr: "रेफरल लिंक शेअर झाली! वॉलेटमध्ये +100 पॉइंट्स जमा झाले." },
  btn_redeem: { en: "Claim Voucher", hi: "रिडीम करें", mr: "रिडीम करा" },
  btn_locked: { en: "Locked", hi: "पॉइंट्स कम हैं", mr: "शिल्लक कमी आहे" },
  listen_btn: { en: "Listen", hi: "सुनें", mr: "ऐका" },
};

const TARGET_MILESTONES = [
  { target: 50, title: { en: "Bronze E-Sathi Milestone (50 kg)", hi: "ब्रॉन्ज ई-साथी लक्ष्य (50 kg)", mr: "कांस्य ई-साथी लक्ष्य" }, reward: "₹100 Petrol Pump Fuel Voucher" },
  { target: 150, title: { en: "Silver E-Sathi Milestone (150 kg)", hi: "सिल्वर ई-साथी लक्ष्य (150 kg)", mr: "रौप्य ई-साथी लक्ष्य" }, reward: "Anti-Static & Cut-Proof Dismantling Kit" },
  { target: 300, title: { en: "Gold E-Waste Champion (300 kg)", hi: "गोल्ड ई-वेस्ट चैंपियन (300 kg)", mr: "सुवर्ण ई-कचरा चॅम्पियन" }, reward: "₹500 Direct Bank Transfer + CPCB EPR Partner Badge" }
];

const EWASTE_CATALOG = {
  phone: {
    type: 'unit',
    name: { en: "Smartphones / Mobile Handsets (~200g)", hi: "स्मार्टफोन / मोबाइल हैंडसेट (~200 ग्राम)", mr: "स्मार्टफोन / मोबाईल (~200 ग्रॅम)" },
    unitRate: 150,
    avgWeightKg: 0.2,
    purity: "PCB Attached"
  },
  laptop: {
    type: 'unit',
    name: { en: "Laptops / Notebook Computers", hi: "लैपटॉप / नोटबुक कंप्यूटर", mr: "लॅपटॉप / कॉम्प्युटर" },
    unitRate: 450,
    avgWeightKg: 2.1,
    purity: "Motherboard & RAM"
  },
  monitor: {
    type: 'unit',
    name: { en: "LED / LCD Display Monitors", hi: "एलईडी / एलसीडी मॉनिटर", mr: "एलईडी / एलसीडी मॉनिटर" },
    unitRate: 300,
    avgWeightKg: 3.5,
    purity: "Display Panel & Inverter Board"
  },
  bulk_pcb: {
    type: 'weight',
    name: { en: "Loose Circuit Boards & Motherboards (Bulk)", hi: "मिश्रित मदरबोर्ड व सर्किट बोर्ड (थोक)", mr: "मदरबोर्ड व सर्किट बोर्ड (थोक)" },
    ratePerKg: 420,
    purity: "Gold/Palladium IC Traces"
  },
  bulk_copper: {
    type: 'weight',
    name: { en: "Stripped Copper Wire (No Burning)", hi: "छीला हुआ शुद्ध तांबा तार (बिना जलाया)", mr: "तांबे वायर (न जाळता)" },
    ratePerKg: 760,
    purity: "99.8% Pure Electrolytic Copper"
  },
  bulk_smps: {
    type: 'weight',
    name: { en: "SMPS, Transformers & Power Chokes", hi: "एसएमपीएस, ट्रांसफार्मर व कॉपर चोक", mr: "एसएमपीएस व ट्रान्सफॉर्मर" },
    ratePerKg: 240,
    purity: "Copper Magnet Coils"
  }
};

const EWASTE_MANDI_RATES = [
  { item: { en: "Stripped Copper Wire (No Burning)", hi: "छीला हुआ तांबा तार (बिना जलाया, शुद्ध)", mr: "तांबे वायर" }, authorized: "₹760/kg", local: "₹450/kg", bonus: "+₹310 Extra", purity: "99.8% Pure" },
  { item: { en: "Phone & Server Motherboards (PCB)", hi: "मोबाइल व कंप्यूटर मदरबोर्ड (PCB)", mr: "मदरबोर्ड ई-कचरा" }, authorized: "₹420/kg", local: "₹210/kg", bonus: "+₹210 Extra", purity: "Gold/Palladium" },
  { item: { en: "Dead Laptop Complete Unit", hi: "खराब लैपटॉप (प्रति नग)", mr: "खराब लॅपटॉप" }, authorized: "₹450/pc", local: "₹250/pc", bonus: "+₹200 Extra", purity: "Full Unit" },
  { item: { en: "Dead Smartphone Complete Unit", hi: "खराब स्मार्टफोन (प्रति नग)", mr: "खराब स्मार्टफोन" }, authorized: "₹150/pc", local: "₹70/pc", bonus: "+₹80 Extra", purity: "Full Unit" },
];

const REWARDS_DATA = [
  {
    id: 'rw_data',
    type: 'recharge',
    title: { en: "Mobile 4G/5G Data Recharge (₹50)", hi: "मोबाइल 4G/5G डेटा रिचार्ज (₹50)", mr: "मोबाईल डेटा रिचार्ज (₹50)" },
    desc: { en: "Instant 4G data voucher for Jio, Airtel, Vi to keep digital weigh-bridge & UPI active.", hi: "Jio, Airtel या Vi के लिए 5GB डेटा पैक, ताकि ऑनलाइन ई-कचरा मंडी रेट कभी न रुके।", mr: "जिओ, एअरटेल किंवा व्हीआय साठी त्वरित 5GB डेटा व्हाउचर." },
    pts: 250,
    icon: "📱",
    brand: "Jio / Airtel / Vi",
    code: "DATA-50-NET",
    rechargeAmount: "₹50",
    dataBenefit: "5 GB High-Speed 4G Data"
  },
  {
    id: 'rw_petrol',
    type: 'voucher',
    title: { en: "Fuel / Petrol Pump Voucher (₹100)", hi: "पेट्रोल पंप ईंधन वाउचर (₹100)", mr: "पेट्रोल पंप इंधन व्हाउचर (₹100)" },
    desc: { en: "Valid at IndianOil, HPCL & BPCL for bike, auto or loader carrying e-waste.", hi: "इंडियन ऑयल, HPCL या BPCL पर अपनी गाड़ी/ऑटो/लोडर में ₹100 का पेट्रोल भरवाएं।", mr: "कोणत्याही पेट्रोल पंपावर ₹100 चे इंधन भरण्यासाठी वैध." },
    pts: 400,
    icon: "⛽",
    brand: "HPCL / IndianOil",
    code: "PETRO-2026-X89"
  },
  {
    id: 'rw_safety',
    type: 'voucher',
    title: { en: "Anti-Static & Cut-Proof Gloves + Eye Gear", hi: "एंटी-स्टैटिक ई-वेस्ट सेफ्टी किट", mr: "ई-कचरा सुरक्षा किट" },
    desc: { en: "Kevlar gloves & eye goggles for dismantling TVs, PC towers, and sharp circuit boards.", hi: "सर्किट बोर्ड, कांच और नुकीले धातु से हाथों और आंखों को खतरनाक केमिकल से बचाएं।", mr: "ई-कचऱ्याच्या कामात हाताच्या संरक्षणासाठी मजबूत हातमोजे." },
    pts: 600,
    icon: "🧤",
    brand: "Swachh Tool",
    code: "SAFE-PCB-01"
  },
  {
    id: 'rw_cash',
    type: 'cash',
    title: { en: "Direct Bank Transfer Cash (₹150)", hi: "सीधे बैंक खाते में नकद (₹150)", mr: "थेट बँक खात्यात रोख (₹150)" },
    desc: { en: "Instant UPI bank payout credited directly to your registered bank account.", hi: "सीधे अपने जन-धन या किसी भी बैंक खाते में ₹150 UPI नकद ट्रांसफर पाएं।", mr: "नोंदणीकृत बँक खात्यात थेट ₹150 UPI ट्रान्सफर." },
    pts: 800,
    icon: "💸",
    brand: "Direct UPI",
    code: "UPI-CASH-150"
  }
];

const GOVT_SCHEMES = [
  {
    id: "sch_1",
    name: { en: "CPCB E-Waste EPR Framework (MoEFCC)", hi: "सीपीसीबी ई-कचरा ईपीआर योजना (CPCB EPR Portal)", mr: "सीपीसीबी ई-कचरा ईपीआर योजना" },
    tag: { en: "EPR Credit Incentive", hi: "ईपीआर क्रेडिट प्रोत्साहन", mr: "ईपीआर क्रेडिट" },
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    statusBadge: "Active CPCB Framework ✓",
    desc: {
      en: "E-Waste (Management) Rules 2022 channelization framework. Empowers informal collectors to supply to registered recyclers and earn government-backed EPR credits.",
      hi: "ई-कचरा प्रबंधन नियम 2022 के तहत अनौपचारिक कबाड़ियों को पंजीकृत रीसाइक्लर्स से जोड़ना, ताकि उन्हें हर किलो ई-कचरे पर कानूनी दाम और ईपीआर इंसेंटिव मिले।",
      mr: "ई-कचरा व्यवस्थापन नियम 2022 अंतर्गत अधिकृत नोंदणी आणि प्रोत्साहन."
    },
    benefits: [
      { en: "Legal sale to CPCB registered dismantlers without police interference", hi: "सड़क पर पुलिस या प्रशासन की रोक-टोक से कानूनी सुरक्षा", mr: "कायदेशीर संरक्षण" },
      { en: "Direct electronic traceability certificate for every kilogram", hi: "हर किलो ई-कचरे की आधिकारिक डिजिटल पर्ची", mr: "अधिकृत डिजिटल पावती" }
    ],
    actionText: "Open Central Pollution Control Board Portal",
    officialUrl: "https://cpcb.nic.in",
    helpline: "1800-180-1975"
  },
  {
    id: "sch_2",
    name: { en: "MeitY E-Waste Dismantler Skill Certification", hi: "इलेक्ट्रॉनिक्स मंत्रालय (MeitY) ई-कचरा कौशल व टूल योजना", mr: "MeitY ई-कचरा कौशल्य योजना" },
    tag: { en: "Certified Dismantler", hi: "प्रमाणित तकनीशियन", mr: "प्रमाणित तंत्रज्ञ" },
    tagColor: "bg-blue-100 text-blue-900 border-blue-300",
    statusBadge: "Skill India Digital ✓",
    desc: {
      en: "Ministry of Electronics & IT training and modern tool-kit support for safe recovery of copper and motherboards without dangerous burning.",
      hi: "इलेक्ट्रॉनिक्स मंत्रालय द्वारा तार छीलने वाले ऑटोमैटिक वायर स्ट्रिपर और स्क्रू-गन किट की मुफ्त सहायता ताकि तार जलाने की जरूरत न पड़े।",
      mr: "तारा न जाळता तांबे काढण्यासाठी आधुनिक साधनांची मदत."
    },
    benefits: [
      { en: "Free wire-stripper tools to stop open cable burning", hi: "तार छीलने का मुफ्त आधुनिक टूल-किट", mr: "मोफत आधुनिक टूल-किट" },
      { en: "Government skill certificate as authorized e-scrap handler", hi: "मान्यता प्राप्त ई-कचरा हैंडलर का सरकारी प्रमाण पत्र", mr: "सरकारी प्रमाणपत्र" }
    ],
    actionText: "Open Ministry of Electronics Portal (MeitY)",
    officialUrl: "https://www.meity.gov.in",
    helpline: "1800-11-2020"
  },
  {
    id: "sch_3",
    name: { en: "e-Shram (Hazardous E-Scrap Worker Category)", hi: "ई-श्रम असंगठित ई-कचरा कामगार सुरक्षा", mr: "ई-श्रम असंघटित कामगार कार्ड" },
    tag: { en: "₹2 Lakh Accidental Cover", hi: "₹2 लाख दुर्घटना बीमा", mr: "₹2 लाख अपघात विमा" },
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    statusBadge: "Live Registration Active ✓",
    desc: {
      en: "National Database of Unorganized Workers. Free registration with ₹2,00,000 accidental death & disability insurance under PMSBY.",
      hi: "ई-कचरा छंटाई व कबाड़ी श्रेणी में 12-अंक UAN कार्ड और ₹2 लाख का मुफ्त सरकारी दुर्घटना बीमा।",
      mr: "मोफत नोंदणीसह ₹2 लाखांचा अपघात विमा."
    },
    benefits: [
      { en: "12-digit Universal Account Number (UAN) Card", hi: "12 अंकों का स्थायी UAN नंबर कार्ड", mr: "12 अंकी कायमस्वरूपी UAN कार्ड" },
      { en: "Direct Benefit Transfer (DBT) during medical emergencies", hi: "आपातकालीन स्थिति में सीधे बैंक खाते में सहायता", mr: "थेट बँक खायात आर्थिक सहाय्य" }
    ],
    actionText: "Open e-Shram Portal",
    officialUrl: "https://eshram.gov.in",
    helpline: "14434"
  },
  {
    id: "sch_4",
    name: { en: "Ayushman Bharat PM-JAY (Toxic Health Cover)", hi: "आयुष्मान भारत स्वास्थ्य सुरक्षा (PM-JAY)", mr: "आयुष्मान भारत आरोग्य कार्ड" },
    tag: { en: "₹5 Lakh Free Treatment", hi: "₹5 लाख मुफ्त इलाज", mr: "₹5 लाख मोफत उपचार" },
    tagColor: "bg-rose-100 text-rose-900 border-rose-300",
    statusBadge: "Hospital Network Active 🏥",
    desc: {
      en: "Cashless secondary and tertiary hospitalization cover up to ₹5,00,000 per family per year for respiratory, heavy metal & cut injuries.",
      hi: "अस्पताल में भर्ती होने पर परिवार को ₹5 लाख तक का कैशलेस इलाज। कांच, तेजाब या फेफड़े के इन्फेक्शन का पूरा मुफ्त उपचार।",
      mr: "कुटुंबासाठी वर्षाला ₹5 लाखांपर्यंत मोफत कॅशलेस वैद्यकीय उपचार."
    },
    benefits: [
      { en: "Cashless admission in private & govt hospitals", hi: "सरकारी व निजी दोनों अस्पतालों में पूर्ण कैशलेस", mr: "सरकारी व खाजगी रुग्णालयांत मोफत उपचार" },
      { en: "Medicine and testing expenses covered", hi: "दवाइयों और टेस्ट का पूरा खर्च शामिल", mr: "औषधांचा खर्च समाविष्ट" }
    ],
    actionText: "Open NHA PMJAY Portal",
    officialUrl: "https://pmjay.gov.in",
    helpline: "14555"
  }
];

export default function RewardsPage() {
  const [lang, setLang] = useState('hi');
  const [activeTab, setActiveTab] = useState('rewards');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  const [points, setPoints] = useState(() => Number(localStorage.getItem('k_ew_pts')) || 345);
  const [currentWeight, setCurrentWeight] = useState(() => Number(localStorage.getItem('k_ew_weight')) || 32);
  const [streakDays, setStreakDays] = useState(() => Number(localStorage.getItem('k_ew_streak')) || 6);
  const [lastCheckInDate, setLastCheckInDate] = useState(() => localStorage.getItem('k_ew_last_checkin') || '');
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const [impact, setImpact] = useState(() => {
    const saved = localStorage.getItem('k_ew_impact');
    return saved ? JSON.parse(saved) : { ewasteTotal: 78, leadAvoidedGrams: 940, mercuryAvoidedGrams: 85, waterSavedLiters: 1420 };
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('k_ew_txns');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let seenCheckin = false;
        return parsed.filter(item => {
          if (item.title && item.title.includes('Daily E-Waste Check-in')) {
            if (seenCheckin) return false;
            seenCheckin = true;
          }
          return true;
        });
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 'EW-9021', date: 'Yesterday, 4:30 PM', title: 'Sold 2x Laptops + 5kg PCBs', weight: 9.2, pts: 46, type: 'credit' },
      { id: 'EW-9020', date: 'Yesterday, 11:15 AM', title: 'AI Inspection Recorded: CPCB Grade-A Motherboard', weight: 0, pts: 0, type: 'info' }
    ];
  });

  const [claimedModal, setClaimedModal] = useState(null);
  const [rechargeModal, setRechargeModal] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);
  
  const [aiScanModalOpen, setAiScanModalOpen] = useState(false);
  const [isScanningAI, setIsScanningAI] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const [lotItems, setLotItems] = useState([
    { id: 'item_1', categoryKey: 'phone', qty: 2 },
    { id: 'item_2', categoryKey: 'laptop', qty: 1 }
  ]);
  const [selectedFacility, setSelectedFacility] = useState('EcoRecycle CPCB R-9902 (Authorized Facility)');

  const [toast, setToast] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const dropdownRef = useRef(null);
  const checkInDoneRef = useRef(false);

  const multiplier = streakDays >= 7 ? 1.5 : streakDays >= 3 ? 1.2 : 1.0;

  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobileDevice(checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('k_ew_pts', points);
    localStorage.setItem('k_ew_weight', currentWeight);
    localStorage.setItem('k_ew_streak', streakDays);
    localStorage.setItem('k_ew_last_checkin', lastCheckInDate);
    localStorage.setItem('k_ew_impact', JSON.stringify(impact));
    localStorage.setItem('k_ew_txns', JSON.stringify(transactions));
  }, [points, currentWeight, streakDays, lastCheckInDate, impact, transactions]);

  useEffect(() => {
    if (checkInDoneRef.current) return;
    const todayStr = new Date().toISOString().split('T')[0];

    if (lastCheckInDate === todayStr) {
      checkInDoneRef.current = true;
      return;
    }

    checkInDoneRef.current = true;
    const baseDailyPoints = 2;
    const earnedCheckInPts = Math.round(baseDailyPoints * multiplier);
    const newPts = points + earnedCheckInPts;
    const newStreak = streakDays + 1;

    setPoints(newPts);
    setStreakDays(newStreak);
    setLastCheckInDate(todayStr);

    const newTxn = {
      id: 'EW-' + Math.floor(1000 + Math.random() * 9000),
      date: 'Today, Just now',
      title: lang === 'en' ? `Daily E-Waste Check-in (Day ${newStreak} Streak 🔥)` : `दैनिक ई-कचरा चेक-इन (दिन ${newStreak} स्ट्रीक 🔥)`,
      weight: 0,
      pts: earnedCheckInPts,
      type: 'credit'
    };

    setTransactions(prev => [
      newTxn,
      ...prev.filter(t => !t.title || !t.title.includes('Daily E-Waste Check-in'))
    ]);
    showToast(lang === 'en' ? `Daily Check-in +${earnedCheckInPts} ⭐ points auto-credited!` : `🎉 आज का दैनिक बोनस +${earnedCheckInPts} ⭐ वॉलेट में ऑटो-ऐड हो गया!`);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const t = (key) => TRANSLATIONS[key]?.[lang] || key;

  const activeMilestone = TARGET_MILESTONES.find(m => currentWeight < m.target) || TARGET_MILESTONES[TARGET_MILESTONES.length - 1];
  const targetWeight = activeMilestone.target;
  const weightRemaining = Math.max(0, targetWeight - currentWeight);
  const weightProgressPercent = Math.min(100, Math.round((currentWeight / targetWeight) * 100));

  const currentLevelBadge = currentWeight >= 300
    ? (lang === 'en' ? "Gold E-Waste Champion 🥇" : "गोल्ड ई-वेस्ट चैंपियन 🥇")
    : currentWeight >= 150 
      ? (lang === 'en' ? "Level 3: Silver E-Sathi 🥈" : "Level 3: सिल्वर ई-साथी 🥈")
      : currentWeight >= 50 
        ? (lang === 'en' ? "Level 2: Bronze E-Sathi 🥉" : "Level 2: ब्रॉन्ज ई-साथी 🥉")
        : (lang === 'en' ? "Level 1: E-Scrap Starter 🎖️" : "Level 1: ई-कचरा शुरुआत 🎖️");

  const toxicLeadPreventedKg = ((impact.ewasteTotal * 12) / 1000).toFixed(2);
  const co2AvoidedKg = Math.round(impact.ewasteTotal * 2.8);
  const copperRecoveredKg = (impact.ewasteTotal * 0.18).toFixed(1);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleFileUploadForAI = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanningAI(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanningAI(false);
      const fileName = file.name.toLowerCase();
      let detectedLabel = "CPCB Grade-A Motherboard (Gold/Palladium IC Traces)";
      if (fileName.includes('phone') || fileName.includes('mobile') || fileName.includes('screen') || fileName.includes('img') || fileName.includes('photo')) {
        detectedLabel = "Smartphone / Mobile Handset PCB (Grade-A Copper Core)";
      } else if (fileName.includes('lap') || fileName.includes('pc') || fileName.includes('dell') || fileName.includes('hp')) {
        detectedLabel = "Laptop Motherboard Unit (High Purity Gold Connectors)";
      }

      setScanResult(detectedLabel);

      const newTxn = {
        id: 'AI-' + Math.floor(1000 + Math.random() * 9000),
        date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: `AI Inspection Recorded: ${detectedLabel}`,
        weight: 0,
        pts: 0,
        type: 'info'
      };
      setTransactions(prev => [newTxn, ...prev]);
      showToast(lang === 'en' ? "AI Inspection recorded in audit ledger!" : "AI निरीक्षण ऑडिट लेजर में दर्ज हो गया!");
    }, 1800);
  };

  const addLotItem = () => {
    setLotItems(prev => [...prev, { id: 'item_' + Date.now(), categoryKey: 'bulk_pcb', qty: 5 }]);
  };

  const removeLotItem = (id) => {
    if (lotItems.length === 1) {
      showToast(lang === 'en' ? "At least one item required in slip!" : "पर्ची में कम से कम एक आइटम आवश्यक है!");
      return;
    }
    setLotItems(prev => prev.filter(item => item.id !== id));
  };

  const updateLotItem = (id, field, value) => {
    setLotItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculatedTotals = lotItems.reduce((acc, item) => {
    const meta = EWASTE_CATALOG[item.categoryKey];
    if (!meta) return acc;
    const qtyNum = parseFloat(item.qty) || 0;
    
    if (meta.type === 'unit') {
      const lineCash = qtyNum * meta.unitRate;
      const lineWeight = qtyNum * meta.avgWeightKg;
      return {
        totalCash: acc.totalCash + lineCash,
        totalWeight: acc.totalWeight + lineWeight
      };
    } else {
      const lineCash = qtyNum * meta.ratePerKg;
      return {
        totalCash: acc.totalCash + lineCash,
        totalWeight: acc.totalWeight + qtyNum
      };
    }
  }, { totalCash: 0, totalWeight: 0 });

  const handleConfirmMultiItemSale = (e) => {
    e.preventDefault();
    if (calculatedTotals.totalWeight <= 0) {
      showToast(lang === 'en' ? "Please enter valid quantities!" : "कृपया वैध मात्रा दर्ज करें!");
      return;
    }

    const roundedWeight = parseFloat(calculatedTotals.totalWeight.toFixed(2));
    const grossCash = calculatedTotals.totalCash;
    
    const basePts = Math.round(roundedWeight * 5);
    const earnedPts = Math.round(basePts * multiplier);

    const slipId = 'EPR-IN-' + Math.floor(100000 + Math.random() * 900000);
    const timestampStr = new Date().toLocaleString(lang === 'en' ? 'en-IN' : 'hi-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const updatedPts = points + earnedPts;
    const updatedWeight = currentWeight + roundedWeight;
    setPoints(updatedPts);
    setCurrentWeight(updatedWeight);

    setImpact(prev => ({
      ewasteTotal: prev.ewasteTotal + roundedWeight,
      leadAvoidedGrams: prev.leadAvoidedGrams + Math.round(roundedWeight * 12),
      mercuryAvoidedGrams: prev.mercuryAvoidedGrams + Math.round(roundedWeight * 1.1),
      waterSavedLiters: prev.waterSavedLiters + Math.round(roundedWeight * 22)
    }));

    const receiptLineItems = lotItems.map(item => {
      const meta = EWASTE_CATALOG[item.categoryKey];
      const q = parseFloat(item.qty) || 0;
      const isUnit = meta.type === 'unit';
      return {
        name: meta.name[lang] || meta.name.en,
        type: meta.type,
        qty: q,
        unitLabel: isUnit ? (lang === 'en' ? 'Units' : 'नग') : 'KG',
        rateDisplay: isUnit ? `₹${meta.unitRate}/pc` : `₹${meta.ratePerKg}/kg`,
        totalPrice: isUnit ? q * meta.unitRate : q * meta.ratePerKg,
        weightKg: isUnit ? parseFloat((q * meta.avgWeightKg).toFixed(2)) : q
      };
    });

    const newTxn = {
      id: slipId,
      date: timestampStr,
      title: `${lang === 'en' ? 'Sold' : 'बिक्री'} ${receiptLineItems.length} items (Cash: ₹${grossCash})`,
      weight: roundedWeight,
      pts: earnedPts,
      type: 'credit'
    };
    setTransactions(prev => [newTxn, ...prev]);

    const receiptData = {
      slipId,
      date: timestampStr,
      collectorId: 'EW-CPCB-88419',
      facility: selectedFacility,
      items: receiptLineItems,
      totalWeight: roundedWeight,
      grossAmount: grossCash,
      ptsEarned: earnedPts,
      processingMethod: lang === 'en' ? 'Mechanical Stripping (Zero Acid Burning)' : 'मैकेनिकल स्ट्रिपिंग (बिना जलाया, धुआं-रहित)',
      compliance: 'E-Waste (Management) Rules, 2022'
    };

    setSellModalOpen(false);
    setActiveReceipt(receiptData);
    showToast(lang === 'en' ? `Digital Weigh Slip #${slipId} Generated! +${earnedPts} ⭐ Points` : `✅ ई-कचरा तौल पर्ची #${slipId} जारी! +${earnedPts} ⭐ पॉइंट्स!`);
  };

  const downloadReceiptAsImage = () => {
    if (!activeReceipt) return;

    const rowCount = activeReceipt.items.length;
    const dynamicHeight = 790 + (rowCount * 45);

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = dynamicHeight;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 800, dynamicHeight);

    ctx.strokeStyle = '#16803A';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 760, dynamicHeight - 40);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 740, dynamicHeight - 60);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#16803A';
    ctx.font = '900 24px sans-serif';
    ctx.fillText('CPCB AUTHORIZED E-WASTE HANDOVER RECEIPT', 400, 75);

    ctx.fillStyle = '#64748B';
    ctx.font = '14px sans-serif';
    ctx.fillText('MoEFCC E-Waste Management Rules 2022 • Multi-Device Consignment Slip', 400, 102);

    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(50, 125);
    ctx.lineTo(750, 125);
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#334155';
    
    ctx.fillText(`${lang === 'en' ? 'Slip Number' : 'पर्ची संख्या'}:`, 60, 160);
    ctx.font = 'bold 15px monospace';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(activeReceipt.slipId, 220, 160);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(`${lang === 'en' ? 'Timestamp' : 'दिनांक व समय'}:`, 60, 190);
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(activeReceipt.date, 220, 190);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(`${lang === 'en' ? 'Collector ID' : 'संग्रहक पहचान'}:`, 60, 220);
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = '#16803A';
    ctx.fillText(activeReceipt.collectorId, 220, 220);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(`${lang === 'en' ? 'CPCB Facility' : 'अधिकृत केंद्र'}:`, 60, 250);
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(activeReceipt.facility, 220, 250);

    const tableTop = 285;
    ctx.fillStyle = '#F1F8F3';
    ctx.fillRect(50, tableTop, 700, 40);
    ctx.strokeStyle = '#86EFAC';
    ctx.strokeRect(50, tableTop, 700, 40);

    ctx.fillStyle = '#166534';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(lang === 'en' ? 'ITEM / DEVICE DESCRIPTION' : 'सामग्री विवरण', 65, tableTop + 25);
    ctx.textAlign = 'right';
    ctx.fillText(lang === 'en' ? 'QTY / WT' : 'मात्रा/वजन', 470, tableTop + 25);
    ctx.fillText(lang === 'en' ? 'RATE' : 'दर', 580, tableTop + 25);
    ctx.fillText(lang === 'en' ? 'SUBTOTAL' : 'कुल (₹)', 725, tableTop + 25);

    let currentY = tableTop + 65;
    activeReceipt.items.forEach((item, index) => {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`${index + 1}. ${item.name.slice(0, 36)}`, 65, currentY);

      ctx.textAlign = 'right';
      ctx.font = '13px sans-serif';
      ctx.fillStyle = '#334155';
      ctx.fillText(`${item.qty} ${item.unitLabel}`, 470, currentY);
      ctx.fillText(`${item.rateDisplay}`, 580, currentY);

      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#16803A';
      ctx.fillText(`₹${item.totalPrice}`, 725, currentY);

      currentY += 38;
    });

    currentY += 15;
    ctx.fillStyle = '#FEFCE8';
    ctx.fillRect(50, currentY, 700, 105);
    ctx.strokeStyle = '#FDE047';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(50, currentY, 700, 105);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#854D0E';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(lang === 'en' ? 'PAYMENT & EPR RECOVERY AUDIT' : 'भुगतान व EPR पॉइंट्स सारांश', 70, currentY + 28);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#1E293B';
    ctx.fillText(`• ${lang === 'en' ? 'Total Scale Weight Diverted' : 'कुल कांटा तौल'}: ${activeReceipt.totalWeight} KG`, 70, currentY + 56);
    ctx.fillText(`• ${lang === 'en' ? 'Gross Cash Handover' : 'कुल नकद भुगतान'}: ₹${activeReceipt.grossAmount}`, 70, currentY + 82);

    ctx.textAlign = 'right';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#16803A';
    ctx.fillText(`+${activeReceipt.ptsEarned} ⭐ EPR Points Credited`, 720, currentY + 56);

    currentY += 135;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0F172A';
    ctx.font = '24px monospace';
    ctx.fillText('|||||| | |||||||| |||| |||||| |||||||||| |||||', 400, currentY);
    ctx.font = '11px monospace';
    ctx.fillStyle = '#475569';
    ctx.fillText(`AUTH-HASH-${activeReceipt.slipId}-CPCB-VALIDATED`, 400, currentY + 22);

    currentY += 75;
    ctx.textAlign = 'left';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(lang === 'en' ? 'Collector Sign / Thumb' : 'संग्रहक हस्ताक्षर / अंगूठा', 80, currentY);

    ctx.textAlign = 'right';
    ctx.fillText(lang === 'en' ? 'Authorized CPCB Weighmaster Stamp' : 'अधिकृत तौल कांटा मोहर', 720, currentY);

    const link = document.createElement('a');
    link.download = `E-Waste_MultiItem_Slip_${activeReceipt.slipId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast(lang === 'en' ? "Consignment slip downloaded! 📥" : "तौल पर्ची डाउनलोड हो गई! 📥");
  };

  const referralText = lang === 'en'
    ? "Join Kabadi Connect (E-Waste Sathi) to sell multiple phones, laptops & copper wire at official CPCB rates! Ref: ESATHI-88419"
    : "कबाड़ी कनेक्ट (ई-कचरा साथी) से जुड़ें और फोन, लैपटॉप व तांबा तार सीधे अधिकृत CPCB रेट पर बेचें! कोड: ESATHI-88419";
  const referralUrl = "https://cpcb.nic.in/e-waste?ref=ESATHI88419";

  const handleInitiateReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Kabadi Connect : E-Waste Sathi",
          text: referralText,
          url: referralUrl,
        });
        completeReferralBonus();
      } catch (err) {
        if (err.name !== 'AbortError') setShareModalOpen(true);
      }
    } else {
      setShareModalOpen(true);
    }
  };

  const completeReferralBonus = () => {
    const updated = points + 100;
    setPoints(updated);
    
    const newTxn = {
      id: 'REF-' + Math.floor(1000 + Math.random() * 9000),
      date: 'Today, Just now',
      title: lang === 'en' ? 'E-Waste Collector Referral Bonus' : 'ई-कचरा साथी रेफरल बोनस',
      weight: 0,
      pts: 100,
      type: 'credit'
    };
    setTransactions(prev => [newTxn, ...prev]);

    setShareModalOpen(false);
    showToast(t('copied_msg'));
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(referralText + " " + referralUrl)}`;
    window.open(waUrl, '_blank');
    completeReferralBonus();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    completeReferralBonus();
  };

  const handleRedeemClick = (rew) => {
    if (points < rew.pts) {
      showToast(lang === 'en' ? `Insufficient balance! Need ${rew.pts - points} more pts.` : `अपर्याप्त पॉइंट्स! ${rew.pts - points} पॉइंट्स और चाहिए।`);
      return;
    }

    if (rew.type === 'recharge') {
      setRechargeModal({
        item: rew,
        state: 'confirm',
        phone: '98721-45092',
        operator: 'Reliance Jio 4G'
      });
    } else {
      const remaining = points - rew.pts;
      setPoints(remaining);
      setClaimedModal(rew);

      const newTxn = {
        id: 'CLM-' + Math.floor(1000 + Math.random() * 9000),
        date: 'Today, Just now',
        title: `${lang === 'en' ? 'Redeemed' : 'रिडीम'}: ${rew.title[lang]}`,
        weight: 0,
        pts: rew.pts,
        type: 'debit'
      };
      setTransactions(prev => [newTxn, ...prev]);
    }
  };

  const handleConfirmRecharge = () => {
    if (!rechargeModal) return;
    setRechargeModal(prev => ({ ...prev, state: 'processing' }));

    setTimeout(() => {
      const remaining = points - rechargeModal.item.pts;
      setPoints(remaining);

      const newTxn = {
        id: 'RCH-' + Math.floor(1000 + Math.random() * 9000),
        date: 'Today, Just now',
        title: lang === 'en' ? 'Mobile 4G Data Recharge (₹50)' : 'मोबाइल 4G डेटा रिचार्ज (₹50)',
        weight: 0,
        pts: rechargeModal.item.pts,
        type: 'debit'
      };
      setTransactions(prev => [newTxn, ...prev]);

      setRechargeModal(prev => ({ ...prev, state: 'success', txnId: 'TXN_' + Math.floor(100000 + Math.random() * 900000) }));
      showToast(lang === 'en' ? "₹50 Data Pack Recharged! (-250 ⭐ Points)" : "₹50 डेटा रिचार्ज सफल! (-250 ⭐ पॉइंट्स)");
    }, 1800);
  };

  const downloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 950;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createRadialGradient(700, 475, 50, 700, 475, 800);
    bgGrad.addColorStop(0, '#06381b');
    bgGrad.addColorStop(1, '#02180b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1400, 950);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 16;
    ctx.strokeRect(35, 35, 1330, 880);

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.strokeRect(55, 55, 1290, 840);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(65, 65, 1270, 820);

    const drawCorner = (x, y) => {
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(65, 65);
    drawCorner(1335, 65);
    drawCorner(65, 885);
    drawCorner(1335, 885);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('CENTRAL POLLUTION CONTROL BOARD • MOEFCC E-WASTE MANAGEMENT RULES', 700, 130);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 46px sans-serif';
    ctx.fillText('CERTIFICATE OF E-WASTE CHANNELIZATION', 700, 195);

    ctx.fillStyle = '#A7F3D0';
    ctx.font = 'italic 20px sans-serif';
    ctx.fillText('This document certifies that the authorized informal electronic recovery partner:', 700, 245);

    ctx.fillStyle = '#FCD34D';
    ctx.font = '900 44px sans-serif';
    ctx.fillText('SWACHH E-SATHI (AUTHORIZED RECOVERY OPERATOR)', 700, 315);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 20px sans-serif';
    ctx.fillText(`CPCB Channelization ID: EW-CPCB-88419  |  Tier: ${currentLevelBadge}`, 700, 360);

    ctx.fillStyle = '#062d16';
    ctx.fillRect(160, 400, 1080, 175);
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    ctx.strokeRect(160, 400, 1080, 175);

    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`TOTAL VERIFIED E-WASTE RECOVERED: ${impact.ewasteTotal} KG (ZERO OPEN BURNING)`, 700, 450);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 20px sans-serif';
    ctx.fillText(`• Toxic Lead (Pb) & Mercury Diverted from Soil: ${impact.leadAvoidedGrams}g Lead, ${impact.mercuryAvoidedGrams}g Mercury`, 700, 495);
    ctx.fillText(`• Strategic Copper/Gold Ore Equivalent Conserved: ${copperRecoveredKg} kg  |  CO₂ Avoided: ${co2AvoidedKg} kg`, 700, 535);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Verification Timestamp: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, 160, 640);
    ctx.fillText('Statutory Compliance: E-Waste (Management) Rules, 2022 & EPR Credit Traceability Mechanism', 160, 670);

    ctx.textAlign = 'center';
    ctx.beginPath();
    ctx.arc(700, 720, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.fillStyle = '#064E3B';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('E-WASTE', 700, 715);
    ctx.fillText('WARRIOR', 700, 735);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('State Pollution Control Board Nodal Desk', 1240, 710);
    ctx.font = '15px sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Authorized Formal Recycler Facility', 1240, 735);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#6EE7B7';
    ctx.font = '13px monospace';
    ctx.fillText('Digital EPR Hash: cpcb-epr-9fa2-881c-ewaste-compliant', 700, 830);

    const link = document.createElement('a');
    link.download = `CPCB_Green_EWaste_Certificate_EW-CPCB-88419.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast(lang === 'en' ? "E-Certificate downloaded! 📄" : "सर्टिफिकेट डाउनलोड हो गया! 📄");
  };

  const langOptions = [
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F8F3] via-emerald-50/30 to-slate-100 text-[#263238] font-sans antialiased pb-28 select-none">
      
      {toast && (
        <div className="fixed top-3 inset-x-4 z-50 max-w-sm mx-auto bg-[#16803A] text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-[#4CAF50] text-center animate-bounce">
          ✨ {toast}
        </div>
      )}

      {/* CONSIGNEE RECEIPT POPUP */}
      {activeReceipt && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveReceipt(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 border-2 border-emerald-500 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setActiveReceipt(null)} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center border-b border-dashed border-slate-300 pb-3 mb-3">
              <span className="text-2xl">⚡</span>
              <h3 className="text-base font-black text-[#16803A] tracking-tight">
                {lang === 'en' ? "CPCB AUTHORIZED E-WASTE CONSIGNMENT SLIP" : "अधिकृत ई-कचरा तौल व बिक्री रसीद"}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                {activeReceipt.slipId} • {activeReceipt.date}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? "Collector ID:" : "संग्रहक पहचान:"}</span>
                <span className="font-mono font-bold text-slate-900">{activeReceipt.collectorId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'en' ? "CPCB Facility:" : "रीसाइक्लिंग केंद्र:"}</span>
                <span className="font-bold text-slate-800 text-right">{activeReceipt.facility}</span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <p className="font-black text-slate-700 mb-1.5">{lang === 'en' ? "Itemized Consignment List:" : "मद-वार विवरण:"}</p>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {activeReceipt.items.map((it, idx) => (
                    <div key={idx} className="p-2 flex items-center justify-between text-[11px]">
                      <div>
                        <p className="font-bold text-slate-800">{it.name}</p>
                        <p className="text-[10px] text-slate-500">{it.qty} {it.unitLabel} @ {it.rateDisplay}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-slate-900">₹{it.totalPrice}</span>
                        <span className="block text-[10px] text-slate-400">({it.weightKg} kg)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-300 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-600 block">{lang === 'en' ? "Total Scale Weight:" : "कुल कांटा तौल:"}</span>
                  <span className="text-xs font-mono font-black text-slate-800">{activeReceipt.totalWeight} KG</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-600 block">{lang === 'en' ? "Gross Cash Handover:" : "कुल नकद भुगतान:"}</span>
                  <span className="text-base font-black text-[#16803A]">₹{activeReceipt.grossAmount}</span>
                </div>
              </div>

              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex justify-between items-center text-[11px]">
                <span className="font-bold text-amber-900">{lang === 'en' ? "EPR Rewards Credited:" : "EPR वॉलेट पॉइंट्स:"}</span>
                <span className="font-black text-amber-700">+{activeReceipt.ptsEarned} ⭐ Points</span>
              </div>
            </div>

            <div className="my-3 text-center">
              <p className="text-xs font-mono tracking-widest text-slate-600">||||| |||| || |||||| |||||| |||||</p>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">{activeReceipt.compliance}</p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={downloadReceiptAsImage}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <span>📥 {lang === 'en' ? "Download Slip (PNG)" : "पर्ची डाउनलोड करें (PNG)"}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                {lang === 'en' ? "Close" : "बंद करें"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MULTI-DEVICE SALE MODAL */}
      {sellModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSellModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 border border-emerald-200 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🔌</span>
                <div>
                  <h3 className="text-base font-black text-[#263238]">
                    {lang === 'en' ? "Multi-Device E-Waste Lot Slip" : "मल्टी-डिवाइस ई-कचरा तौल व बिक्री पर्ची"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'en' ? "Add phones, laptops & bulk scrap together (Cash + EPR Points)" : "फोन, लैपटॉप और थोक कबाड़ जोड़ें (नकद + EPR पॉइंट्स)"}
                  </p>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={() => setSellModalOpen(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black text-base cursor-pointer active:scale-90 transition-all"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmMultiItemSale} className="space-y-4 text-xs">
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {lotItems.map((it, idx) => {
                  const meta = EWASTE_CATALOG[it.categoryKey];
                  const isUnit = meta.type === 'unit';
                  return (
                    <div key={it.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-slate-600">
                          {lang === 'en' ? `Item #${idx + 1}` : `सामग्री #${idx + 1}`} ({isUnit ? (lang === 'en' ? 'Per Piece' : 'प्रति नग') : 'Bulk KG'})
                        </span>
                        {lotItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLotItem(it.id)}
                            className="text-rose-500 hover:text-rose-700 font-bold text-xs cursor-pointer"
                          >
                            ✕ {lang === 'en' ? 'Remove' : 'हटाएं'}
                          </button>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2">
                        <div>
                          <select
                            value={it.categoryKey}
                            onChange={(e) => updateLotItem(it.id, 'categoryKey', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-800"
                          >
                            <optgroup label={lang === 'en' ? "Unit-Based Devices (Per Piece)" : "डिवाइस (प्रति नग)"}>
                              <option value="phone">{EWASTE_CATALOG.phone.name[lang] || EWASTE_CATALOG.phone.name.en} (₹150/pc)</option>
                              <option value="laptop">{EWASTE_CATALOG.laptop.name[lang] || EWASTE_CATALOG.laptop.name.en} (₹450/pc)</option>
                              <option value="monitor">{EWASTE_CATALOG.monitor.name[lang] || EWASTE_CATALOG.monitor.name.en} (₹300/pc)</option>
                            </optgroup>
                            <optgroup label={lang === 'en' ? "Bulk Scrap (Per KG)" : "थोक कबाड़ (प्रति किलो)"}>
                              <option value="bulk_pcb">{EWASTE_CATALOG.bulk_pcb.name[lang] || EWASTE_CATALOG.bulk_pcb.name.en} (₹420/kg)</option>
                              <option value="bulk_copper">{EWASTE_CATALOG.bulk_copper.name[lang] || EWASTE_CATALOG.bulk_copper.name.en} (₹760/kg)</option>
                              <option value="bulk_smps">{EWASTE_CATALOG.bulk_smps.name[lang] || EWASTE_CATALOG.bulk_smps.name.en} (₹240/kg)</option>
                            </optgroup>
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            step={isUnit ? "1" : "0.5"}
                            min="1"
                            max="500"
                            value={it.qty}
                            onChange={(e) => updateLotItem(it.id, 'qty', e.target.value)}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-black text-slate-900"
                            placeholder={isUnit ? "Count" : "Weight in KG"}
                            required
                          />
                          <span className="font-bold text-slate-500 px-2 py-1.5 bg-slate-200 rounded-xl text-[11px]">
                            {isUnit ? (lang === 'en' ? 'Pcs' : 'नग') : 'KG'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={addLotItem}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-[#16803A] font-black rounded-xl border border-dashed border-emerald-300 transition cursor-pointer"
              >
                + {lang === 'en' ? "Add Another Device / Bulk Scrap Item" : "अन्य डिवाइस या कबाड़ आइटम जोड़ें"}
              </button>

              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <p className="font-black text-emerald-950">
                    {lang === 'en' ? "Consignment Estimate:" : "चालान कुल अनुमान:"}
                  </p>
                  <p className="text-xs text-emerald-700 font-bold">
                    {calculatedTotals.totalWeight.toFixed(1)} kg • {multiplier}x {lang === 'en' ? "Multiplier" : "मल्टीप्लायर"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-[#16803A] block">
                    ₹{calculatedTotals.totalCash}
                  </span>
                  <span className="text-[11px] font-bold text-amber-800">
                    +{Math.round((calculatedTotals.totalWeight * 5) * multiplier)} ⭐ Points
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button 
                  type="button" 
                  onClick={() => setSellModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl active:scale-95 transition cursor-pointer"
                >
                  {lang === 'en' ? "Cancel" : "रद्द करें"}
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-[#16803A] hover:bg-[#126b30] text-white font-black rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === 'en' ? "Generate Slip & Payout" : "तौल पर्ची जारी करें"}</span>
                  <span>✓</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REFERRAL MODAL */}
      {shareModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShareModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border border-emerald-200 shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setShareModalOpen(false)} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
              🤝
            </div>
            <h3 className="text-base font-black text-[#263238]">
              {lang === 'en' ? "Invite an E-Waste Collector" : "ई-कचरा साथी को इनवाइट करें"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'en' ? "Get " : "शेयर करते ही आपके वॉलेट में "}
              <strong className="text-emerald-700">+100 ⭐ Points</strong>
              {lang === 'en' ? " instantly on share." : " जुड़ेंगे।"}
            </p>

            <div className="bg-slate-50 rounded-2xl p-3.5 my-4 border border-slate-200 text-left text-xs text-slate-700">
              <p className="font-semibold text-slate-500 mb-1">
                {lang === 'en' ? "Referral Message:" : "शेयर करने वाला मैसेज:"}
              </p>
              <p className="bg-white p-2 rounded-xl border border-slate-200 text-[11px] leading-relaxed font-mono">
                {referralText}
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span>💬 {lang === 'en' ? "Share on WhatsApp (+100 ⭐)" : "WhatsApp पर भेजें (+100 ⭐)"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>🔗 {lang === 'en' ? "Copy Link (+100 ⭐)" : "लिंक कॉपी करें (+100 ⭐)"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TELECOM RECHARGE MODAL */}
      {rechargeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setRechargeModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border border-emerald-200 shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setRechargeModal(null)} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black text-sm cursor-pointer"
            >
              ✕
            </button>

            {rechargeModal.state === 'confirm' && (
              <>
                <div className="w-14 h-14 bg-emerald-100 text-[#16803A] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
                  📱
                </div>
                <h3 className="text-base font-black text-[#263238]">Instant Mobile 4G Recharge</h3>
                <p className="text-xs text-slate-500 mt-1">Telecom Gateway Simulation</p>

                <div className="bg-slate-50 rounded-2xl p-4 my-4 border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Registered Mobile:</span>
                    <span className="font-mono font-bold text-slate-800">{rechargeModal.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Operator & Circle:</span>
                    <span className="font-bold text-emerald-700">{rechargeModal.operator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Plan Selected:</span>
                    <span className="font-black text-slate-800">{rechargeModal.item.rechargeAmount} (5GB Data Pack)</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-slate-700">
                    <span className="font-bold">Points Debited:</span>
                    <span className="font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      -{rechargeModal.item.pts} ⭐ Points
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRechargeModal(null)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmRecharge}
                    className="flex-1 py-2.5 bg-[#16803A] hover:bg-[#126b30] text-white text-xs font-black rounded-xl shadow-md active:scale-95 cursor-pointer"
                  >
                    Confirm & Recharge
                  </button>
                </div>
              </>
            )}

            {rechargeModal.state === 'processing' && (
              <div className="py-6 space-y-3">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h4 className="text-sm font-black text-[#263238]">Connecting to Telecom API...</h4>
                <p className="text-xs text-slate-500 font-medium">Crediting 5GB Data to {rechargeModal.phone}</p>
              </div>
            )}

            {rechargeModal.state === 'success' && (
              <>
                <div className="w-14 h-14 bg-emerald-100 text-[#16803A] rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
                  ✓
                </div>
                <h3 className="text-base font-black text-[#16803A]">Recharge Successful!</h3>
                <p className="text-xs text-slate-500 mt-0.5">Your 5GB data pack is now active.</p>

                <div className="bg-emerald-50/60 rounded-2xl p-4 my-4 border border-emerald-200 text-left text-xs space-y-1.5 font-medium text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-mono font-bold text-slate-800">{rechargeModal.txnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mobile Number:</span>
                    <span className="font-mono font-bold text-slate-800">{rechargeModal.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Validity:</span>
                    <span className="font-bold text-emerald-800">Existing Plan Validity</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-emerald-200">
                    <span className="font-bold text-slate-600">Points Deducted:</span>
                    <span className="font-black text-rose-600">-250 ⭐ Points</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRechargeModal(null)}
                  className="w-full py-2.5 bg-[#16803A] text-white text-xs font-black rounded-xl shadow-md hover:bg-[#126b30] active:scale-95 cursor-pointer"
                >
                  Done / ठीक है
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* VOUCHER CLAIMED MODAL */}
      {claimedModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setClaimedModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border border-emerald-200 shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => setClaimedModal(null)} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black text-sm cursor-pointer"
            >
              ✕
            </button>

            <span className="text-4xl">{claimedModal.icon}</span>
            <h3 className="text-base font-black text-[#263238] mt-2">{claimedModal.title[lang]}</h3>
            <p className="text-xs text-slate-500 mt-1">{claimedModal.desc[lang]}</p>
            
            <div className="bg-slate-100 rounded-2xl p-4 my-4 border border-dashed border-slate-300">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Coupon Code</p>
              <p className="text-lg font-black text-[#16803A] tracking-wider mt-1">{claimedModal.code}</p>
              <div className="h-8 bg-slate-300 mt-2 rounded flex items-center justify-center text-[10px] font-mono text-slate-600">
                ||||| | |||| ||| |||| | ||||| ||
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">Show this at the fuel station / service counter</p>
            </div>

            <button
              type="button"
              onClick={() => setClaimedModal(null)}
              className="w-full py-2.5 bg-[#16803A] text-white text-xs font-black rounded-xl shadow-md hover:bg-[#126b30] active:scale-95 cursor-pointer"
            >
              Done / बंद करें
            </button>
          </div>
        </div>
      )}

      {/* AI SCAN INSPECTION MODAL */}
      {aiScanModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => { setAiScanModalOpen(false); setScanResult(null); }}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-emerald-200 shadow-2xl relative animate-in fade-in zoom-in duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              onClick={() => { setAiScanModalOpen(false); setScanResult(null); }} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-black text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
              📸
            </div>
            <h3 className="text-base font-black text-[#263238]">
              {lang === 'en' ? "AI Device Condition & PCB Scan" : "AI डिवाइस व मदरबोर्ड स्कैन"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isMobileDevice 
                ? (lang === 'en' ? "Snap live photo via mobile camera or upload from gallery (Audit Record Only)" : "मोबाइल कैमरे से लाइव फोटो खींचें या गैलरी से अपलोड करें (केवल ऑडिट रिकॉर्ड)") 
                : (lang === 'en' ? "Upload device or PCB photo from your PC (Audit Record Only)" : "लैपटॉप/पीसी से डिवाइस या मदरबोर्ड की फोटो अपलोड करें (केवल ऑडिट रिकॉर्ड)")}
            </p>

            {isScanningAI ? (
              <div className="py-8 space-y-3">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-black text-slate-700">AI Computer Vision inspecting component grade...</p>
              </div>
            ) : scanResult ? (
              <div className="my-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <p className="text-emerald-700 font-black text-sm">✓ AI Inspection Successful!</p>
                <p className="font-bold text-xs text-slate-800">{scanResult}</p>
                <p className="text-[11px] text-blue-700 font-bold mt-1">Recorded in Ledger for CPCB Audit (No Reward Points)</p>
              </div>
            ) : (
              <div className="my-6 space-y-3">
                {isMobileDevice && (
                  <label className="flex items-center justify-center gap-2 w-full py-3 bg-[#16803A] hover:bg-[#126b30] text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition">
                    <span>📸 Snap Live Photo (Camera)</span>
                    <input type="file" accept="image/*" capture="environment" onChange={handleFileUploadForAI} className="hidden" />
                  </label>
                )}

                <label className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 cursor-pointer transition">
                  <span>📁 {isMobileDevice ? "Choose from Gallery" : "Upload Photo from PC / Laptop"}</span>
                  <input type="file" accept="image/*" onChange={handleFileUploadForAI} className="hidden" />
                </label>
              </div>
            )}

            <button
              type="button"
              onClick={() => { setAiScanModalOpen(false); setScanResult(null); }}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl cursor-pointer"
            >
              {lang === 'en' ? "Close" : "बंद करें"}
            </button>
          </div>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-[#16803A] via-[#1b9a46] to-[#0f5c29] text-white px-4 py-3.5 shadow-lg border-b border-emerald-400/30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-xl shadow-inner">
              ⚡
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight leading-tight drop-shadow-xs">{t('app_title')}</h1>
              <p className="text-[11px] text-emerald-100 font-medium">{t('app_subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => speak(
                lang === 'hi' 
                  ? `कबाड़ी कनेक्ट ई-कचरा साथी। आपका सक्रिय बैलेंस ${points} पॉइंट्स है। आपने इस महीने ${currentWeight} किलो ई-कचरा रीसायकल किया है।`
                  : `Kabadi Connect E-Waste Sathi. Balance ${points} points. ${currentWeight} kg e-waste collected.`
              )}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-white/20 active:scale-95 shadow-xs ${
                isSpeaking ? 'bg-[#F4B942] text-[#263238] animate-pulse' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <span>🔊</span>
              <span>{t('listen_btn')}</span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-xl px-2.5 py-1.5 text-xs font-bold transition active:scale-95 shadow-xs"
              >
                <span className="text-sm">🌐</span>
                <span className="uppercase">{lang}</span>
                <span className="text-[9px] opacity-80">▼</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-2xl shadow-2xl border border-slate-200 py-1 z-40 text-[#263238]">
                  {langOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLang(opt.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                        lang === opt.code ? 'bg-[#F1F8F3] text-[#16803A] font-black' : 'hover:bg-slate-50 font-semibold'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span>{opt.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 mt-5 space-y-5">
        
        {/* TABS */}
        <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-emerald-100 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'rewards'
                ? 'bg-[#16803A] text-white shadow-md shadow-emerald-700/20'
                : 'text-[#607D8B] hover:bg-[#F1F8F3]'
            }`}
          >
            <span>🔌</span>
            <span>{t('tab_rewards')}</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('nature')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'nature'
                ? 'bg-[#16803A] text-white shadow-md shadow-emerald-700/20'
                : 'text-[#607D8B] hover:bg-[#F1F8F3]'
            }`}
          >
            <span>🧪</span>
            <span>{t('tab_nature')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('schemes')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'schemes'
                ? 'bg-[#16803A] text-white shadow-md shadow-emerald-700/20'
                : 'text-[#607D8B] hover:bg-[#F1F8F3]'
            }`}
          >
            <span>🏛️</span>
            <span>{t('tab_schemes')}</span>
          </button>
        </div>

        {/* TAB 1: REWARDS */}
        {activeTab === 'rewards' && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#607D8B] tracking-wide">{t('wallet_title')}</p>
                    <button type="button" onClick={() => speak(`Balance ${points}`)} className="text-[#16803A] text-sm">🔊</button>
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-2">
                    <span className="text-4xl text-[#F4B942]">⭐</span>
                    <span className="text-5xl font-black text-[#263238] tracking-tight">{points}</span>
                    <span className="text-sm font-bold text-[#607D8B]">{t('points_unit')}</span>
                  </div>
                </div>
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">🔥 Streak: <strong className="text-amber-700">{streakDays} Days</strong></span>
                  <span className="px-2.5 py-1 rounded-full border bg-emerald-50 text-[#16803A]">{multiplier}x Multiplier</span>
                </div>
              </section>

              <section className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-200 uppercase tracking-wide">CPCB Certified Operator</span>
                  <h3 className="text-2xl font-black text-amber-300 mt-2">{currentLevelBadge}</h3>
                  <p className="text-xs text-emerald-100 mt-1">Authorized E-Waste Channelization Tier</p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-emerald-700/60 flex items-center justify-between text-xs text-emerald-200">
                  <span>EPR Collector ID:</span>
                  <span className="font-mono font-bold text-amber-300">EW-CPCB-88419</span>
                </div>
              </section>
            </div>

            <button
              type="button"
              onClick={() => setAiScanModalOpen(true)}
              className="w-full p-4 rounded-2xl bg-white hover:bg-blue-50/50 border border-blue-200 text-left transition-all active:scale-[0.98] shadow-xs flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl shrink-0">📸</div>
                <div>
                  <h4 className="font-black text-slate-800 text-xs sm:text-sm">AI Device Condition & PCB Scan (Audit Record Only)</h4>
                  <p className="text-[11px] text-slate-500">Upload photo to inspect grade & save record without reward points</p>
                </div>
              </div>
              <span className="text-xs font-black text-white bg-blue-600 px-3 py-2 rounded-xl shadow-xs">Scan Now ↗️</span>
            </button>

            <section className="bg-white rounded-3xl p-6 shadow-sm border-2 border-emerald-500/40 relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#16803A] flex items-center justify-center text-xl shrink-0">⚖️</div>
                  <div>
                    <h2 className="text-sm sm:text-base font-black text-[#263238]">{t('weight_target_title')}</h2>
                    <p className="text-xs text-[#607D8B]">{activeMilestone.title[lang]} • Reward: <strong className="text-emerald-800">{activeMilestone.reward}</strong></p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F1F8F3] p-4 rounded-2xl border border-emerald-200 mb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#16803A]">{currentWeight}</span>
                    <span className="text-lg font-black text-slate-400">/ {targetWeight} kg E-Waste</span>
                  </div>
                  <span className="text-xs font-black text-[#16803A] bg-white px-3 py-1 rounded-full border border-emerald-300">{weightProgressPercent}% Achieved</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${weightProgressPercent}%` }}></div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">📈</span>
                  <h2 className="text-sm font-black text-[#263238]">Live E-Waste Mandi Benchmark (MSP)</h2>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b text-[#607D8B]">
                      <th className="pb-2 font-bold">E-Waste Item</th>
                      <th className="pb-2 font-bold text-emerald-700">CPCB Authorized Rate</th>
                      <th className="pb-2 font-bold text-slate-400">Acid Burner Rate</th>
                      <th className="pb-2 font-bold text-right text-amber-600">Extra Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {EWASTE_MANDI_RATES.map((rate, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/40">
                        <td className="py-2.5 font-bold text-slate-800">{rate.item[lang] || rate.item.en}</td>
                        <td className="py-2.5 font-black text-[#16803A]">{rate.authorized}</td>
                        <td className="py-2.5 text-slate-400 line-through">{rate.local}</td>
                        <td className="py-2.5 font-black text-right text-amber-700">{rate.bonus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-sm font-black text-[#263238]">Record E-Waste Scale Handover</h2>
                  <p className="text-[11px] text-slate-500">Generate CPCB compliant digital weigh slip</p>
                </div>
                <button type="button" onClick={() => setSellModalOpen(true)} className="px-4 py-2 bg-[#16803A] text-white font-black text-xs rounded-xl shadow-md">+ New Consignment</button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 uppercase">Verified Transaction History & AI Inspection Records:</p>
                <div className="divide-y border rounded-2xl bg-slate-50 max-h-56 overflow-y-auto">
                  {transactions.map((txn, idx) => (
                    <div key={idx} className="p-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-black text-slate-800">{txn.title}</p>
                        <p className="text-[10px] text-slate-400">{txn.date} • Ref: {txn.id}</p>
                      </div>
                      <span className={`font-black px-2.5 py-1 rounded-lg border ${txn.type === 'credit' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-blue-700 bg-blue-50 border-blue-200'}`}>
                        {txn.type === 'credit' ? `+${txn.pts} ⭐` : 'Audit Record'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white rounded-3xl p-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-black text-amber-300">{t('referral_title')}</h2>
                <p className="text-xs text-emerald-100 mt-0.5">{t('referral_desc')}</p>
              </div>
              <button type="button" onClick={handleInitiateReferral} className="px-5 py-2.5 bg-amber-400 text-slate-900 font-black text-xs rounded-xl shadow-md shrink-0">📤 Share</button>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
              <h2 className="text-sm font-black text-[#263238] mb-4">{t('rewards_catalog_title')}</h2>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {REWARDS_DATA.map((rew) => {
                  const canClaim = points >= rew.pts;
                  return (
                    <div key={rew.id} className={`p-4 rounded-2xl border flex flex-col justify-between ${canClaim ? 'bg-white border-[#4CAF50]' : 'bg-slate-50 opacity-80'}`}>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-2xl p-2 rounded-xl bg-[#F1F8F3]">{rew.icon}</span>
                          <span className="text-xs font-black text-[#F4B942] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">⭐ {rew.pts}</span>
                        </div>
                        <h3 className="text-xs font-black text-[#263238]">{rew.title[lang]}</h3>
                        <p className="text-[11px] text-[#607D8B] mt-1">{rew.desc[lang]}</p>
                      </div>
                      <button type="button" disabled={!canClaim} onClick={() => handleRedeemClick(rew)} className={`mt-4 px-4 py-1.5 rounded-xl text-xs font-black ${canClaim ? 'bg-[#16803A] text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {canClaim ? 'Claim Voucher' : 'Locked'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* TAB 2: NATURE IMPACT */}
        {activeTab === 'nature' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-3xl border text-center shadow-sm">
                <p className="text-xs text-slate-500 font-bold">☠️ Lead Prevented</p>
                <p className="text-2xl font-black text-rose-600 mt-1">{toxicLeadPreventedKg} kg</p>
              </div>
              <div className="bg-white p-4 rounded-3xl border text-center shadow-sm">
                <p className="text-xs text-slate-500 font-bold">🥇 Rare Metals</p>
                <p className="text-2xl font-black text-amber-600 mt-1">{copperRecoveredKg} kg</p>
              </div>
              <div className="bg-white p-4 rounded-3xl border text-center shadow-sm">
                <p className="text-xs text-slate-500 font-bold">💨 CO₂ Saved</p>
                <p className="text-2xl font-black text-emerald-700 mt-1">{co2AvoidedKg} kg</p>
              </div>
            </div>

            <section className="bg-gradient-to-r from-emerald-800 to-teal-950 text-white rounded-3xl p-6 shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-amber-300">Official "E-Waste Warrior" CPCB Certificate</h3>
                <p className="text-xs text-emerald-100 mt-1">Printable high-resolution certificate verifying zero open-burning compliance.</p>
              </div>
              <button type="button" onClick={downloadCertificate} className="px-5 py-3 bg-amber-400 text-slate-900 font-black text-xs rounded-xl shadow-lg shrink-0">Download Certificate ⬇</button>
            </section>
          </div>
        )}

        {/* TAB 3: GOVT SCHEMES */}
        {activeTab === 'schemes' && (
          <div className="space-y-4">
            {GOVT_SCHEMES.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-[#16803A]">{scheme.name[lang] || scheme.name.en}</h3>
                    <p className="text-xs text-slate-700 mt-1">{scheme.desc[lang] || scheme.desc.en}</p>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full border bg-emerald-100 text-emerald-900 border-emerald-300">{scheme.statusBadge}</span>
                </div>
                <div className="pt-2 border-t flex justify-between items-center text-xs">
                  <a href={`tel:${scheme.helpline}`} className="font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">📞 Helpline: {scheme.helpline}</a>
                  <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer" className="font-black text-white bg-[#16803A] px-3.5 py-1.5 rounded-xl">Open Portal ↗️</a>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}