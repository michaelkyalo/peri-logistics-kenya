import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logiImage from "../assets/logi.jpg";
import { api } from "../api";
import "../index.css";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    trucks: 0,
    subscription: "None",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      // Ensure token exists
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/"); // redirect to login
        return;
      }

      // Fetch all data concurrently using axios instance
      const [requestsRes, trucksRes, subscriptionRes] = await Promise.all([
        api.get("/requests/"),
        api.get("/trucks/"),
        api.get("/subscriptions/"),
      ]);

      const requests = requestsRes.data;
      const pendingRequests = requests.filter((r) => r.status === "pending").length;

      const subscriptionPlan =
        subscriptionRes.data.subscriptions?.[0]?.plan || "None";

      setStats({
        totalRequests: requests.length,
        pendingRequests,
        trucks: trucksRes.data.length,
        subscription: subscriptionPlan,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
      setError("Failed to load dashboard stats. Please log in again.");

      // If unauthorized, remove token and redirect
      if (err.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <img src={logiImage} alt="Logistics" className="fullscreen-bg" />

      <div className="dashboard-overlay">
        {loading ? (
          <p>Loading dashboard...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <div className="dashboard-top-cards">
              <Link to="/create-request" className="card-button">
                <h3>Order Truck</h3>
                <p>Book a cargo truck for your goods</p>
              </Link>

              <Link to="/view-requests" className="card-button">
                <h3>View Requests</h3>
                <p>Total: {stats.totalRequests}, Pending: {stats.pendingRequests}</p>
              </Link>

              <Link to="/subscription-plan" className="card-button">
                <h3>Subscription Plan</h3>
                <p>Current: {stats.subscription}</p>
              </Link>

              <Link to="/notifications" className="card-button">
                <h3>Notifications</h3>
                <p>Check latest alerts from couriers</p>
              </Link>

              <Link to="/packaging" className="card-button">
                <h3>Packaging</h3>
                <p>Book after-sale packaging services for your goods</p>
              </Link>

              <Link to="/manage-trucks" className="card-button">
                <h3>Manage Trucks</h3>
                <p>Total Trucks: {stats.trucks}</p>
              </Link>
            </div>

            <div className="logout-section">
              <button
                className="logout-link"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
