import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowUpRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Download,
  ExternalLink,
  Flame,
  Gift,
  HardHat,
  History,
  Landmark,
  Leaf,
  LoaderCircle,
  Plus,
  QrCode,
  ScanLine,
  Scale,
  Share2,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingUp,
  Trophy,
  Volume2,
  WalletCards,
  X,
} from "lucide-react";

import {
  TRANSLATIONS,
  TARGET_MILESTONES,
  EWASTE_CATALOG,
  EWASTE_MANDI_RATES,
  REWARDS_DATA,
  GOVT_SCHEMES,
} from "./rewardsData";

import {
  downloadReceiptAsImage,
  downloadCertificate,
} from "./rewardsUtils";


// ============================================================
// SMALL UI HELPERS
// ============================================================

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Card = ({
  children,
  className = "",
  interactive = false,
  onClick,
}) => {
  const Component = onClick ? "button" : "section";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm",
        interactive &&
          "text-left transition hover:-translate-y-0.5 hover:border-[var(--primary)]/25 hover:shadow-md active:scale-[0.99]",
        className
      )}
    >
      {children}
    </Component>
  );
};

const IconBox = ({
  children,
  className = "",
}) => (
  <div
    className={cn(
      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]",
      className
    )}
  >
    {children}
  </div>
);

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-bold text-[var(--primary-foreground)] shadow-sm transition",
      "hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
  >
    {children}
  </button>
);

const SecondaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition",
      "hover:border-[var(--primary)]/25 hover:bg-[var(--accent)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
  >
    {children}
  </button>
);

const SectionHeader = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="mb-4 flex items-start justify-between gap-3">
    <div className="flex min-w-0 items-start gap-3">
      <IconBox className="h-10 w-10 rounded-xl">
        {icon}
      </IconBox>

      <div className="min-w-0">
        <h2 className="text-sm font-bold text-[var(--foreground)] sm:text-base">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-xs leading-5 text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>
    </div>

    {action}
  </div>
);

const Modal = ({
  children,
  onClose,
  maxWidth = "max-w-md",
}) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className={cn(
        "relative max-h-[90vh] w-full overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-2xl sm:p-6",
        maxWidth
      )}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-soft)] text-[var(--muted)] transition hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
      >
        <X size={16} />
      </button>

      {children}
    </div>
  </div>
);


// ============================================================
// REWARDS PAGE
// ============================================================

