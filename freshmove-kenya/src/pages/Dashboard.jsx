import React from "react";
import { Link } from "react-router-dom";
import logiImage from "../assets/logi.jpg";
import "../index.css";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Fullscreen Background */}
      <img src={logiImage} alt="Logistics" className="fullscreen-bg" />

      {/* Overlay container */}
      <div className="dashboard-overlay">
        {/* Top cards (all 4 as cards) */}
        <div className="dashboard-top-cards">
          <Link to="/create-request" className="card-button">
            <h3>Order Truck</h3>
            <p>Book a cargo truck for your goods</p>
          </Link>

          <Link to="/view-requests" className="card-button">
            <h3>View Requests</h3>
            <p>Track your current and past truck requests</p>
          </Link>

          <Link to="/subscription-plan" className="card-button">
            <h3>Subscription Plan</h3>
            <p>View and manage your subscription plans</p>
          </Link>

          <Link to="/notifications" className="card-button">
            <h3>Notifications</h3>
            <p>View alerts and updates from couriers</p>
          </Link>
        </div>

        {/* Logout */}
        <div className="logout-section">
          <Link to="/" className="logout-link">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
