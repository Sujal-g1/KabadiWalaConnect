import {
  ArrowLeft,
  Package,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
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

import {
  getLots,
} from "../../services/lots/lotApi";

import LotCard from "./components/LotCard";
import LotsEmptyState from "./components/LotsEmptyState";

const filters = [
  {
    id: "ALL",
    label: "All",
  },
  {
    id: "AVAILABLE",
    label: "Available",
  },
  {
    id: "OFFER_RECEIVED",
    label: "Offers",
  },
  {
    id: "PICKUP_SCHEDULED",
    label: "Pickup",
  },
  {
    id: "COMPLETED",
    label: "Completed",
  },
];

const MyLots = () => {
  const navigate = useNavigate();

  const [lots, setLots] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("ALL");

  /* ==========================================================
     LOAD
  ========================================================== */

  const loadLots = async (
    showRefresh = false
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response =
        await getLots();

      setLots(
        response?.lots ||
          response?.data?.lots ||
          []
      );
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Unable to load your lots."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLots();
  }, []);

  /* ==========================================================
     FILTER
  ========================================================== */

  const filteredLots =
    useMemo(() => {
      let result = [...lots];

      if (
        activeFilter !==
        "ALL"
      ) {
        result =
          result.filter(
            (lot) =>
              lot.status ===
              activeFilter
          );
      }

      const query =
        search
          .trim()
          .toLowerCase();

      if (query) {
        result =
          result.filter(
            (lot) =>
              lot.referenceId
                ?.toLowerCase()
                .includes(query) ||
              lot.material
                ?.toLowerCase()
                .includes(query) ||
              lot.subcategory
                ?.toLowerCase()
                .includes(query) ||
              lot.location
                ?.toLowerCase()
                .includes(query)
          );
      }

      return result;
    }, [
      lots,
      activeFilter,
      search,
    ]);

  /* ==========================================================
     COUNTS
  ========================================================== */

  const counts =
    useMemo(() => {
      return {
        ALL: lots.length,

        AVAILABLE:
          lots.filter(
            (lot) =>
              lot.status ===
              "AVAILABLE"
          ).length,

        OFFER_RECEIVED:
          lots.filter(
            (lot) =>
              lot.status ===
              "OFFER_RECEIVED"
          ).length,

        PICKUP_SCHEDULED:
          lots.filter(
            (lot) =>
              lot.status ===
              "PICKUP_SCHEDULED"
          ).length,

        COMPLETED:
          lots.filter(
            (lot) =>
              lot.status ===
              "COMPLETED"
          ).length,
      };
    }, [lots]);

  const clearSearch =
    () => {
      setSearch("");
    };

  const clearFilters =
    () => {
      setSearch("");
      setActiveFilter(
        "ALL"
      );
    };

  return (
    <div
      className="
        min-h-full
        pb-28
        lg:pb-8
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
          px-4
          pt-5
          sm:px-6
          sm:pt-7
          lg:px-8
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header>
          <button
            type="button"
            onClick={() =>
              navigate(
                "/collector"
              )
            }
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[var(--muted)]
              transition
              hover:text-[var(--foreground)]
            "
          >
            <ArrowLeft
              size={14}
            />

            Dashboard
          </button>

          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--accent)]
                    text-[var(--primary)]
                  "
                >
                  <Package
                    size={19}
                    strokeWidth={2.2}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <h1
                    className="
                      text-2xl
                      font-extrabold
                      tracking-tight
                      text-[var(--foreground)]
                      sm:text-3xl
                    "
                  >
                    My Lots
                  </h1>

                  <Sparkles
                    size={15}
                    className="
                      hidden
                      text-[var(--primary)]
                      sm:block
                    "
                  />
                </div>
              </div>

              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  leading-5
                  text-[var(--muted)]
                "
              >
                Track your collected e-waste,
                offers, pickup and completed sales.
              </p>
            </div>

            <motion.button
              type="button"
              whileTap={{
                scale: 0.97,
              }}
              onClick={() =>
                navigate(
                  "/collector/lots/create"
                )
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[var(--primary)]
                px-4
                py-3
                text-sm
                font-bold
                text-[var(--primary-foreground)]
                shadow-lg
                shadow-black/10
                transition
                hover:opacity-95
              "
            >
              <Plus size={17} />

              Create Lot
            </motion.button>
          </div>
        </header>

        {/* ====================================================
            OVERVIEW
        ==================================================== */}

        {!loading &&
          lots.length > 0 && (
            <motion.section
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
                grid
                grid-cols-2
                gap-2
                sm:grid-cols-4
              "
            >
              <SummaryItem
                label="Total lots"
                value={counts.ALL}
                primary
              />

              <SummaryItem
                label="Available"
                value={
                  counts.AVAILABLE
                }
              />

              <SummaryItem
                label="Offers"
                value={
                  counts.OFFER_RECEIVED
                }
              />

              <SummaryItem
                label="Completed"
                value={
                  counts.COMPLETED
                }
              />
            </motion.section>
          )}

        {/* ====================================================
            SEARCH
        ==================================================== */}

        {!loading &&
          lots.length > 0 && (
            <section className="mt-7">
              <div
                className="
                  flex
                  flex-col
                  gap-2
                  sm:flex-row
                "
              >
                <div
                  className="
                    relative
                    min-w-0
                    flex-1
                  "
                >
                  <Search
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[var(--muted)]
                    "
                  />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search lots, material, location or reference..."
                    className="
                      h-12
                      w-full
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      pl-11
                      pr-11
                      text-sm
                      font-medium
                      text-[var(--foreground)]
                      shadow-sm
                      outline-none
                      transition
                      placeholder:text-[var(--muted)]
                      focus:border-[var(--primary)]/40
                      focus:ring-4
                      focus:ring-[var(--primary)]/5
                    "
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={
                        clearSearch
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-7
                        w-7
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-[var(--muted)]
                        hover:text-[var(--foreground)]
                      "
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <motion.button
                  type="button"
                  whileTap={{
                    scale: 0.94,
                  }}
                  onClick={() =>
                    loadLots(true)
                  }
                  disabled={refreshing}
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    text-[var(--muted)]
                    shadow-sm
                    transition
                    hover:text-[var(--primary)]
                    disabled:opacity-50
                  "
                  aria-label="Refresh lots"
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
              </div>
            </section>
          )}

        {/* ====================================================
            FILTERS
        ==================================================== */}

        {!loading &&
          lots.length > 0 && (
            <section className="mt-5">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  overflow-x-auto
                  pb-1
                  scrollbar-none
                "
              >
                <SlidersHorizontal
                  size={14}
                  className="
                    mr-1
                    shrink-0
                    text-[var(--muted)]
                  "
                />

                {filters.map(
                  (filter) => {
                    const active =
                      activeFilter ===
                      filter.id;

                    return (
                      <motion.button
                        key={
                          filter.id
                        }
                        type="button"
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          setActiveFilter(
                            filter.id
                          )
                        }
                        className={`
                          inline-flex
                          shrink-0
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          px-3.5
                          py-2.5
                          text-[11px]
                          font-bold
                          transition

                          ${
                            active
                              ? `
                                border-[var(--primary)]
                                bg-[var(--primary)]
                                text-[var(--primary-foreground)]
                              `
                              : `
                                border-[var(--border)]
                                bg-[var(--surface)]
                                text-[var(--muted)]
                                hover:border-[var(--primary)]/25
                                hover:text-[var(--foreground)]
                              `
                          }
                        `}
                      >
                        {filter.label}

                        <span
                          className={`
                            text-[9px]
                            ${
                              active
                                ? "opacity-70"
                                : "text-[var(--muted)]"
                            }
                          `}
                        >
                          {counts[
                            filter.id
                          ]}
                        </span>
                      </motion.button>
                    );
                  }
                )}
              </div>
            </section>
          )}

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="mt-7">
          {/* LOADING */}

          {loading && (
            <LotsSkeleton />
          )}

          {/* ERROR */}

          {!loading &&
            error && (
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
                  rounded-[24px]
                  border
                  border-[var(--danger)]/20
                  bg-[var(--surface)]
                  p-5
                "
              >
                <p
                  className="
                    text-sm
                    font-bold
                    text-[var(--danger)]
                  "
                >
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    loadLots()
                  }
                  className="
                    mt-3
                    text-xs
                    font-bold
                    text-[var(--primary)]
                  "
                >
                  Try again →
                </button>
              </motion.div>
            )}

          {/* COMPLETELY EMPTY */}

          {!loading &&
            !error &&
            lots.length === 0 && (
              <LotsEmptyState />
            )}

          {/* NO RESULTS */}

          {!loading &&
            !error &&
            lots.length > 0 &&
            filteredLots.length ===
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
                  rounded-[26px]
                  border
                  border-dashed
                  border-[var(--border)]
                  bg-[var(--surface)]
                  px-6
                  py-14
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
                    text-[var(--primary)]
                  "
                >
                  <Search
                    size={25}
                  />
                </div>

                <p
                  className="
                    mt-4
                    text-sm
                    font-bold
                    text-[var(--foreground)]
                  "
                >
                  No matching lots
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[var(--muted)]
                  "
                >
                  Try a different search term
                  or status filter.
                </p>

                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                  className="
                    mt-4
                    text-xs
                    font-bold
                    text-[var(--primary)]
                  "
                >
                  Clear filters
                </button>
              </motion.div>
            )}

          {/* LOT LIST */}

          {!loading &&
            !error &&
            filteredLots.length >
              0 && (
              <section>
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <h2
                      className="
                        text-base
                        font-extrabold
                        tracking-tight
                      "
                    >
                      Your lots
                    </h2>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-[var(--muted)]
                      "
                    >
                      {filteredLots.length}{" "}
                      {filteredLots.length ===
                      1
                        ? "lot"
                        : "lots"}{" "}
                      shown
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredLots.map(
                    (lot, index) => (
                      <motion.div
                        key={lot.id}
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
                      >
                        <LotCard
                          lot={lot}
                        />
                      </motion.div>
                    )
                  )}
                </div>
              </section>
            )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SUMMARY ITEM
