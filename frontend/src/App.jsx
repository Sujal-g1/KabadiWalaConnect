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

const App = () => {
  return (
    <Routes>

      {/* Landing */}
      <Route
        path="/"
        element={<Start />}
      />

      {/* Collector Authentication */}
      <Route
        path="/collector/login"
        element={<CollectorLogin />}
      />

      <Route
        path="/collector/signup"
        element={<CollectorSignup />}
      />

      {/* Collector Dashboard */}
      <Route
        path="/collector"
        element={<CollectorDashboard />}
      />

      <Route
      path="/collector/settings"
      element={<CollectorSettings />}
    />

    <Route
    path="/collector/prices"
    element={<PriceBoard />}
  />

  <Route
    path="/collector/valuation-test"
    element={<ValuationTest />}
  />

  <Route
    path="/collector/valuation"
    element={<CollectorValuation />}
  />

  <Route
  path="/collector/lots"
  element={<MyLots />}
/>

<Route
  path="/collector/lots/:id"
  element={<LotDetails />}
/>

<Route
  path="/collector/lots/:id/handover"
  element={<Handover />}
/>

  <Route
  path="/collector/lots/create"
  element={<CreateLot />}
/>

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default App;