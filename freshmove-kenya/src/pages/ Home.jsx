import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import truckImage from "../assets/fresh.jpg";
import { api } from "../api"; // use your axios instance

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields correctly");
      return;
    }

    setLoading(true);

    try {
      const payload = { email, password };

      const response = await api.post("/auth/login", payload, {
        withCredentials: true, // send cookies if backend uses them
      });

      // Save JWT token in localStorage using the same key your interceptor reads
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
      }

      // Optional: save user email
      localStorage.setItem("userEmail", email);

      alert(`Logged in successfully as ${email}`);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert(
        error.response?.data?.message || "Login failed. Check credentials."
      );
    } finally {
      setLoading(false);
    }
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
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          disabled={loading}
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Home;