============================================================ */

const SummaryItem = ({
  label,
  value,
  primary = false,
}) => {
  return (
    <div
      className={`
        rounded-[20px]
        border
        px-4
        py-3.5

        ${
          primary
            ? `
              border-[var(--primary)]/15
              bg-[var(--accent)]
            `
            : `
              border-[var(--border)]
              bg-[var(--surface)]
            `
        }
      `}
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

      <p
        className={`
          mt-1.5
          text-2xl
          font-extrabold
          tracking-tight
          ${
            primary
              ? "text-[var(--primary)]"
              : "text-[var(--foreground)]"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
};

/* ============================================================
   SKELETON
============================================================ */

const LotsSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map(
        (item) => (
          <div
            key={item}
            className="
              overflow-hidden
              rounded-[24px]
              border
              border-[var(--border)]
              bg-[var(--surface)]
            "
          >
            <div className="animate-pulse p-5">
              <div className="flex gap-3">
                <div
                  className="
                    h-12
                    w-12
                    rounded-2xl
                    bg-[var(--surface-soft)]
                  "
                />

                <div className="flex-1">
                  <div
                    className="
                      h-4
                      w-40
                      rounded
                      bg-[var(--surface-soft)]
                    "
                  />

                  <div
                    className="
                      mt-2
                      h-3
                      w-28
                      rounded
                      bg-[var(--surface-soft)]
                    "
                  />

                  <div
                    className="
                      mt-4
                      h-6
                      w-24
                      rounded-full
                      bg-[var(--surface-soft)]
                    "
                  />
                </div>
              </div>

              <div
                className="
                  mt-4
                  h-14
                  rounded-2xl
                  bg-[var(--surface-soft)]
                "
              />
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-px
                bg-[var(--border)]
                sm:grid-cols-4
              "
            >
              {[1, 2, 3, 4].map(
                (meta) => (
                  <div
                    key={meta}
                    className="
                      h-14
                      animate-pulse
                      bg-[var(--surface)]
                    "
                  />
                )
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MyLots;