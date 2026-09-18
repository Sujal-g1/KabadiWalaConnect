import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import RecyclerSidebar from "./RecyclerSidebar";
import RecyclerMobileHeader from "./RecyclerMobileHeader";
import RecyclerBottomNavigation from "./RecyclerBottomNavigation";

const RecyclerShell = () => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <RecyclerSidebar />

      <RecyclerMobileHeader
        onMenu={() =>
          setMobileMenuOpen(true)
        }
      />

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="
              absolute
              inset-0
              bg-black/40
            "
            onClick={() =>
              setMobileMenuOpen(false)
            }
          />

          <aside
            className="
              relative
              flex
              h-full
              w-[280px]
              flex-col
              bg-[var(--surface)]
              shadow-2xl
            "
          >
            <div
              className="
                flex
                h-16
                items-center
                justify-between
                border-b
                border-[var(--border)]
                px-5
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[var(--primary)]
                    text-[var(--primary-foreground)]
                  "
                >
                  ♻
                </div>

                <span className="font-bold">
                  Recycler
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-[var(--muted)]
                "
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <RecyclerSidebarMobile
                closeMenu={() =>
                  setMobileMenuOpen(false)
                }
              />
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <main
        className="
          min-h-screen
          lg:ml-[260px]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            px-4
            pb-28
            pt-5
            sm:px-6
            lg:px-8
            lg:pb-10
            lg:pt-8
          "
        >
          <Outlet />
        </div>
      </main>

      <RecyclerBottomNavigation />
    </div>
  );
};

const RecyclerSidebarMobile = ({
  closeMenu,
}) => {
  const navigate = useNavigate();

  const links = [
    ["Dashboard", "/recycler"],
    ["Marketplace", "/recycler/marketplace"],
    ["My Offers", "/recycler/offers"],
    ["Pickups", "/recycler/pickups"],
    ["Handovers", "/recycler/handovers"],
    ["Intake", "/recycler/intake"],
    ["Payments", "/recycler/payments"],
    ["Buying Rates", "/recycler/rates"],
    ["Inventory", "/recycler/inventory"],
    ["Analytics", "/recycler/analytics"],
    ["Traceability", "/recycler/traceability"],
    ["Profile", "/recycler/profile"],
    ["Settings", "/recycler/settings"],
  ];

  return (
    <div className="space-y-1 p-4">
      {links.map(([label, path]) => (
        <button
          key={path}
          type="button"
          onClick={() => {
            navigate(path);
            closeMenu();
          }}
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            px-4
            py-3
            text-left
            text-sm
            font-medium
            text-[var(--muted)]
            transition
            hover:bg-[var(--surface-soft)]
            hover:text-[var(--foreground)]
          "
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default RecyclerShell;