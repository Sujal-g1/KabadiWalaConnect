import {
  ArrowLeft,
  Check,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  /* ==========================================================
     LOAD LOT
  ========================================================== */

  const loadLot = async (
    isRefresh = false
  ) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const result =
        await getLotById(id);

      setLot(result?.lot || null);
    } catch (error) {
      console.error(
        "Failed to load lot:",
        error
      );

      setError(
        error?.message ||
          "Unable to load lot."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    if (id) {
      loadLot();
    }
  }, [id]);

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* ======================================================
          AMBIENT PAGE GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          -right-32
          top-16
          h-80
          w-80
          rounded-full
          bg-[var(--accent)]
          opacity-35
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          -left-40
          bottom-[-60px]
          h-96
          w-96
          rounded-full
          bg-[var(--accent)]
          opacity-20
          blur-[120px]
        "
      />

      {/* ======================================================
          STICKY HEADER
      ====================================================== */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-[var(--border)]
          bg-[var(--background)]/80
          backdrop-blur-2xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            max-w-6xl
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <motion.button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              whileTap={{
                scale: 0.9,
              }}
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
                text-[var(--foreground)]
                shadow-sm
                transition
                hover:border-[var(--primary)]/30
                hover:shadow-md
              "
            >
              <ArrowLeft
                size={18}
                strokeWidth={2.2}
              />
            </motion.button>

            <div className="min-w-0">
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[var(--primary)]
                  "
                >
                  Collection
                </p>

                <Sparkles
                  size={11}
                  className="
                    text-[var(--primary)]
                  "
                />
              </div>

              <h1
                className="
                  truncate
                  text-sm
                  font-extrabold
                  tracking-tight
                  sm:text-base
                "
              >
                Lot Details
              </h1>
            </div>
          </div>

          {/* REFRESH */}

          {!loading && (
            <motion.button
              type="button"
              onClick={() =>
                loadLot(true)
              }
              whileTap={{
                scale: 0.9,
              }}
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
                shadow-sm
                transition
                hover:border-[var(--primary)]/30
                hover:text-[var(--primary)]
                hover:shadow-md
              "
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
          )}
        </div>
      </header>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <main
        className="
          relative
          mx-auto
          w-full
          max-w-6xl
          px-4
          pb-36
          pt-5
          sm:px-6
          sm:pt-8
          lg:px-8
        "
      >
        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && (
          <div
            className="
              grid
              gap-5
              lg:grid-cols-[minmax(0,1.15fr)_minmax(350px,0.85fr)]
            "
          >
            {/* IMAGE SKELETON */}

            <div
              className="
                aspect-[4/3]
                animate-pulse
                rounded-[30px]
                bg-[var(--surface-soft)]
                shadow-sm
              "
            />

            {/* CONTENT SKELETON */}

            <div className="space-y-5">
              <div
                className="
                  h-60
                  animate-pulse
                  rounded-[30px]
                  bg-[var(--surface-soft)]
                "
              />

              <div
                className="
                  h-72
                  animate-pulse
                  rounded-[30px]
                  bg-[var(--surface-soft)]
                "
              />

              <div
                className="
                  h-64
                  animate-pulse
                  rounded-[30px]
                  bg-[var(--surface-soft)]
                "
              />
            </div>
          </div>
        )}

        {/* ====================================================
            ERROR
        ==================================================== */}

        <AnimatePresence>
          {error && !loading && (
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
                border-[var(--danger)]/20
                bg-[var(--surface)]
                p-6
                shadow-[0_14px_35px_rgba(0,0,0,0.06)]
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--danger)]/10
                    text-[var(--danger)]
                  "
                >
                  !
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-bold
                      text-[var(--danger)]
                    "
                  >
                    Unable to load this lot
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[var(--muted)]
                    "
                  >
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      loadLot()
                    }
                    className="
                      mt-4
                      rounded-xl
                      bg-[var(--primary)]
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-[var(--primary-foreground)]
                      shadow-md
                      transition
                      hover:opacity-95
                    "
                  >
                    Try again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================
            LOT DETAILS
        ==================================================== */}

        {lot && !loading && (
          <div
            className="
              grid
              gap-5
              lg:grid-cols-[minmax(0,1.15fr)_minmax(350px,0.85fr)]
              lg:items-start
            "
          >
            {/* ==================================================
                LEFT COLUMN
            ================================================== */}

            <div
              className="
                space-y-5
                lg:sticky
                lg:top-24
              "
            >
              <LotPhotos
                photos={
                  lot.photos || []
                }
              />

              {/* RECORD INDICATOR */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                }}
                className="
                  hidden
                  rounded-[24px]
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-4
                  shadow-[0_12px_30px_rgba(18,63,45,0.06)]
                  lg:block
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[var(--accent)]
                      text-[var(--primary)]
                    "
                  >
                    <Check
                      size={17}
                      strokeWidth={2.6}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                      "
                    >
                      Digital lot record
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        leading-4
                        text-[var(--muted)]
                      "
                    >
                      Photos, collection information
                      and valuation are linked to this
                      lot.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ==================================================
                RIGHT COLUMN
            ================================================== */}

            <div className="space-y-5">
              <LotHeader
                lot={lot}
              />

              <LotValuation
                lot={lot}
              />

              <LotInfo
                lot={lot}
              />
            </div>

            {/* ==================================================
                HANDOVER CTA
            ================================================== */}

            {lot.status ===
              "AVAILABLE" && (
              <div
                className="
                  lg:col-span-2
                  lg:pt-1
                "
              >
                <motion.section
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="
                    relative
                    overflow-hidden
                    rounded-[30px]
                    bg-[linear-gradient(135deg,#06150F_0%,#0A2519_36%,#0F4B31_70%,#126341_100%)]
                    p-4
                    text-white
                    shadow-[0_20px_50px_rgba(18,63,45,0.22)]
                    sm:p-5
                  "
                >
                  {/* AMBIENT GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-20
                      h-48
                      w-48
                      rounded-full
                      bg-[#4CD094]/15
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-20
                      -left-20
                      h-40
                      w-40
                      rounded-full
                      bg-[#1F9B6D]/15
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      relative
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-white/50
                        "
                      >
                        Next step
                      </p>

                      <h2
                        className="
                          mt-1
                          text-lg
                          font-extrabold
                        "
                      >
                        Record handover
                      </h2>

                      <p
                        className="
                          mt-1
                          max-w-lg
                          text-xs
                          leading-5
                          text-white/55
                        "
                      >
                        Capture actual weight,
                        handover evidence and recycler
                        confirmation.
                      </p>
                    </div>

                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        navigate(
                          `/collector/lots/${lot.id}/handover`
                        )
                      }
                      className="
                        flex
                        min-h-12
                        w-full
                        items-center
                        justify-center
                        rounded-2xl
                        bg-white
                        px-5
                        py-3
                        text-sm
                        font-extrabold
                        text-[var(--primary)]
                        shadow-xl
                        transition
                        hover:bg-white/95
                        sm:w-auto
                        sm:min-w-[200px]
                      "
                    >
                      Record Handover
                    </motion.button>
                  </div>
                </motion.section>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default LotDetails;