import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getLots,
} from "../../services/lots/lotApi";

import LotCard from "./components/LotCard";
import LotsEmptyState from "./components/LotsEmptyState";

const MyLots = () => {
  const navigate = useNavigate();

  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);
  const [error, setError] = useState("");

  const loadLots = async (
    isRefresh = false
  ) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const result = await getLots();

      setLots(result.lots || []);
    } catch (error) {
      console.error(
        "Failed to load lots:",
        error
      );

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

  const activeLots = lots.filter(
    (lot) =>
      !["COMPLETED", "CANCELLED"].includes(
        lot.status
      )
  );

  return (
    <div
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <header
        className="
          sticky
          top-0
          z-20
          border-b
          border-[var(--border)]
          bg-[var(--background)]/95
          backdrop-blur
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            max-w-2xl
            items-center
            justify-between
            gap-3
            px-4
          "
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
              "
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="font-semibold">
                My Lots
              </h1>

              <p className="text-xs text-[var(--muted)]">
                {activeLots.length} active ·{" "}
                {lots.length} total
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadLots(true)}
              disabled={refreshing}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
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

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/collector/lots/create"
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[var(--primary)]
                text-[var(--primary-foreground)]
              "
            >
              <Plus size={19} />
            </button>
          </div>
        </div>
      </header>

      <main
        className="
          mx-auto
          max-w-2xl
          space-y-4
          px-4
          py-6
          pb-32
        "
      >
        {error && (
          <div
            className="
              rounded-2xl
              border
              border-[var(--danger)]/30
              bg-[var(--danger)]/10
              p-4
              text-sm
              text-[var(--danger)]
            "
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-36
                  animate-pulse
                  rounded-3xl
                  bg-[var(--surface-soft)]
                "
              />
            ))}
          </div>
        ) : lots.length === 0 ? (
          <LotsEmptyState
            onCreate={() =>
              navigate(
                "/collector/lots/create"
              )
            }
          />
        ) : (
          <div className="space-y-3">
            {lots.map((lot) => (
              <LotCard
                key={lot.id}
                lot={lot}
                onClick={() =>
                  navigate(
                    `/collector/lots/${lot.id}`
                  )
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyLots;