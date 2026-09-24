import {
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  ExternalLink,
  MapPin,
  Navigation,
  Package,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles,
  Truck,
  WalletCards,
} from "lucide-react";

import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { useNavigate, useParams } from "react-router-dom";

import useTranslation from "../../i18n/useTranslation";
import { getAllRecyclers } from "../../services/recyclers/recyclerStore";


const RecyclerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const recycler = useMemo(
    () =>
      getAllRecyclers().find(
        (item) => item.id === id
      ),
    [id]
  );

  if (!recycler) {
    return (
      <div className="min-h-[70vh] bg-[var(--background)] px-4 py-10">
        <div className="mx-auto flex min-h-[55vh] max-w-lg items-center justify-center">
          <div className="w-full rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)] shadow-[0_10px_30px_rgba(53,168,115,0.15)]">
              <Recycle size={28} />
            </div>

            <h1 className="mt-5 text-2xl font-black text-[var(--foreground)]">
              {t("recyclerDetails.notFoundTitle")}
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
              {t("recyclerDetails.notFoundDescription")}
            </p>

            <button
              type="button"
              onClick={() => navigate("/collector/recyclers")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#35A873] px-5 py-3 text-xs font-black text-[#082117] shadow-[0_12px_28px_rgba(53,168,115,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#54C489] active:translate-y-0"
            >
              <ArrowLeft size={14} />
              {t("recyclerDetails.back")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const verified = recycler.verified === true;
  const coords = recycler.location?.coordinates;

  const hasCoords =
    Number.isFinite(coords?.lat) &&
    Number.isFinite(coords?.lng);

  const materials = recycler.acceptedMaterials || [];
  const payments = recycler.paymentMethods || [];

  const mapsUrl = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`
    : null;

  const materialLabel = (item) => {
    const key = `recyclers.materials.${item}`;
    const value = t(key);
    return value === key ? item : value;
  };

  const paymentLabel = (item) => {
    const key = `recyclers.payments.${item}`;
    const value = t(key);
    return value === key ? item : value;
  };

  const paymentIcon = (item) => {
    if (item === "upi") return WalletCards;
    if (item === "bank") return Banknote;
    return CreditCard;
  };

  const markerIcon = useMemo(
    () =>
      divIcon({
        className: "eco-recycler-detail-marker",
        html: `
          <div style="
            width:46px;
            height:46px;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:16px;
            background:#35A873;
            border:3px solid #F4FBF7;
            color:#082117;
            box-shadow:0 12px 30px rgba(0,0,0,.35);
          ">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"/>
              <circle cx="12" cy="11" r="2.4"/>
            </svg>
          </div>
        `,
        iconSize: [46, 46],
        iconAnchor: [23, 23],
      }),
    []
  );

  const openMaps = () => {
    if (!mapsUrl) return;
    window.open(
      mapsUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const callRecycler = () => {
    if (!recycler.phone) return;
    window.location.href = `tel:${recycler.phone}`;
  };

  return (
    <div className="min-h-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1280px] pb-16">

        {/* top navigation */}
        <div className="flex items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/collector/recyclers")}
            className="
              group inline-flex items-center gap-2 rounded-xl
              border border-[var(--border)] bg-[var(--surface)]
              px-3.5 py-2.5 text-xs font-black text-[var(--muted)]
              shadow-[0_8px_20px_rgba(0,0,0,0.12)]
              transition-all duration-200
              hover:-translate-x-0.5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-soft)]
              hover:text-[var(--foreground)] active:translate-x-0
            "
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            {t("recyclerDetails.back")}
          </button>

          <div className="flex items-center gap-2">
            {mapsUrl && (
              <button
                type="button"
                onClick={openMaps}
                className="
                  group inline-flex items-center gap-2 rounded-xl
                  border border-[var(--border)] bg-[var(--surface)]
                  px-3.5 py-2.5 text-xs font-black text-[var(--primary)]
                  shadow-[0_10px_28px_rgba(0,0,0,0.22)]
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-[var(--surface-soft)]
                  hover:shadow-[0_16px_34px_rgba(0,0,0,0.28)]
                "
              >
                <Navigation size={13} />
                <span className="hidden sm:inline">
                  {t("recyclerDetails.openMaps")}
                </span>
                <ExternalLink
                  size={12}
                  className="opacity-50 transition-transform group-hover:translate-x-0.5"
                />
              </button>
            )}
          </div>
        </div>

        {/* hero */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="
            relative mx-4 overflow-hidden rounded-[34px]
            border border-[#22583F]
            bg-[#0B2118]
            shadow-[0_30px_90px_rgba(0,0,0,0.36)]
            sm:mx-6 lg:mx-8
          "
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(53,168,115,0.32),rgba(53,168,115,0)_68%)]" />
            <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(39,143,139,0.18),rgba(39,143,139,0)_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(53,168,115,0.04)_50%,transparent_100%)]" />
          </div>

          <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_430px] lg:p-10">

            {/* identity */}
            <div className="flex min-w-0 flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#35A873]/20 bg-[#163A29] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#A8E8C2]">
                    <Sparkles size={11} />
                    {t("recyclers.badge")}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-black ${
                      verified
                        ? "bg-[#CFF1D9] text-[#123F2D]"
                        : "bg-[#E6A43B] text-[#5C400E]"
                    }`}
                  >
                    {verified ? (
                      <CheckCircle2 size={11} />
                    ) : (
                      <Clock3 size={11} />
                    )}
                    {verified
                      ? t("recyclerDetails.verified")
                      : t("recyclerDetails.pending")}
                  </span>
                </div>

                <div className="mt-7 flex items-start gap-4">
                  <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[24px] bg-[var(--accent)] text-[#C6F5D8] shadow-[0_18px_40px_rgba(0,0,0,0.2)] ring-1 ring-white/10 sm:h-[88px] sm:w-[88px]">
                    <Recycle size={39} />
                  </div>

                  <div className="min-w-0">
                    <h1 className="max-w-3xl text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl lg:text-[46px] lg:leading-[1.02]">
                      {recycler.name}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#58C889]" />
                        {recycler.location.city},{" "}
                        {recycler.location.state}
                      </span>

                      <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

                      <span>
                        {recycler.location.pincode}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-[15px]">
                  {t("recyclerDetails.heroDescription")}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <HeroChip
                  icon={Truck}
                  text={
                    recycler.pickup?.available
                      ? t("recyclerDetails.pickupAvailable")
                      : t("recyclerDetails.noPickup")
                  }
                />

                <HeroChip
                  icon={Navigation}
                  text={
                    recycler.pickup?.doorstep
                      ? t("recyclerDetails.doorstepAvailable")
                      : t("recyclerDetails.doorstepUnavailable")
                  }
                />

                <HeroChip
                  icon={Package}
                  text={`${recycler.minimumPickupWeight} kg ${t("recyclerDetails.minimum")}`}
                />
              </div>
            </div>

            {/* metric board */}
            <div className="relative">
              <div className="rounded-[28px] border border-[var(--border)] bg-black/10 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-md">
                <div className="grid grid-cols-2 gap-2">
                  <HeroMetric
                    icon={Navigation}
                    value={recycler.serviceRadiusKm}
                    unit="km"
                    label={t("recyclerDetails.serviceRadius")}
                  />

                  <HeroMetric
                    icon={Package}
                    value={recycler.minimumPickupWeight}
                    unit="kg"
                    label={t("recyclerDetails.minimumPickup")}
                  />

                  <HeroMetric
                    icon={Recycle}
                    value={materials.length}
                    unit=""
                    label={t("recyclerDetails.materialTypes")}
                  />

                  <HeroMetric
                    icon={WalletCards}
                    value={payments.length}
                    unit=""
                    label={t("recyclerDetails.paymentOptions")}
                  />
                </div>
              </div>

              <div className="mt-3 rounded-[22px] border border-[#35A873]/15 bg-[var(--surface-soft)]/80 px-4 py-3 shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#7AC89C]">
                      {t("recyclerDetails.facilityStatus")}
                    </p>
                    <p className="mt-1 text-xs font-black text-[var(--foreground)]">
                      {verified
                        ? t("recyclerDetails.verifiedFacility")
                        : t("recyclerDetails.verificationPending")}
                    </p>
                  </div>

                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${verified ? "bg-[#35A873]/15 text-[#7DE0A5]" : "bg-[#E6A43B]/15 text-[#F1C76B]"}`}>
                    {verified ? (
                      <ShieldCheck size={16} />
                    ) : (
                      <Clock3 size={16} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* main reference-style body */}
        <div className="mt-6 grid gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_410px] lg:px-8">

          {/* left content */}
          <div className="space-y-6">

            {/* accepted materials */}
            <SectionFrame
              eyebrow={t("recyclerDetails.materialsEyebrow")}
              title={t("recyclerDetails.acceptedMaterials")}
              description={t("recyclerDetails.materialsDescription")}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {materials.map((material, index) => (
                  <motion.div
                    key={material}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ y: -4 }}
                    className="
                      group rounded-2xl border border-[var(--border)]
                      bg-[var(--background)] p-4
                      shadow-[0_12px_32px_rgba(0,0,0,0.16)]
                      transition-all duration-200
                      hover:border-[#35A873]/25
                      hover:bg-[var(--surface-soft)]
                      hover:shadow-[0_18px_40px_rgba(0,0,0,0.24)]
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[#72D79A] shadow-[0_8px_18px_rgba(53,168,115,0.08)]">
                        <Recycle size={17} />
                      </div>

                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#35A873] text-[#062014] shadow-[0_5px_15px_rgba(53,168,115,0.25)]">
                        <Check size={12} />
                      </div>
                    </div>

                    <p className="mt-4 text-xs font-black text-[var(--foreground)]">
                      {materialLabel(material)}
                    </p>

                    <p className="mt-1 text-[9px] font-bold text-[#62C58B]">
                      {t("recyclerDetails.accepted")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </SectionFrame>

            {/* location and service */}
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">

              <SectionFrame
                eyebrow={t("recyclerDetails.locationEyebrow")}
                title={t("recyclerDetails.location")}
                description={t("recyclerDetails.locationDescription")}
                compact
              >
                {hasCoords ? (
                  <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_16px_36px_rgba(0,0,0,0.2)]">
                    <MapContainer
                      center={[
                        coords.lat,
                        coords.lng,
                      ]}
                      zoom={12}
                      scrollWheelZoom={false}
                      style={{
                        width: "100%",
                        height: "290px",
                      }}
                    >
                      <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <Circle
                        center={[
                          coords.lat,
                          coords.lng,
                        ]}
                        radius={
                          recycler.serviceRadiusKm * 1000
                        }
                        pathOptions={{
                          color: "#35A873",
                          fillColor: "#35A873",
                          fillOpacity: 0.10,
                          weight: 2,
                        }}
                      />

                      <Marker
                        position={[
                          coords.lat,
                          coords.lng,
                        ]}
                        icon={markerIcon}
                      >
                        <Popup>
                          <strong>
                            {recycler.name}
                          </strong>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                ) : (
                  <div className="flex h-[290px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--muted)]">
                    {t("recyclerDetails.mapUnavailable")}
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-[var(--foreground)]">
                      {recycler.location.address}
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {recycler.location.city},{" "}
                      {recycler.location.state}
                      {" · "}
                      {recycler.location.pincode}
                    </p>
                  </div>

                  {mapsUrl && (
                    <button
                      type="button"
                      onClick={openMaps}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#35A873]/20 bg-[var(--surface-soft)] px-3.5 py-2.5 text-[10px] font-black text-[var(--primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#35A873]/35 hover:bg-[var(--accent)]"
                    >
                      <Navigation size={12} />
                      {t("recyclerDetails.openMaps")}
                      <ArrowUpRight size={12} />
                    </button>
                  )}
                </div>
              </SectionFrame>

              <div className="space-y-6">
                <DarkMetricPanel
                  eyebrow={t("recyclerDetails.serviceEyebrow")}
                  title={t("recyclerDetails.serviceArea")}
                  value={recycler.serviceRadiusKm}
                  unit="km"
                  icon={Navigation}
                  description={t("recyclerDetails.serviceRadiusDescription")}
                />

                <SectionFrame
                  eyebrow={t("recyclerDetails.collectionEyebrow")}
                  title={t("recyclerDetails.collection")}
                  description={t("recyclerDetails.collectionDescription")}
                  compact
                >
                  <div className="space-y-3">
                    <Capability
                      icon={Truck}
                      label={t("recyclers.pickup")}
                      active={recycler.pickup?.available}
                      value={
                        recycler.pickup?.available
                          ? t("recyclerDetails.pickupAvailable")
                          : t("recyclerDetails.noPickup")
                      }
                    />

                    <Capability
                      icon={Navigation}
                      label={t("recyclerDetails.doorstep")}
                      active={recycler.pickup?.doorstep}
                      value={
                        recycler.pickup?.doorstep
                          ? t("recyclerDetails.doorstepAvailable")
                          : t("recyclerDetails.doorstepUnavailable")
                      }
                    />

                    <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-3">
                      <div>
                        <p className="text-[9px] font-bold text-[var(--muted)]">
                          {t("recyclerDetails.minimumPickup")}
                        </p>
                        <p className="mt-1 text-sm font-black text-[var(--foreground)]">
                          {recycler.minimumPickupWeight} kg
                        </p>
                      </div>
                      <Package size={16} className="text-[#68CA8F]" />
                    </div>
                  </div>
                </SectionFrame>
              </div>
            </div>

            {/* handover flow */}
            <SectionFrame
              eyebrow={t("recyclerDetails.handoverEyebrow")}
              title={t("recyclerDetails.handoverChecklist")}
              description={t("recyclerDetails.handoverDescription")}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <FlowStep number="01" title={t("recyclerDetails.checkMaterial")} />
                <FlowStep number="02" title={t("recyclerDetails.checkPickup")} />
                <FlowStep number="03" title={t("recyclerDetails.checkPayment")} />
                <FlowStep number="04" title={t("recyclerDetails.checkWeight")} />
              </div>
            </SectionFrame>
          </div>

          {/* right column */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* payment */}
            <SectionFrame
              eyebrow={t("recyclerDetails.paymentEyebrow")}
              title={t("recyclerDetails.paymentMethods")}
              description={t("recyclerDetails.paymentDescription")}
              compact
            >
              <div className="space-y-2.5">
                {payments.map((method) => {
                  const Icon = paymentIcon(method);

                  return (
                    <motion.div
                      key={method}
                      whileHover={{ x: 4 }}
                      className="
                        flex items-center justify-between rounded-2xl
                        border border-[var(--border)] bg-[var(--background)]
                        px-3.5 py-3.5
                        shadow-[0_8px_20px_rgba(0,0,0,0.12)]
                        transition-all duration-200
                        hover:border-[#35A873]/25 hover:bg-[var(--surface-soft)]
                        hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-[#70D89B]">
                          <Icon size={16} />
                        </div>

                        <div>
                          <p className="text-xs font-black text-[var(--foreground)]">
                            {paymentLabel(method)}
                          </p>
                          <p className="mt-0.5 text-[9px] font-bold text-[var(--muted)]">
                            {t("recyclerDetails.paymentAccepted")}
                          </p>
                        </div>
                      </div>

                      <CheckCircle2
                        size={16}
                        className="text-[#35A873]"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </SectionFrame>

            {/* verification */}
            <SectionFrame
              eyebrow={t("recyclerDetails.verificationEyebrow")}
              title={t("recyclerDetails.verification")}
              compact
            >
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                <div className="flex items-start gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    verified
                      ? "bg-[#35A873]/15 text-[#6FDA98]"
                      : "bg-[#E6A43B]/12 text-[#E9BE61]"
                  }`}>
                    {verified ? (
                      <ShieldCheck size={18} />
                    ) : (
                      <Clock3 size={18} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-black text-[var(--foreground)]">
                      {verified
                        ? t("recyclerDetails.verifiedFacility")
                        : t("recyclerDetails.verificationPending")}
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-[var(--muted)]">
                      {verified
                        ? t("recyclerDetails.verifiedDescription")
                        : t("recyclerDetails.pendingDescription")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5">
                  <span className="text-[9px] font-bold text-[var(--muted)]">
                    {t("recyclerDetails.source")}
                  </span>
                  <span className="text-[9px] font-black text-[var(--foreground)]/75">
                    {recycler.source === "demo"
                      ? t("recyclerDetails.demo")
                      : t("recyclerDetails.platformRecycler")}
                  </span>
                </div>
              </div>
            </SectionFrame>

            {/* action */}
            <motion.section
              whileHover={{ y: -3 }}
              className="
                relative overflow-hidden rounded-[28px]
                border border-[#256F4F]
                bg-[#0D2B1E]
                p-5
                shadow-[0_22px_50px_rgba(0,0,0,0.25)]
              "
            >
              <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,rgba(53,168,115,0.34),rgba(53,168,115,0)_68%)]" />

              <div className="relative">
                <div className="flex items-center gap-2 text-[#91DCAF]">
                  <Sparkles size={13} />
                  <p className="text-[9px] font-black uppercase tracking-[0.15em]">
                    {t("recyclerDetails.nextStepEyebrow")}
                  </p>
                </div>

                <h3 className="mt-3 text-xl font-black tracking-tight text-white">
                  {t("recyclerDetails.readyTitle")}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-white/50">
                  {t("recyclerDetails.readyDescription")}
                </p>

                <div className="mt-5 space-y-2">
                  {mapsUrl && (
                    <button
                      type="button"
                      onClick={openMaps}
                      className="
                        group flex w-full items-center justify-between rounded-xl
                        bg-[#35A873] px-4 py-3.5
                        text-xs font-black text-[#062014]
                        shadow-[0_12px_25px_rgba(53,168,115,0.22)]
                        transition-all duration-200
                        hover:-translate-y-0.5 hover:bg-[#54C489]
                        hover:shadow-[0_16px_32px_rgba(53,168,115,0.28)]
                        active:translate-y-0
                      "
                    >
                      <span className="flex items-center gap-2">
                        <Navigation size={14} />
                        {t("recyclerDetails.getDirections")}
                      </span>
                      <ChevronRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={!recycler.phone}
                    onClick={callRecycler}
                    className="
                      group flex w-full items-center justify-between rounded-xl
                      border border-[var(--border)] bg-white/[0.045]
                      px-4 py-3.5 text-xs font-black text-white
                      transition-all duration-200
                      hover:border-[var(--primary)]/30 hover:bg-white/[0.075]
                      disabled:cursor-not-allowed disabled:opacity-40
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Phone size={14} />
                      {t("recyclerDetails.contactRecycler")}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </div>
            </motion.section>

          </aside>
        </div>
      </div>
    </div>
  );
};


const SectionFrame = ({
  eyebrow,
  title,
  description,
  children,
  compact = false,
}) => (
  <section
    className="
      overflow-hidden rounded-[28px]
      border border-[var(--border)]
      bg-[var(--surface)]
      shadow-[0_18px_45px_rgba(18,63,45,0.10)]
    "
  >
    <div className={`${compact ? "p-5" : "p-5 sm:p-6"}`}>
      {eyebrow && (
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#58C889]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-1.5 text-lg font-black tracking-tight text-[var(--foreground)]">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 max-w-2xl text-[10px] leading-5 text-[var(--muted)]">
          {description}
        </p>
      )}

      <div className="mt-5">
        {children}
      </div>
    </div>
  </section>
);


const HeroChip = ({ icon: Icon, text }) => (
  <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/[0.045] px-3 py-2 text-[9px] font-black text-[#BFEED0] shadow-[0_8px_18px_rgba(0,0,0,0.12)] backdrop-blur-md">
    <Icon size={12} className="text-[#67D393]" />
    {text}
  </div>
);


const HeroMetric = ({
  icon: Icon,
  value,
  unit,
  label,
}) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="group rounded-2xl border border-[var(--border)] bg-white/[0.045] p-4 shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-200 hover:border-[var(--primary)]/30 hover:bg-white/[0.07] hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)]"
  >
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white">
          {value}
        </span>

        {unit && (
          <span className="text-xs font-bold text-[var(--muted)]">
            {unit}
          </span>
        )}
      </div>

      <Icon
        size={14}
        className="text-[#69D498] transition-transform duration-200 group-hover:scale-110"
      />
    </div>

    <p className="mt-2 text-[9px] font-bold leading-4 text-[var(--muted)]">
      {label}
    </p>
  </motion.div>
);


const DarkMetricPanel = ({
  eyebrow,
  title,
  value,
  unit,
  icon: Icon,
  description,
}) => (
  <motion.section
    whileHover={{ y: -3 }}
    className="
      relative overflow-hidden rounded-[28px]
      border border-[#286B4C]
      bg-[var(--surface)] p-5
      shadow-[0_22px_50px_rgba(0,0,0,0.24)]
    "
  >
    <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(53,168,115,0.34),rgba(53,168,115,0)_70%)]" />

    <div className="relative">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#7FD6A1]">
            {eyebrow}
          </p>

          <h2 className="mt-1.5 text-lg font-black text-white">
            {title}
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-[#81DDA4]">
          <Icon size={16} />
        </div>
      </div>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-5xl font-black tracking-[-0.04em] text-[var(--foreground)]">
          {value}
        </span>
        <span className="text-sm font-bold text-[var(--muted)]">
          {unit}
        </span>
      </div>

      <p className="mt-2 text-[10px] leading-5 text-[var(--muted)]">
        {description}
      </p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${Math.min(100, Math.max(12, value * 2))}%`,
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full rounded-full bg-[#35A873] shadow-[0_0_18px_rgba(53,168,115,0.55)]"
        />
      </div>
    </div>
  </motion.section>
);


const Capability = ({
  icon: Icon,
  label,
  active,
  value,
}) => (
  <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-3.5 shadow-[0_8px_22px_rgba(0,0,0,0.14)]">
    <div className="flex items-center gap-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-[var(--accent)] text-[#70D89B]" : "bg-white/[0.04] text-[var(--foreground)]/25"}`}>
        <Icon size={15} />
      </div>

      <div>
        <p className="text-xs font-black text-[var(--foreground)]">
          {label}
        </p>

        <p className="mt-0.5 text-[9px] font-bold text-[var(--muted)]">
          {value}
        </p>
      </div>
    </div>

    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${active ? "bg-[#35A873] text-[#062014] shadow-[0_5px_15px_rgba(53,168,115,0.22)]" : "bg-white/5 text-[var(--foreground)]/20"}`}>
      <Check size={12} />
    </div>
  </div>
);


const FlowStep = ({
  number,
  title,
}) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-all duration-200 hover:border-[#35A873]/20 hover:bg-[var(--surface-soft)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.20)]"
  >
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-[9px] font-black text-[#78D79D] shadow-[0_6px_16px_rgba(53,168,115,0.10)]">
        {number}
      </span>

      <p className="pt-1 text-[10px] font-bold leading-5 text-[var(--foreground)]/65">
        {title}
      </p>
    </div>
  </motion.div>
);


export default RecyclerDetails;
