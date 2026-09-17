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
  const [loading, setLoading] =
    useState(true);
  const [error, setError] = useState("");

  const loadLot = async () => {
    try {
      setError("");
      setLoading(true);

      const result =
        await getLotById(id);

      setLot(result.lot);
    } catch (error) {
      console.error(
        "Failed to load lot:",
        error
      );

      setError(
        error.message ||
          "Unable to load lot."
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

            <h1 className="font-semibold">
              Lot Details
            </h1>
          </div>

            {lot?.status === "AVAILABLE" && (
        <button
          type="button"
          onClick={() =>
            navigate(
              `/collector/lots/${lot.id}/handover`
            )
          }
          className="
            w-full rounded-2xl
            bg-[var(--primary)]
            px-5 py-4
            font-semibold
            text-[var(--primary-foreground)]
            transition
            hover:opacity-90
            active:scale-[0.99]
          "
        >
          Record Handover
        </button>
      )}

          {!loading && (
            <button
              type="button"
              onClick={loadLot}
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
              <RefreshCw size={17} />
            </button>
          )}
        </div>
      </header>

      <main
        className="
          mx-auto
          max-w-2xl
          space-y-5
          px-4
          py-6
          pb-32
        "
      >
        {loading && (
          <div className="space-y-5">
            <div className="aspect-[4/3] animate-pulse rounded-3xl bg-[var(--surface-soft)]" />

            <div className="h-24 animate-pulse rounded-3xl bg-[var(--surface-soft)]" />

            <div className="h-36 animate-pulse rounded-3xl bg-[var(--surface-soft)]" />
          </div>
        )}

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

        {lot && !loading && (
          <>
            <LotPhotos
              photos={lot.photos}
            />

            <LotHeader
              lot={lot}
            />

            <LotValuation
              lot={lot}
            />

            <LotInfo
              lot={lot}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default LotDetails;