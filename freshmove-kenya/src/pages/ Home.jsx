import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import truckImage from "../assets/fresh.jpg";

function Home() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Background Truck Image */}
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

      {!showLogin ? (
        // Landing overlay
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
            Quality Delivery
          </h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
            Fast, Reliable, and Affordable
          </p>
          <button
            onClick={() => setShowLogin(true)}
            style={{
              padding: "12px 30px",
              fontSize: "1.2rem",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "#fff",
            }}
          >
            Click to Login
          </button>
        </div>
      ) : (
        // Login form overlay
        <LoginForm navigate={navigate} />
      )}
    </div>
  );
}

// LoginForm Component
function LoginForm({ navigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // Make all fields mandatory
    if (!email.trim() || !name.trim() || !password.trim()) {
      alert("All fields (Email, Name, Password) are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        // Simulate backend login
        const userId = 1;
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);

        alert(`Logged in successfully as ${name}`);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Check credentials.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255,255,255,0.95)",
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
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default Home;

