import { useEffect, useState } from "react";
import {
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getLotById,
} from "../../services/lots/lotApi";

import LotPhotos from "./components/LotPhotos";
import LotHeader from "./components/LotHeader";
import LotInfo from "./components/LotInfo";
import LotValuation from "./components/LotValuation";

const LotDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLot = async () => {
    try {
      setError("");
      setLoading(true);

      const result = await getLotById(id);

      setLot(result.lot);
    } catch (error) {
      console.error("Failed to load lot:", error);

      setError(
        error.message || "Unable to load lot."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadLot();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* Header */}
      <header
        className="
          sticky
          top-0
          z-20
          border-b
          border-[var(--border)]
          bg-[var(--background)]/90
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            max-w-3xl
            items-center
            justify-between
            px-4
            sm:px-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">

            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
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
                transition
                hover:bg-[var(--surface-soft)]
                active:scale-95
              "
            >
              <ArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <p className="text-xs text-[var(--muted)]">
                Collection
              </p>

              <h1 className="truncate text-sm font-semibold sm:text-base">
                Lot Details
              </h1>
            </div>
          </div>

          {!loading && (
            <button
              type="button"
              onClick={loadLot}
              aria-label="Refresh lot"
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
                transition
                hover:bg-[var(--surface-soft)]
                hover:text-[var(--foreground)]
                active:scale-95
              "
            >
              <RefreshCw size={17} />
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main
        className="
          mx-auto
          w-full
          max-w-3xl
          space-y-5
          px-4
          py-5
          pb-32
          sm:px-6
          sm:py-8
        "
      >

        {/* Loading */}
        {loading && (
          <div className="space-y-5">

            <div
              className="
                aspect-[4/3]
                animate-pulse
                rounded-3xl
                bg-[var(--surface-soft)]
              "
            />

            <div
              className="
                h-28
                animate-pulse
                rounded-3xl
                bg-[var(--surface-soft)]
              "
            />

            <div
              className="
                h-36
                animate-pulse
                rounded-3xl
                bg-[var(--surface-soft)]
              "
            />

            <div
              className="
                h-48
                animate-pulse
                rounded-3xl
                bg-[var(--surface-soft)]
              "
            />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
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

        {/* Lot */}
        {lot && !loading && (
          <>

            {/* Photos */}
            <LotPhotos photos={lot.photos} />

            {/* Main information */}
            <LotHeader lot={lot} />

            {/* Valuation */}
            <LotValuation lot={lot} />

            {/* Details */}
            <LotInfo lot={lot} />

            {/* Handover */}
            {lot.status === "AVAILABLE" && (
              <div
                className="
                  sticky
                  bottom-20
                  z-10
                  pt-2
                  sm:static
                  sm:pt-0
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/collector/lots/${lot.id}/handover`
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    bg-[var(--primary)]
                    px-5
                    py-4
                    text-sm
                    font-semibold
                    text-[var(--primary-foreground)]
                    shadow-lg
                    shadow-black/10
                    transition
                    hover:opacity-90
                    active:scale-[0.99]
                  "
                >
                  Record Handover
                </button>
              </div>
            )}

          </>
        )}
      </main>
    </div>
  );
};

export default LotDetails;