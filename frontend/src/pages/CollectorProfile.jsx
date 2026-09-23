import {
  ArrowLeft,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Languages,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";
import useTranslation from "../i18n/useTranslation";

const CollectorProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);

  const displayName =
    user?.firstName || user?.name || "Collector";

  const phoneNumber =
    user?.phoneNumber || user?.phone || "Not available";

  const language =
    user?.preferredLanguage || "Hindi";

  const location =
    user?.operatingLocation || "Location not set";

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "C";

  return (
    <main className="min-h-full w-full bg-[var(--background)]">
      <div className="mx-auto w-full max-w-4xl px-4 pb-28 pt-5 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/collector/settings")}
              aria-label="Back to settings"
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl
                border border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--foreground)]
                shadow-[0_6px_20px_rgba(18,63,45,0.05)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-[0_10px_24px_rgba(18,63,45,0.08)]
                active:scale-95
              "
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
                Account
              </p>
              <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Profile
              </h1>
            </div>
          </div>

          <div
            className="
              hidden items-center gap-2 rounded-full
              border border-[#35A873]/20
              bg-[#E3F2E9]/70
              px-3 py-1.5
              text-xs font-semibold text-[#123F2D]
              sm:flex
            "
          >
            <CheckCircle2 size={14} />
            Active account
          </div>
        </header>

        {/* Main content */}
        <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
          {/* Identity card */}
          <section
            className="
              relative overflow-hidden rounded-[28px]
              border border-[var(--border)]
              bg-[var(--surface)]
              shadow-[0_14px_40px_rgba(18,63,45,0.07)]
            "
          >
            {/* subtle brand strip */}
            <div className="h-1.5 bg-[linear-gradient(90deg,#123F2D_0%,#18794E_55%,#278F8B_100%)]" />

            <div className="relative p-5 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* identity */}
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative shrink-0">
                    <div
                      className="
                        flex h-20 w-20 items-center justify-center
                        rounded-[24px]
                        bg-[linear-gradient(145deg,#E3F2E9,#C7E8D5)]
                        text-2xl font-extrabold
                        tracking-tight text-[#123F2D]
                        shadow-[0_10px_26px_rgba(18,63,45,0.10)]
                        ring-1 ring-[#35A873]/20
                      "
                    >
                      {initials}
                    </div>

                    <button
                      type="button"
                      aria-label="Change profile photo"
                      className="
                        absolute -bottom-1.5 -right-1.5
                        flex h-9 w-9 items-center justify-center
                        rounded-xl
                        border-2 border-[var(--surface)]
                        bg-[#123F2D]
                        text-white
                        shadow-[0_7px_18px_rgba(18,63,45,0.20)]
                        transition-all duration-200
                        hover:-translate-y-0.5
                        hover:bg-[#18794E]
                        active:scale-95
                      "
                    >
                      <Camera size={15} />
                    </button>

                    <div
                      className="
                        absolute -left-1.5 -top-1.5
                        flex h-7 w-7 items-center justify-center
                        rounded-lg
                        border border-[var(--surface)]
                        bg-[#E3F2E9]
                        text-[#18794E]
                        shadow-[0_5px_14px_rgba(18,63,45,0.08)]
                      "
                    >
                      <Check size={13} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-xl font-bold tracking-tight text-[var(--foreground)]">
                        {displayName}
                      </h2>

                      <span
                        className="
                          inline-flex items-center gap-1.5
                          rounded-full
                          border border-[#35A873]/20
                          bg-[#E3F2E9]
                          px-2.5 py-1
                          text-[10px] font-bold uppercase tracking-[0.08em]
                          text-[#123F2D]
                        "
                      >
                        <CheckCircle2 size={12} />
                        Collector
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[var(--muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} />
                        <span className="max-w-[180px] truncate">
                          {location}
                        </span>
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Phone size={13} />
                        <span>{phoneNumber}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* status panel */}
                <div
                  className="
                    flex shrink-0 items-center gap-3
                    rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--surface-soft)]
                    px-4 py-3
                    sm:min-w-[175px]
                  "
                >
                  <div
                    className="
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-xl
                      bg-[#E3F2E9]
                      text-[#18794E]
                    "
                  >
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[var(--foreground)]">
                      Account active
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                      Ready for collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Two column desktop layout */}
          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:gap-6">
            {/* Account information */}
            <section
              className="
                overflow-hidden rounded-[28px]
                border border-[var(--border)]
                bg-[var(--surface)]
                shadow-[0_10px_32px_rgba(18,63,45,0.06)]
              "
            >
              <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#18794E]">
                  Personal details
                </p>
                <div className="mt-1 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[var(--foreground)]">
                      Account information
                    </h3>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      Your registered collector details
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <InfoRow
                  icon={UserRound}
                  label="Name"
                  value={displayName}
                />

                <Divider />

                <InfoRow
                  icon={Phone}
                  label="Mobile number"
                  value={phoneNumber}
                />

                <Divider />

                <InfoRow
                  icon={MapPin}
                  label="Operating location"
                  value={location}
                />

                <Divider />

                <InfoRow
                  icon={Languages}
                  label="Preferred language"
                  value={language}
                  capitalize
                />
              </div>
            </section>

            {/* Side cards */}
            <div className="space-y-5">
              {/* Verification */}
              <section
                className="
                  relative overflow-hidden rounded-[28px]
                  border border-[#35A873]/18
                  text-white
                  p-5
                  sm:p-6
                "
              >
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#35A873] blur-2xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4">

                    <div
                      className="
                        flex h-11 w-11 items-center justify-center
                        rounded-2xl
                        bg-[#50b286]
                        text-white
                        shadow-[0_8px_20px_rgba(18,63,45,0.15)]
                      "
                    >
                      <ShieldCheck size={20} />
                    </div>

                    <span
                      className="
                        rounded-full
                        border border-[#35A873]/20
                        bg-white/95
                        px-2.5 py-1
                        text-[10px] font-bold uppercase tracking-[0.1em]
                        text-[#18794E]
                      "
                    >
                      Active
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-[#a7f0d3]">
                    Profile status
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-white/70">
                    Your collector account is active and ready to
                    create lots, manage collections and record
                    handovers.
                  </p>

                  <div className="mt-4 space-y-2">
                    <StatusItem label="Account access" />
                    <StatusItem label="Collector access" />
                    <StatusItem label="Collection ready" />
                  </div>
                </div>
              </section>

              {/* Location context */}
              <section
                className="
                  rounded-[28px]
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  p-5
                  shadow-[0_10px_32px_rgba(18,63,45,0.06)]
                  sm:p-6
                "
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="
                      flex h-11 w-11 shrink-0 items-center justify-center
                      rounded-2xl
                      bg-[#EAF6F4]
                      text-[#278F8B]
                    "
                  >
                    <MapPin size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#278F8B]">
                      Collection area
                    </p>

                    <h3 className="mt-1 text-base font-bold text-[var(--foreground)]">
                      Operating location
                    </h3>

                    <p className="mt-1 truncate text-sm font-medium text-[var(--foreground)]">
                      {location}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-4 rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--surface-soft)]
                    px-4 py-3
                  "
                >
                  <p className="text-[11px] leading-5 text-[var(--muted)]">
                    Your location is used to surface nearby
                    authorized recyclers and relevant local pricing.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer note */}
          {/* <div className="flex items-center justify-center gap-2 px-2 pt-1 text-center">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <p className="shrink-0 text-[10px] leading-5 text-[var(--muted)] sm:text-xs">
              Profile editing and verification details will be
              available in a later update.
            </p>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div> */}
        </div>
      </div>
    </main>
  );
};

/* =============================================================
   INFO ROW
============================================================= */

const InfoRow = ({
  icon: Icon,
  label,
  value,
  capitalize = false,
}) => {
  return (
    <div
      className="
        group flex min-h-[74px] items-center gap-3.5
        px-5 py-3.5
        transition-colors duration-200
        hover:bg-[var(--surface-soft)]
        sm:px-6
      "
    >
      <div
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl
          border border-[var(--border)]
          bg-[var(--surface-soft)]
          text-[var(--muted)]
          transition-all duration-200
          group-hover:border-[#35A873]/20
          group-hover:text-[#18794E]
        "
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-[var(--muted)]">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-sm font-semibold text-[var(--foreground)] ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="
          hidden shrink-0 text-[var(--muted)]
          transition-transform duration-200
          group-hover:translate-x-0.5
          sm:block
        "
      />
    </div>
  );
};

/* =============================================================
   STATUS ITEM
============================================================= */

const StatusItem = ({ label }) => {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#50b286] text-white">
        <Check size={11} strokeWidth={3} />
      </span>

      <span className="text-xs font-semibold text-white/90">
        {label}
      </span>
    </div>
  );
};

/* =============================================================
   DIVIDER
============================================================= */

const Divider = () => (
  <div className="mx-5 border-t border-[var(--border)] sm:mx-6" />
);

export default CollectorProfile;
