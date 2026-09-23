import {
  Camera,
  ImagePlus,
  X,
} from "lucide-react";

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

  return (
    <section
      className="
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-5
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-xl
            bg-[var(--accent)]
            text-[var(--primary)]
          "
        >
          <Camera size={19} />
        </div>

        <div>
          <h2 className="text-sm font-semibold">
            Handover Evidence
          </h2>

          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Add photos showing the material being handed over.
          </p>
        </div>
      </div>

      <label
        className="
          mt-5
          flex
          min-h-24
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-[var(--border)]
          bg-[var(--surface-soft)]
          px-4
          py-5
          text-center
          transition
          hover:border-[var(--primary)]/40
          hover:bg-[var(--accent)]
          active:scale-[0.99]
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
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <ImagePlus size={19} />
        </div>

        <span className="mt-2 text-sm font-semibold">
          Add photos
        </span>

        <span className="mt-0.5 text-xs text-[var(--muted)]">
          Camera or gallery
        </span>
      </label>

      {photos.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-[var(--muted)]">
              {photos.length}{" "}
              {photos.length === 1
                ? "photo"
                : "photos"}{" "}
              added
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div
                key={`${photo.name}-${index}`}
                className="
                  group
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-2xl
                  bg-[var(--surface-soft)]
                "
              >
                <img
                  src={photo.preview}
                  alt={`Handover evidence ${index + 1}`}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    onRemovePhoto(index)
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
                    bg-black/60
                    text-white
                    backdrop-blur-sm
                    transition
                    hover:bg-black/75
                    active:scale-90
                  "
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {photos.length === 0 && (
        <p className="mt-3 text-center text-[11px] text-[var(--danger)]">
          At least one photo is required.
        </p>
      )}
    </section>
  );
};

export default HandoverPhotoSection;