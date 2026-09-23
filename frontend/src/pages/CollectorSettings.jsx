import {
  ArrowLeft,
  ChevronRight,
  Info,
  LogOut,
  Palette,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import ThemeSelector from "../components/ThemeSelector";
import LanguageSelector from "../components/LanguageSelector";
import useTranslation from "../i18n/useTranslation";

import useAuthStore from "../store/authStore";

const CollectorSettings = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAuthStore(
    (state) => state.user
  );

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  const handleLogout = () => {
    clearUser();
    navigate("/", {
      replace: true,
    });
  };

  const displayName =
    user?.firstName || user?.name || "Collector";

  const phoneNumber =
    user?.phoneNumber || user?.phone || "";

  return (
    <main className="w-full">
      <div
        className="
          mx-auto
          w-full
          max-w-3xl
          px-4
          py-5
          pb-32
          sm:px-6
          sm:py-8
        "
      >

        {/* Header */}
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              navigate("/collector")
            }
            aria-label="Back to dashboard"
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--foreground)]
              transition
              hover:bg-[var(--surface-soft)]
              active:scale-95
            "
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="text-xs text-[var(--muted)]">
              Account
            </p>

            <h1 className="text-xl font-bold tracking-tight">
              {t("navigation.settings")}
            </h1>
          </div>
        </header>

        {/* Profile */}
        <section className="mt-7">
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
            "
          >
            <div className="flex items-center gap-4 p-5">

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--accent)]
                  text-lg
                  font-bold
                  text-[var(--primary)]
                "
              >
                {displayName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold">
                  {displayName}
                </p>

                {phoneNumber ? (
                  <p className="mt-1 truncate text-sm text-[var(--muted)]">
                    {phoneNumber}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Collector account
                  </p>
                )}
              </div>

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--surface-soft)]
                  text-[var(--muted)]
                "
              >
                <UserRound size={17} />
              </div>

            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="mt-8">
          <SectionLabel
            icon={Palette}
            label="Appearance"
          />

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
            "
          >
            <div className="p-4">
              <ThemeSelector />
            </div>
          </div>
        </section>

        {/* Language */}
        <section className="mt-6">
          <SectionLabel
            icon={Info}
            label="Language"
          />

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
            "
          >
            <div className="p-4">
              <LanguageSelector />
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="mt-8">
          <SectionLabel
            icon={UserRound}
            label="Account"
          />

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
            "
          >
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/collector/profile"
                )
              }
              className="
                flex
                min-h-16
                w-full
                items-center
                gap-3
                px-5
                text-left
                transition
                hover:bg-[var(--surface-soft)]
                active:bg-[var(--surface-soft)]
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--surface-soft)]
                  text-[var(--muted)]
                "
              >
                <UserRound size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  Profile
                </p>

                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  View and manage your profile
                </p>
              </div>

              <ChevronRight
                size={18}
                className="shrink-0 text-[var(--muted)]"
              />
            </button>
          </div>
        </section>

        {/* Logout */}
        <section className="mt-8">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              min-h-14
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-[var(--danger)]/20
              bg-[var(--danger)]/5
              px-5
              text-sm
              font-semibold
              text-[var(--danger)]
              transition
              hover:bg-[var(--danger)]/10
              active:scale-[0.99]
            "
          >
            <LogOut size={18} />
            Log out
          </button>
        </section>

        {/* App information */}
        <section className="mt-8">
          <div
            className="
              flex
              items-center
              justify-between
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-5
              py-4
            "
          >
            <div>
              <p className="text-sm font-semibold">
                Kabadiwala Connect
              </p>

              <p className="mt-1 text-xs text-[var(--muted)]">
                E-Waste collection platform
              </p>
            </div>

            <span
              className="
                rounded-lg
                bg-[var(--surface-soft)]
                px-2.5
                py-1
                text-[10px]
                font-medium
                text-[var(--muted)]
              "
            >
              v1.0
            </span>
          </div>
        </section>

      </div>
    </main>
  );
};

const SectionLabel = ({
  icon: Icon,
  label,
}) => {
  return (
    <div className="mb-3 flex items-center gap-2 px-1">
      <Icon
        size={15}
        className="text-[var(--primary)]"
      />

      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
};

export default CollectorSettings;