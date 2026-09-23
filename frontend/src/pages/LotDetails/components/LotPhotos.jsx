import {
  ImageOff,
  Images,
  Maximize2,
} from "lucide-react";

import { motion } from "framer-motion";

const LotPhotos = ({ photos = [] }) => {
  if (!photos.length) {
    return (
      <motion.section
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          flex
          aspect-[4/3]
          items-center
          justify-center
          overflow-hidden
          rounded-[30px]
          border
          border-[var(--border)]
          bg-[linear-gradient(135deg,var(--surface)_0%,var(--background)_100%)]
          shadow-[0_16px_45px_rgba(18,63,45,0.08)]
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-[var(--accent)]
            opacity-60
            blur-3xl
          "
        />

        <div className="relative flex flex-col items-center gap-3 text-[var(--muted)]">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-[22px]
              bg-[var(--surface-soft)]
              shadow-sm
            "
          >
            <ImageOff size={25} />
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-[var(--foreground)]">
              No photos available
            </p>

            <p className="mt-1 text-xs text-[var(--muted)]">
              This lot does not have any uploaded images.
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="space-y-3">
      {/* =====================================================
          MAIN IMAGE
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          group
          relative
          aspect-[4/3]
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          bg-[var(--surface-soft)]
          shadow-[0_20px_55px_rgba(18,63,45,0.15)]
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
            transition-transform
            duration-700
            group-hover:scale-[1.025]
          "
        />

        {/* IMAGE OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/55
            via-transparent
            to-black/5
          "
        />

        {/* TOP BADGE */}

        <div
          className="
            absolute
            left-3
            top-3
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-black/35
            px-3
            py-1.5
            text-[10px]
            font-bold
            text-white
            backdrop-blur-xl
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Primary photo
        </div>

        {/* COUNT */}

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
              border
              border-white/10
              bg-black/45
              px-3
              py-2
              text-[10px]
              font-bold
              text-white
              backdrop-blur-xl
            "
          >
            <Images size={13} />
            {photos.length} photos
          </div>
        )}

        {/* VIEW */}

        <div
          className="
            absolute
            bottom-3
            left-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-black/40
            text-white
            opacity-0
            backdrop-blur-xl
            transition
            duration-200
            group-hover:opacity-100
          "
        >
          <Maximize2 size={14} />
        </div>
      </motion.div>

      {/* =====================================================
          THUMBNAILS
      ===================================================== */}

      {photos.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
          {photos.slice(1).map(
            (photo, index) => (
              <motion.div
                key={photo.id}
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.04,
                }}
                className="
                  group
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[var(--border)]
                  bg-[var(--surface-soft)]
                  shadow-sm
                "
              >
                <img
                  src={photo.url}
                  alt={`E-waste lot ${
                    index + 2
                  }`}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              </motion.div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default LotPhotos;