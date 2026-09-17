import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import BottomNavigation from "./BottomNavigation";
import PageContainer from "./PageContainer";

const AppShell = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen">
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <div className="min-w-0 flex-1">
          <MobileHeader
            onMenuClick={() =>
              setMobileMenuOpen(true)
            }
          />

          <PageContainer>
            {children}
          </PageContainer>
        </div>
      </div>

      <BottomNavigation />

      {mobileMenuOpen && (
        <MobileMenu
          onClose={() =>
            setMobileMenuOpen(false)
          }
        />
      )}
    </div>
  );
};

const MobileMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div
        className="
          absolute left-0 top-0 h-full w-[82%] max-w-[320px]
          overflow-y-auto bg-[var(--surface)]
          p-4 shadow-2xl
        "
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-[var(--foreground)]">
              KabadiWala
            </p>

            <p className="text-xs text-[var(--muted)]">
              Connect
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl px-3 py-2 text-sm
              text-[var(--muted)]
              hover:bg-[var(--surface-soft)]
            "
          >
            Close
          </button>
        </div>

        <div className="space-y-1">
          <MobileMenuItem
            label="Dashboard"
            onClick={() =>
              goTo("/collector")
            }
          />

          <MobileMenuItem
            label="My Lots"
            onClick={() =>
              goTo("/collector/lots")
            }
          />

          <MobileMenuItem
            label="Price Board"
            onClick={() =>
              goTo("/collector/prices")
            }
          />

          <MobileMenuItem
            label="Recyclers"
            onClick={() =>
              goTo("/collector/recyclers")
            }
          />

          <MobileMenuItem
            label="Earnings"
            onClick={() =>
              goTo("/collector/earnings")
            }
          />

          <MobileMenuItem
            label="Transactions"
            onClick={() =>
              goTo("/collector/transactions")
            }
          />

          <div className="my-5 border-t border-[var(--border)]" />

          <MobileMenuItem
            label="Profile"
            onClick={() =>
              goTo("/collector/profile")
            }
          />

          <MobileMenuItem
            label="Settings"
            onClick={() =>
              goTo("/collector/settings")
            }
          />
        </div>
      </div>
    </div>
  );
};

const MobileMenuItem = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        flex w-full items-center rounded-xl
        px-4 py-3.5 text-left text-sm font-medium
        text-[var(--foreground)]
        transition hover:bg-[var(--surface-soft)]
      "
    >
      {label}
    </button>
  );
};

export default AppShell;