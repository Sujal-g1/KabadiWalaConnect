import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  MapPin,
  RefreshCw,
  Scale,
  ShieldCheck,
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

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getLotById,
} from "../../services/lots/lotApi";

import {
  getHandoverByLotId,
  createHandover,
  uploadHandoverPhoto,
} from "../../services/handovers/handoverApi";

import HandoverHeader from "./components/HandoverHeader";
import HandoverWeight from "./components/HandoverWeight";
import HandoverLocation from "./components/HandoverLocation";
import HandoverPhotoSection from "./components/HandoverPhotoSection";
import HandoverValue from "./components/HandoverValue";
import HandoverStatus from "./components/HandoverStatus";

const Handover = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lot, setLot] =
    useState(null);

  const [handover, setHandover] =
    useState(null);

  const [actualWeight, setActualWeight] =
    useState("");

  const [finalValue, setFinalValue] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [latitude, setLatitude] =
    useState(null);

  const [longitude, setLongitude] =
    useState(null);

  const [photos, setPhotos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  /* ==========================================================
     LOAD
  ========================================================== */

  const loadData = async (
    isRefresh = false
  ) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const lotResponse =
        await getLotById(id);

      const currentLot =
        lotResponse?.lot;

      setLot(currentLot);

      setLocation(
        currentLot?.location || ""
      );

      setLatitude(
        currentLot?.latitude ??
          null
      );

      setLongitude(
        currentLot?.longitude ??
          null
      );

      setFinalValue(
        currentLot?.estimatedValue ??
          ""
      );

      try {
        const handoverResponse =
          await getHandoverByLotId(
            id
          );

        setHandover(
          handoverResponse?.handover ||
            null
        );
      } catch {
        setHandover(null);
      }
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Failed to load handover information."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  /* ==========================================================
     PHOTOS
  ========================================================== */

  const handleAddPhotos = (
    files
  ) => {
    const newPhotos =
      files.map((file) => ({
        file,
        name: file.name,
        preview:
          URL.createObjectURL(
            file
          ),
      }));

    setPhotos((current) => [
      ...current,
      ...newPhotos,
    ]);
  };

  const handleRemovePhoto = (
    index
  ) => {
    setPhotos((current) => {
      const photo =
        current[index];

      if (photo?.preview) {
        URL.revokeObjectURL(
          photo.preview
        );
      }

      return current.filter(
        (_, i) => i !== index
      );
    });
  };

  /* ==========================================================
     READINESS
  ========================================================== */

  const readiness = useMemo(
    () => ({
      weight:
        Boolean(actualWeight) &&
        Number(actualWeight) > 0,

      value:
        finalValue !== "" &&
        Number(finalValue) >= 0,

      location:
        Boolean(location?.trim()),

      photos:
        photos.length > 0,
    }),
    [
      actualWeight,
      finalValue,
      location,
      photos.length,
    ]
  );

  const completedSteps =
    Object.values(
      readiness
    ).filter(Boolean).length;

  const readinessPercentage =
    (completedSteps / 4) * 100;

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess(false);
      setSubmitting(true);

      if (
        !actualWeight ||
        Number(actualWeight) <= 0
      ) {
        throw new Error(
          "Please enter a valid actual weight."
        );
      }

      if (photos.length === 0) {
        throw new Error(
          "Please add at least one handover photo."
        );
      }

      const response =
        await createHandover(id, {
          actualWeight:
            Number(actualWeight),

          weightUnit: "kg",

          latitude,

          longitude,

          location,

          finalValue:
            finalValue === ""
              ? null
              : Number(finalValue),
        });

      const createdHandover =
        response?.handover;

      if (!createdHandover?.id) {
        throw new Error(
          "Handover was created but no handover ID was returned."
        );
      }

      for (
        const photo of photos
      ) {
        await uploadHandoverPhoto(
          createdHandover.id,
          photo.file
        );
      }

      const updatedResponse =
        await getHandoverByLotId(
          id
        );

      setHandover(
        updatedResponse?.handover ||
          null
      );

      setSuccess(true);

      photos.forEach(
        (photo) => {
          if (photo.preview) {
            URL.revokeObjectURL(
              photo.preview
            );
          }
        }
      );

      setPhotos([]);

      setTimeout(() => {
        navigate(
          `/collector/lots/${id}`
        );
      }, 1200);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Failed to create handover."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div
        className="
          relative
          flex
          min-h-[70vh]
          items-center
          justify-center
          overflow-hidden
          bg-[var(--background)]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            h-72
            w-72
            rounded-full
            bg-[var(--accent)]
            opacity-40
            blur-[100px]
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[var(--accent)]
              text-[var(--primary)]
              shadow-lg
            "
          >
            <Loader2
              size={23}
              className="animate-spin"
            />
          </div>

          <p
            className="
              text-sm
              font-medium
              text-[var(--muted)]
            "
          >
            Loading handover...
          </p>
        </div>
      </div>
    );
  }

  /* ==========================================================
     ERROR WITHOUT LOT
  ========================================================== */

  if (error && !lot) {
    return (
      <div
        className="
          relative
          min-h-screen
          bg-[var(--background)]
          px-4
          py-6
        "
      >
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/collector/lots/${id}`
              )
            }
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              px-2
              py-2
              text-sm
              font-semibold
              text-[var(--muted)]
            "
          >
            <ArrowLeft size={17} />
            Back to Lot
          </button>

          <div
            className="
              rounded-[26px]
              border
              border-[var(--danger)]/20
              bg-[var(--surface)]
              p-5
              text-sm
              text-[var(--danger)]
              shadow-sm
            "
          >
            {error}
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================
     EXISTING HANDOVER
  ========================================================== */

  if (handover) {
    const handoverDate =
      handover.handedOverAt
        ? new Date(
            handover.handedOverAt
          ).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )
        : "—";

    const copyReference =
      async () => {
        try {
          await navigator.clipboard.writeText(
            handover.referenceId
          );
        } catch (error) {
          console.error(
            "Failed to copy reference:",
            error
          );
        }
      };

    return (
      <div
        className="
          relative
          min-h-full
          overflow-hidden
          bg-[var(--background)]
        "
      >
        <div
          className="
            pointer-events-none
            fixed
            -right-32
            top-24
            h-80
            w-80
            rounded-full
            bg-[var(--accent)]
            opacity-25
            blur-[110px]
          "
        />

        <main
          className="
            relative
            mx-auto
            w-full
            max-w-4xl
            px-4
            pb-32
            pt-5
            sm:px-6
            sm:pt-8
          "
        >
          <HandoverHeader
            lot={lot}
            onBack={() =>
              navigate(
                `/collector/lots/${id}`
              )
            }
          />

          <div className="mt-5 space-y-4">
            <HandoverStatus
              status={
                handover.status
              }
            />

            {/* Reference */}

            <section
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-[var(--border)]
                bg-[linear-gradient(135deg,var(--surface)_0%,var(--background)_120%)]
                p-5
                shadow-[0_14px_38px_rgba(18,63,45,0.07)]
                sm:p-6
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-[var(--muted)]
                    "
                  >
                    Handover Reference
                  </p>

                  <button
                    type="button"
                    onClick={
                      copyReference
                    }
                    className="
                      mt-1
                      flex
                      max-w-full
                      items-center
                      gap-2
                      text-sm
                      font-extrabold
                      transition
                      hover:text-[var(--primary)]
                    "
                  >
                    <span className="truncate">
                      {
                        handover.referenceId
                      }
                    </span>

                    <Copy
                      size={13}
                      className="
                        shrink-0
                        text-[var(--muted)]
                      "
                    />
                  </button>
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
                  <ShieldCheck size={19} />
                </div>
              </div>

              {/* Summary */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-2.5
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-[var(--background)]
                    px-3.5
                    py-3
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
                    Actual Weight
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Scale
                      size={14}
                      className="text-[var(--primary)]"
                    />

                    <p className="text-sm font-extrabold">
                      {
                        handover.actualWeight
                      }{" "}
                      {
                        handover.weightUnit ||
                        "kg"
                      }
                    </p>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-[var(--primary)]/15
                    bg-[var(--accent)]
                    px-3.5
                    py-3
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
                    Final Value
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-extrabold
                      text-[var(--primary)]
                    "
                  >
                    ₹
                    {Number(
                      handover.finalValue ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>

              {/* Metadata */}

              <div
                className="
                  mt-3
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--background)]
                  px-3.5
                  py-3
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-[var(--muted)]
                    "
                  >
                    <MapPin size={13} />
                    Location
                  </span>

                  <span className="max-w-[60%] truncate text-right text-xs font-bold">
                    {handover.location ||
                      "—"}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-xs text-[var(--muted)]">
                    Recorded
                  </span>

                  <span className="text-xs font-bold">
                    {handoverDate}
                  </span>
                </div>
              </div>
            </section>

            {/* GPS */}

            {typeof handover.latitude ===
              "number" &&
              typeof handover.longitude ===
                "number" && (
                <section
                  className="
                    rounded-[26px]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    p-5
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-[var(--accent)]
                        text-[var(--primary)]
                      "
                    >
                      <MapPin size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-extrabold">
                        GPS Evidence
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-[10px]
                          text-[var(--muted)]
                        "
                      >
                        Recorded at handover
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      mt-4
                      rounded-2xl
                      bg-[linear-gradient(135deg,var(--accent),var(--background))]
                      px-4
                      py-3
                      text-xs
                      font-semibold
                      text-[var(--muted)]
                    "
                  >
                    {handover.latitude.toFixed(
                      5
                    )}
                    ,{" "}
                    {handover.longitude.toFixed(
                      5
                    )}
                  </div>
                </section>
              )}

            {/* Evidence */}

            {handover.photos?.length >
              0 && (
              <section
                className="
                  rounded-[28px]
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-5
                  shadow-[0_12px_35px_rgba(18,63,45,0.06)]
                  sm:p-6
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-extrabold">
                      Evidence Photos
                    </h2>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-[var(--muted)]
                      "
                    >
                      Photos captured during handover
                    </p>
                  </div>

                  <span
                    className="
                      rounded-full
                      bg-[var(--accent)]
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-bold
                      text-[var(--primary)]
                    "
                  >
                    {
                      handover.photos
                        .length
                    }{" "}
                    photos
                  </span>
                </div>

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-2.5
                    sm:grid-cols-3
                  "
                >
                  {handover.photos.map(
                    (photo) => (
                      <div
                        key={photo.id}
                        className="
                          group
                          aspect-square
                          overflow-hidden
                          rounded-[20px]
                          border
                          border-[var(--border)]
                          bg-[var(--surface-soft)]
                          shadow-sm
                        "
                      >
                        <img
                          src={
                            photo.url
                          }
                          alt="Handover evidence"
                          loading="lazy"
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/collector/lots/${id}`
                )
              }
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-5
                py-4
                text-sm
                font-bold
                shadow-sm
                transition
                hover:border-[var(--primary)]/30
                active:scale-[0.99]
              "
            >
              <ArrowLeft size={16} />
              Back to Lot
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* ==========================================================
     NEW HANDOVER
  ========================================================== */

  return (
    <div
      className="
        relative
        min-h-full
        overflow-hidden
        bg-[var(--background)]
      "
    >
      {/* Ambient background */}

      <div
        className="
          pointer-events-none
          fixed
          -right-32
          top-24
          h-80
          w-80
          rounded-full
          bg-[var(--accent)]
          opacity-25
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          -left-40
          bottom-0
          h-80
          w-80
          rounded-full
          bg-[var(--accent)]
          opacity-20
          blur-[110px]
        "
      />

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
        {/* HEADER */}

        <HandoverHeader
          lot={lot}
          onBack={() =>
            navigate(
              `/collector/lots/${id}`
            )
          }
        />

        {/* ====================================================
            READINESS
        ==================================================== */}

        <section
          className="
            mt-5
            overflow-hidden
            rounded-[26px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            shadow-sm
          "
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
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
                  Handover readiness
                </p>

                <h2
                  className="
                    mt-1
                    text-sm
                    font-extrabold
                  "
                >
                  Complete the transfer record
                </h2>
              </div>

              <span
                className="
                  text-sm
                  font-extrabold
                  text-[var(--primary)]
                "
              >
                {completedSteps}/4
              </span>
            </div>

            <div
              className="
                mt-4
                h-2
                overflow-hidden
                rounded-full
                bg-[var(--border)]
              "
            >
              <motion.div
                animate={{
                  width: `${readinessPercentage}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-[var(--primary)]
                  to-[var(--teal)]
                "
              />
            </div>

            <div
              className="
                mt-3
                grid
                grid-cols-2
                gap-2
                sm:grid-cols-4
              "
            >
              <ReadinessItem
                label="Weight"
                done={
                  readiness.weight
                }
              />

              <ReadinessItem
                label="Value"
                done={
                  readiness.value
                }
              />

              <ReadinessItem
                label="Location"
                done={
                  readiness.location
                }
              />

              <ReadinessItem
                label="Evidence"
                done={
                  readiness.photos
                }
              />
            </div>
          </div>
        </section>

        {/* ====================================================
            ERROR / SUCCESS
        ==================================================== */}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              className="
                mt-4
                rounded-2xl
                border
                border-[var(--danger)]/20
                bg-[var(--danger)]/10
                px-4
                py-3
                text-sm
                font-medium
                text-[var(--danger)]
              "
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                mt-4
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[var(--success)]/20
                bg-[var(--success)]/10
                px-4
                py-3
                text-sm
                font-semibold
                text-[var(--success)]
              "
            >
              <CheckCircle2
                size={19}
              />

              Handover recorded successfully.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================
            FORM LAYOUT
        ==================================================== */}

        <div
          className="
            mt-5
            grid
            gap-5
            lg:grid-cols-[minmax(0,1.1fr)_minmax(330px,0.9fr)]
            lg:items-start
          "
        >
          {/* LEFT */}

          <div className="space-y-5">
            <HandoverWeight
              value={
                actualWeight
              }
              onChange={
                setActualWeight
              }
            />

            <HandoverValue
              value={finalValue}
              onChange={
                setFinalValue
              }
            />

            <HandoverLocation
              location={location}
              latitude={latitude}
              longitude={longitude}
              onLocationChange={
                setLocation
              }
            />

            <HandoverPhotoSection
              photos={photos}
              onAddPhotos={
                handleAddPhotos
              }
              onRemovePhoto={
                handleRemovePhoto
              }
            />
          </div>

          {/* RIGHT — DESKTOP SUMMARY */}

          <aside
            className="
              lg:sticky
              lg:top-24
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-[linear-gradient(135deg,#06150F_0%,#0A281A_38%,#10563A_72%,#126A46_100%)]
                p-5
                text-white
                shadow-[0_20px_55px_rgba(18,63,45,0.22)]
                sm:p-6
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-44
                  w-44
                  rounded-full
                  bg-[#52D49A]/15
                  blur-3xl
                "
              />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={15}
                    className="text-emerald-200"
                  />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-white/50
                    "
                  >
                    Transfer record
                  </span>
                </div>

                <h2
                  className="
                    mt-2
                    text-xl
                    font-extrabold
                  "
                >
                  Ready to record
                </h2>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-white/55
                  "
                >
                  Once submitted, the handover record
                  and evidence will be associated with
                  this lot.
                </p>

                {/* Summary */}

                <div className="mt-6 space-y-2">
                  <SummaryRow
                    label="Material"
                    value={
                      lot?.material ||
                      "—"
                    }
                  />

                  <SummaryRow
                    label="Approx. weight"
                    value={`${lot?.approximateWeight || "—"} ${
                      lot?.weightUnit ||
                      "kg"
                    }`}
                  />

                  <SummaryRow
                    label="Collection location"
                    value={
                      lot?.location ||
                      "—"
                    }
                  />

                  <SummaryRow
                    label="Evidence photos"
                    value={`${photos.length} ${
                      photos.length ===
                      1
                        ? "photo"
                        : "photos"
                    }`}
                  />
                </div>

                {/* CTA */}

                <motion.button
                  type="button"
                  disabled={submitting}
                  onClick={
                    handleSubmit
                  }
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    mt-6
                    flex
                    min-h-14
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-white
                    px-5
                    py-4
                    text-sm
                    font-extrabold
                    text-[var(--primary)]
                    shadow-xl
                    transition
                    hover:bg-white/95
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {submitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Recording Handover...
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        size={18}
                      />

                      Record Handover
                    </>
                  )}
                </motion.button>

                <p
                  className="
                    mt-3
                    text-center
                    text-[10px]
                    leading-4
                    text-white/40
                  "
                >
                  The final amount and actual weight
                  will be stored as the handover record.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* MOBILE CTA */}

        <div
          className="
            sticky
            bottom-20
            z-20
            mt-5
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--background)]/85
            p-2
            shadow-2xl
            backdrop-blur-2xl
            lg:hidden
          "
        >
          <motion.button
            type="button"
            disabled={submitting}
            onClick={
              handleSubmit
            }
            whileTap={{
              scale: 0.985,
            }}
            className="
              flex
              min-h-13
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[var(--primary)]
              px-5
              py-3.5
              text-sm
              font-extrabold
              text-[var(--primary-foreground)]
              shadow-lg
              shadow-black/15
              disabled:opacity-60
            "
          >
            {submitting ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Recording Handover...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />

                Record Handover
              </>
            )}
          </motion.button>
        </div>
      </main>
    </div>
  );
};

/* ============================================================
   READINESS ITEM
============================================================ */

const ReadinessItem = ({
  label,
  done,
}) => {
  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-xl
        border
        px-2.5
        py-2

        ${
          done
            ? `
              border-[var(--primary)]/15
              bg-[var(--accent)]
            `
            : `
              border-[var(--border)]
              bg-[var(--background)]
            `
        }
      `}
    >
      <div
        className={`
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full

          ${
            done
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--border)] text-[var(--muted)]"
          }
        `}
      >
        {done ? (
          <Check
            size={10}
            strokeWidth={3}
          />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </div>

      <span
        className="
          truncate
          text-[10px]
          font-semibold
          text-[var(--muted)]
        "
      >
        {label}
      </span>
    </div>
  );
};

/* ============================================================
   SUMMARY ROW
============================================================ */

const SummaryRow = ({
  label,
  value,
}) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-3
        py-3
      "
    >
      <span
        className="
          text-[10px]
          text-white/45
        "
      >
        {label}
      </span>

      <span
        className="
          max-w-[55%]
          truncate
          text-right
          text-[11px]
          font-bold
          text-white/85
        "
      >
        {value}
      </span>
    </div>
  );
};

export default Handover;