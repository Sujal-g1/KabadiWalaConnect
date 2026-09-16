import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import LotPhotoSection from "./components/LotPhotoSection";
import MaterialSelector from "./components/MaterialSelector";
import WeightInput from "./components/WeightInput";
import LocationSection from "./components/LocationSection";
import LotDescription from "./components/LotDescription";
import ValuationPreview from "./components/ValuationPreview";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { calculateValuation, } from "../../services/prices/priceApi";
import { createLot,uploadLotPhoto, finalizeLot } from "../../services/lots/lotApi";
import compressImage from"../../utils/compressImage";


const CreateLot = () => {
  const navigate = useNavigate();

  const location = useCurrentLocation();

  const [material, setMaterial] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [photos, setPhotos] = useState([]);
  const [weight, setWeight] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [valuation, setValuation] = useState(null);
  const [valuationLoading, setValuationLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const pricingLocation = selectedLocation ||location.city;

  const canCalculate = photos.length > 0 &&
    material &&
    weight &&
    Number(weight) > 0 &&
    pricingLocation;

  const handleCalculate = async () => {
    try {
      setError("");
      setValuationLoading(true);

      const result =
        await calculateValuation({
          material,
          subcategory,
          weight: Number(weight),
          location: pricingLocation,
        });

      setValuation(
        result.valuation || result
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to calculate valuation"
      );
    } finally {
      setValuationLoading(false);
    }
  };

const handleCreateLot = async () => {
  try {
    setError("");
    setCreating(true);

    if (photos.length === 0) {
      throw new Error(
        "Please add at least one photo."
      );
    }

    if (!valuation) {
      throw new Error(
        "Please calculate the estimated value first."
      );
    }

    const result = await createLot({
      material,
      subcategory,

      approximateWeight:
        Number(weight),

      weightUnit: "kg",

      latitude:
        typeof location.latitude === "number"
          ? location.latitude
          : null,

      longitude:
        typeof location.longitude === "number"
          ? location.longitude
          : null,

      location:
        pricingLocation,

      description,
      condition,

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

    const lot = result.lot;

    // Upload all photos
    for (const photo of photos) {
      await uploadLotPhoto(
        lot.id,
        photo.file
      );
    }

    // Make lot visible to recyclers
    await finalizeLot(lot.id);

    navigate(
      `/collector/lots/${lot.id}`
    );
  } catch (error) {
    console.error(
      "Lot creation/upload/finalization error:",
      error
    );

    setError(
      error.message ||
        "Unable to complete lot creation"
    );
  } finally {
    setCreating(false);
  }
};

const handleAddPhotos = async (files) => {
  const remainingSlots = 5 - photos.length;
  const selectedFiles =files.slice(0, remainingSlots);

  const compressedPhotos = [];

  for (const file of selectedFiles) {
    try {
      const compressedFile = await compressImage(file);

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

  setPhotos((prev) => [
    ...prev,
    ...compressedPhotos,
  ]);
};

const handleRemovePhoto = (photoId) => {
  setPhotos((prev) => {
    const photoToRemove =
      prev.find(
        (photo) => photo.id === photoId
      );

    if (photoToRemove?.preview) {
      URL.revokeObjectURL(
        photoToRemove.preview
      );
    }

    return prev.filter(
      (photo) => photo.id !== photoId
    );
  });
};

    return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-2xl items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)]"
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

      <main className="mx-auto max-w-2xl space-y-7 px-4 py-6 pb-32">
        {error && (
          <div className="rounded-2xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-4 text-sm text-[var(--danger)]">
            {error}
          </div>
        )}

        <LotPhotoSection
          photos={photos}
          onAddPhotos={handleAddPhotos}
          onRemovePhoto={handleRemovePhoto}
        />

        <MaterialSelector
          material={material}
          subcategory={subcategory}
          onMaterialChange={setMaterial}
          onSubcategoryChange={
            setSubcategory
          }
        />

        <WeightInput
          weight={weight}
          onChange={setWeight}
        />

        <LocationSection
          location={location}
          selectedLocation={
            selectedLocation
          }
          onChange={
            setSelectedLocation
          }
        />

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

        <div className="space-y-3">
          <button
            type="button"
            disabled={
              !canCalculate ||
              valuationLoading
            }
            onClick={handleCalculate}
            className="w-full rounded-2xl bg-[var(--primary)] px-5 py-4 font-semibold text-[var(--primary-foreground)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {valuationLoading
              ? "Calculating..."
              : "Calculate Estimated Value"}
          </button>

          <ValuationPreview
            valuation={valuation}
            loading={valuationLoading}
          />
        </div>

        {valuation && (
          <button
            type="button"
            disabled={creating}
            onClick={handleCreateLot}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-5 py-4 font-semibold text-[var(--primary-foreground)] disabled:opacity-50"
          >
            <Check size={20} />

            {creating
              ? "Creating Lot..."
              : "Create Lot"}
          </button>
        )}
      </main>
    </div>
  );
};

export default CreateLot;



