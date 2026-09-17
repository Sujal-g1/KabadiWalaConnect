import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Loader2,
  MapPin,
  RefreshCw,
  Scale,
  ShieldCheck,
} from "lucide-react";
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

  const [lot, setLot] = useState(null);
  const [handover, setHandover] = useState(null);

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

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const lotResponse =
        await getLotById(id);

      const currentLot =
        lotResponse.lot;

      setLot(currentLot);

      setLocation(
        currentLot.location || ""
      );

      setLatitude(
        currentLot.latitude ?? null
      );

      setLongitude(
        currentLot.longitude ?? null
      );

      setFinalValue(
        currentLot.estimatedValue ?? ""
      );

      try {
        const handoverResponse =
          await getHandoverByLotId(id);

        setHandover(
          handoverResponse.handover
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
    }
  };

  const handleAddPhotos = (files) => {
    const newPhotos = files.map(
      (file) => ({
        file,
        name: file.name,
        preview:
          URL.createObjectURL(file),
      })
    );

    setPhotos((current) => [
      ...current,
      ...newPhotos,
    ]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((current) => {
      const photo = current[index];

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

  const handleSubmit = async () => {
    try {
      setError("");
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
        response.handover;

      for (const photo of photos) {
        await uploadHandoverPhoto(
          createdHandover.id,
          photo.file
        );
      }

      const updatedResponse =
        await getHandoverByLotId(id);

      setHandover(
        updatedResponse.handover
      );

      setSuccess(true);

      photos.forEach((photo) => {
        if (photo.preview) {
          URL.revokeObjectURL(
            photo.preview
          );
        }
      });

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

  /* ─────────────────────────────
     Loading
  ───────────────────────────── */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          text-[var(--foreground)]
        "
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[var(--accent)]
              text-[var(--primary)]
            "
          >
            <Loader2
              size={23}
              className="animate-spin"
            />
          </div>

          <p className="text-sm text-[var(--muted)]">
            Loading handover...
          </p>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────
     Error
  ───────────────────────────── */

  if (error && !lot) {
    return (
      <div className="w-full">
        <div
          className="
            mx-auto
            w-full
            max-w-3xl
            px-4
            py-6
            sm:px-6
            sm:py-8
          "
        >
          <button
            type="button"
            onClick={() =>
              navigate(
                `/collector/lots/${id}`
              )
            }
            className="
              mb-5
              flex
              min-h-10
              items-center
              gap-2
              rounded-xl
              px-2
              text-sm
              font-medium
              text-[var(--muted)]
              transition
              hover:bg-[var(--surface-soft)]
              hover:text-[var(--foreground)]
            "
          >
            <ArrowLeft size={18} />
            Back to Lot
          </button>

          <div
            className="
              rounded-3xl
              border
              border-[var(--danger)]/20
              bg-[var(--danger)]/10
              p-5
              text-sm
              text-[var(--danger)]
            "
          >
            {error}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────
     Existing Handover
  ───────────────────────────── */

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

    const copyReference = async () => {
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
      <div className="w-full">
        <div
          className="
            mx-auto
            w-full
            max-w-3xl
            px-4
            py-5
            pb-32
            sm:px-6
            sm:py-8
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

          {success && (
            <div
              className="
                mb-5
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[var(--success)]/20
                bg-[var(--success)]/10
                p-4
                text-[var(--success)]
              "
            >
              <CheckCircle2
                size={21}
                className="shrink-0"
              />

              <p className="text-sm font-medium">
                Handover recorded successfully.
              </p>
            </div>
          )}

          <div className="space-y-4">

            {/* Status */}
            <HandoverStatus
              status={handover.status}
            />

            {/* Reference */}
            <section
              className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-5
                sm:p-6
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="
                      text-[11px]
                      font-medium
                      uppercase
                      tracking-wide
                      text-[var(--muted)]
                    "
                  >
                    Handover Reference
                  </p>

                  <button
                    type="button"
                    onClick={copyReference}
                    className="
                      mt-1
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      transition
                      hover:text-[var(--primary)]
                    "
                  >
                    {handover.referenceId}

                    <Copy
                      size={14}
                      className="text-[var(--muted)]"
                    />
                  </button>
                </div>

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
                  <ShieldCheck size={19} />
                </div>
              </div>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  divide-y
                  divide-[var(--border)]
                  sm:grid-cols-2
                  sm:divide-x
                  sm:divide-y-0
                "
              >
                <div className="py-3 sm:pr-5 sm:py-2">
                  <p className="text-xs text-[var(--muted)]">
                    Actual Weight
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Scale
                      size={15}
                      className="text-[var(--primary)]"
                    />

                    <p className="text-sm font-semibold">
                      {handover.actualWeight}{" "}
                      {handover.weightUnit || "kg"}
                    </p>
                  </div>
                </div>

                <div className="py-3 sm:pl-5 sm:py-2">
                  <p className="text-xs text-[var(--muted)]">
                    Final Value
                  </p>

                  <p className="mt-1 text-lg font-bold text-[var(--primary)]">
                    ₹
                    {Number(
                      handover.finalValue || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-3 border-t border-[var(--border)] pt-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <MapPin size={14} />
                    Location
                  </span>

                  <span className="max-w-[60%] truncate text-right text-xs font-medium">
                    {handover.location || "—"}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <span className="text-xs text-[var(--muted)]">
                    Recorded
                  </span>

                  <span className="text-xs font-medium">
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
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    p-5
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
                      <p className="text-sm font-semibold">
                        GPS Evidence
                      </p>

                      <p className="mt-0.5 text-xs text-[var(--muted)]">
                        Recorded at handover
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      mt-4
                      rounded-2xl
                      bg-[var(--surface-soft)]
                      px-4
                      py-3
                      text-xs
                      text-[var(--muted)]
                    "
                  >
                    {handover.latitude.toFixed(5)},{" "}
                    {handover.longitude.toFixed(5)}
                  </div>
                </section>
              )}

            {/* Evidence */}
            {handover.photos?.length > 0 && (
              <section
                className="
                  rounded-3xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface)]
                  p-5
                  sm:p-6
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">
                      Evidence Photos
                    </h2>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Photos captured during handover
                    </p>
                  </div>

                  <span className="text-xs font-medium text-[var(--muted)]">
                    {handover.photos.length}{" "}
                    {handover.photos.length === 1
                      ? "photo"
                      : "photos"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {handover.photos.map(
                    (photo) => (
                      <div
                        key={photo.id}
                        className="
                          aspect-square
                          overflow-hidden
                          rounded-2xl
                          bg-[var(--surface-soft)]
                        "
                      >
                        <img
                          src={photo.url}
                          alt="Handover evidence"
                          loading="lazy"
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                        />
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/collector/lots/${id}`
              )
            }
            className="
              mt-5
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
              font-semibold
              transition
              hover:bg-[var(--surface-soft)]
              active:scale-[0.99]
            "
          >
            <ArrowLeft size={17} />
            Back to Lot
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────
     New Handover
  ───────────────────────────── */

  return (
    <div className="w-full">
      <div
        className="
          mx-auto
          w-full
          max-w-3xl
          px-4
          py-5
          pb-32
          sm:px-6
          sm:py-8
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

        {/* Quick summary */}
        <section
          className="
            mb-5
            rounded-3xl
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-4
          "
        >
          <div className="grid grid-cols-2 gap-3">

            <div
              className="
                rounded-2xl
                bg-[var(--surface-soft)]
                p-3
              "
            >
              <p className="text-[11px] text-[var(--muted)]">
                Material
              </p>

              <p className="mt-1 truncate text-sm font-semibold">
                {lot?.material || "—"}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                bg-[var(--surface-soft)]
                p-3
              "
            >
              <p className="text-[11px] text-[var(--muted)]">
                Approx. Weight
              </p>

              <p className="mt-1 text-sm font-semibold">
                {lot?.approximateWeight || "—"}{" "}
                {lot?.weightUnit || "kg"}
              </p>
            </div>

          </div>
        </section>

        <div className="space-y-4">

          <HandoverWeight
            value={actualWeight}
            onChange={setActualWeight}
          />

          <HandoverValue
            value={finalValue}
            onChange={setFinalValue}
          />

          <HandoverLocation
            location={location}
            latitude={latitude}
            longitude={longitude}
            onLocationChange={setLocation}
          />

          <HandoverPhotoSection
            photos={photos}
            onAddPhotos={handleAddPhotos}
            onRemovePhoto={handleRemovePhoto}
          />

          {error && (
            <div
              className="
                rounded-2xl
                border
                border-[var(--danger)]/20
                bg-[var(--danger)]/10
                px-4
                py-3
                text-sm
                text-[var(--danger)]
              "
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="
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
                font-medium
                text-[var(--success)]
              "
            >
              <CheckCircle2
                size={19}
                className="shrink-0"
              />

              Handover recorded successfully.
            </div>
          )}

          {/* Submit */}
          <div
            className="
              sticky
              bottom-20
              z-10
              pt-2
              sm:static
              sm:pt-1
            "
          >
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-[var(--primary)]
                px-5
                py-4
                text-sm
                font-semibold
                text-[var(--primary-foreground)]
                shadow-xl
                shadow-black/10
                transition
                hover:opacity-90
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {submitting ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Recording Handover...
                </>
              ) : (
                <>
                  <CheckCircle2 size={19} />
                  Record Handover
                </>
              )}
            </button>

            <p
              className="
                mt-2
                text-center
                text-[11px]
                leading-4
                text-[var(--muted)]
              "
            >
              Your handover details and evidence
              will be securely recorded.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Handover;