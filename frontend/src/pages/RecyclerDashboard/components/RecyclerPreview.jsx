import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";

import useTranslation from "../../../i18n/useTranslation";

const RecyclerPreview = ({ recyclers }) => {
  const { t } = useTranslation();

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {t("dashboard.nearbyRecyclers")}
        </h2>

        <button
          type="button"
          className="flex items-center gap-1 text-sm text-[var(--muted)]"
        >
          {t("common.viewAll")}
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="space-y-3">
        {recyclers.map((recycler) => (
          <div
            key={recycler.id}
            className="
              rounded-[26px]
              border border-[var(--border)]
              bg-[var(--surface)]
              p-4
              transition
              hover:-translate-y-0.5
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-2xl
                  bg-[var(--accent)]
                  text-[var(--primary)]
                  font-semibold
                "
              >
                {recycler.name.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate font-medium">
                    {recycler.name}
                  </h3>

                  {recycler.verified && (
                    <ShieldCheck
                      size={16}
                      className="shrink-0 text-[var(--primary)]"
                    />
                  )}
                </div>

                <div className="mt-1 flex items-center gap-3 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {recycler.distance}
                  </span>

                  <span>★ {recycler.rating}</span>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="shrink-0 text-[var(--muted)]"
              />
            </div>

            {recycler.pickup && (
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                <Truck size={14} />
                {t("dashboard.pickupAvailable")}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecyclerPreview;