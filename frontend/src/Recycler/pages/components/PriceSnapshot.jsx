import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../../i18n/useTranslation";

const trendIcons = {
  rising: ArrowUpRight,
  falling: ArrowDownRight,
  stable: ArrowRight,
};

const PriceSnapshot = ({ prices }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {t("dashboard.todaysPrices")}
        </h2>

       <button
            type="button"
            onClick={() =>
                navigate("/collector/prices")
            }
            className="
                flex items-center gap-1
                text-sm
                text-[var(--muted)]
                transition
                hover:text-[var(--foreground)]
            "
            >
            {t("common.viewAll")}
            <ArrowRight size={15} />
            </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {prices.map((item) => {
          const TrendIcon = trendIcons[item.trend];

          return (
            <div
              key={item.id}
              className="
                rounded-[24px]
                border border-[var(--border)]
                bg-[var(--surface)]
                p-4
                transition
                hover:-translate-y-0.5
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--muted)]">
                  {item.material}
                </span>

                <TrendIcon
                  size={17}
                  strokeWidth={1.8}
                  className="text-[var(--primary)]"
                />
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-tight">
                ₹{item.price}
              </p>

              <p className="mt-1 text-xs text-[var(--muted)]">
                {t("prices.perKg")}
              </p>

              <p className="mt-3 text-xs font-medium text-[var(--primary)]">
                {t(`prices.${item.trend}`)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PriceSnapshot;