const RewardsPage = () => {
  const [lang] = useState("hi");
  const [activeTab, setActiveTab] = useState("rewards");

  const [points, setPoints] = useState(() => {
    return Number(localStorage.getItem("k_ew_pts")) || 345;
  });

  const [currentWeight, setCurrentWeight] = useState(() => {
    return Number(localStorage.getItem("k_ew_weight")) || 32;
  });

  const [streakDays, setStreakDays] = useState(() => {
    return Number(localStorage.getItem("k_ew_streak")) || 6;
  });

  const [lastCheckInDate, setLastCheckInDate] = useState(() => {
    return localStorage.getItem("k_ew_last_checkin") || "";
  });

  const [impact, setImpact] = useState(() => {
    const saved = localStorage.getItem("k_ew_impact");

    if (!saved) {
      return {
        ewasteTotal: 78,
        leadAvoidedGrams: 940,
        mercuryAvoidedGrams: 85,
        waterSavedLiters: 1420,
      };
    }

    try {
      return JSON.parse(saved);
    } catch {
      return {
        ewasteTotal: 78,
        leadAvoidedGrams: 940,
        mercuryAvoidedGrams: 85,
        waterSavedLiters: 1420,
      };
    }
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("k_ew_txns");

    if (!saved) {
      return [
        {
          id: "EW-9021",
          date: "Yesterday, 4:30 PM",
          title: "Sold 2x Laptops + 5kg PCBs",
          weight: 9.2,
          pts: 46,
          type: "credit",
        },
        {
          id: "EW-9020",
          date: "Yesterday, 11:15 AM",
          title: "AI Inspection Recorded",
          weight: 0,
          pts: 0,
          type: "info",
        },
      ];
    }

    try {
      const parsed = JSON.parse(saved);

      let seenCheckin = false;

      return parsed.filter((item) => {
        if (
          item.title &&
          item.title.includes("Daily E-Waste Check-in")
        ) {
          if (seenCheckin) return false;

          seenCheckin = true;
        }

        return true;
      });
    } catch {
      return [];
    }
  });

  // ----------------------------------------------------------
  // MODAL STATES
  // ----------------------------------------------------------

  const [claimedModal, setClaimedModal] = useState(null);
  const [rechargeModal, setRechargeModal] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  const [aiScanModalOpen, setAiScanModalOpen] = useState(false);
  const [isScanningAI, setIsScanningAI] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // ----------------------------------------------------------
  // CONSIGNMENT
  // ----------------------------------------------------------

  const [lotItems, setLotItems] = useState([
    {
      id: "item_1",
      categoryKey: "phone",
      qty: 2,
    },
    {
      id: "item_2",
      categoryKey: "laptop",
      qty: 1,
    },
  ]);

  const [selectedFacility] = useState(
    "EcoRecycle CPCB R-9902 (Authorized Facility)"
  );

  // ----------------------------------------------------------
  // GLOBAL UI
  // ----------------------------------------------------------

  const [toast, setToast] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const checkInDoneRef = useRef(false);

  // ==========================================================
  // TRANSLATION
  // ==========================================================

  const t = (key) => {
    return TRANSLATIONS?.[key]?.[lang] || key;
  };

  // ==========================================================
  // DERIVED VALUES
  // ==========================================================

  const multiplier =
    streakDays >= 7
      ? 1.5
      : streakDays >= 3
        ? 1.2
        : 1;

  const activeMilestone =
    TARGET_MILESTONES.find(
      (milestone) => currentWeight < milestone.target
    ) ||
    TARGET_MILESTONES[TARGET_MILESTONES.length - 1];

  const targetWeight = activeMilestone.target;

  const weightRemaining = Math.max(
    0,
    targetWeight - currentWeight
  );

  const weightProgressPercent = Math.min(
    100,
    Math.round((currentWeight / targetWeight) * 100)
  );

  const currentLevelBadge =
    currentWeight >= 300
      ? lang === "en"
        ? "Gold E-Waste Champion"
        : "गोल्ड ई-वेस्ट चैंपियन"
      : currentWeight >= 150
        ? lang === "en"
          ? "Level 3: Silver E-Sathi"
          : "लेवल 3: सिल्वर ई-साथी"
        : currentWeight >= 50
          ? lang === "en"
            ? "Level 2: Bronze E-Sathi"
            : "लेवल 2: ब्रॉन्ज ई-साथी"
          : lang === "en"
            ? "Level 1: E-Scrap Starter"
            : "लेवल 1: ई-कचरा शुरुआत";

  const toxicLeadPreventedKg = (
    (impact.ewasteTotal * 12) /
    1000
  ).toFixed(2);

  const co2AvoidedKg = Math.round(
    impact.ewasteTotal * 2.8
  );

  const copperRecoveredKg = (
    impact.ewasteTotal * 0.18
  ).toFixed(1);

  const calculatedTotals = useMemo(() => {
    return lotItems.reduce(
      (acc, item) => {
        const meta = EWASTE_CATALOG[item.categoryKey];

        if (!meta) return acc;

        const qtyNum = parseFloat(item.qty) || 0;

        if (meta.type === "unit") {
          const lineCash = qtyNum * meta.unitRate;
          const lineWeight = qtyNum * meta.avgWeightKg;

          return {
            totalCash: acc.totalCash + lineCash,
            totalWeight: acc.totalWeight + lineWeight,
          };
        }

        const lineCash = qtyNum * meta.ratePerKg;

        return {
          totalCash: acc.totalCash + lineCash,
          totalWeight: acc.totalWeight + qtyNum,
        };
      },
      {
        totalCash: 0,
        totalWeight: 0,
      }
    );
  }, [lotItems]);

  // ==========================================================
  // PERSISTENCE
  // ==========================================================

  useEffect(() => {
    localStorage.setItem("k_ew_pts", points);
    localStorage.setItem("k_ew_weight", currentWeight);
    localStorage.setItem("k_ew_streak", streakDays);
    localStorage.setItem(
      "k_ew_last_checkin",
      lastCheckInDate
    );
    localStorage.setItem(
      "k_ew_impact",
      JSON.stringify(impact)
    );
    localStorage.setItem(
      "k_ew_txns",
      JSON.stringify(transactions)
    );
  }, [
    points,
    currentWeight,
    streakDays,
    lastCheckInDate,
    impact,
    transactions,
  ]);

  // ==========================================================
  // DAILY CHECK-IN
  // ==========================================================

  useEffect(() => {
    if (checkInDoneRef.current) return;

    const todayStr = new Date()
      .toISOString()
      .split("T")[0];

    if (lastCheckInDate === todayStr) {
      checkInDoneRef.current = true;
      return;
    }

    checkInDoneRef.current = true;

    const baseDailyPoints = 2;
    const earnedCheckInPts = Math.round(
      baseDailyPoints * multiplier
    );

    const newStreak = streakDays + 1;

    setPoints((prev) => prev + earnedCheckInPts);
    setStreakDays(newStreak);
    setLastCheckInDate(todayStr);

    const newTxn = {
      id:
        "EW-" +
        Math.floor(1000 + Math.random() * 9000),
      date: "Today, Just now",
      title:
        lang === "en"
          ? `Daily E-Waste Check-in (Day ${newStreak} Streak)`
          : `दैनिक ई-कचरा चेक-इन (दिन ${newStreak} स्ट्रीक)`,
      weight: 0,
      pts: earnedCheckInPts,
      type: "credit",
    };

    setTransactions((prev) => [
      newTxn,
      ...prev.filter(
        (transaction) =>
          !transaction.title ||
          !transaction.title.includes(
            "Daily E-Waste Check-in"
          )
      ),
    ]);

    showToast(
      lang === "en"
        ? `Daily Check-in +${earnedCheckInPts} points`
        : `आज का दैनिक बोनस +${earnedCheckInPts} पॉइंट्स`
    );
  }, []);

  // ==========================================================
  // CLEANUP SPEECH
  // ==========================================================

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ==========================================================
  // TOAST
  // ==========================================================

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 3500);
  }

  // ==========================================================
  // SPEECH
  // ==========================================================

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      showToast(
        "Voice playback is not supported in this browser."
      );
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang =
      lang === "hi"
        ? "hi-IN"
        : lang === "mr"
          ? "mr-IN"
          : "en-IN";

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // ==========================================================
  // AI SCAN
  // ==========================================================

  const handleFileUploadForAI = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsScanningAI(true);
    setScanResult(null);

    window.setTimeout(() => {
      const fileName = file.name.toLowerCase();

      let detectedLabel =
        "CPCB Grade-A Motherboard";

      if (
        fileName.includes("phone") ||
        fileName.includes("mobile") ||
        fileName.includes("screen") ||
        fileName.includes("photo") ||
        fileName.includes("img")
      ) {
        detectedLabel =
          "Smartphone / Mobile Handset PCB";
      } else if (
        fileName.includes("lap") ||
        fileName.includes("pc") ||
        fileName.includes("dell") ||
        fileName.includes("hp")
      ) {
        detectedLabel =
          "Laptop Motherboard Unit";
      }

      setIsScanningAI(false);
      setScanResult(detectedLabel);

      const newTxn = {
        id:
          "AI-" +
          Math.floor(1000 + Math.random() * 9000),
        date:
          "Today, " +
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        title: `AI Inspection Recorded: ${detectedLabel}`,
        weight: 0,
        pts: 0,
        type: "info",
      };

      setTransactions((prev) => [
        newTxn,
        ...prev,
      ]);

      showToast(
        lang === "en"
          ? "AI inspection recorded"
          : "AI निरीक्षण रिकॉर्ड हो गया"
      );
    }, 1800);
  };

  // ==========================================================
  // LOT ITEMS
  // ==========================================================

  const addLotItem = () => {
    setLotItems((prev) => [
      ...prev,
      {
        id: "item_" + Date.now(),
        categoryKey: "bulk_pcb",
        qty: 5,
      },
    ]);
  };

  const removeLotItem = (id) => {
    if (lotItems.length === 1) {
      showToast(
        lang === "en"
          ? "At least one item is required."
          : "कम से कम एक आइटम आवश्यक है।"
      );
      return;
    }

    setLotItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const updateLotItem = (
    id,
    field,
    value
  ) => {
    setLotItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // ==========================================================
  // CONSIGNMENT SALE
  // ==========================================================

  const handleConfirmMultiItemSale = (
    event
  ) => {
    event.preventDefault();

    if (calculatedTotals.totalWeight <= 0) {
      showToast(
        lang === "en"
          ? "Please enter valid quantities."
          : "कृपया वैध मात्रा दर्ज करें।"
      );
      return;
    }

    const roundedWeight = parseFloat(
      calculatedTotals.totalWeight.toFixed(2)
    );

    const grossCash =
      calculatedTotals.totalCash;

    const basePts = Math.round(
      roundedWeight * 5
    );

    const earnedPts = Math.round(
      basePts * multiplier
    );

    const slipId =
      "EPR-IN-" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const timestampStr =
      new Date().toLocaleString(
        lang === "en"
          ? "en-IN"
          : "hi-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    setPoints((prev) => prev + earnedPts);

    setCurrentWeight(
      (prev) => prev + roundedWeight
    );

    setImpact((prev) => ({
      ewasteTotal:
        prev.ewasteTotal + roundedWeight,
      leadAvoidedGrams:
        prev.leadAvoidedGrams +
        Math.round(
          roundedWeight * 12
        ),
      mercuryAvoidedGrams:
        prev.mercuryAvoidedGrams +
        Math.round(
          roundedWeight * 1.1
        ),
      waterSavedLiters:
        prev.waterSavedLiters +
        Math.round(
          roundedWeight * 22
        ),
    }));

    const receiptLineItems =
      lotItems.map((item) => {
        const meta =
          EWASTE_CATALOG[
            item.categoryKey
          ];

        const qty =
          parseFloat(item.qty) || 0;

        const isUnit =
          meta.type === "unit";

        return {
          name:
            meta.name?.[lang] ||
            meta.name?.en,
          type: meta.type,
          qty,
          unitLabel: isUnit
            ? lang === "en"
              ? "Units"
              : "नग"
            : "KG",
          rateDisplay: isUnit
            ? `₹${meta.unitRate}/pc`
            : `₹${meta.ratePerKg}/kg`,
          totalPrice: isUnit
            ? qty * meta.unitRate
            : qty * meta.ratePerKg,
          weightKg: isUnit
            ? parseFloat(
                (
                  qty *
                  meta.avgWeightKg
                ).toFixed(2)
              )
            : qty,
        };
      });

    const newTxn = {
      id: slipId,
      date: timestampStr,
      title:
        lang === "en"
          ? `Sold ${receiptLineItems.length} items`
          : `${receiptLineItems.length} आइटम की बिक्री`,
      weight: roundedWeight,
      pts: earnedPts,
      type: "credit",
    };

    setTransactions((prev) => [
      newTxn,
      ...prev,
    ]);

    const receiptData = {
      slipId,
      date: timestampStr,
      collectorId: "EW-CPCB-88419",
      facility: selectedFacility,
      items: receiptLineItems,
      totalWeight: roundedWeight,
      grossAmount: grossCash,
      ptsEarned: earnedPts,
      processingMethod:
        lang === "en"
          ? "Mechanical Stripping"
          : "मैकेनिकल स्ट्रिपिंग",
      compliance:
        "E-Waste (Management) Rules, 2022",
    };

    setSellModalOpen(false);
    setActiveReceipt(receiptData);

    showToast(
      lang === "en"
        ? `Digital weigh slip ${slipId} generated`
        : `ई-कचरा तौल पर्ची ${slipId} जारी`
    );
  };

  // ==========================================================
  // RECEIPT DOWNLOAD
  // ==========================================================

  const handleDownloadReceipt = () => {
    if (!activeReceipt) return;

    downloadReceiptAsImage(
      activeReceipt,
      lang
    );

    showToast(
      lang === "en"
        ? "Consignment slip downloaded."
        : "तौल पर्ची डाउनलोड हो गई।"
    );
  };

  // ==========================================================
  // REFERRAL
  // ==========================================================

  const referralText =
    lang === "en"
      ? "Join Kabadi Connect (E-Waste Sathi) to sell e-waste through an authorized recycling network."
      : "कबाड़ी कनेक्ट (ई-कचरा साथी) से जुड़ें और अधिकृत ई-कचरा नेटवर्क के माध्यम से अपना ई-कचरा बेचें।";

  const referralUrl =
    "https://cpcb.nic.in/e-waste?ref=ESATHI88419";

  const completeReferralBonus = () => {
    setPoints((prev) => prev + 100);

    const newTxn = {
      id:
        "REF-" +
        Math.floor(
          1000 + Math.random() * 9000
        ),
      date: "Today, Just now",
      title:
        lang === "en"
          ? "E-Waste Collector Referral Bonus"
          : "ई-कचरा साथी रेफरल बोनस",
      weight: 0,
      pts: 100,
      type: "credit",
    };

    setTransactions((prev) => [
      newTxn,
      ...prev,
    ]);

    setShareModalOpen(false);

    showToast(
      t("copied_msg")
    );
  };

  const handleInitiateReferral =
    async () => {
      if (
        typeof navigator !== "undefined" &&
        navigator.share
      ) {
        try {
          await navigator.share({
            title:
              "Kabadi Connect : E-Waste Sathi",
            text: referralText,
            url: referralUrl,
          });

          completeReferralBonus();
        } catch (error) {
          if (
            error?.name !==
            "AbortError"
          ) {
            setShareModalOpen(true);
          }
        }
      } else {
        setShareModalOpen(true);
      }
    };

  const handleWhatsAppShare =
    () => {
      const waUrl =
        `https://api.whatsapp.com/send?text=` +
        encodeURIComponent(
          `${referralText} ${referralUrl}`
        );

      window.open(
        waUrl,
        "_blank",
        "noopener,noreferrer"
      );

      completeReferralBonus();
    };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        referralUrl
      );

      completeReferralBonus();
    } catch {
      showToast(
        lang === "en"
          ? "Unable to copy link."
          : "लिंक कॉपी नहीं हो सका।"
      );
    }
  };

  // ==========================================================
  // REWARD REDEMPTION
  // ==========================================================

  const handleRedeemClick = (
    reward
  ) => {
    if (points < reward.pts) {
      showToast(
        lang === "en"
          ? `Need ${reward.pts - points} more points.`
          : `${reward.pts - points} पॉइंट्स और चाहिए।`
      );
      return;
    }

    if (reward.type === "recharge") {
      setRechargeModal({
        item: reward,
        state: "confirm",
        phone: "98721-45092",
        operator: "Reliance Jio 4G",
      });

      return;
    }

    setPoints(
      (prev) => prev - reward.pts
    );

    setClaimedModal(reward);

    const newTxn = {
      id:
        "CLM-" +
        Math.floor(
          1000 + Math.random() * 9000
        ),
      date: "Today, Just now",
      title:
        lang === "en"
          ? `Redeemed: ${reward.title.en}`
          : `रिडीम: ${
              reward.title?.[lang] ||
              reward.title?.en
            }`,
      weight: 0,
      pts: reward.pts,
      type: "debit",
    };

    setTransactions((prev) => [
      newTxn,
      ...prev,
    ]);
  };

  const handleConfirmRecharge =
    () => {
      if (!rechargeModal) return;

      setRechargeModal((prev) => ({
        ...prev,
        state: "processing",
      }));

      window.setTimeout(() => {
        setPoints(
          (prev) =>
            prev -
            rechargeModal.item.pts
        );

        const newTxn = {
          id:
            "RCH-" +
            Math.floor(
              1000 +
                Math.random() *
                  9000
            ),
          date: "Today, Just now",
          title:
            lang === "en"
              ? "Mobile 4G Data Recharge"
              : "मोबाइल 4G डेटा रिचार्ज",
          weight: 0,
          pts:
            rechargeModal.item.pts,
          type: "debit",
        };

        setTransactions((prev) => [
          newTxn,
          ...prev,
        ]);

        setRechargeModal((prev) => ({
          ...prev,
          state: "success",
          txnId:
            "TXN_" +
            Math.floor(
              100000 +
                Math.random() *
                  900000
            ),
        }));

        showToast(
          lang === "en"
            ? "₹50 data recharge successful."
            : "₹50 डेटा रिचार्ज सफल।"
        );
      }, 1800);
    };

  // ==========================================================
  // CERTIFICATE
  // ==========================================================

  const handleDownloadCertificate =
    () => {
      downloadCertificate({
        impact,
        currentLevelBadge,
      });

      showToast(
        lang === "en"
          ? "Certificate downloaded."
          : "सर्टिफिकेट डाउनलोड हो गया।"
      );
    };

  // ==========================================================
  // TABS
  // ==========================================================

  const tabs = [
    {
      id: "rewards",
      label:
        lang === "en"
          ? "Rewards"
          : "इनाम",
      icon: Gift,
    },
    {
      id: "nature",
      label:
        lang === "en"
          ? "Impact"
          : "प्रभाव",
      icon: Leaf,
    },
    {
      id: "schemes",
      label:
        lang === "en"
          ? "Govt Schemes"
          : "सरकारी योजनाएं",
      icon: Landmark,
    },
  ];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-5 pb-8">

      {/* ======================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed left-1/2 top-4 z-[120] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-2xl border border-[var(--primary)]/20 bg-[var(--surface)] px-4 py-3 text-xs font-semibold text-[var(--foreground)] shadow-xl">
            <CheckCircle2
              size={16}
              className="shrink-0 text-[var(--primary)]"
            />

            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <header className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
              <Trophy size={18} />
            </span>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                Collector rewards
              </p>

              <h1 className="text-xl font-black tracking-tight text-[var(--foreground)] sm:text-2xl">
                {t("tab_rewards")}
              </h1>
            </div>
          </div>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-[var(--muted)] sm:text-sm">
            Track collection milestones, reward points,
            environmental impact and useful worker schemes.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            speak(
              lang === "hi"
                ? `आपके पास ${points} पॉइंट्स हैं और आपने ${currentWeight} किलो ई-कचरा रिकॉर्ड किया है।`
                : `You have ${points} points and have recorded ${currentWeight} kilograms of e-waste.`
            )
          }
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border px-3.5 py-2.5 text-xs font-bold transition sm:self-auto",
            isSpeaking
              ? "border-amber-300 bg-amber-50 text-amber-700"
              : "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--foreground)] hover:bg-[var(--accent)]"
          )}
        >
          <Volume2 size={16} />

          {isSpeaking
            ? "Speaking..."
            : t("listen_btn")}
        </button>
      </header>

      {/* ======================================================
          TABS
      ====================================================== */}

      <div className="grid grid-cols-3 gap-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={cn(
                "flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2 text-[11px] font-bold transition sm:text-sm",
                active
                  ? "bg-[var(--surface)] text-[var(--primary)] shadow-sm"
                  : "text-[var(--muted)] hover:bg-[var(--surface)]/70"
              )}
            >
              <Icon
                size={15}
                className="shrink-0"
              />

              <span className="truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ======================================================
          REWARDS TAB
      ====================================================== */}

      {activeTab === "rewards" && (
        <div className="space-y-5">

          {/* WALLET + LEVEL */}

          <div className="grid gap-4 lg:grid-cols-2">

            <Card className="overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[var(--muted)]">
                      {t("wallet_title")}
                    </p>

                    <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">
                      Points earned from collection activity
                    </p>
                  </div>

                  <IconBox>
                    <WalletCards size={20} />
                  </IconBox>
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-black tracking-tight text-[var(--foreground)]">
                    {points}
                  </span>

                  <span className="pb-1 text-sm font-bold text-[var(--muted)]">
                    {t("points_unit")}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                    <Flame size={13} />
                    {streakDays} days
                  </span>

                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-[11px] font-bold text-[var(--foreground)]">
                    {multiplier}× multiplier
                  </span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                      Collector level
                    </p>

                    <h2 className="mt-2 text-xl font-black text-[var(--foreground)]">
                      {currentLevelBadge}
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      Your collection progress unlocks
                      new milestones and rewards.
                    </p>
                  </div>

                  <IconBox className="bg-amber-50 text-amber-600">
                    <Trophy size={20} />
                  </IconBox>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl bg-[var(--surface-soft)] px-3 py-2.5 text-xs">
                  <span className="text-[var(--muted)]">
                    Collector ID
                  </span>

                  <span className="font-mono font-bold text-[var(--foreground)]">
                    EW-CPCB-88419
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* AI + CONSIGNMENT */}

          <div className="grid gap-4 lg:grid-cols-2">

            <Card
              interactive
              onClick={() =>
                setAiScanModalOpen(true)
              }
              className="group"
            >
              <div className="flex items-center gap-4 p-4">
                <IconBox className="h-12 w-12 bg-emerald-50">
                  <ScanLine size={22} />
                </IconBox>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[var(--foreground)]">
                      AI material scan
                    </h3>

                    <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-[9px] font-bold text-[var(--primary)]">
                      DEMO
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-5 text-[var(--muted)]">
                    Upload a device or PCB photo to record
                    an inspection result.
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="shrink-0 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--primary)]"
                />
              </div>
            </Card>

            <Card className="border-[var(--primary)]/20 bg-[var(--accent)]/50">
              <div className="flex items-center justify-between gap-4 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <IconBox className="bg-[var(--surface)]">
                    <Scale size={20} />
                  </IconBox>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[var(--foreground)]">
                      Record a consignment
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-[var(--muted)]">
                      Add multiple e-waste categories
                      and generate a digital weigh slip.
                    </p>
                  </div>
                </div>

                <PrimaryButton
                  onClick={() =>
                    setSellModalOpen(true)
                  }
                  className="shrink-0 px-3 text-xs"
                >
                  <Plus size={15} />
                  Add lot
                </PrimaryButton>
              </div>
            </Card>
          </div>

          {/* MILESTONE */}

          <Card className="overflow-hidden">
            <div className="p-5">
              <SectionHeader
                icon={<Trophy size={19} />}
                title={t("weight_target_title")}
                description={
                  activeMilestone.title?.[lang] ||
                  activeMilestone.title?.en
                }
              />

              <div className="rounded-2xl bg-[var(--surface-soft)] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black tracking-tight text-[var(--primary)]">
                        {currentWeight}
                      </span>

                      <span className="text-sm font-bold text-[var(--muted)]">
                        / {targetWeight} kg
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {weightRemaining > 0
                        ? `${weightRemaining.toFixed(1)} kg remaining`
                        : "Milestone reached"}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-[var(--primary)]/20 bg-[var(--surface)] px-2.5 py-1 text-[11px] font-bold text-[var(--primary)]">
                    {weightProgressPercent}% complete
                  </span>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all"
                    style={{
                      width: `${weightProgressPercent}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-[var(--muted)]">
                    Reward
                  </span>

                  <span className="font-bold text-[var(--foreground)]">
                    {activeMilestone.reward}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* PRICE BENCHMARK */}

          <Card className="overflow-hidden">
            <div className="p-5">
              <SectionHeader
                icon={<TrendingUp size={19} />}
                title="E-waste mandi benchmark"
                description="Reference rates from the reward demo dataset."
              />

              <div className="hidden overflow-hidden rounded-xl border border-[var(--border)] md:block">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--surface-soft)]">
                    <tr className="border-b border-[var(--border)]">
                      <th className="px-3 py-3 font-bold text-[var(--muted)]">
                        Item
                      </th>
                      <th className="px-3 py-3 font-bold text-[var(--primary)]">
                        Authorized rate
                      </th>
                      <th className="px-3 py-3 font-bold text-[var(--muted)]">
                        Local rate
                      </th>
                      <th className="px-3 py-3 text-right font-bold text-amber-700">
                        Difference
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[var(--border)]">
                    {EWASTE_MANDI_RATES.map(
                      (rate, index) => (
                        <tr
                          key={`${rate.item.en}-${index}`}
                          className="transition hover:bg-[var(--surface-soft)]"
                        >
                          <td className="px-3 py-3 font-semibold text-[var(--foreground)]">
                            {rate.item?.[lang] ||
                              rate.item?.en}
                          </td>

                          <td className="px-3 py-3 font-black text-[var(--primary)]">
                            {rate.authorized}
                          </td>

                          <td className="px-3 py-3 text-[var(--muted)]">
                            {rate.local}
                          </td>

                          <td className="px-3 py-3 text-right font-black text-amber-700">
                            {rate.bonus}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 md:hidden">
                {EWASTE_MANDI_RATES.map(
                  (rate, index) => (
                    <div
                      key={`${rate.item.en}-${index}`}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-bold leading-5 text-[var(--foreground)]">
                          {rate.item?.[lang] ||
                            rate.item?.en}
                        </p>

                        <span className="shrink-0 text-xs font-black text-[var(--primary)]">
                          {rate.authorized}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <span className="text-[var(--muted)]">
                          Local: {rate.local}
                        </span>

                        <span className="font-bold text-amber-700">
                          {rate.bonus}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Card>

          {/* TRANSACTIONS */}

          <Card className="overflow-hidden">
            <div className="p-5">
              <SectionHeader
                icon={<History size={19} />}
                title="Activity & audit ledger"
                description="Recent sales, check-ins and inspection records."
              />

              <div className="divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)]">
                {transactions.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[var(--muted)]">
                    No transactions yet.
                  </div>
                ) : (
                  transactions.map(
                    (transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center gap-3 bg-[var(--surface)] px-3 py-3.5"
                      >
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                            transaction.type ===
                              "credit"
                              ? "bg-[var(--accent)] text-[var(--primary)]"
                              : "bg-blue-50 text-blue-600"
                          )}
                        >
                          {transaction.type ===
                          "credit" ? (
                            <TrendingUp
                              size={16}
                            />
                          ) : (
                            <ShieldCheck
                              size={16}
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-[var(--foreground)]">
                            {transaction.title}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[var(--muted)]">
                            {transaction.date}{" "}
                            • Ref:{" "}
                            {transaction.id}
                          </p>
                        </div>

                        <span
                          className={cn(
                            "shrink-0 rounded-lg border px-2 py-1 text-[10px] font-black",
                            transaction.type ===
                              "credit"
                              ? "border-[var(--primary)]/15 bg-[var(--accent)] text-[var(--primary)]"
                              : "border-blue-200 bg-blue-50 text-blue-700"
                          )}
                        >
                          {transaction.type ===
                          "credit"
                            ? `+${transaction.pts} ⭐`
                            : "Audit"}
                        </span>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </Card>

          {/* REFERRAL */}

          <Card className="overflow-hidden border-[var(--primary)]/20">
            <div className="flex flex-col gap-4 bg-[var(--accent)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <IconBox className="bg-[var(--surface)]">
                  <Share2 size={18} />
                </IconBox>

                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    {t("referral_title")}
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-[var(--muted)]">
                    {t("referral_desc")}
                  </p>
                </div>
              </div>

              <PrimaryButton
                onClick={handleInitiateReferral}
                className="shrink-0"
              >
                <Share2 size={15} />
                Share
              </PrimaryButton>
            </div>
          </Card>

          {/* REWARDS CATALOG */}

          <Card className="overflow-hidden">
            <div className="p-5">
              <SectionHeader
                icon={<Gift size={19} />}
                title={t("rewards_catalog_title")}
                description="Use earned points for practical rewards."
              />

              <div className="grid gap-3 sm:grid-cols-2">
                {REWARDS_DATA.map(
                  (reward) => {
                    const canClaim =
                      points >= reward.pts;

                    return (
                      <div
                        key={reward.id}
                        className={cn(
                          "flex flex-col rounded-2xl border p-4 transition",
                          canClaim
                            ? "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/20"
                            : "border-[var(--border)] bg-[var(--surface-soft)] opacity-70"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-xl">
                            {reward.icon}
                          </span>

                          <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-700">
                            ⭐ {reward.pts}
                          </span>
                        </div>

                        <h3 className="mt-3 text-sm font-bold text-[var(--foreground)]">
                          {reward.title?.[
                            lang
                          ] ||
                            reward.title?.en}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                          {reward.desc?.[
                            lang
                          ] ||
                            reward.desc?.en}
                        </p>

                        <button
                          type="button"
                          disabled={!canClaim}
                          onClick={() =>
                            handleRedeemClick(
                              reward
                            )
                          }
                          className={cn(
                            "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition",
                            canClaim
                              ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"
                              : "cursor-not-allowed bg-[var(--border)] text-[var(--muted)]"
                          )}
                        >
                          {canClaim ? (
                            <>
                              <Gift
                                size={14}
                              />
                              {t("btn_redeem")}
                            </>
                          ) : (
                            <>
                              <CircleAlert
                                size={14}
                              />
                              {t("btn_locked")}
                            </>
                          )}
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================
          IMPACT TAB
      ====================================================== */}

      {activeTab === "nature" && (
        <div className="space-y-5">

          <Card className="overflow-hidden">
            <div className="p-5">
              <SectionHeader
                icon={<Leaf size={19} />}
                title={t("tab_nature")}
                description="A simple summary of environmental impact based on recorded collection."
              />

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                  <p className="text-xs font-semibold text-[var(--muted)]">
                    Lead prevented
                  </p>

                  <p className="mt-2 text-2xl font-black text-rose-600">
                    {toxicLeadPreventedKg} kg
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                  <p className="text-xs font-semibold text-[var(--muted)]">
                    Copper / metals recovered
                  </p>

                  <p className="mt-2 text-2xl font-black text-amber-600">
                    {copperRecoveredKg} kg
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                  <p className="text-xs font-semibold text-[var(--muted)]">
                    CO₂ avoided
                  </p>

                  <p className="mt-2 text-2xl font-black text-[var(--primary)]">
                    {co2AvoidedKg} kg
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden border-[var(--primary)]/20">
            <div className="flex flex-col gap-4 bg-[var(--accent)] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <IconBox className="bg-[var(--surface)]">
                  <ShieldCheck size={19} />
                </IconBox>

                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    E-waste impact certificate
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                    Generate a local certificate summarizing
                    the current demo impact record.
                  </p>
                </div>
              </div>

              <PrimaryButton
                onClick={
                  handleDownloadCertificate
                }
                className="shrink-0"
              >
                <Download size={15} />
                Download
              </PrimaryButton>
            </div>
          </Card>

          <Card>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] p-4">
                <p className="text-xs font-semibold text-[var(--muted)]">
                  E-waste diverted
                </p>
                <p className="mt-1 text-xl font-black text-[var(--foreground)]">
                  {impact.ewasteTotal.toFixed
                    ? impact.ewasteTotal.toFixed(1)
                    : impact.ewasteTotal}{" "}
                  kg
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] p-4">
                <p className="text-xs font-semibold text-[var(--muted)]">
                  Water saved
                </p>
                <p className="mt-1 text-xl font-black text-[var(--foreground)]">
                  {impact.waterSavedLiters} L
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] p-4">
                <p className="text-xs font-semibold text-[var(--muted)]">
                  Lead avoided
                </p>
                <p className="mt-1 text-xl font-black text-[var(--foreground)]">
                  {impact.leadAvoidedGrams} g
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] p-4">
                <p className="text-xs font-semibold text-[var(--muted)]">
                  Mercury avoided
                </p>
                <p className="mt-1 text-xl font-black text-[var(--foreground)]">
                  {impact.mercuryAvoidedGrams} g
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================
          SCHEMES TAB
      ====================================================== */}

      {activeTab === "schemes" && (
        <div className="space-y-4">
          {GOVT_SCHEMES.map(
            (scheme) => (
              <Card
                key={scheme.id}
                className="overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-[var(--foreground)] sm:text-base">
                          {scheme.name?.[
                            lang
                          ] ||
                            scheme.name?.en}
                        </h3>

                        <span className="rounded-full border border-[var(--primary)]/15 bg-[var(--accent)] px-2 py-1 text-[9px] font-bold text-[var(--primary)]">
                          {scheme.statusBadge}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                        {scheme.desc?.[
                          lang
                        ] ||
                          scheme.desc?.en}
                      </p>
                    </div>

                    <span className="inline-flex w-fit shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                      {scheme.tag?.[
                        lang
                      ] ||
                        scheme.tag?.en}
                    </span>
                  </div>

                  {scheme.benefits?.length >
                    0 && (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {scheme.benefits.map(
                        (benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 rounded-xl bg-[var(--surface-soft)] p-3"
                          >
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0 text-[var(--primary)]"
                            />

                            <span className="text-[11px] leading-5 text-[var(--foreground)]">
                              {benefit?.[
                                lang
                              ] ||
                                benefit?.en}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-2 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={`tel:${scheme.helpline}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-soft)]">
                        <HardHat
                          size={14}
                        />
                      </span>

                      Helpline:{" "}
                      {scheme.helpline}
                    </a>

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-3.5 py-2.5 text-xs font-bold text-[var(--primary-foreground)] transition hover:opacity-90"
                    >
                      Open portal
                      <ExternalLink
                        size={14}
                      />
                    </a>
                  </div>
                </div>
              </Card>
            )
          )}
        </div>
      )}

      {/* ======================================================
          RECEIPT MODAL
      ====================================================== */}

      {activeReceipt && (
        <Modal
          onClose={() =>
            setActiveReceipt(null)
          }
          maxWidth="max-w-lg"
        >
          <div className="pr-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
              Digital handover
            </span>

            <h3 className="mt-1 text-lg font-black text-[var(--foreground)]">
              E-waste consignment slip
            </h3>

            <p className="mt-1 text-[11px] font-mono text-[var(--muted)]">
              {activeReceipt.slipId} •{" "}
              {activeReceipt.date}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[var(--surface-soft)] p-3">
                <p className="text-[10px] font-semibold text-[var(--muted)]">
                  Collector ID
                </p>

                <p className="mt-1 text-xs font-mono font-bold text-[var(--foreground)]">
                  {activeReceipt.collectorId}
                </p>
              </div>

              <div className="rounded-xl bg-[var(--surface-soft)] p-3">
                <p className="text-[10px] font-semibold text-[var(--muted)]">
                  Facility
                </p>

                <p className="mt-1 text-xs font-bold text-[var(--foreground)]">
                  {activeReceipt.facility}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              <div className="border-b border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 text-[10px] font-bold text-[var(--muted)]">
                ITEMIZED CONSIGNMENT
              </div>

              <div className="divide-y divide-[var(--border)]">
                {activeReceipt.items.map(
                  (item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center justify-between gap-3 p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[var(--foreground)]">
                          {item.name}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[var(--muted)]">
                          {item.qty}{" "}
                          {item.unitLabel}{" "}
                          @{" "}
                          {item.rateDisplay}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-xs font-black text-[var(--foreground)]">
                          ₹
                          {
                            item.totalPrice
                          }
                        </p>

                        <p className="text-[10px] text-[var(--muted)]">
                          {item.weightKg} kg
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[var(--border)] p-3">
                <p className="text-[10px] text-[var(--muted)]">
                  Total weight
                </p>

                <p className="mt-1 text-lg font-black text-[var(--foreground)]">
                  {activeReceipt.totalWeight} kg
                </p>
              </div>

              <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--accent)] p-3">
                <p className="text-[10px] text-[var(--muted)]">
                  Gross payout
                </p>

                <p className="mt-1 text-lg font-black text-[var(--primary)]">
                  ₹
                  {
                    activeReceipt.grossAmount
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-amber-50 px-3 py-3">
              <span className="text-xs font-bold text-amber-800">
                EPR reward points
              </span>

              <span className="text-sm font-black text-amber-700">
                +
                {
                  activeReceipt.ptsEarned
                }{" "}
                ⭐
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-3 text-[10px] leading-4 text-blue-800">
              <ShieldCheck
                size={15}
                className="shrink-0"
              />

              <span>
                {activeReceipt.compliance}
              </span>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <PrimaryButton
              onClick={
                handleDownloadReceipt
              }
              className="flex-1"
            >
              <Download size={15} />
              Download
            </PrimaryButton>

            <SecondaryButton
              onClick={() =>
                setActiveReceipt(null)
              }
            >
              Close
            </SecondaryButton>
          </div>
        </Modal>
      )}

      {/* ======================================================
          SALE MODAL
      ====================================================== */}

      {sellModalOpen && (
        <Modal
          onClose={() =>
            setSellModalOpen(false)
          }
          maxWidth="max-w-xl"
        >
          <div className="pr-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
              New consignment
            </span>

            <h3 className="mt-1 text-lg font-black text-[var(--foreground)]">
              Build an e-waste lot
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
              Combine piece-based devices and bulk
              material into one digital weigh slip.
            </p>
          </div>

          <form
            onSubmit={
              handleConfirmMultiItemSale
            }
            className="mt-5 space-y-3"
          >
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {lotItems.map(
                (item, index) => {
                  const meta =
                    EWASTE_CATALOG[
                      item.categoryKey
                    ];

                  const isUnit =
                    meta.type === "unit";

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-3"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[var(--muted)]">
                          Item #{index + 1}
                        </span>

                        {lotItems.length >
                          1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeLotItem(
                                item.id
                              )
                            }
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600"
                          >
                            <Trash2
                              size={13}
                            />
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid gap-2 sm:grid-cols-[1fr_120px]">
                        <select
                          value={
                            item.categoryKey
                          }
                          onChange={(event) =>
                            updateLotItem(
                              item.id,
                              "categoryKey",
                              event.target.value
                            )
                          }
                          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                        >
                          <optgroup label="Unit based">
                            <option value="phone">
                              Smartphone / Mobile
                            </option>

                            <option value="laptop">
                              Laptop
                            </option>

                            <option value="monitor">
                              LED / LCD Monitor
                            </option>
                          </optgroup>

                          <optgroup label="Bulk material">
                            <option value="bulk_pcb">
                              Mixed PCB
                            </option>

                            <option value="bulk_copper">
                              Stripped Copper
                            </option>

                            <option value="bulk_smps">
                              SMPS / Transformers
                            </option>
                          </optgroup>
                        </select>

                        <div className="flex h-10 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                          <input
                            type="number"
                            min="1"
                            max="500"
                            step={
                              isUnit
                                ? "1"
                                : "0.5"
                            }
                            value={
                              item.qty
                            }
                            onChange={(event) =>
                              updateLotItem(
                                item.id,
                                "qty",
                                event.target.value
                              )
                            }
                            required
                            className="min-w-0 flex-1 bg-transparent px-3 text-xs font-bold text-[var(--foreground)] outline-none"
                            placeholder={
                              isUnit
                                ? "Count"
                                : "KG"
                            }
                          />

                          <span className="flex items-center bg-[var(--surface-soft)] px-2.5 text-[10px] font-bold text-[var(--muted)]">
                            {isUnit
                              ? "Pcs"
                              : "KG"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <SecondaryButton
              onClick={addLotItem}
              className="w-full border-dashed"
            >
              <Plus size={15} />
              Add another item
            </SecondaryButton>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[var(--surface-soft)] p-4">
                <p className="text-[10px] font-semibold text-[var(--muted)]">
                  Estimated weight
                </p>

                <p className="mt-1 text-xl font-black text-[var(--foreground)]">
                  {calculatedTotals.totalWeight.toFixed(
                    1
                  )}{" "}
                  kg
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--accent)] p-4">
                <p className="text-[10px] font-semibold text-[var(--muted)]">
                  Estimated payout
                </p>

                <p className="mt-1 text-xl font-black text-[var(--primary)]">
                  ₹
                  {
                    calculatedTotals.totalCash
                  }
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[10px] font-semibold text-amber-800">
              Reward estimate:{" "}
              +
              {Math.round(
                calculatedTotals.totalWeight *
                  5 *
                  multiplier
              )}{" "}
              ⭐ points
            </div>

            <div className="flex gap-2 pt-1">
              <SecondaryButton
                onClick={() =>
                  setSellModalOpen(false)
                }
                className="flex-1"
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                type="submit"
                className="flex-1"
              >
                <Check size={15} />
                Generate slip
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {/* ======================================================
          REFERRAL MODAL
      ====================================================== */}

      {shareModalOpen && (
        <Modal
          onClose={() =>
            setShareModalOpen(false)
          }
        >
          <div className="pr-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
              Referral
            </span>

            <h3 className="mt-1 text-lg font-black text-[var(--foreground)]">
              Invite another collector
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
              Share your referral link and receive
              +100 points.
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
              Message
            </p>

            <p className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[11px] leading-5 text-[var(--foreground)]">
              {referralText}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <PrimaryButton
              onClick={
                handleWhatsAppShare
              }
              className="w-full"
            >
              <Share2 size={15} />
              Share on WhatsApp
            </PrimaryButton>

            <SecondaryButton
              onClick={
                handleCopyLink
              }
              className="w-full"
            >
              <QrCode size={15} />
              Copy referral link
            </SecondaryButton>
          </div>
        </Modal>
      )}

      {/* ======================================================
          RECHARGE MODAL
      ====================================================== */}

      {rechargeModal && (
        <Modal
          onClose={() =>
            setRechargeModal(null)
          }
        >
          {rechargeModal.state ===
            "confirm" && (
            <>
              <div className="pr-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
                  Reward redemption
                </span>

                <h3 className="mt-1 text-lg font-black text-[var(--foreground)]">
                  Mobile data recharge
                </h3>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  Review the redemption before
                  confirming.
                </p>
              </div>

              <div className="mt-5 space-y-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 text-xs">
                <div className="flex justify-between gap-3">
                  <span className="text-[var(--muted)]">
                    Registered mobile
                  </span>

                  <span className="font-mono font-bold text-[var(--foreground)]">
                    {rechargeModal.phone}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-[var(--muted)]">
                    Operator
                  </span>

                  <span className="font-bold text-[var(--foreground)]">
                    {
                      rechargeModal.operator
                    }
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-[var(--muted)]">
                    Plan
                  </span>

                  <span className="font-bold text-[var(--foreground)]">
                    {
                      rechargeModal
                        .item
                        .rechargeAmount
                    }
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-[var(--border)] pt-2">
                  <span className="font-bold text-[var(--foreground)]">
                    Points required
                  </span>

                  <span className="font-black text-rose-600">
                    -
                    {
                      rechargeModal
                        .item
                        .pts
                    }{" "}
                    ⭐
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <SecondaryButton
                  onClick={() =>
                    setRechargeModal(
                      null
                    )
                  }
                  className="flex-1"
                >
                  Cancel
                </SecondaryButton>

                <PrimaryButton
                  onClick={
                    handleConfirmRecharge
                  }
                  className="flex-1"
                >
                  Confirm
                </PrimaryButton>
              </div>
            </>
          )}

          {rechargeModal.state ===
            "processing" && (
            <div className="py-8 text-center">
              <LoaderCircle
                size={42}
                className="mx-auto animate-spin text-[var(--primary)]"
              />

              <h3 className="mt-4 text-base font-black text-[var(--foreground)]">
                Processing recharge
              </h3>

              <p className="mt-1 text-xs text-[var(--muted)]">
                Connecting to the demo telecom
                gateway...
              </p>
            </div>
          )}

          {rechargeModal.state ===
            "success" && (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--primary)]">
                <CheckCircle2
                  size={30}
                />
              </div>

              <h3 className="mt-4 text-lg font-black text-[var(--foreground)]">
                Recharge successful
              </h3>

              <p className="mt-1 text-xs text-[var(--muted)]">
                Your reward redemption has been
                recorded.
              </p>

              <div className="mt-4 rounded-2xl bg-[var(--surface-soft)] p-4 text-left text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">
                    Transaction ID
                  </span>

                  <span className="font-mono font-bold text-[var(--foreground)]">
                    {rechargeModal.txnId}
                  </span>
                </div>

                <div className="mt-2 flex justify-between">
                  <span className="text-[var(--muted)]">
                    Points deducted
                  </span>

                  <span className="font-black text-rose-600">
                    -250 ⭐
                  </span>
                </div>
              </div>

              <PrimaryButton
                onClick={() =>
                  setRechargeModal(null)
                }
                className="mt-5 w-full"
              >
                Done
              </PrimaryButton>
            </div>
          )}
        </Modal>
      )}

      {/* ======================================================
          CLAIMED REWARD MODAL
      ====================================================== */}

      {claimedModal && (
        <Modal
          onClose={() =>
            setClaimedModal(null)
          }
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-2xl">
              {claimedModal.icon}
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
              Reward claimed
            </p>

            <h3 className="mt-1 text-lg font-black text-[var(--foreground)]">
              {
                claimedModal.title?.[
                  lang
                ] ||
                  claimedModal.title?.en
              }
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
              {
                claimedModal.desc?.[
                  lang
                ] ||
                  claimedModal.desc?.en
              }
            </p>

            <div className="mt-5 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                Digital coupon code
              </p>

              <p className="mt-2 font-mono text-lg font-black tracking-wider text-[var(--primary)]">
                {
                  claimedModal.code
                }
              </p>

              <div className="mt-3 flex h-10 items-center justify-center rounded-lg bg-[var(--foreground)] text-xs tracking-[0.25em] text-[var(--surface)]">
                ||| |||||| || |||| ||||
              </div>
            </div>

            <PrimaryButton
              onClick={() =>
                setClaimedModal(null)
              }
              className="mt-5 w-full"
            >
              Done
            </PrimaryButton>
          </div>
        </Modal>
      )}

      {/* ======================================================
          AI SCAN MODAL
      ====================================================== */}

      {aiScanModalOpen && (
        <Modal
          onClose={() => {
            setAiScanModalOpen(false);
            setScanResult(null);
          }}
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]">
              <ScanLine size={28} />
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--primary)]">
              AI inspection
            </p>

            <h3 className="mt-1 text-lg font-black text-[var(--foreground)]">
              Device & PCB scan
            </h3>

            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
              Upload an image to record an inspection
              result. This current implementation is a
              local demo flow.
            </p>
          </div>

          {isScanningAI && (
            <div className="py-10 text-center">
              <LoaderCircle
                size={38}
                className="mx-auto animate-spin text-[var(--primary)]"
              />

              <p className="mt-4 text-sm font-bold text-[var(--foreground)]">
                Inspecting image...
              </p>

              <p className="mt-1 text-xs text-[var(--muted)]">
                Recording demo inspection result
              </p>
            </div>
          )}

          {!isScanningAI &&
            !scanResult && (
              <div className="mt-6 space-y-3">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--primary)]/20 bg-[var(--accent)] px-4 py-3 text-xs font-bold text-[var(--primary)] transition hover:opacity-90">
                  <ScanLine size={16} />
                  Take / upload photo

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={
                      handleFileUploadForAI
                    }
                    className="hidden"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--accent)]">
                  <Plus size={16} />
                  Choose image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleFileUploadForAI
                    }
                    className="hidden"
                  />
                </label>
              </div>
            )}

          {!isScanningAI &&
            scanResult && (
              <div className="mt-6 rounded-2xl border border-[var(--primary)]/20 bg-[var(--accent)] p-4 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--primary)]">
                  <CheckCircle2
                    size={22}
                  />
                </div>

                <p className="mt-3 text-sm font-black text-[var(--foreground)]">
                  Inspection recorded
                </p>

                <p className="mt-1 text-xs font-semibold text-[var(--primary)]">
                  {scanResult}
                </p>

                <p className="mt-2 text-[10px] leading-4 text-[var(--muted)]">
                  Saved to the local activity ledger.
                  No reward points were added for this
                  inspection.
                </p>
              </div>
            )}

          <SecondaryButton
            onClick={() => {
              setAiScanModalOpen(false);
              setScanResult(null);
            }}
            className="mt-5 w-full"
          >
            Close
          </SecondaryButton>
        </Modal>
      )}
    </div>
  );
};

export default RewardsPage;