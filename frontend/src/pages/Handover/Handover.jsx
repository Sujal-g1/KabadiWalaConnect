import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

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
        currentLot.estimatedValue ??
          ""
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

  const handleAddPhotos = (
    files
  ) => {
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

  const handleRemovePhoto = (
    index
  ) => {
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

      /*
       * Reload the handover so that
       * uploaded photos are included.
       */
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

  if (loading) {
    return (
      <div
        className="
          flex min-h-screen
          items-center justify-center
          bg-[var(--background)]
          text-[var(--foreground)]
        "
      >
        <Loader2
          size={28}
          className="animate-spin"
        />
      </div>
    );
  }

  if (error && !lot) {
    return (
      <div
        className="
          min-h-screen
          bg-[var(--background)]
          px-4 py-6
          text-[var(--foreground)]
        "
      >
        <div
          className="
            rounded-2xl
            border border-[var(--danger)]/30
            bg-[var(--surface)]
            p-5
          "
        >
          {error}
        </div>
      </div>
    );
  }

  /*
   * Existing handover
   */

  if (handover) {
    return (
      <div
        className="
          min-h-screen
          bg-[var(--background)]
          text-[var(--foreground)]
        "
      >
        <div
          className="
            mx-auto w-full max-w-2xl
            px-4 py-6
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
                mb-4 flex items-center gap-3
                rounded-2xl
                border border-[var(--success)]/20
                bg-[var(--success)]/10
                p-4
                text-[var(--success)]
              "
            >
              <CheckCircle2 size={22} />

              <p className="text-sm font-medium">
                Handover recorded successfully.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <HandoverStatus
              status={handover.status}
            />

            <div
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                p-5
              "
            >
              <p className="text-xs text-[var(--muted)]">
                Handover Reference
              </p>

              <p className="mt-1 font-semibold">
                {handover.referenceId}
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">
                    Actual Weight
                  </span>

                  <span className="font-semibold">
                    {handover.actualWeight}{" "}
                    {handover.weightUnit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">
                    Final Value
                  </span>

                  <span className="font-semibold">
                    ₹
                    {handover.finalValue ??
                      0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">
                    Location
                  </span>

                  <span className="font-semibold">
                    {handover.location ||
                      "—"}
                  </span>
                </div>
              </div>
            </div>

            {handover.photos?.length >
              0 && (
              <div
                className="
                  rounded-2xl
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  p-5
                "
              >
                <h2 className="text-sm font-semibold">
                  Evidence Photos
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {handover.photos.map(
                    (photo) => (
                      <img
                        key={photo.id}
                        src={photo.url}
                        alt="Handover evidence"
                        className="
                          aspect-square
                          w-full
                          rounded-xl
                          object-cover
                        "
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /*
   * New handover
   */

  return (
    <div
      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      <div
        className="
          mx-auto w-full max-w-2xl
          px-4 py-6 pb-28
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

          {error && (
            <div
              className="
                rounded-xl
                border border-[var(--danger)]/30
                bg-[var(--danger)]/10
                px-4 py-3
                text-sm
                text-[var(--danger)]
              "
            >
              {error}
            </div>
          )}

          <button
            type="button"
            disabled={submitting}
            onClick={handleSubmit}
            className="
              flex w-full
              items-center justify-center
              gap-2 rounded-2xl
              bg-[var(--primary)]
              px-5 py-4
              font-semibold
              text-[var(--primary-foreground)]
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
                  size={20}
                  className="animate-spin"
                />

                Recording Handover...
              </>
            ) : (
              "Record Handover"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Handover;