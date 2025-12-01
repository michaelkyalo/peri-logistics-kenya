import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch requests from backend
  const fetchRequests = async () => {
    try {
      const response = await api.get("/requests/");
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      alert("Failed to fetch requests. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "4px",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        &larr; Go Back
      </button>

      <h2>My Truck Requests & Delivery Tracker</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests made yet.</p>
      ) : (
        <div className="requests-list">
          {requests.map((req) => (
            <div
              key={req.id}
              className="service-card"
              style={{ marginBottom: "1rem" }}
            >
              <h3>{req.truck} Truck</h3>
              <p>
                <strong>Courier:</strong> {req.courier || "N/A"}
              </p>
              <p>
                <strong>Pickup:</strong> {req.pickup_location || req.region || "N/A"}
              </p>
              <p>
                <strong>Capacity:</strong> {req.capacity?.toLocaleString() || "N/A"} KGs
              </p>
              <p>
                <strong>Status:</strong> {req.status || "Pending"}
              </p>
              <p>
                <strong>Location:</strong> {req.currentLocation || "Depot"}
              </p>
              <p>
                <strong>Destination:</strong> {req.dropoff_location || "Nairobi Town"}
              </p>
              <p>
                <strong>Price:</strong> KES {req.price?.toLocaleString() || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewRequests;
