// ============================================================
// REWARDS UTILS
// Receipt + Certificate generation
// ============================================================


// ============================================================
// GENERATE & DOWNLOAD DIGITAL RECEIPT
// ============================================================

export const downloadReceiptAsImage = (
  activeReceipt,
  lang = "en"
) => {
  if (!activeReceipt) return;

  const rowCount = activeReceipt.items?.length || 0;

  const dynamicHeight =
    790 + rowCount * 45;

  const canvas =
    document.createElement("canvas");

  canvas.width = 800;
  canvas.height = dynamicHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;


  // ----------------------------------------------------------
  // BACKGROUND
  // ----------------------------------------------------------

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(
    0,
    0,
    800,
    dynamicHeight
  );


  // ----------------------------------------------------------
  // DOUBLE BORDER
  // ----------------------------------------------------------

  ctx.strokeStyle = "#176B4D";
  ctx.lineWidth = 6;

  ctx.strokeRect(
    20,
    20,
    760,
    dynamicHeight - 40
  );

  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 2;

  ctx.strokeRect(
    30,
    30,
    740,
    dynamicHeight - 60
  );


  // ----------------------------------------------------------
  // TITLE
  // ----------------------------------------------------------

  ctx.textAlign = "center";

  ctx.fillStyle = "#176B4D";
  ctx.font =
    "900 24px sans-serif";

  ctx.fillText(
    lang === "en"
      ? "E-WASTE CONSIGNMENT RECEIPT"
      : "ई-कचरा तौल व बिक्री रसीद",
    400,
    75
  );

  ctx.fillStyle = "#64748B";
  ctx.font =
    "14px sans-serif";

  ctx.fillText(
    "Digital E-Waste Handover & Payment Record",
    400,
    102
  );


  // ----------------------------------------------------------
  // SEPARATOR
  // ----------------------------------------------------------

  ctx.strokeStyle = "#CBD5E1";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(50, 125);
  ctx.lineTo(750, 125);
  ctx.stroke();


  // ----------------------------------------------------------
  // META INFORMATION
  // ----------------------------------------------------------

  ctx.textAlign = "left";

  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#334155";

  ctx.fillText(
    lang === "en"
      ? "Slip Number:"
      : "पर्ची संख्या:",
    60,
    160
  );

  ctx.font =
    "bold 15px monospace";

  ctx.fillStyle = "#0F172A";

  ctx.fillText(
    activeReceipt.slipId,
    220,
    160
  );


  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#334155";

  ctx.fillText(
    lang === "en"
      ? "Timestamp:"
      : "दिनांक व समय:",
    60,
    190
  );

  ctx.font =
    "bold 14px sans-serif";

  ctx.fillStyle = "#0F172A";

  ctx.fillText(
    activeReceipt.date,
    220,
    190
  );


  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#334155";

  ctx.fillText(
    lang === "en"
      ? "Collector ID:"
      : "संग्रहक पहचान:",
    60,
    220
  );

  ctx.font =
    "bold 14px monospace";

  ctx.fillStyle = "#176B4D";

  ctx.fillText(
    activeReceipt.collectorId,
    220,
    220
  );


  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#334155";

  ctx.fillText(
    lang === "en"
      ? "Authorized Facility:"
      : "अधिकृत केंद्र:",
    60,
    250
  );

  ctx.font =
    "bold 14px sans-serif";

  ctx.fillStyle = "#0F172A";

  ctx.fillText(
    activeReceipt.facility,
    220,
    250
  );


  // ----------------------------------------------------------
  // ITEM TABLE HEADER
  // ----------------------------------------------------------

  const tableTop = 285;

  ctx.fillStyle = "#EAF5EF";

  ctx.fillRect(
    50,
    tableTop,
    700,
    40
  );

  ctx.strokeStyle = "#86EFAC";

  ctx.strokeRect(
    50,
    tableTop,
    700,
    40
  );


  ctx.fillStyle = "#166534";
  ctx.font =
    "bold 13px sans-serif";

  ctx.textAlign = "left";

  ctx.fillText(
    lang === "en"
      ? "ITEM / DEVICE"
      : "सामग्री विवरण",
    65,
    tableTop + 25
  );


  ctx.textAlign = "right";

  ctx.fillText(
    lang === "en"
      ? "QTY / WT"
      : "मात्रा/वजन",
    470,
    tableTop + 25
  );

  ctx.fillText(
    lang === "en"
      ? "RATE"
      : "दर",
    580,
    tableTop + 25
  );

  ctx.fillText(
    lang === "en"
      ? "SUBTOTAL"
      : "कुल",
    725,
    tableTop + 25
  );


  // ----------------------------------------------------------
  // TABLE ROWS
  // ----------------------------------------------------------

  let currentY =
    tableTop + 65;

  activeReceipt.items?.forEach(
    (item, index) => {
      ctx.textAlign = "left";

      ctx.fillStyle = "#0F172A";
      ctx.font =
        "bold 13px sans-serif";

      const itemName =
        String(item.name || "").slice(
          0,
          36
        );

      ctx.fillText(
        `${index + 1}. ${itemName}`,
        65,
        currentY
      );


      ctx.textAlign = "right";

      ctx.font =
        "13px sans-serif";

      ctx.fillStyle = "#334155";

      ctx.fillText(
        `${item.qty} ${item.unitLabel}`,
        470,
        currentY
      );

      ctx.fillText(
        item.rateDisplay || "",
        580,
        currentY
      );


      ctx.font =
        "bold 14px sans-serif";

      ctx.fillStyle = "#176B4D";

      ctx.fillText(
        `₹${item.totalPrice}`,
        725,
        currentY
      );

      currentY += 38;
    }
  );


  // ----------------------------------------------------------
  // PAYMENT SUMMARY
  // ----------------------------------------------------------

  currentY += 15;

  ctx.fillStyle = "#FEFCE8";

  ctx.fillRect(
    50,
    currentY,
    700,
    105
  );

  ctx.strokeStyle = "#FDE047";
  ctx.lineWidth = 1.5;

  ctx.strokeRect(
    50,
    currentY,
    700,
    105
  );


  ctx.textAlign = "left";

  ctx.fillStyle = "#854D0E";

  ctx.font =
    "bold 14px sans-serif";

  ctx.fillText(
    lang === "en"
      ? "PAYMENT & REWARD SUMMARY"
      : "भुगतान व पॉइंट्स सारांश",
    70,
    currentY + 28
  );


  ctx.font =
    "14px sans-serif";

  ctx.fillStyle = "#1E293B";

  ctx.fillText(
    `• ${
      lang === "en"
        ? "Total Weight"
        : "कुल कांटा तौल"
    }: ${activeReceipt.totalWeight} KG`,
    70,
    currentY + 56
  );


  ctx.fillText(
    `• ${
      lang === "en"
        ? "Gross Payment"
        : "कुल भुगतान"
    }: ₹${activeReceipt.grossAmount}`,
    70,
    currentY + 82
  );


  ctx.textAlign = "right";

  ctx.font =
    "bold 15px sans-serif";

  ctx.fillStyle = "#176B4D";

  ctx.fillText(
    `+${activeReceipt.ptsEarned} ⭐ ${
      lang === "en"
        ? "Points Credited"
        : "पॉइंट्स जमा"
    }`,
    720,
    currentY + 56
  );


  // ----------------------------------------------------------
  // VERIFICATION HASH
  // ----------------------------------------------------------

  currentY += 135;

  ctx.textAlign = "center";

  ctx.fillStyle = "#0F172A";
  ctx.font =
    "24px monospace";

  ctx.fillText(
    "|||||| | |||||||| |||| |||||| |||||||||| |||||",
    400,
    currentY
  );


  ctx.font =
    "11px monospace";

  ctx.fillStyle = "#475569";

  ctx.fillText(
    `AUTH-HASH-${activeReceipt.slipId}-VALIDATED`,
    400,
    currentY + 22
  );


  // ----------------------------------------------------------
  // SIGNATURE / STAMP
  // ----------------------------------------------------------

  currentY += 75;

  ctx.textAlign = "left";

  ctx.font =
    "bold 13px sans-serif";

  ctx.fillStyle = "#0F172A";

  ctx.fillText(
    lang === "en"
      ? "Collector Sign / Thumb"
      : "संग्रहक हस्ताक्षर / अंगूठा",
    80,
    currentY
  );


  ctx.textAlign = "right";

  ctx.fillText(
    lang === "en"
      ? "Authorized Facility Stamp"
      : "अधिकृत केंद्र मोहर",
    720,
    currentY
  );


  // ----------------------------------------------------------
  // DOWNLOAD
  // ----------------------------------------------------------

  const link =
    document.createElement("a");

  link.download =
    `E-Waste_Consignment_${activeReceipt.slipId}.png`;

  link.href =
    canvas.toDataURL("image/png");

  link.click();
};


