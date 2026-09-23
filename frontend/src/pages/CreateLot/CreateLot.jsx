import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  Loader2,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

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

  /* ==========================================================
     STATE
  ========================================================== */

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

  /* ==========================================================
     RESET VALUATION
  ========================================================== */

  useEffect(() => {
    setValuation(null);
  }, [
    material,
    subcategory,
    weight,
    pricingLocation,
  ]);

  /* ==========================================================
     CLEANUP PHOTO PREVIEWS
  ========================================================== */

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo.preview) {
          URL.revokeObjectURL(
            photo.preview
          );
        }
      });
    };
  }, []);

  /* ==========================================================
     VALIDATION
  ========================================================== */

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

    if (
      !weight ||
      !Number.isFinite(weightNumber)
    ) {
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

  /* ==========================================================
     PROGRESS
  ========================================================== */

  const progressSteps = useMemo(
    () => [
      {
        key: "photos",
        label: "Photos",
        completed: photos.length > 0,
      },
      {
        key: "material",
        label: "Material",
        completed: Boolean(material),
      },
      {
        key: "weight",
        label: "Weight",
        completed:
          weightNumber > 0 &&
          Number.isFinite(weightNumber),
      },
      {
        key: "location",
        label: "Location",
        completed: Boolean(pricingLocation),
      },
      {
        key: "value",
        label: "Value",
        completed: Boolean(valuation),
      },
    ],
    [
      photos.length,
      material,
      weightNumber,
      pricingLocation,
      valuation,
    ]
  );

  const completedSteps =
    progressSteps.filter(
      (step) => step.completed
    ).length;

  const progressPercentage =
    (completedSteps /
      progressSteps.length) *
    100;

  /* ==========================================================
     CALCULATE VALUATION
  ========================================================== */

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

  /* ==========================================================
     CREATE + UPLOAD + FINALIZE
  ========================================================== */

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

      /* ======================================================
         STEP 1 — CREATE LOT
      ====================================================== */

      const result =
        await createLot({
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

      /* ======================================================
         STEP 2 — UPLOAD PHOTOS
      ====================================================== */

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

      /* ======================================================
         STEP 3 — FINALIZE
      ====================================================== */

      await finalizeLot(lot.id);

      /* ======================================================
         STEP 4 — DETAILS
      ====================================================== */

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

  /* ==========================================================
     ADD PHOTOS
  ========================================================== */

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

  /* ==========================================================
     REMOVE PHOTO
  ========================================================== */

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

  /* ==========================================================
     UI
  ========================================================== */
return (
  <div
    className="
      min-h-screen
      bg-[var(--background)]
      text-[var(--foreground)]
    "
  >
    {/* ======================================================
        HEADER
    ====================================================== */}

    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-[var(--border)]
        bg-[var(--background)]/88
        backdrop-blur-2xl
      "
    >
      <div
        className="
          mx-auto
          max-w-2xl
          px-4
        "
      >
        {/* HEADER ROW */}

        <div
          className="
            flex
            h-[68px]
            items-center
            gap-3
          "
        >
          <motion.button
            type="button"
            disabled={creating}
            onClick={() => navigate(-1)}
            whileTap={{
              scale: 0.9,
            }}
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
              transition
              hover:border-[var(--primary)]/30
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ArrowLeft
              size={19}
              strokeWidth={2.2}
            />
          </motion.button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1
                className="
                  truncate
                  text-base
                  font-extrabold
                  tracking-tight
                "
              >
                Create E-Waste Lot
              </h1>

              <Sparkles
                size={14}
                className="
                  shrink-0
                  text-[var(--primary)]
                "
              />
            </div>

            <p
              className="
                mt-0.5
                text-xs
                text-[var(--muted)]
              "
            >
              Add details and get an estimated value
            </p>
          </div>

          <div
            className="
              shrink-0
              rounded-full
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-2.5
              py-1.5
              text-[10px]
              font-bold
              text-[var(--muted)]
            "
          >
            {completedSteps}/{progressSteps.length}
          </div>
        </div>

        {/* PROGRESS BAR */}

        <div className="pb-3">
          <div
            className="
              relative
              h-1.5
              overflow-hidden
              rounded-full
              bg-[var(--border)]
            "
          >
            <motion.div
              animate={{
                width: `${progressPercentage}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
              }}
              className="
                absolute
                inset-y-0
                left-0
                rounded-full
                bg-gradient-to-r
                from-[var(--primary)]
                to-[var(--teal)]
              "
            />
          </div>

          <div
            className="
              mt-2
              flex
              items-center
              justify-between
            "
          >
            {progressSteps.map(
              (step, index) => (
                <div
                  key={step.key}
                  className="
                    flex
                    items-center
                    gap-1
                  "
                >
                  <motion.span
                    animate={{
                      scale: step.completed
                        ? 1
                        : 0.85,
                    }}
                    className={`
                      flex
                      h-4
                      w-4
                      items-center
                      justify-center
                      rounded-full
                      text-[8px]
                      font-bold

                      ${
                        step.completed
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--border)] text-[var(--muted)]"
                      }
                    `}
                  >
                    {step.completed ? (
                      <Check
                        size={9}
                        strokeWidth={3}
                      />
                    ) : (
                      index + 1
                    )}
                  </motion.span>

                  <span
                    className={`
                      hidden
                      text-[9px]
                      font-semibold
                      sm:block
                      ${
                        step.completed
                          ? "text-[var(--primary)]"
                          : "text-[var(--muted)]"
                      }
                    `}
                  >
                    {step.label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </header>

    {/* ======================================================
        MAIN
    ====================================================== */}

    <main
      className="
        mx-auto
        max-w-2xl
        px-4
        pb-36
        pt-6
      "
    >
      {/* ====================================================
          INTRO
      ==================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[var(--border)]
          bg-[var(--surface)]
          px-5
          py-5
          shadow-sm
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            h-36
            w-36
            rounded-full
            bg-[var(--accent)]
            opacity-60
            blur-3xl
          "
        />

        <div className="relative">
          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[var(--primary)]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[var(--primary)]
              "
            />

            New collection
          </div>

          <h2
            className="
              mt-2
              text-xl
              font-extrabold
              tracking-tight
            "
          >
            Create your e-waste lot
          </h2>

          <p
            className="
              mt-2
              max-w-lg
              text-sm
              leading-6
              text-[var(--muted)]
            "
          >
            Add a photo, identify the material,
            enter the weight and check the local
            estimated value.
          </p>
        </div>
      </motion.div>

      {/* ====================================================
          ERROR
      ==================================================== */}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            role="alert"
            className="
              mt-5
              rounded-2xl
              border
              border-[var(--danger)]/25
              bg-[var(--danger)]/10
              px-4
              py-3.5
              text-sm
              font-medium
              leading-5
              text-[var(--danger)]
            "
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          FORM FLOW
      ==================================================== */}

      <div className="mt-10">

        {/* PHOTO */}

        <LotPhotoSection
          photos={photos}
          onAddPhotos={
            handleAddPhotos
          }
          onRemovePhoto={
            handleRemovePhoto
          }
        />

        <div
          className="
            my-10
            h-px
            bg-[var(--border)]
          "
        />

        {/* MATERIAL */}

        <MaterialSelector
          material={material}
          subcategory={subcategory}
          onMaterialChange={
            setMaterial
          }
          onSubcategoryChange={
            setSubcategory
          }
        />

        <div
          className="
            my-10
            h-px
            bg-[var(--border)]
          "
        />

        {/* WEIGHT */}

        <WeightInput
          weight={weight}
          onChange={setWeight}
        />

        <div
          className="
            my-10
            h-px
            bg-[var(--border)]
          "
        />

        {/* LOCATION */}

        <LocationSection
          location={location}
          selectedLocation={
            selectedLocation
          }
          onChange={
            setSelectedLocation
          }
        />

        <div
          className="
            my-10
            h-px
            bg-[var(--border)]
          "
        />

        {/* MORE DETAILS */}

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

        <div
          className="
            my-10
            h-px
            bg-[var(--border)]
          "
        />

        {/* ==================================================
            VALUATION
        ================================================== */}

        <section>
          <div className="mb-5">
            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[var(--primary)]
              "
            >
              <Sparkles size={13} />

              Valuation
            </div>

            <h2
              className="
                mt-1
                text-lg
                font-extrabold
                tracking-tight
              "
            >
              Check estimated value
            </h2>

            <p
              className="
                mt-1
                text-sm
                leading-5
                text-[var(--muted)]
              "
            >
              We use the material, weight and
              location to estimate the current
              lot value.
            </p>
          </div>

          <motion.button
            type="button"
            disabled={
              !canCalculate ||
              valuationLoading ||
              creating
            }
            onClick={
              handleCalculate
            }
            whileTap={{
              scale: 0.985,
            }}
            className="
              group
              relative
              flex
              min-h-14
              w-full
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-2xl
              bg-[var(--primary)]
              px-5
              py-4
              font-bold
              text-[var(--primary-foreground)]
              shadow-lg
              shadow-black/10
              transition
              disabled:cursor-not-allowed
              disabled:opacity-45
              disabled:shadow-none
            "
          >
            <span className="relative flex items-center gap-2">
              {valuationLoading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Calculating...
                </>
              ) : (
                <>
                  Calculate Estimated Value

                  <ChevronRight
                    size={18}
                    className="
                      transition-transform
                      group-hover:translate-x-0.5
                    "
                  />
                </>
              )}
            </span>
          </motion.button>

          <div className="mt-4">
            <ValuationPreview
              valuation={valuation}
              loading={
                valuationLoading
              }
            />
          </div>
        </section>

        {/* ==================================================
            CREATE LOT
        ================================================== */}

        <AnimatePresence>
          {valuation && (
            <motion.section
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-10
                rounded-[28px]
                bg-gradient-to-br
                from-[var(--primary)]
                via-[var(--forest)]
                to-[#071D14]
                p-5
                text-white
                shadow-xl
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/10
                  "
                >
                  <Check
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-white/60
                    "
                  >
                    Ready to submit
                  </p>

                  <h2
                    className="
                      mt-1
                      text-lg
                      font-extrabold
                    "
                  >
                    Your lot is ready
                  </h2>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-white/65
                    "
                  >
                    Submit it to continue with
                    recycler matching and pickup.
                  </p>
                </div>
              </div>

              <motion.button
                type="button"
                disabled={creating}
                onClick={
                  handleCreateLot
                }
                whileTap={{
                  scale: 0.985,
                }}
                className="
                  mt-5
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
                  font-bold
                  text-[var(--primary)]
                  shadow-lg
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
                    <Check
                      size={19}
                      strokeWidth={2.7}
                    />

                    Create Lot
                  </>
                )}
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  </div>
);
};

export default CreateLot;