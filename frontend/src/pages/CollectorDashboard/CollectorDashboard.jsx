import { useNavigate } from "react-router-dom";

import DashboardHeader from "./components/DashboardHeader";
import QuickAction from "./components/QuickAction";
import PriceSnapshot from "./components/PriceSnapshot";
import ActivitySummary from "./components/ActivitySummary";
import EarningsCard from "./components/EarningsCard";
import RecyclerPreview from "./components/RecyclerPreview";
import BottomNavigation from "./components/BottomNavigation";

import dashboardData from "./dashboardData";

const CollectorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main
        className="
          mx-auto
          w-full
          max-w-5xl
          px-4
          pb-28
          pt-5
          sm:px-6
          lg:px-8
          lg:pb-10
        "
      >
        <DashboardHeader
          onSettings={() => navigate("/collector/settings")}
        />

        <div className="mt-7 space-y-8">
          <QuickAction
            onClick={() => navigate("/collector/lots/new")}
          />

          <PriceSnapshot
            prices={dashboardData.prices}
          />

          <ActivitySummary
            activeLots={dashboardData.activeLots}
            pendingPayments={
              dashboardData.earnings.pending
            }
          />

          <EarningsCard
            earnings={dashboardData.earnings}
          />

          <RecyclerPreview
            recyclers={dashboardData.recyclers}
          />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CollectorDashboard;