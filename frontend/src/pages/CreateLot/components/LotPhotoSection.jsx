import { Camera } from "lucide-react";

const LotPhotoSection = () => {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">
          Photos
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Add photos of the collected e-waste.
        </p>
      </div>

      <div className="flex min-h-[140px] items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--primary)]">
            <Camera size={23} />
          </div>

          <p className="mt-3 text-sm font-medium">
            Add photos
          </p>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Camera or gallery
          </p>
        </div>
      </div>
    </div>
  );
};

export default LotPhotoSection;