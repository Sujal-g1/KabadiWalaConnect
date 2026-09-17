import {
  ArrowLeft,
  Package,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

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

  const [lots, setLots] = useState([]);
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

      const response = await getLots();

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

  const filteredLots = useMemo(() => {
    let result = [...lots];

    if (activeFilter !== "ALL") {
      result = result.filter(
        (lot) =>
          lot.status === activeFilter
      );
    }

    const query =
      search.trim().toLowerCase();

    if (query) {
      result = result.filter((lot) => {
        return (
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
      });
    }

    return result;
  }, [
    lots,
    activeFilter,
    search,
  ]);

  const counts = useMemo(() => {
    return {
      ALL: lots.length,

      AVAILABLE: lots.filter(
        (lot) =>
          lot.status === "AVAILABLE"
      ).length,

      OFFER_RECEIVED: lots.filter(
        (lot) =>
          lot.status ===
          "OFFER_RECEIVED"
      ).length,

      PICKUP_SCHEDULED: lots.filter(
        (lot) =>
          lot.status ===
          "PICKUP_SCHEDULED"
      ).length,

      COMPLETED: lots.filter(
        (lot) =>
          lot.status === "COMPLETED"
      ).length,
    };
  }, [lots]);

  return (
    <div className="pb-24 lg:pb-8">

      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={() =>
            navigate("/collector")
          }
          className="
            mb-5 inline-flex items-center gap-2
            text-xs font-medium
            text-[var(--muted)]
            transition hover:text-[var(--foreground)]
          "
        >
          <ArrowLeft size={15} />

          Dashboard
        </button>

        <div
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-end
            sm:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-9 w-9 items-center
                  justify-center rounded-xl
                  bg-[var(--accent)]
                  text-[var(--primary)]
                "
              >
                <Package size={18} />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                My Lots
              </h1>
            </div>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Track and manage your collected
              e-waste.
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                "/collector/lots/create"
              )
            }
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-xl bg-[var(--primary)]
              px-4 py-3
              text-sm font-semibold
              text-[var(--primary-foreground)]
              transition
              hover:opacity-90
              active:scale-[0.98]
            "
          >
            <Plus size={17} />

            Create Lot
          </button>
        </div>
      </div>

      {/* Summary */}
      {!loading && lots.length > 0 && (
        <div
          className="
            mb-5 grid grid-cols-2 gap-3
            sm:grid-cols-4
          "
        >
          <SummaryItem
            label="Total lots"
            value={counts.ALL}
          />

          <SummaryItem
            label="Available"
            value={counts.AVAILABLE}
          />

          <SummaryItem
            label="Offers"
            value={counts.OFFER_RECEIVED}
          />

          <SummaryItem
            label="Completed"
            value={counts.COMPLETED}
          />
        </div>
      )}

      {/* Search + refresh */}
      {!loading && lots.length > 0 && (
        <div className="mb-4 flex gap-2">
          <div
            className="
              flex min-w-0 flex-1 items-center gap-2
              rounded-xl border border-[var(--border)]
              bg-[var(--surface)]
              px-3.5
            "
          >
            <Search
              size={17}
              className="shrink-0 text-[var(--muted)]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search lots or reference ID..."
              className="
                h-11 min-w-0 flex-1
                bg-transparent
                text-sm text-[var(--foreground)]
                outline-none
                placeholder:text-[var(--muted-foreground)]
              "
            />
          </div>

          <button
            onClick={() => loadLots(true)}
            disabled={refreshing}
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl border border-[var(--border)]
              bg-[var(--surface)]
              text-[var(--muted)]
              transition
              hover:bg-[var(--surface-soft)]
              disabled:opacity-50
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
          </button>
        </div>
      )}

      {/* Filters */}
      {!loading && lots.length > 0 && (
        <div
          className="
            mb-6 flex items-center gap-2
            overflow-x-auto pb-1
            scrollbar-none
          "
        >
          <SlidersHorizontal
            size={16}
            className="
              mr-1 shrink-0
              text-[var(--muted)]
            "
          />

          {filters.map((filter) => {
            const active =
              activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                onClick={() =>
                  setActiveFilter(
                    filter.id
                  )
                }
                className={`
                  inline-flex shrink-0
                  items-center gap-1.5
                  rounded-full px-3.5 py-2
                  text-xs font-semibold
                  transition
                  ${
                    active
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--surface-soft)]"
                  }
                `}
              >
                {filter.label}

                <span
                  className={`
                    ${
                      active
                        ? "opacity-70"
                        : "text-[var(--muted-foreground)]"
                    }
                  `}
                >
                  {counts[filter.id]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <LotsSkeleton />
      )}

      {/* Error */}
      {!loading && error && (
        <div
          className="
            rounded-2xl border
            border-[var(--danger)]/20
            bg-[var(--danger)]/5
            p-5
          "
        >
          <p className="text-sm font-semibold text-[var(--danger)]">
            {error}
          </p>

          <button
            onClick={() => loadLots()}
            className="
              mt-3 text-xs font-semibold
              text-[var(--primary)]
            "
          >
            Try again →
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        lots.length === 0 && (
          <LotsEmptyState />
        )}

      {/* No search/filter results */}
      {!loading &&
        !error &&
        lots.length > 0 &&
        filteredLots.length === 0 && (
          <div
            className="
              flex min-h-[300px]
              flex-col items-center
              justify-center
              rounded-2xl border border-dashed
              border-[var(--border)]
              bg-[var(--surface)]
              px-6 text-center
            "
          >
            <Search
              size={28}
              className="text-[var(--muted)]"
            />

            <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
              No matching lots
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Try another search or filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("ALL");
              }}
              className="
                mt-4 text-xs font-semibold
                text-[var(--primary)]
              "
            >
              Clear filters
            </button>
          </div>
        )}

      {/* Lots */}
      {!loading &&
        !error &&
        filteredLots.length > 0 && (
          <div className="space-y-3">
            {filteredLots.map((lot) => (
              <LotCard
                key={lot.id}
                lot={lot}
              />
            ))}
          </div>
        )}
    </div>
  );
};

const SummaryItem = ({
  label,
  value,
}) => {
  return (
    <div
      className="
        rounded-2xl border border-[var(--border)]
        bg-[var(--surface)] p-4
      "
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
};

const LotsSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="
            overflow-hidden rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
          "
        >
          <div className="animate-pulse p-5">
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[var(--surface-soft)]" />

              <div className="flex-1">
                <div className="h-4 w-40 rounded bg-[var(--surface-soft)]" />

                <div className="mt-2 h-3 w-28 rounded bg-[var(--surface-soft)]" />

                <div className="mt-4 h-6 w-24 rounded-full bg-[var(--surface-soft)]" />
              </div>
            </div>
          </div>

          <div className="h-16 animate-pulse bg-[var(--surface-soft)]" />
        </div>
      ))}
    </div>
  );
};

export default MyLots;