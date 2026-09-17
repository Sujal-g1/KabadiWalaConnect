import { ImageOff } from "lucide-react";

const LotPhotos = ({ photos = [] }) => {
  if (photos.length === 0) {
    return (
      <div
        className="
          flex
          aspect-[4/3]
          items-center
          justify-center
          rounded-3xl
          bg-[var(--surface-soft)]
          text-[var(--muted)]
        "
      >
        <div className="flex flex-col items-center gap-2">
          <ImageOff size={28} />

          <span className="text-sm">
            No photos
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="
          aspect-[4/3]
          overflow-hidden
          rounded-3xl
          bg-[var(--surface-soft)]
        "
      >
        <img
          src={photos[0].url}
          alt="E-waste lot"
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {photos.slice(1).map((photo) => (
            <div
              key={photo.id}
              className="
                aspect-square
                overflow-hidden
                rounded-xl
                bg-[var(--surface-soft)]
              "
            >
              <img
                src={photo.url}
                alt="E-waste lot"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LotPhotos;