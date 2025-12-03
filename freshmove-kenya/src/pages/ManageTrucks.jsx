import React, { useEffect, useState } from "react";
import { api } from "../api";

function ManageTrucks() {
  const [trucks, setTrucks] = useState([]);
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [refrigerated, setRefrigerated] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch trucks from backend
  const fetchTrucks = async () => {
    try {
      const response = await api.get("/trucks/");
      const data = Array.isArray(response.data) ? response.data : [];
      setTrucks(data);
    } catch (error) {
      console.error("Failed to fetch trucks:", error);
      alert("Failed to fetch trucks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  // Add a new truck
  const addTruck = async () => {
    if (!plate || !capacity) return;

    try {
      const payload = {
        plate,
        capacity_kg: parseInt(capacity, 10),
        refrigerated,
      };

      const response = await api.post("/trucks/", payload);
      setTrucks((prev) => [...prev, response.data]);
      setPlate("");
      setCapacity("");
      setRefrigerated(true);
    } catch (error) {
      console.error("Failed to add truck:", error);
      alert("Failed to add truck");
    }
  };

  // Delete a truck
  const deleteTruck = async (id) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;

    try {
      await api.delete(`/trucks/${id}/`);
      setTrucks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete truck:", error);
      alert("Failed to delete truck");
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Manage Trucks</h2>

      <div className="truck-form">
        <input
          type="text"
          placeholder="Plate Number"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacity (KG)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={refrigerated}
            onChange={(e) => setRefrigerated(e.target.checked)}
          />{" "}
          Refrigerated
        </label>
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
              {t.plate} - {t.capacity_kg} KGs - {t.refrigerated ? "Refrigerated" : "Non-refrigerated"} - {t.status}
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
