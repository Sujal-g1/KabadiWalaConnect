import {
  Camera,
  ImagePlus,
  X,
  Check,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

const MAX_PHOTOS = 5;

const LotPhotoSection = ({
  photos,
  onAddPhotos,
  onRemovePhoto,
}) => {
  const photoCount = photos.length;
  const isFull =
    photoCount >= MAX_PHOTOS;

  const handleFiles = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length) {
      onAddPhotos(files);
    }

    event.target.value = "";
  };

  return (
    <section className="space-y-4">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[var(--accent)]
                text-[var(--primary)]
              "
            >
              <Camera
                size={16}
                strokeWidth={2.2}
              />
            </div>

            <h2
              className="
                text-base
                font-bold
                tracking-tight
                text-[var(--foreground)]
              "
            >
              Add photos
            </h2>
          </div>

          <p
            className="
              mt-1.5
              max-w-sm
              text-xs
              leading-5
              text-[var(--muted)]
              sm:text-sm
            "
          >
            Add clear photos so the material can be
            identified and valued accurately.
          </p>
        </div>

        <div
          className="
            shrink-0
            rounded-full
            border
            border-[var(--border)]
            bg-[var(--background)]
            px-2.5
            py-1.5
            text-[10px]
            font-bold
            text-[var(--muted)]
          "
        >
          <span
            className={
              photoCount > 0
                ? "text-[var(--primary)]"
                : ""
            }
          >
            {photoCount}
          </span>
          <span className="mx-0.5">
            /
          </span>
          {MAX_PHOTOS}
        </div>
      </div>

      {/* =====================================================
          PHOTO GRID
      ===================================================== */}

      {photoCount > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <AnimatePresence initial={false}>
            {photos.map((photo, index) => {
              const isFirst = index === 0;

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 25,
                  }}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-sm

                    ${
                      isFirst
                        ? "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-square"
                        : "aspect-square"
                    }
                  `}
                >
                  <img
                    src={photo.preview}
                    alt={`E-waste photo ${
                      index + 1
                    }`}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
                    "
                  />

                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      h-20
                      bg-gradient-to-t
                      from-black/60
                      to-transparent
                    "
                  />

                  {/* PHOTO NUMBER */}

                  <div
                    className="
                      absolute
                      bottom-2.5
                      left-2.5
                      flex
                      h-6
                      min-w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-black/50
                      px-1.5
                      text-[9px]
                      font-bold
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {index + 1}
                  </div>

                  {/* MAIN PHOTO LABEL */}

                  {isFirst && (
                    <span
                      className="
                        absolute
                        bottom-2.5
                        left-11
                        rounded-full
                        bg-black/45
                        px-2
                        py-1
                        text-[9px]
                        font-semibold
                        text-white
                        backdrop-blur-md
                        sm:hidden
                      "
                    >
                      Main photo
                    </span>
                  )}

                  {/* REMOVE */}

                  <motion.button
                    type="button"
                    whileTap={{
                      scale: 0.85,
                    }}
                    onClick={() =>
                      onRemovePhoto(
                        photo.id
                      )
                    }
                    aria-label={`Remove photo ${
                      index + 1
                    }`}
                    className="
                      absolute
                      right-2
                      top-2
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-black/55
                      text-white
                      backdrop-blur-md
                      transition
                      hover:bg-black/70
                    "
                  >
                    <X
                      size={15}
                      strokeWidth={2.4}
                    />
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* =================================================
              ADD ANOTHER
          ================================================= */}

          {!isFull && (
            <motion.div
              layout
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                relative
                aspect-square
                overflow-hidden
                rounded-[20px]
                border-2
                border-dashed
                border-[var(--border)]
                bg-[var(--background)]
                transition
                duration-200
                hover:border-[var(--primary)]/40
              "
            >
              <div
                className="
                  flex
                  h-full
                  flex-col
                  items-center
                  justify-center
                  px-2
                  text-center
                  sm:px-4
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--surface)]
                    text-[var(--primary)]
                    shadow-sm
                    sm:h-14
                    sm:w-14
                  "
                >
                  <ImagePlus
                    size={21}
                    strokeWidth={2}
                    className="sm:hidden"
                  />

                  <ImagePlus
                    size={24}
                    strokeWidth={2}
                    className="hidden sm:block"
                  />
                </div>

                <p
                  className="
                    mt-2
                    text-xs
                    font-bold
                    text-[var(--foreground)]
                    sm:mt-3
                    sm:text-sm
                  "
                >
                  Add photo
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    text-[var(--muted)]
                    sm:text-[11px]
                  "
                >
                  {photoCount}/{MAX_PHOTOS}
                </p>

                <div
                  className="
                    mt-3
                    flex
                    gap-1.5
                    sm:gap-2
                  "
                >
                  {/* CAMERA */}

                  <label
                    className="
                      flex
                      h-8
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      px-2
                      text-[10px]
                      font-semibold
                      text-[var(--foreground)]
                      shadow-sm
                      active:scale-95
                      sm:h-9
                      sm:rounded-xl
                      sm:px-3
                      sm:text-[11px]
                    "
                  >
                    <Camera
                      size={13}
                      className="mr-1"
                    />

                    Camera

                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFiles}
                      className="hidden"
                    />
                  </label>

                  {/* GALLERY */}

                  <label
                    className="
                      flex
                      h-8
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-[var(--border)]
                      bg-[var(--surface)]
                      px-2
                      text-[10px]
                      font-semibold
                      text-[var(--foreground)]
                      shadow-sm
                      active:scale-95
                      sm:h-9
                      sm:rounded-xl
                      sm:px-3
                      sm:text-[11px]
                    "
                  >
                    <ImagePlus
                      size={13}
                      className="mr-1"
                    />

                    Gallery

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFiles}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* ====================================================
           EMPTY STATE
        ==================================================== */

        <motion.div
          initial={{
            opacity: 0,
            y: 6,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative
            overflow-hidden
            rounded-[22px]
            border-2
            border-dashed
            border-[var(--border)]
            bg-[var(--background)]
            p-4
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              text-center
              sm:flex-row
              sm:text-left
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-[18px]
                bg-[var(--accent)]
                text-[var(--primary)]
                sm:h-16
                sm:w-16
              "
            >
              <ImagePlus
                size={25}
                strokeWidth={2}
              />
            </div>

            <div
              className="
                mt-3
                min-w-0
                flex-1
                sm:ml-4
                sm:mt-0
              "
            >
              <h3
                className="
                  text-sm
                  font-bold
                  text-[var(--foreground)]
                "
              >
                Add a clear photo
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[var(--muted)]
                "
              >
                Capture the e-waste from a clear angle.
                You can add up to {MAX_PHOTOS} photos.
              </p>

              {/* ACTIONS */}

              <div
                className="
                  mt-3
                  flex
                  w-full
                  gap-2
                  sm:w-auto
                "
              >
                {/* CAMERA */}

                <label
                  className="
                    flex
                    h-10
                    flex-1
                    cursor-pointer
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    bg-[var(--primary)]
                    px-3
                    text-[11px]
                    font-bold
                    text-[var(--primary-foreground)]
                    transition
                    active:scale-[0.98]
                    sm:flex-none
                  "
                >
                  <Camera size={14} />

                  Camera

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>

                {/* GALLERY */}

                <label
                  className="
                    flex
                    h-10
                    flex-1
                    cursor-pointer
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    px-3
                    text-[11px]
                    font-bold
                    text-[var(--foreground)]
                    transition
                    active:scale-[0.98]
                    sm:flex-none
                  "
                >
                  <ImagePlus size={14} />

                  Gallery

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* =====================================================
          QUALITY HINT
      ===================================================== */}

      <div
        className="
          flex
          items-start
          gap-2.5
          px-1
        "
      >
        <div
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <Check
            size={14}
            strokeWidth={2.5}
          />
        </div>

        <p
          className="
            pt-0.5
            text-[11px]
            leading-4
            text-[var(--muted)]
          "
        >
          Clear photos from different angles can help
          improve material identification and valuation.
        </p>
      </div>
    </section>
  );
};

export default LotPhotoSection;