// ============================================================
// GENERATE & DOWNLOAD IMPACT CERTIFICATE
// ============================================================

export const downloadCertificate = ({
  impact,
  currentLevelBadge,
}) => {
  const canvas =
    document.createElement("canvas");

  canvas.width = 1400;
  canvas.height = 950;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;


  // ----------------------------------------------------------
  // BACKGROUND
  // ----------------------------------------------------------

  const bgGradient =
    ctx.createRadialGradient(
      700,
      475,
      50,
      700,
      475,
      800
    );

  bgGradient.addColorStop(
    0,
    "#06381B"
  );

  bgGradient.addColorStop(
    1,
    "#02180B"
  );

  ctx.fillStyle = bgGradient;

  ctx.fillRect(
    0,
    0,
    1400,
    950
  );


  // ----------------------------------------------------------
  // CERTIFICATE BORDER
  // ----------------------------------------------------------

  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 16;

  ctx.strokeRect(
    35,
    35,
    1330,
    880
  );


  ctx.strokeStyle = "#10B981";
  ctx.lineWidth = 3;

  ctx.strokeRect(
    55,
    55,
    1290,
    840
  );


  ctx.strokeStyle = "#D4AF37";
  ctx.lineWidth = 1.5;

  ctx.strokeRect(
    65,
    65,
    1270,
    820
  );


  // ----------------------------------------------------------
  // CORNER DECORATION
  // ----------------------------------------------------------

  const drawCorner = (
    x,
    y
  ) => {
    ctx.fillStyle = "#D4AF37";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      14,
      0,
      Math.PI * 2
    );

    ctx.fill();
  };

  drawCorner(65, 65);
  drawCorner(1335, 65);
  drawCorner(65, 885);
  drawCorner(1335, 885);


  // ----------------------------------------------------------
  // HEADER
  // ----------------------------------------------------------

  ctx.textAlign = "center";

  ctx.fillStyle = "#F59E0B";

  ctx.font =
    "bold 24px sans-serif";

  ctx.fillText(
    "E-WASTE CHANNELIZATION • DIGITAL IMPACT RECORD",
    700,
    130
  );


  ctx.fillStyle = "#FFFFFF";

  ctx.font =
    "900 46px sans-serif";

  ctx.fillText(
    "CERTIFICATE OF E-WASTE IMPACT",
    700,
    195
  );


  ctx.fillStyle = "#A7F3D0";

  ctx.font =
    "italic 20px sans-serif";

  ctx.fillText(
    "Digital certificate generated from the collector impact record",
    700,
    245
  );


  // ----------------------------------------------------------
  // COLLECTOR / LEVEL
  // ----------------------------------------------------------

  ctx.fillStyle = "#FCD34D";

  ctx.font =
    "900 38px sans-serif";

  ctx.fillText(
    "SWACHH E-SATHI",
    700,
    315
  );


  ctx.fillStyle = "#FFFFFF";

  ctx.font =
    "600 20px sans-serif";

  ctx.fillText(
    `Collector Level: ${currentLevelBadge}`,
    700,
    360
  );


  // ----------------------------------------------------------
  // IMPACT SUMMARY BOX
  // ----------------------------------------------------------

  ctx.fillStyle = "#062D16";

  ctx.fillRect(
    160,
    400,
    1080,
    175
  );


  ctx.strokeStyle = "#10B981";
  ctx.lineWidth = 2;

  ctx.strokeRect(
    160,
    400,
    1080,
    175
  );


  ctx.fillStyle = "#FBBF24";

  ctx.font =
    "bold 26px sans-serif";

  ctx.fillText(
    `TOTAL E-WASTE RECORDED: ${impact.ewasteTotal} KG`,
    700,
    450
  );


  ctx.fillStyle = "#E2E8F0";

  ctx.font =
    "500 20px sans-serif";

  ctx.fillText(
    `Lead Avoided: ${impact.leadAvoidedGrams}g  •  Mercury Avoided: ${impact.mercuryAvoidedGrams}g`,
    700,
    495
  );


  const copperRecoveredKg =
    (
      impact.ewasteTotal * 0.18
    ).toFixed(1);

  const co2AvoidedKg =
    Math.round(
      impact.ewasteTotal * 2.8
    );


  ctx.fillText(
    `Material Recovery Equivalent: ${copperRecoveredKg} kg  •  CO₂ Avoided: ${co2AvoidedKg} kg`,
    700,
    535
  );


  // ----------------------------------------------------------
  // VERIFICATION DETAILS
  // ----------------------------------------------------------

  ctx.fillStyle = "#CBD5E1";

  ctx.font =
    "16px sans-serif";

  ctx.textAlign = "left";

  ctx.fillText(
    `Verification Date: ${new Date().toLocaleDateString(
      "en-IN",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}`,
    160,
    640
  );


  ctx.fillText(
    "Record Type: Digital E-Waste Collection Impact Summary",
    160,
    670
  );


  // ----------------------------------------------------------
  // BADGE
  // ----------------------------------------------------------

  ctx.textAlign = "center";

  ctx.beginPath();

  ctx.arc(
    700,
    720,
    50,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#F59E0B";

  ctx.fill();

  ctx.lineWidth = 4;

  ctx.strokeStyle = "#FFFFFF";

  ctx.stroke();


  ctx.fillStyle = "#064E3B";

  ctx.font =
    "bold 15px sans-serif";

  ctx.fillText(
    "E-WASTE",
    700,
    715
  );

  ctx.fillText(
    "SATHI",
    700,
    735
  );


  // ----------------------------------------------------------
  // FACILITY TEXT
  // ----------------------------------------------------------

  ctx.textAlign = "right";

  ctx.fillStyle = "#FFFFFF";

  ctx.font =
    "bold 20px sans-serif";

  ctx.fillText(
    "Digital E-Waste Record",
    1240,
    710
  );


  ctx.font =
    "15px sans-serif";

  ctx.fillStyle = "#94A3B8";

  ctx.fillText(
    "Kabadi Connect",
    1240,
    735
  );


  // ----------------------------------------------------------
  // HASH
  // ----------------------------------------------------------

  ctx.textAlign = "center";

  ctx.fillStyle = "#6EE7B7";

  ctx.font =
    "13px monospace";

  ctx.fillText(
    "Digital Impact Record • Kabadi Connect",
    700,
    830
  );


  // ----------------------------------------------------------
  // DOWNLOAD
  // ----------------------------------------------------------

  const link =
    document.createElement("a");

  link.download =
    "KabadiConnect_EWaste_Impact_Certificate.png";

  link.href =
    canvas.toDataURL("image/png");

  link.click();
};