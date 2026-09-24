import {
  ArrowLeft,
  ChevronRight,
  Database,
  MapPin,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Volume2,
  Sparkles,
  Clock3,
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

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const location =
    user?.operatingLocation ||
    "Meerut";

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
      setLastUpdated(
        new Date()
      );

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

  useEffect(() => {
    loadPrices();
  }, [
    location,
    filterMaterial,
  ]);

  useEffect(() => {
    if (!selectedPrice) {
      setHistory([]);
      return;
    }

    const loadHistory = async () => {
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

        const nextHistory =
          result?.data || [];

        setHistory(
          nextHistory
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

  const visiblePrices =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

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

  const groupedPrices =
    useMemo(() => {
      const groups = {};

      visiblePrices.forEach(
        (price) => {
          if (!groups[price.material]) {
            groups[price.material] = [];
          }

          groups[price.material].push(
            price
          );
        }
      );

      return Object.entries(groups);
    }, [visiblePrices]);

  const summary =
    useMemo(() => {
      if (!prices.length) {
        return {
          materials: 0,
          average: 0,
          rising: 0,
          falling: 0,
          liveCount: 0,
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

        liveCount:
          prices.filter(
            (item) =>
              item.isToday
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

  const handleSelectPrice = (
    price
  ) => {
    setSelectedPrice(
      price
    );

    requestAnimationFrame(() => {
      document
        .getElementById(
          "price-trend"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
          block: "start",
        });
    });
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
          max-w-7xl
          px-4
          pb-32
          pt-4
          sm:px-6
          sm:pt-6
          lg:px-8
        "
      >
        {/* HEADER */}
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
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl
                border border-[var(--border)]
                bg-[var(--surface)]
                shadow-sm
                transition
                hover:border-[var(--primary)]/30
              "
            >
              <ArrowLeft size={18} />
            </motion.button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1
                  className="
                    truncate text-xl font-extrabold tracking-tight
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
                    hidden shrink-0 text-[#18794E]
                    sm:block
                  "
                />
              </div>

              <div
                className="
                  mt-1 flex items-center gap-1.5
                  text-[11px] text-[var(--muted)]
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
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl
              border border-[var(--border)]
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

        {/* LIVE MARKET HERO */}
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
                relative mt-6 overflow-hidden rounded-[30px]
                border border-white/10
                bg-[linear-gradient(135deg,#06150F_0%,#0A291B_42%,#12613F_72%,#147B55_100%)]
                p-5 text-white
                shadow-[0_24px_60px_rgba(9,42,27,0.24)]
                sm:p-7
              "
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#35A873]/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#278F8B]/15 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#DDF7E8] backdrop-blur-md">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#65D39A]" />
                        Live market model
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 text-[9px] font-semibold text-white/60">
                        India · {location}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                      Today's e-waste market
                    </h2>

                    <p className="mt-1.5 max-w-xl text-xs leading-5 text-white/60 sm:text-sm">
                      Current modeled rates update from today's
                      market signal and a small intraday pulse.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                      <Clock3 size={12} />
                      Last calculated
                    </div>

                    <p className="mt-1 text-sm font-bold text-white">
                      {lastUpdated
                        ? lastUpdated.toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "--:--"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <HeroStat
                    label="Materials"
                    value={
                      summary.materials
                    }
                  />

                  <HeroStat
                    label="Live rates"
                    value={
                      summary.liveCount
                    }
                  />

                  <HeroStat
                    label="Rising"
                    value={
                      summary.rising
                    }
                    icon={
                      <TrendingUp size={13} />
                    }
                  />

                  <HeroStat
                    label="Falling"
                    value={
                      summary.falling
                    }
                    icon={
                      <TrendingDown size={13} />
                    }
                  />
                </div>
              </div>
            </motion.section>
          )}

        {/* FILTERS */}
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

        {/* ERROR */}
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
                mt-6 rounded-[24px]
                border border-[var(--danger)]/20
                bg-[var(--surface)]
                p-5
              "
            >
              <p className="font-semibold">
                {t(
                  "priceBoard.failed"
                )}
              </p>

              <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  loadPrices()
                }
                className="
                  mt-4 rounded-xl bg-[var(--primary)]
                  px-4 py-2.5 text-sm font-semibold
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

        {/* LOADING */}
        {loading && (
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="
                    h-64 animate-pulse rounded-[24px]
                    bg-[var(--surface-soft)]
                  "
                />
              )
            )}
          </div>
        )}

        {/* EMPTY */}
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
                mt-7 rounded-[26px]
                border border-[var(--border)]
                bg-[var(--surface)]
                px-6 py-12 text-center
              "
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-xl text-[var(--primary)]">
                ₹
              </div>

              <h3 className="mt-4 font-bold">
                No price available
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-[var(--muted)]">
                No matching current market records
                were found for {location}.
              </p>
            </motion.div>
          )}

        {/* CURRENT MARKET */}
        {!loading &&
          !error &&
          visiblePrices.length > 0 && (
            <section className="mt-8">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold tracking-tight">
                      Current market
                    </h2>

                    <span className="inline-flex items-center gap-1 rounded-full bg-[#123F2D] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#DDF7E8]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#65D39A]" />
                      Today
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Current prices are grouped by material.
                    Select a subcategory for the trend graph.
                  </p>
                </div>

                <span className="shrink-0 text-[11px] font-semibold text-[var(--muted)]">
                  {visiblePrices.length} rates
                </span>
              </div>

              <div className="space-y-6">
                {groupedPrices.map(
                  ([material, items]) => (
                    <div key={material}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#18794E]" />
                          <h3 className="text-sm font-bold text-[var(--foreground)]">
                            {material}
                          </h3>
                        </div>

                        <span className="text-[10px] font-semibold text-[var(--muted)]">
                          {items.length} grades
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map(
                          (price, index) => {
                            const selected =
                              selectedPrice?.material ===
                                price.material &&
                              selectedPrice?.subcategory ===
                                price.subcategory;

                            return (
                              <motion.button
                                key={
                                  price.id ||
                                  `${price.material}-${price.subcategory}`
                                }
                                type="button"
                                onClick={() =>
                                  handleSelectPrice(
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
                                  delay: Math.min(
                                    index * 0.03,
                                    0.2
                                  ),
                                }}
                                whileTap={{
                                  scale: 0.99,
                                }}
                                className="w-full text-left"
                              >
                                <PriceCard
                                  price={
                                    price
                                  }
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
                    </div>
                  )
                )}
              </div>
            </section>
          )}

        {/* SELECTED TREND */}
        {!loading &&
          !error &&
          selectedPrice && (
            <section
              id="price-trend"
              className="mt-10 scroll-mt-5"
            >
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#18794E]">
                    Live price analytics
                  </p>

                  <h2 className="mt-1 text-lg font-extrabold tracking-tight">
                    {selectedPrice.subcategory}
                  </h2>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    Dynamic current price + historical model
                    trend.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(
                        "price-trend"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                        block:
                          "start",
                      })
                  }
                  className="
                    hidden items-center gap-1 rounded-xl
                    border border-[var(--border)]
                    bg-[var(--surface)]
                    px-3 py-2
                    text-[10px] font-semibold text-[var(--muted)]
                    shadow-[0_6px_18px_rgba(18,63,45,0.05)]
                    sm:flex
                  "
                >
                  View trend
                  <ChevronRight size={13} />
                </button>
              </div>

              {historyLoading ? (
                <div
                  className="
                    h-[560px] animate-pulse rounded-[28px]
                    bg-[var(--surface-soft)]
                  "
                />
              ) : (
                <PriceHistory
                  history={
                    history
                  }
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

        {/* VOICE SUPPORT */}
        {!loading &&
          !error &&
          prices.length > 0 && (
            <div
              className="
                mt-6 flex items-start gap-3
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                px-4 py-3.5
              "
            >
              <div
                className="
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-xl
                  bg-[var(--accent)]
                  text-[var(--primary)]
                "
              >
                <Volume2 size={16} />
              </div>

              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">
                  Voice price support
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-[var(--muted)]">
                  Use the speaker button on a card to hear
                  the current reference price.
                </p>
              </div>
            </div>
          )}

        <p className="mx-auto mt-6 max-w-2xl text-center text-[10px] leading-4 text-[var(--muted)]">
          These current rates are generated by the dynamic
          market model. Actual recycler offers may vary
          with material quality, quantity, location and
          condition.
        </p>
      </main>
    </div>
  );
};

const HeroStat = ({
  label,
  value,
  icon,
}) => (
  <div className="rounded-2xl border border-white/10 bg-white/8 px-3 py-3 backdrop-blur-md">
    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/42">
      {label}
    </p>

    <div className="mt-1 flex items-center gap-1.5 text-sm font-extrabold text-white">
      {icon}
      {value}
    </div>
  </div>
);

export default PriceBoard;
