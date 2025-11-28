import React from "react";
import TruckCard from "../components/TruckCard";
import truckImage from "../assets/fresh.jpg";

const trucks = [
  { id: 1, truckName: "Small Cargo Truck", size: "Small", capacity: 4000 },
  { id: 2, truckName: "Medium Cargo Truck", size: "Medium", capacity: 8000 },
  { id: 3, truckName: "Large Cargo Truck", size: "Large", capacity: 15000 },
];

function CourierDashboard() {
  return (
    <div className="dashboard-container">
      <h2>Available Trucks in this Courier</h2>
      <div className="truck-row">
        {trucks.map((truck) => (
          <TruckCard
            key={truck.id}
            truckName={truck.truckName}
            size={truck.size}
            capacity={truck.capacity}
            image={truckImage}
            onClick={() => alert(`${truck.truckName} selected!`)}
          />
        ))}
      </div>
    </div>
  );
}

export default CourierDashboard;
