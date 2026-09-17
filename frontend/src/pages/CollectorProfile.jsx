import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";
import useTranslation from "../i18n/useTranslation";

const CollectorProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAuthStore(
    (state) => state.user
  );

  const displayName =
    user?.firstName || user?.name || "Collector";

  const phoneNumber =
    user?.phoneNumber || user?.phone || "Not available";

  const language =
    user?.preferredLanguage || "Hindi";

  const location =
    user?.operatingLocation || "Location not set";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
              navigate("/collector/settings")
            }
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
              transition
              hover:bg-[var(--surface-soft)]
              active:scale-95
            "
            aria-label="Back"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="text-xs text-[var(--muted)]">
              Account
            </p>

            <h1 className="text-xl font-bold tracking-tight">
              Profile
            </h1>
          </div>
        </header>

        {/* Profile Hero */}
        <section className="mt-7">
          <div
            className="
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-6
            "
          >
            <div className="flex flex-col items-center">

              {/* Avatar */}
              <div className="relative">
                <div
                  className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-[30px]
                    bg-[var(--accent)]
                    text-2xl
                    font-bold
                    text-[var(--primary)]
                  "
                >
                  {initials || "C"}
                </div>

                <button
                  type="button"
                  className="
                    absolute
                    -bottom-1
                    -right-1
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border-2
                    border-[var(--surface)]
                    bg-[var(--primary)]
                    text-[var(--primary-foreground)]
                    shadow-sm
                  "
                  aria-label="Change profile photo"
                >
                  <Camera size={16} />
                </button>
              </div>

              {/* Name */}
              <h2 className="mt-4 text-lg font-bold">
                {displayName}
              </h2>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-[var(--accent)]
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-[var(--primary)]
                "
              >
                <CheckCircle2 size={13} />
                Collector
              </div>
            </div>
          </div>
        </section>

        {/* Account Information */}
        <section className="mt-7">
          <SectionTitle>
            Account Information
          </SectionTitle>

          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
            "
          >
            <InfoRow
              icon={UserRound}
              label="Name"
              value={displayName}
            />

            <Divider />

            <InfoRow
              icon={Phone}
              label="Mobile Number"
              value={phoneNumber}
            />

            <Divider />

            <InfoRow
              icon={MapPin}
              label="Operating Location"
              value={location}
            />

            <Divider />

            <InfoRow
              icon={UserRound}
              label="Preferred Language"
              value={language}
              capitalize
            />
          </div>
        </section>

        {/* Profile Status */}
        <section className="mt-7">
          <SectionTitle>
            Profile Status
          </SectionTitle>

          <div
            className="
              flex
              items-start
              gap-3
              rounded-3xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-5
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--accent)]
                text-[var(--primary)]
              "
            >
              <CheckCircle2 size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Account active
              </p>

              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                Your collector account is ready to
                create lots and manage e-waste
                collections.
              </p>
            </div>
          </div>
        </section>

        {/* Note */}
        <p
          className="
            mt-6
            px-2
            text-center
            text-xs
            leading-5
            text-[var(--muted)]
          "
        >
          Profile editing and verification details
          will be available in a later update.
        </p>
      </div>
    </main>
  );
};

const SectionTitle = ({ children }) => {
  return (
    <p
      className="
        mb-3
        px-1
        text-xs
        font-semibold
        uppercase
        tracking-wide
        text-[var(--muted)]
      "
    >
      {children}
    </p>
  );
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
  capitalize = false,
}) => {
  return (
    <div
      className="
        flex
        min-h-16
        items-center
        gap-3
        px-5
        py-3
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
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-[var(--muted)]">
          {label}
        </p>

        <p
          className={`mt-0.5 truncate text-sm font-medium ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="mx-5 border-t border-[var(--border)]" />
);

export default CollectorProfile;