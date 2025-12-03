import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";


function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || 1;

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/requests/?user_id=${userId}`);
      const data = Array.isArray(res.data) ? res.data : res.data.requests || [];
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-container">
      <button
        className="go-back-button"
        onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem" }}
      >
        &larr; Go Back
      </button>

      <h2>Your Truck Requests</h2>

      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Goods</th>
              <th>Quantity (KG)</th>
              <th>Estimated Price (KES)</th>
              <th>Pickup</th>
              <th>Dropoff</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.goods}</td>
                <td>{req.weight_kg}</td>
                <td>{req.estimated_price?.toLocaleString() || 0}</td>
                <td>{req.pickup_location}</td>
                <td>{req.dropoff_location}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewRequests;
