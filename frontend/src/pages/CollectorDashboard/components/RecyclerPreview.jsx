import {
  ArrowRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { recyclers } from "../dashboardData";

const RecyclerPreview = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        rounded-2xl border border-[var(--border)]
        bg-[var(--surface)] p-5 sm:p-6
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-[var(--foreground)]">
            Nearby recyclers
          </p>

          <p className="mt-1 text-xs text-[var(--muted)]">
            Verified buyers near you
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/collector/recyclers")
          }
          className="
            flex items-center gap-1 text-xs
            font-semibold text-[var(--primary)]
          "
        >
          See all
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {recyclers.map((recycler) => (
          <div
            key={recycler.id}
            className="
              rounded-xl bg-[var(--surface-soft)]
              p-3.5
            "
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-[var(--primary)]">
                {recycler.name.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                    {recycler.name}
                  </p>

                  {recycler.verified && (
                    <ShieldCheck
                      size={14}
                      className="shrink-0 text-[var(--primary)]"
                    />
                  )}
                </div>

                <div className="mt-1 flex items-center gap-1 text-[10px] text-[var(--muted)]">
                  <MapPin size={11} />
                  <span>
                    {recycler.location} ·{" "}
                    {recycler.distance}
                  </span>
                </div>

                <div className="mt-2 flex gap-1.5">
                  {recycler.materials.map(
                    (material) => (
                      <span
                        key={material}
                        className="
                          rounded-full bg-[var(--surface)]
                          px-2 py-1 text-[9px]
                          font-medium text-[var(--muted)]
                        "
                      >
                        {material}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecyclerPreview;