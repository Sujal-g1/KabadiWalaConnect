import {
  ArrowLeft,
  MapPin,
  RefreshCw,
  Volume2,
  TrendingDown,
  TrendingUp,
  Database,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

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

  /* ==========================================================
     STATE
  ========================================================== */

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

  /* ==========================================================
     LOAD PRICES
  ========================================================== */

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

  /* ==========================================================
     LOAD WHEN FILTER / LOCATION CHANGES
  ========================================================== */

  useEffect(() => {
    loadPrices();
  }, [
    location,
    filterMaterial,
  ]);

  /* ==========================================================
     LOAD HISTORY
  ========================================================== */

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

  /* ==========================================================
     LOCAL SEARCH
  ========================================================== */

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

  /* ==========================================================
     SUMMARY
  ========================================================== */

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
        materials:
          new Set(
            prices.map(
              (item) =>
                item.material
            )
          ).size,

        average,

        rising:
          prices.filter(
            (item) =>
              item.trend ===
              "rising"
          ).length,

        falling:
          prices.filter(
            (item) =>
              item.trend ===
              "falling"
          ).length,
      };
    }, [prices]);

  /* ==========================================================
     SPEAK PRICE
  ========================================================== */

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

  /* ==========================================================
     SELECTED PRICE
  ========================================================== */

  const selectedIndex =
    selectedPrice
      ? visiblePrices.findIndex(
          (price) =>
            price.material ===
              selectedPrice.material &&
            price.subcategory ===
              selectedPrice.subcategory
        )
      : -1;

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
          pb-32
          pt-4
          sm:px-6
          sm:pt-6
          lg:px-8
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <motion.button
              type="button"
              onClick={() =>
                navigate(
                  "/collector"
                )
              }
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                shadow-sm
                transition
                hover:border-[var(--primary)]/30
              "
            >
              <ArrowLeft
                size={18}
              />
            </motion.button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1
                  className="
                    truncate
                    text-xl
                    font-extrabold
                    tracking-tight
                    sm:text-2xl
                  "
                >
                  {t(
                    "priceBoard.title"
                  )}
                </h1>

                <Sparkles
                  size={14}
                  className="
                    hidden
                    shrink-0
                    text-[var(--primary)]
                    sm:block
                  "
                />
              </div>

              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-1.5
                  text-[11px]
                  text-[var(--muted)]
                "
              >
                <MapPin size={12} />

                <span className="truncate">
                  {t(
                    "priceBoard.localMarket"
                  )}
                  {" · "}
                  {location}
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
              scale: 0.92,
            }}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--muted)]
              shadow-sm
              transition
              hover:text-[var(--primary)]
            "
            aria-label="Refresh prices"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />
          </motion.button>
        </header>

        {/* ==================================================
            MARKET HERO
        ================================================== */}

        {!loading &&
          !error &&
          prices.length > 0 && (
            <motion.section
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-6
                overflow-hidden
                rounded-[28px]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                shadow-sm
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  p-5
                  sm:p-6
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-[var(--accent)]
                    opacity-60
                    blur-3xl
                  "
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-[var(--primary)]
                      "
                    >
                      <Database size={13} />

                      Local market
                    </div>

                    <h2
                      className="
                        mt-2
                        text-lg
                        font-extrabold
                        tracking-tight
                        sm:text-xl
                      "
                    >
                      Today's reference prices
                    </h2>

                    <p
                      className="
                        mt-1
                        max-w-md
                        text-xs
                        leading-5
                        text-[var(--muted)]
                      "
                    >
                      Current market records for{" "}
                      <span className="font-semibold text-[var(--foreground)]">
                        {location}
                      </span>
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[var(--accent)]
                      text-[var(--primary)]
                    "
                  >
                    <Database size={18} />
                  </div>
                </div>

                {/* SUMMARY */}

                <div
                  className="
                    relative
                    mt-6
                    grid
                    grid-cols-2
                    gap-2
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
                    label="Average"
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
                      <TrendingUp size={13} />
                    }
                    positive
                  />

                  <SummaryItem
                    label="Falling"
                    value={
                      summary.falling
                    }
                    icon={
                      <TrendingDown size={13} />
                    }
                    negative
                  />
                </div>
              </div>
            </motion.section>
          )}

        {/* ==================================================
            FILTERS
        ================================================== */}

        <section className="mt-7">
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
        </section>

        {/* ==================================================
            ERROR
        ================================================== */}

        <AnimatePresence>
          {!loading && error && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-6
                rounded-[24px]
                border
                border-[var(--danger)]/20
                bg-[var(--surface)]
                p-5
              "
            >
              <p className="font-semibold">
                {t(
                  "priceBoard.failed"
                )}
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  leading-5
                  text-[var(--muted)]
                "
              >
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  loadPrices()
                }
                className="
                  mt-4
                  rounded-xl
                  bg-[var(--primary)]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[var(--primary-foreground)]
                "
              >
                {t(
                  "priceBoard.retry"
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (
          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[
              1,
              2,
              3,
              4,
              5,
              6,
            ].map((item) => (
              <div
                key={item}
                className="
                  h-60
                  animate-pulse
                  rounded-[24px]
                  bg-[var(--surface-soft)]
                "
              />
            ))}
          </div>
        )}

        {/* ==================================================
            EMPTY
        ================================================== */}

        {!loading &&
          !error &&
          visiblePrices.length ===
            0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-7
                rounded-[26px]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-6
                py-12
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
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

              <h3 className="mt-4 font-bold">
                No price available
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-sm
                  text-sm
                  leading-5
                  text-[var(--muted)]
                "
              >
                No matching market records were found
                for {location}.
              </p>
            </motion.div>
          )}

        {/* ==================================================
            CURRENT PRICES
        ================================================== */}

        {!loading &&
          !error &&
          visiblePrices.length >
            0 && (
            <section className="mt-8">
              <div
                className="
                  mb-4
                  flex
                  items-end
                  justify-between
                  gap-3
                "
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h2
                      className="
                        text-base
                        font-extrabold
                        tracking-tight
                      "
                    >
                      Current prices
                    </h2>

                    <span
                      className="
                        rounded-full
                        bg-[var(--accent)]
                        px-2
                        py-1
                        text-[9px]
                        font-bold
                        text-[var(--primary)]
                      "
                    >
                      LIVE DATA
                    </span>
                  </div>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-[var(--muted)]
                    "
                  >
                    Tap a material to view its price history.
                  </p>
                </div>

                <span
                  className="
                    shrink-0
                    text-[11px]
                    font-semibold
                    text-[var(--muted)]
                  "
                >
                  {visiblePrices.length} results
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
                  (price, index) => {
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
                      <motion.button
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
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay:
                            Math.min(
                              index *
                                0.04,
                              0.25
                            ),
                        }}
                        whileTap={{
                          scale: 0.99,
                        }}
                        className="w-full text-left"
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
                      </motion.button>
                    );
                  }
                )}
              </div>
            </section>
          )}

        {/* ==================================================
            SELECTED PRICE / HISTORY
        ================================================== */}

        {!loading &&
          !error &&
          selectedPrice && (
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-[var(--primary)]
                    "
                  >
                    Price trend
                  </p>

                  <h2
                    className="
                      mt-1
                      text-base
                      font-extrabold
                    "
                  >
                    {selectedPrice.material}
                  </h2>
                </div>

                {selectedIndex >=
                  0 && (
                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      text-xs
                      font-semibold
                      text-[var(--muted)]
                    "
                  >
                    View details
                    <ChevronRight
                      size={14}
                    />
                  </div>
                )}
              </div>

              {historyLoading ? (
                <div
                  className="
                    h-[460px]
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

        {/* ==================================================
            VOICE SUPPORT
        ================================================== */}

        {!loading &&
          !error &&
          prices.length > 0 && (
            <div
              className="
                mt-6
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-4
                py-3.5
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
                  bg-[var(--accent)]
                  text-[var(--primary)]
                "
              >
                <Volume2 size={16} />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  Voice price support
                </p>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    leading-5
                    text-[var(--muted)]
                  "
                >
                  Use the speaker control on a price card
                  to hear the current reference price.
                </p>
              </div>
            </div>
          )}

        {/* ==================================================
            DISCLAIMER
        ================================================== */}

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-center
            text-[10px]
            leading-4
            text-[var(--muted)]
          "
        >
          Reference prices are based on available market
          records. Actual recycler offers may vary depending
          on material quality, quantity, location and
          condition.
        </p>
      </main>
    </div>
  );
};

/* ============================================================
   SUMMARY ITEM
============================================================ */

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
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--background)]
        px-3
        py-3
        sm:px-4
      "
    >
      <p
        className="
          text-[9px]
          font-semibold
          uppercase
          tracking-wider
          text-[var(--muted)]
        "
      >
        {label}
      </p>

      <div
        className={`
          mt-1
          flex
          items-center
          gap-1
          text-sm
          font-extrabold

          ${
            positive
              ? "text-[var(--primary)]"
              : negative
                ? "text-[var(--danger)]"
                : "text-[var(--foreground)]"
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