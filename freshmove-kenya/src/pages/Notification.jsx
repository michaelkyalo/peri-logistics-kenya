
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications/");
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      alert("Failed to load notifications. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="notification-container">
      {/* Go Back Button */}
      <button
        className="go-back-button"
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#3498db",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        &larr; Go Back
      </button>

      <h2>Notifications</h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="no-notifications">No new notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((note, index) => (
            <li key={index} className={`notification-item ${note.type}`}>
              <p className="message">{note.message}</p>
              <span className="time">{note.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
