import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import truckImage from "../assets/fresh.jpg";

function Home() {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // for redirecting

  const handleLogin = () => {
    if (!name.trim() || idNumber.trim().length < 5 || !password.trim()) {
      alert("Please fill in all fields correctly");
      return;
    }

    alert(`Logged in as ${name} with ID: ${idNumber}`);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <img
        src={truckImage}
        alt="Truck"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Login Form */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Login</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="text"
          placeholder="Enter ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
