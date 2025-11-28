import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RequestContext } from "../context/RequestContext";

function ViewRequests() {
  const { requests } = useContext(RequestContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#007BFF", // Blue color
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

      {requests.length === 0 ? (
        <p>No requests made yet.</p>
      ) : (
        <div className="requests-list">
          {requests.map((req) => (
            <div
              key={req.id}
              className="service-card"
              style={{ marginBottom: "1rem" }}
            >
              <h3>{req.truck}</h3>
              <p><strong>Courier:</strong> {req.courier}</p>
              <p><strong>Pickup:</strong> {req.region}</p>
              <p><strong>Capacity:</strong> {req.capacity.toLocaleString()} KGs</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Location:</strong> {req.currentLocation}</p>
              <p><strong>Destination:</strong> {req.destination}</p>
              <p><strong>Price:</strong> KES {req.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewRequests;
