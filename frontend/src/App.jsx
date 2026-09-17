import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Start from "./pages/Start";
import CollectorLogin from "./pages/CollectorLogin";
import CollectorSignup from "./pages/CollectorSignup";
import CollectorSettings from "./pages/CollectorSettings";
import PriceBoard from "./pages/PriceBoard/PriceBoard";
import ValuationTest from "./pages/ValuationTest";
import CreateLot from "./pages/CreateLot/CreateLot";
import CollectorDashboard from "./pages/CollectorDashboard/CollectorDashboard";
import CollectorValuation from "./pages/CollectorValuation/CollectorValuation";
import MyLots from "./pages/MyLots/MyLots";
import LotDetails from "./pages/LotDetails/LotDetails";
import Handover from "./pages/Handover/Handover";

import AppShell from "./mainComponents/layouts/AppShell";

const App = () => {
  return (
    <Routes>

      {/* =========================
          LANDING
      ========================= */}

      <Route
        path="/"
        element={<Start />}
      />


      {/* =========================
          COLLECTOR AUTH
      ========================= */}

      <Route
        path="/collector/login"
        element={<CollectorLogin />}
      />

      <Route
        path="/collector/signup"
        element={<CollectorSignup />}
      />


      {/* =========================
          COLLECTOR APPLICATION
          AppShell provides:
          - Desktop Sidebar
          - Mobile Header
          - Mobile Bottom Navigation
          - Page Container
      ========================= */}

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

      </Route>


      {/* =========================
          FALLBACK
      ========================= */}

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