import {
  Camera,
  Check,
  ImagePlus,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

const HandoverPhotoSection = ({
  photos = [],
  onAddPhotos,
  onRemovePhoto,
}) => {
  const handleFiles = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length > 0) {
      onAddPhotos(files);
    }

    event.target.value = "";
  };

  const hasPhotos =
    photos.length > 0;

  return (
    <section
      className="
        rounded-[28px]
        border
        border-[var(--border)]
        bg-[linear-gradient(135deg,var(--surface)_0%,var(--background)_110%)]
        p-5
        shadow-[0_12px_35px_rgba(18,63,45,0.07)]
        sm:p-6
      "
    >
      {/* HEADER */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <Camera size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-extrabold">
                Handover Evidence
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[var(--muted)]
                "
              >
                Add photos showing the material being handed
                over.
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
              {photos.length}
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD */}

      {!hasPhotos && (
        <motion.label
          whileTap={{
            scale: 0.985,
          }}
          className="
            mt-5
            flex
            min-h-40
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-[22px]
            border-2
            border-dashed
            border-[var(--border)]
            bg-[var(--background)]
            px-4
            py-6
            text-center
            transition
            hover:border-[var(--primary)]/40
          "
        >
          <input
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            className="hidden"
            onChange={handleFiles}
          />

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-[18px]
              bg-[var(--accent)]
              text-[var(--primary)]
              shadow-sm
            "
          >
            <ImagePlus size={24} />
          </div>

          <span
            className="
              mt-3
              text-sm
              font-extrabold
            "
          >
            Add handover photos
          </span>

          <span
            className="
              mt-1
              text-[11px]
              text-[var(--muted)]
            "
          >
            Use your camera or choose from gallery
          </span>
        </motion.label>
      )}

      {/* PHOTOS */}

      {hasPhotos && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <AnimatePresence initial={false}>
              {photos.map(
                (photo, index) => (
                  <motion.div
                    key={`${photo.name}-${index}`}
                    layout
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                    }}
                    className="
                      group
                      relative
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
                      src={photo.preview}
                      alt={`Handover evidence ${
                        index + 1
                      }`}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-16
                        bg-gradient-to-t
                        from-black/50
                        to-transparent
                      "
                    />

                    <span
                      className="
                        absolute
                        bottom-2
                        left-2
                        flex
                        h-6
                        min-w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-black/45
                        px-1.5
                        text-[9px]
                        font-bold
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        onRemovePhoto(
                          index
                        )
                      }
                      aria-label="Remove photo"
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
                        active:scale-90
                      "
                    >
                      <X size={15} />
                    </button>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* Add more */}

            <label
              className="
                flex
                aspect-square
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-[20px]
                border-2
                border-dashed
                border-[var(--border)]
                bg-[var(--background)]
                text-center
                transition
                hover:border-[var(--primary)]/40
              "
            >
              <input
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                className="hidden"
                onChange={handleFiles}
              />

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
                "
              >
                <ImagePlus size={20} />
              </div>

              <span
                className="
                  mt-2
                  text-[11px]
                  font-bold
                "
              >
                Add more
              </span>
            </label>
          </div>

          <div
            className="
              mt-4
              flex
              items-center
              gap-2.5
              rounded-xl
              bg-[var(--accent)]
              px-3
              py-2.5
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
                bg-[var(--primary)]
                text-white
              "
            >
              <Check size={13} />
            </div>

            <p
              className="
                text-[10px]
                font-medium
                leading-4
                text-[var(--muted)]
              "
            >
              {photos.length} evidence{" "}
              {photos.length === 1
                ? "photo"
                : "photos"}{" "}
              ready to upload.
            </p>
          </div>
        </>
      )}

      {!hasPhotos && (
        <p
          className="
            mt-3
            text-center
            text-[10px]
            font-medium
            text-[var(--danger)]
          "
        >
          At least one photo is required.
        </p>
      )}
    </section>
  );
};

export default HandoverPhotoSection;