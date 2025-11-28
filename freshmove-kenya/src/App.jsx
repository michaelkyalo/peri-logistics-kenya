import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/ Home";
import Dashboard from "./pages/Dashboard";
import CourierDashboard from "./pages/CourierDashboard";
import CreateRequest from "./pages/CreateRequest";
import ViewRequests from "./pages/ViewRequests";
import ManageTrucks from "./pages/ManageTrucks";
import SubscriptionPlan from "./pages/SubscriptionPlan";
import Notification from "./pages/Notification";

// Context
import { RequestProvider } from "./context/RequestContext";

function App() {
  return (
    <RequestProvider>
      <Router>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courier-dashboard" element={<CourierDashboard />} />

          {/* Truck Requests */}
          <Route path="/create-request" element={<CreateRequest />} />
          <Route path="/view-requests" element={<ViewRequests />} />
          <Route path="/manage-trucks" element={<ManageTrucks />} />

          {/* Subscription & Notifications */}
          <Route path="/subscription-plan" element={<SubscriptionPlan />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </Router>
    </RequestProvider>
  );
}

export default App;
