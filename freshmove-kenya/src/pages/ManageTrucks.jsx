import React, { useEffect, useState } from "react";
import { api } from "../api";

function ManageTrucks() {
  const [trucks, setTrucks] = useState([]);
  const [truckName, setTruckName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch trucks from backend
  const fetchTrucks = async () => {
    try {
      const response = await api.get("/trucks/");
      setTrucks(response.data);
    } catch (error) {
      console.error("Failed to fetch trucks:", error);
      alert("Failed to fetch trucks. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  // Add a new truck
  const addTruck = async () => {
    if (!truckName || !capacity) return;

    try {
      const payload = {
        name: truckName,
        capacity: parseInt(capacity, 10),
      };
      const response = await api.post("/trucks/", payload);
      setTrucks([...trucks, response.data]);
      setTruckName("");
      setCapacity("");
    } catch (error) {
      console.error("Failed to add truck:", error);
      alert("Failed to add truck. Make sure you are logged in.");
    }
  };

  // Optionally, delete a truck
  const deleteTruck = async (id) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;

    try {
      await api.delete(`/trucks/${id}/`);
      setTrucks(trucks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete truck:", error);
      alert("Failed to delete truck.");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Manage Trucks</h2>

      <div className="truck-form">
        <input
          type="text"
          placeholder="Truck Name"
          value={truckName}
          onChange={(e) => setTruckName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity (KGs)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <button onClick={addTruck}>Add Truck</button>
      </div>

      <h3>Fleet</h3>
      {loading ? (
        <p>Loading trucks...</p>
      ) : trucks.length === 0 ? (
        <p>No trucks added yet.</p>
      ) : (
        <ul>
          {trucks.map((t) => (
            <li key={t.id}>
              {t.name} - {t.capacity.toLocaleString()} KGs{" "}
              <button
                style={{
                  marginLeft: "10px",
                  color: "white",
                  backgroundColor: "red",
                  border: "none",
                  padding: "2px 6px",
                  cursor: "pointer",
                  borderRadius: "3px",
                }}
                onClick={() => deleteTruck(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageTrucks;

