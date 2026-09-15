import { ArrowLeft, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useTranslation from "../../i18n/useTranslation";

import {
  getPrices,
  getPriceHistory,
} from "../../services/prices/priceApi";

import PriceCard from "./components/PriceCard";
import PriceHistory from "./components/PriceHistory";

const PriceBoard = () => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const { t } = useTranslation();

  const [prices, setPrices] = useState([]);
  const [history, setHistory] = useState([]);

  const [selectedMaterial, setSelectedMaterial] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const location =
    user?.operatingLocation || "Meerut";

  useEffect(() => {
    const loadPrices = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getPrices({
          location,
        });

        const priceData = result.data || [];

        setPrices(priceData);

        if (priceData.length) {
          setSelectedMaterial(
            priceData[0].material
          );
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, [location]);

  useEffect(() => {
    if (!selectedMaterial) {
      return;
    }

    const loadHistory = async () => {
      try {
        const result =
          await getPriceHistory({
            location,
            material: selectedMaterial,
            limit: 30,
          });

        setHistory(result.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadHistory();
  }, [selectedMaterial, location]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main
        className="
          mx-auto
          w-full
          max-w-5xl
          px-4
          pb-10
          pt-5
          sm:px-6
          lg:px-8
        "
      >
        {/* Header */}

        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              navigate("/collector")
            }
            className="
              flex h-11 w-11
              shrink-0
              items-center justify-center
              rounded-full
              border border-[var(--border)]
              bg-[var(--surface)]
              transition
              active:scale-95
            "
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-xl font-semibold">
              {t("priceBoard.title")}
            </h1>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <MapPin size={13} />

              <span>
                {t("priceBoard.localMarket")} ·{" "}
                {location}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}

        <div className="mt-7">
          {loading && (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      h-52
                      animate-pulse
                      rounded-[26px]
                      bg-[var(--surface-soft)]
                    "
                  />
                )
              )}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="font-medium">
                {t("priceBoard.failed")}
              </p>

              <p className="mt-2 text-sm text-[var(--muted)]">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="
                  mt-5
                  rounded-2xl
                  bg-[var(--primary)]
                  px-4 py-3
                  text-sm
                  font-medium
                  text-[var(--primary-foreground)]
                "
              >
                {t("priceBoard.retry")}
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            prices.length === 0 && (
              <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface)] p-6">
                <p className="text-sm text-[var(--muted)]">
                  {t("priceBoard.noData")}
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            prices.length > 0 && (
              <>
                <section>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {prices.map((price) => (
                      <button
                        key={price.id}
                        type="button"
                        onClick={() =>
                          setSelectedMaterial(
                            price.material
                          )
                        }
                        className="text-left"
                      >
                        <PriceCard
                          price={price}
                        />
                      </button>
                    ))}
                  </div>
                </section>

                <div className="mt-7">
                  <PriceHistory
                    history={history}
                    material={
                      selectedMaterial
                    }
                  />
                </div>
              </>
            )}
        </div>
      </main>
    </div>
  );
};

export default PriceBoard;