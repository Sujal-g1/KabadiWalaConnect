import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Start from "./pages/Start";
import CollectorLogin from "./pages/CollectorLogin";
import CollectorSignup from "./pages/CollectorSignup";
import CollectorDashboard from "./pages/CollectorDashboard/CollectorDashboard";
import CollectorSettings from "./pages/CollectorSettings";
import PriceBoard from "./pages/PriceBoard/PriceBoard";
import ValuationTest from "./pages/ValuationTest";

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

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default App;