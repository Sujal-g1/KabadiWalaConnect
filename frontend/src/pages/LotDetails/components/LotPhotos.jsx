import {
  ImageOff,
  Images,
} from "lucide-react";

const LotPhotos = ({ photos = [] }) => {
  if (!photos.length) {
    return (
      <section
        className="
          flex
          aspect-[4/3]
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
        "
      >
        <div className="flex flex-col items-center gap-2 text-[var(--muted)]">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-[var(--surface-soft)]
            "
          >
            <ImageOff size={23} />
          </div>

          <span className="text-sm font-medium">
            No photos available
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">

      {/* Main image */}
      <div
        className="
          group
          relative
          aspect-[4/3]
          overflow-hidden
          rounded-3xl
          bg-[var(--surface-soft)]
        "
      >
        <img
          src={photos[0].url}
          alt="E-waste lot"
          loading="eager"
          className="
            h-full
            w-full
            object-cover
            transition
            duration-300
            group-hover:scale-[1.02]
          "
        />

        {photos.length > 1 && (
          <div
            className="
              absolute
              bottom-3
              right-3
              flex
              items-center
              gap-1.5
              rounded-xl
              bg-black/60
              px-2.5
              py-1.5
              text-xs
              font-medium
              text-white
              backdrop-blur-md
            "
          >
            <Images size={13} />
            {photos.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {photos.slice(1).map((photo) => (
            <div
              key={photo.id}
              className="
                aspect-square
                overflow-hidden
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface-soft)]
              "
            >
              <img
                src={photo.url}
                alt="E-waste lot"
                loading="lazy"
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

    </section>
  );
};

export default LotPhotos;