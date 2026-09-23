import { Camera, ImagePlus, X } from "lucide-react";

const LotPhotoSection = ({
  photos,
  onAddPhotos,
  onRemovePhoto,
}) => {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">
          Photos
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Add at least one clear photo of the e-waste.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <img
              src={photo.preview}
              alt={`E-waste ${index + 1}`}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={() =>
                onRemovePhoto(photo.id)
              }
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
            >
              <X size={17} />
            </button>
          </div>
        ))}

        {photos.length < 5 && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--primary)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
              <ImagePlus size={23} />
            </div>

            <span className="mt-3 text-sm font-semibold">
              Add photo
            </span>

            <span className="mt-1 text-xs text-[var(--muted)]">
              {photos.length}/5
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                onAddPhotos(
                  Array.from(
                    event.target.files || []
                  )
                );

                event.target.value = "";
              }}
              className="hidden"
            />
          </label>
        )}
      </div>

      {photos.length === 0 && (
        <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <Camera size={14} />
          You can use your camera or choose from gallery.
        </p>
      )}

    </div>
  );
};

export default LotPhotoSection;