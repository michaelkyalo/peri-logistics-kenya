import React, { useState } from "react";

function ManageTrucks() {
  const [trucks, setTrucks] = useState([]);
  const [truckName, setTruckName] = useState("");
  const [capacity, setCapacity] = useState("");

  const addTruck = () => {
    if (!truckName || !capacity) return;
    setTrucks([...trucks, { name: truckName, capacity }]);
    setTruckName("");
    setCapacity("");
  };

  return (
    <div className="dashboard-container">
      <h2>Manage Trucks</h2>
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

      <h3>Fleet</h3>
      <ul>
        {trucks.map((t, idx) => (
          <li key={idx}>
            {t.name} - {t.capacity} KGs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageTrucks;
