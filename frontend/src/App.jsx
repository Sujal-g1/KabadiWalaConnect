import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================
// COMMON / LANDING
// =========================

import Start from "./pages/Start";

// =========================
// COLLECTOR
// =========================

import CollectorLogin from "./pages/CollectorLogin";
import CollectorSignup from "./pages/CollectorSignup";
import CollectorSettings from "./pages/CollectorSettings";
import CollectorProfile from "./pages/CollectorProfile";
import RewardsPage from "./pages/Rewards/RewardsPage";
import PriceBoard from "./pages/PriceBoard/PriceBoard";
import ValuationTest from "./pages/ValuationTest";
import CreateLot from "./pages/CreateLot/CreateLot";
import CollectorDashboard from "./pages/CollectorDashboard/CollectorDashboard";
import CollectorValuation from "./pages/CollectorValuation/CollectorValuation";
import MyLots from "./pages/MyLots/MyLots";
import LotDetails from "./pages/LotDetails/LotDetails";
import Handover from "./pages/Handover/Handover";

import AppShell from "./mainComponents/layouts/AppShell";

// =========================
// AI
// =========================

import AIChatbot from "./components/AI/AIChatbot";

// =========================
// RECYCLER
// =========================

import RecyclerShell from "./Recycler/layouts/RecyclerShell";

import RecyclerDashboard from "./Recycler/pages/RecyclerDashboard";
import EWasteAI from "./pages/EWasteAI";
import LearningPage from "./pages/Learning/LearningPage";
// import RecyclerMarketplace from "./Recycler/pages/RecyclerMarketplace";
// import RecyclerOffers from "./Recycler/pages/RecyclerOffers";
// import RecyclerPickups from "./pages/Recycler/RecyclerPickups";
// import RecyclerHandovers from "./pages/Recycler/RecyclerHandovers";
// import RecyclerIntake from "./pages/Recycler/RecyclerIntake";
// import RecyclerPayments from "./pages/Recycler/RecyclerPayments";
// import RecyclerRates from "./pages/Recycler/RecyclerRates";
// import RecyclerInventory from "./pages/Recycler/RecyclerInventory";
// import RecyclerAnalytics from "./pages/Recycler/RecyclerAnalytics";
// import RecyclerTraceability from "./pages/Recycler/RecyclerTraceability";
// import RecyclerProfile from "./pages/Recycler/RecyclerProfile";
// import RecyclerSettings from "./pages/Recycler/RecyclerSettings";


const App = () => {
  return (
    <Routes>

      {/* =====================================================
          LANDING
      ===================================================== */}

      <Route
        path="/"
        element={<Start />}
      />
      <Route
        path="/learning"
        element={<LearningPage />}
      />


      {/* =====================================================
          COLLECTOR AUTH
      ===================================================== */}

      <Route
        path="/collector/login"
        element={<CollectorLogin />}
      />

      <Route
        path="/collector/signup"
        element={<CollectorSignup />}
      />


      {/* =====================================================
          COLLECTOR APPLICATION
          AppShell
          - Desktop Sidebar
          - Mobile Header
          - Bottom Navigation
          - Page Container
      ===================================================== */}

      <Route element={<AppShell />}>

        {/* Dashboard */}
        <Route
          path="/collector"
          element={<CollectorDashboard />}
        />

        {/* Settings */}
        <Route
          path="/collector/settings"
          element={<CollectorSettings />}
        />

        {/* Profile */}
        <Route
          path="/collector/profile"
          element={<CollectorProfile />}
        />

        {/* Prices */}
        <Route
          path="/collector/prices"
          element={<PriceBoard />}
        />

        {/* Valuation */}
        <Route
          path="/collector/valuation"
          element={<CollectorValuation />}
        />

        {/* Valuation Test */}
        <Route
          path="/collector/valuation-test"
          element={<ValuationTest />}
        />

        {/* Lots */}
        <Route
          path="/collector/lots"
          element={<MyLots />}
        />

        <Route
          path="/collector/lots/create"
          element={<CreateLot />}
        />

        <Route
          path="/collector/lots/:id"
          element={<LotDetails />}
        />

        {/* Handover */}
        <Route
          path="/collector/lots/:id/handover"
          element={<Handover />}
        />

        {/* SEVA-AI */}
        <Route
          path="/seva-ai"
          element={<AIChatbot />}
        />

        <Route
          path="/e-waste-ai"
          element={<EWasteAI />}
        />

        <Route
            path="/collector/rewards"
            element={<RewardsPage />}
            />

      </Route>


      // ================ RECYCLER APPLICATION

      <Route element={<RecyclerShell />}>

        {/* =========================
            OVERVIEW
        ========================= */}

        <Route
          path="/recycler"
          element={<RecyclerDashboard />}
        />


        {/* =========================
            PROCUREMENT
        ========================= */}

        {/* <Route
          path="/recycler/marketplace"
          element={<RecyclerMarketplace />}
        /> */}

        {/* <Route
          path="/recycler/offers"
          element={<RecyclerOffers />}
        /> */}


        {/* =========================
            OPERATIONS
        ========================= */}

        {/* <Route
          path="/recycler/pickups"
          element={<RecyclerPickups />}
        /> */}

        {/* <Route
          path="/recycler/handovers"
          element={<RecyclerHandovers />}
        /> */}

        {/* <Route
          path="/recycler/intake"
          element={<RecyclerIntake />}
        /> */}


        {/* =========================
            FINANCE
        ========================= */}
{/* 
        <Route
          path="/recycler/payments"
          element={<RecyclerPayments />}
        /> */}

        {/* <Route
          path="/recycler/rates"
          element={<RecyclerRates />}
        /> */}


        {/* =========================
            INSIGHTS
        ========================= */}

        {/* <Route
          path="/recycler/inventory"
          element={<RecyclerInventory />}
        /> */}

        {/* <Route
          path="/recycler/analytics"
          element={<RecyclerAnalytics />}
        /> */}

        {/* <Route
          path="/recycler/traceability"
          element={<RecyclerTraceability />}
        /> */}


        {/* =========================
            ACCOUNT
        ========================= */}

        {/* <Route
          path="/recycler/profile"
          element={<RecyclerProfile />}
        /> */}

        {/* <Route
          path="/recycler/settings"
          element={<RecyclerSettings />}
        /> */}

      </Route>


      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
};

export default App;