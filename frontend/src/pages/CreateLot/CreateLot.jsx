import { useEffect, useState } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LotPhotoSection from "./components/LotPhotoSection";
import MaterialSelector from "./components/MaterialSelector";
import WeightInput from "./components/WeightInput";
import LocationSection from "./components/LocationSection";
import LotDescription from "./components/LotDescription";
import ValuationPreview from "./components/ValuationPreview";

import useCurrentLocation from "../../hooks/useCurrentLocation";
import {
  calculateValuation,
} from "../../services/prices/priceApi";

import {
  createLot,
  uploadLotPhoto,
  finalizeLot,
} from "../../services/lots/lotApi";

import compressImage from "../../utils/compressImage";

const MAX_PHOTOS = 5;

const CreateLot = () => {
  const navigate = useNavigate();

  const location = useCurrentLocation();

  const [material, setMaterial] = useState("");
  const [subcategory, setSubcategory] =
    useState("");

  const [photos, setPhotos] = useState([]);

  const [weight, setWeight] = useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [condition, setCondition] =
    useState("");

  const [valuation, setValuation] =
    useState(null);

  const [valuationLoading, setValuationLoading] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [error, setError] =
    useState("");

  const pricingLocation =
    selectedLocation ||
    location?.city ||
    "";

  /*
   * --------------------------------------------------
   * Reset valuation whenever important lot data changes
   * --------------------------------------------------
   */

  useEffect(() => {
    setValuation(null);
  }, [
    material,
    subcategory,
    weight,
    pricingLocation,
  ]);

  /*
   * --------------------------------------------------
   * Cleanup photo preview URLs
   * --------------------------------------------------
   */

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo.preview) {
          URL.revokeObjectURL(photo.preview);
        }
      });
    };
  }, []);

  /*
   * --------------------------------------------------
   * Validation
   * --------------------------------------------------
   */

  const weightNumber = Number(weight);

  const canCalculate =
    photos.length > 0 &&
    material.trim() !== "" &&
    weight.trim() !== "" &&
    Number.isFinite(weightNumber) &&
    weightNumber > 0 &&
    pricingLocation.trim() !== "";

  const validateLot = () => {
    if (photos.length === 0) {
      return "Please add at least one photo.";
    }

    if (!material) {
      return "Please select a material.";
    }

    if (!weight || !Number.isFinite(weightNumber)) {
      return "Please enter a valid weight.";
    }

    if (weightNumber <= 0) {
      return "Weight must be greater than 0 kg.";
    }

    if (!pricingLocation) {
      return "Collection location is required.";
    }

    if (!valuation) {
      return "Please calculate the estimated value first.";
    }

    return null;
  };

  /*
   * --------------------------------------------------
   * Calculate valuation
   * --------------------------------------------------
   */

  const handleCalculate = async () => {
    setError("");

    if (!canCalculate) {
      setError(
        "Please add a photo, select material, enter weight, and provide a location."
      );

      return;
    }

    try {
      setValuationLoading(true);

      const result =
        await calculateValuation({
          material,
          subcategory,
          weight: weightNumber,
          location: pricingLocation,
        });

      const calculatedValuation =
        result?.valuation || result;

      if (!calculatedValuation) {
        throw new Error(
          "Unable to calculate valuation."
        );
      }

      setValuation(
        calculatedValuation
      );
    } catch (error) {
      console.error(
        "Valuation error:",
        error
      );

      setValuation(null);

      setError(
        error?.message ||
          "Unable to calculate valuation."
      );
    } finally {
      setValuationLoading(false);
    }
  };

  /*
   * --------------------------------------------------
   * Create + upload + finalize
   * --------------------------------------------------
   */

  const handleCreateLot = async () => {
    setError("");

    const validationError =
      validateLot();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setCreating(true);

      /*
       * STEP 1
       * Create database lot
       */

      const result = await createLot({
        material,
        subcategory:
          subcategory || null,

        approximateWeight:
          weightNumber,

        weightUnit: "kg",

        latitude:
          typeof location?.latitude ===
          "number"
            ? location.latitude
            : null,

        longitude:
          typeof location?.longitude ===
          "number"
            ? location.longitude
            : null,

        location:
          pricingLocation,

        description:
          description.trim() || null,

        condition:
          condition || null,

        estimatedRate:
          valuation?.rate ??
          valuation?.estimatedRate ??
          null,

        minEstimatedValue:
          valuation?.minEstimatedValue ??
          null,

        maxEstimatedValue:
          valuation?.maxEstimatedValue ??
          null,

        estimatedValue:
          valuation?.estimatedValue ??
          null,
      });

      const lot = result?.lot;

      if (!lot?.id) {
        throw new Error(
          "Lot was created but no lot ID was returned."
        );
      }

      /*
       * STEP 2
       * Upload photos
       */

      for (
        let index = 0;
        index < photos.length;
        index++
      ) {
        const photo = photos[index];

        if (!photo?.file) {
          continue;
        }

        await uploadLotPhoto(
          lot.id,
          photo.file
        );
      }

      /*
       * STEP 3
       * Finalize lot
       *
       * Backend changes:
       * CREATED → AVAILABLE
       */

      await finalizeLot(lot.id);

      /*
       * STEP 4
       * Navigate to lot details
       */

      navigate(
        `/collector/lots/${lot.id}`,
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Lot creation flow failed:",
        error
      );

      setError(
        error?.message ||
          "Unable to complete lot creation."
      );
    } finally {
      setCreating(false);
    }
  };

  /*
   * --------------------------------------------------
   * Add photos
   * --------------------------------------------------
   */

  const handleAddPhotos = async (
    files
  ) => {
    if (!files?.length) {
      return;
    }

    setError("");

    const remainingSlots =
      MAX_PHOTOS - photos.length;

    if (remainingSlots <= 0) {
      setError(
        `You can add a maximum of ${MAX_PHOTOS} photos.`
      );

      return;
    }

    const selectedFiles =
      files.slice(0, remainingSlots);

    const compressedPhotos = [];

    for (
      const file of selectedFiles
    ) {
      if (
        !file.type.startsWith("image/")
      ) {
        continue;
      }

      try {
        const compressedFile =
          await compressImage(file);

        compressedPhotos.push({
          id: crypto.randomUUID(),
          file: compressedFile,
          preview:
            URL.createObjectURL(
              compressedFile
            ),
        });
      } catch (error) {
        console.error(
          "Image compression failed:",
          error
        );

        compressedPhotos.push({
          id: crypto.randomUUID(),
          file,
          preview:
            URL.createObjectURL(file),
        });
      }
    }

    if (
      compressedPhotos.length === 0
    ) {
      setError(
        "No valid image files were selected."
      );

      return;
    }

    setPhotos((previous) => [
      ...previous,
      ...compressedPhotos,
    ]);
  };

  /*
   * --------------------------------------------------
   * Remove photo
   * --------------------------------------------------
   */

  const handleRemovePhoto = (
    photoId
  ) => {
    setPhotos((previous) => {
      const photo =
        previous.find(
          (item) =>
            item.id === photoId
        );

      if (photo?.preview) {
        URL.revokeObjectURL(
          photo.preview
        );
      }

      return previous.filter(
        (item) =>
          item.id !== photoId
      );
    });
  };

  /*
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */

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
            gap-3
            px-4
          "
        >
          <button
            type="button"
            disabled={creating}
            onClick={() =>
              navigate(-1)
            }
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
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="font-semibold">
              Add E-Waste
            </h1>

            <p className="text-xs text-[var(--muted)]">
              Create a new lot
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main
        className="
          mx-auto
          max-w-2xl
          space-y-7
          px-4
          py-6
          pb-32
        "
      >

        {/* Error */}
        {error && (
          <div
            role="alert"
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

        {/* Photos */}
        <LotPhotoSection
          photos={photos}
          onAddPhotos={
            handleAddPhotos
          }
          onRemovePhoto={
            handleRemovePhoto
          }
        />

        {/* Material */}
        <MaterialSelector
          material={material}
          subcategory={
            subcategory
          }
          onMaterialChange={
            setMaterial
          }
          onSubcategoryChange={
            setSubcategory
          }
        />

        {/* Weight */}
        <WeightInput
          weight={weight}
          onChange={setWeight}
        />

        {/* Location */}
        <LocationSection
          location={location}
          selectedLocation={
            selectedLocation
          }
          onChange={
            setSelectedLocation
          }
        />

        {/* Description */}
        <LotDescription
          description={description}
          condition={condition}
          onDescriptionChange={
            setDescription
          }
          onConditionChange={
            setCondition
          }
        />

        {/* Valuation */}
        <div className="space-y-3">

          <button
            type="button"
            disabled={
              !canCalculate ||
              valuationLoading ||
              creating
            }
            onClick={
              handleCalculate
            }
            className="
              flex
              min-h-14
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[var(--primary)]
              px-5
              py-4
              font-semibold
              text-[var(--primary-foreground)]
              transition
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {valuationLoading ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />

                Calculating...
              </>
            ) : (
              "Calculate Estimated Value"
            )}
          </button>

          <ValuationPreview
            valuation={valuation}
            loading={
              valuationLoading
            }
          />
        </div>

        {/* Create Lot */}
        {valuation && (
          <button
            type="button"
            disabled={creating}
            onClick={
              handleCreateLot
            }
            className="
              flex
              min-h-14
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[var(--primary)]
              px-5
              py-4
              font-semibold
              text-[var(--primary-foreground)]
              transition
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {creating ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />

                Creating Lot...
              </>
            ) : (
              <>
                <Check size={20} />

                Create Lot
              </>
            )}
          </button>
        )}

      </main>
    </div>
  );
};

export default CreateLot;