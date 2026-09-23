import {
  ArrowLeft,
  MapPin,
  RefreshCw,
  Volume2,
  TrendingDown,
  TrendingUp,
  Minus,
  Database,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useTranslation from "../../i18n/useTranslation";

import {
  getPrices,
  getPriceHistory,
} from "../../services/prices/priceApi";

import PriceCard from "./components/PriceCard";
import PriceHistory from "./components/PriceHistory";
import PriceFilters from "./components/PriceFilters";

const PriceBoard = () => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const { t } = useTranslation();

  const [prices, setPrices] =
    useState([]);

  const [history, setHistory] =
    useState([]);

  const [selectedPrice, setSelectedPrice] =
    useState(null);

  const [filterMaterial, setFilterMaterial] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [historyLoading, setHistoryLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const location =
    user?.operatingLocation ||
    "Meerut";

  /*
    Load current prices.
  */
  const loadPrices = async (
    refresh = false
  ) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const result =
        await getPrices({
          location,
          material:
            filterMaterial ||
            undefined,
        });

      const priceData =
        result?.data || [];

      setPrices(priceData);

      /*
        Preserve selected card if possible.
      */
      if (priceData.length) {
        setSelectedPrice(
          (current) => {
            if (!current) {
              return priceData[0];
            }

            const same =
              priceData.find(
                (item) =>
                  item.material ===
                    current.material &&
                  item.subcategory ===
                    current.subcategory
              );

            return (
              same ||
              priceData[0]
            );
          }
        );
      } else {
        setSelectedPrice(null);
      }
    } catch (err) {
      console.error(
        "Price loading error:",
        err
      );

      setError(
        err.message ||
          "Failed to load prices"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /*
    Load prices when location/filter changes.
  */
  useEffect(() => {
    loadPrices();
  }, [
    location,
    filterMaterial,
  ]);

  /*
    Load history for selected
    material + subcategory.
  */
  useEffect(() => {
    if (!selectedPrice) {
      setHistory([]);
      return;
    }

    const loadHistory =
      async () => {
        try {
          setHistoryLoading(true);

          const result =
            await getPriceHistory({
              location,
              material:
                selectedPrice.material,
              subcategory:
                selectedPrice.subcategory,
              limit: 90,
            });

          setHistory(
            result?.data || []
          );
        } catch (err) {
          console.error(
            "History loading error:",
            err
          );

          setHistory([]);
        } finally {
          setHistoryLoading(false);
        }
      };

    loadHistory();
  }, [
    selectedPrice,
    location,
  ]);

  /*
    Search filtering happens locally.
  */
  const visiblePrices =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return prices;
      }

      return prices.filter(
        (price) =>
          price.material
            ?.toLowerCase()
            .includes(query) ||
          price.subcategory
            ?.toLowerCase()
            .includes(query)
      );
    }, [prices, search]);

  /*
    Market summary.
  */
  const summary =
    useMemo(() => {
      if (!prices.length) {
        return {
          materials: 0,
          average: 0,
          rising: 0,
          falling: 0,
        };
      }

      const average =
        prices.reduce(
          (sum, item) =>
            sum +
            Number(
              item.price || 0
            ),
          0
        ) / prices.length;

      return {
        materials: new Set(
          prices.map(
            (item) =>
              item.material
          )
        ).size,

        average,

        rising: prices.filter(
          (item) =>
            item.trend === "rising"
        ).length,

        falling: prices.filter(
          (item) =>
            item.trend === "falling"
        ).length,
      };
    }, [prices]);

  const speakPrice = (
    price
  ) => {
    if (
      !window.speechSynthesis
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const text =
      `${price.material}, ` +
      `${price.subcategory || ""}. ` +
      `Current reference price is ` +
      `${Math.round(
        price.price
      )} rupees per kilogram. ` +
      `Market range is ` +
      `${Math.round(
        price.minPrice
      )} to ` +
      `${Math.round(
        price.maxPrice
      )} rupees per kilogram.`;

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.lang = "en-IN";
    utterance.rate = 0.9;

    window.speechSynthesis.speak(
      utterance
    );
  };

  return (
    <div
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <main
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          pb-10
          pt-5
          sm:px-6
          lg:px-8
        "
      >
        {/* Header */}
        <header
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/collector"
                )
              }
              className="
                flex h-11 w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border border-[var(--border)]
                bg-[var(--surface)]
                transition
                active:scale-95
              "
            >
              <ArrowLeft
                size={19}
              />
            </button>

            <div>
              <h1 className="text-xl font-semibold sm:text-2xl">
                {t(
                  "priceBoard.title"
                )}
              </h1>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                <MapPin
                  size={13}
                />

                <span>
                  {t(
                    "priceBoard.localMarket"
                  )}{" "}
                  · {location}
                </span>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() =>
              loadPrices(true)
            }
            whileTap={{
              scale: 0.94,
            }}
            className="
              flex h-11 w-11
              items-center
              justify-center
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--muted)]
              transition
              hover:text-[var(--primary)]
            "
          >
            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
          </motion.button>
        </header>

        {/* Market overview */}
        {!loading &&
          !error &&
          prices.length > 0 && (
            <section
              className="
                mt-6
                overflow-hidden
                rounded-[26px]
                border border-[var(--border)]
                bg-[var(--surface)]
              "
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                      Local market
                    </p>

                    <h2 className="mt-1 text-lg font-semibold">
                      Today's reference prices
                    </h2>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Updated from available
                      market records
                    </p>
                  </div>

                  <div
                    className="
                      flex h-11 w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[var(--accent)]
                      text-[var(--primary)]
                    "
                  >
                    <Database
                      size={19}
                    />
                  </div>
                </div>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  border-t
                  border-[var(--border)]
                  sm:grid-cols-4
                "
              >
                <SummaryItem
                  label="Materials"
                  value={
                    summary.materials
                  }
                />

                <SummaryItem
                  label="Avg. price"
                  value={`₹${Math.round(
                    summary.average
                  )}`}
                />

                <SummaryItem
                  label="Rising"
                  value={
                    summary.rising
                  }
                  icon={
                    <TrendingUp
                      size={14}
                    />
                  }
                  positive
                />

                <SummaryItem
                  label="Falling"
                  value={
                    summary.falling
                  }
                  icon={
                    <TrendingDown
                      size={14}
                    />
                  }
                  negative
                />
              </div>
            </section>
          )}

        {/* Filters */}
        <div className="mt-6">
          <PriceFilters
            search={search}
            setSearch={setSearch}
            selectedMaterial={
              filterMaterial
            }
            setSelectedMaterial={
              setFilterMaterial
            }
          />
        </div>

        {/* Error */}
        {!loading && error && (
          <div
            className="
              mt-6
              rounded-[26px]
              border border-danger/20
              bg-[var(--surface)]
              p-6
            "
          >
            <p className="font-medium">
              {t(
                "priceBoard.failed"
              )}
            </p>

            <p className="mt-2 text-sm text-[var(--muted)]">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                loadPrices()
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
              {t(
                "priceBoard.retry"
              )}
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="
                    h-56
                    animate-pulse
                    rounded-[26px]
                    bg-[var(--surface-soft)]
                  "
                />
              )
            )}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          visiblePrices.length ===
            0 && (
            <div
              className="
                mt-6
                rounded-[26px]
                border border-[var(--border)]
                bg-[var(--surface)]
                px-6 py-12
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex h-14 w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--accent)]
                  text-xl
                  text-[var(--primary)]
                "
              >
                ₹
              </div>

              <h3 className="mt-4 font-semibold">
                No price available
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--muted)]">
                No matching market
                records were found
                for {location}.
              </p>
            </div>
          )}

        {/* Price cards */}
        {!loading &&
          !error &&
          visiblePrices.length >
            0 && (
            <section className="mt-7">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <h2 className="font-semibold">
                    Current prices
                  </h2>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Tap a price to view
                    its history
                  </p>
                </div>

                <span className="text-xs text-[var(--muted)]">
                  {visiblePrices.length}{" "}
                  results
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {visiblePrices.map(
                  (price) => {
                    const selected =
                      selectedPrice?.id ===
                        price.id ||
                      (
                        selectedPrice
                          ?.material ===
                          price.material &&
                        selectedPrice
                          ?.subcategory ===
                          price.subcategory
                      );

                    return (
                      <button
                        key={
                          price.id ||
                          `${price.material}-${price.subcategory}`
                        }
                        type="button"
                        onClick={() =>
                          setSelectedPrice(
                            price
                          )
                        }
                        className="text-left"
                      >
                        <PriceCard
                          price={price}
                          selected={
                            selected
                          }
                          onSpeak={
                            speakPrice
                          }
                        />
                      </button>
                    );
                  }
                )}
              </div>
            </section>
          )}

        {/* Selected material */}
        {!loading &&
          !error &&
          selectedPrice && (
            <section className="mt-7">
              {historyLoading ? (
                <div
                  className="
                    h-[520px]
                    animate-pulse
                    rounded-[26px]
                    bg-[var(--surface-soft)]
                  "
                />
              ) : (
                <PriceHistory
                  history={history}
                  material={
                    selectedPrice.material
                  }
                  subcategory={
                    selectedPrice.subcategory
                  }
                />
              )}
            </section>
          )}

        {/* Voice hint */}
        {!loading &&
          !error &&
          prices.length > 0 && (
            <div
              className="
                mt-5
                flex
                items-center
                gap-3
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                px-4 py-3
              "
            >
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--accent)]
                  text-[var(--primary)]
                "
              >
                <Volume2
                  size={16}
                />
              </div>

              <p className="text-xs leading-5 text-[var(--muted)]">
                Tap the speaker icon on
                any price card to hear
                the current reference
                price.
              </p>
            </div>
          )}

        {/* Disclaimer */}
        <p className="mt-5 text-center text-[10px] leading-4 text-[var(--muted)]">
          Reference prices are based
          on available market records.
          Actual recycler offers may
          vary depending on material
          quality, quantity, location,
          and condition.
        </p>
      </main>
    </div>
  );
};

const SummaryItem = ({
  label,
  value,
  icon,
  positive,
  negative,
}) => {
  return (
    <div
      className="
        border-r
        border-[var(--border)]
        p-4
        last:border-r-0
      "
    >
      <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>

      <div
        className={`
          mt-1
          flex items-center gap-1
          text-sm font-semibold
          ${
            positive
              ? "text-success"
              : negative
              ? "text-danger"
              : ""
          }
        `}
      >
        {icon}
        {value}
      </div>
    </div>
  );
};

export default PriceBoard;