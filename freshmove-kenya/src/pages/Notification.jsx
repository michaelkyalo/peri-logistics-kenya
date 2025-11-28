import React from "react";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();

  // Hardcoded notifications
  const notifications = [
    { message: "Your order has been picked up!", time: "2 min ago", type: "success" },
    { message: "New delivery request available.", time: "10 min ago", type: "info" },
    { message: "Payment failed for last order.", time: "1 hour ago", type: "error" },
    { message: "Farmer John uploaded fresh strawberries.", time: "3 hours ago", type: "info" },
    { message: "Your delivery has been completed successfully.", time: "5 hours ago", type: "success" },
  ];

  return (
    <div className="notification-container">
      {/* Go Back Button */}
      <button 
        className="go-back-button"
        onClick={() => navigate(-1)}
      >
        &larr; Go Back
      </button>

      <h2>Notifications</h2>
      {notifications.length === 0 ? (
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
