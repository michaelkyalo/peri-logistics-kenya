import React from "react";

function TruckCard({ truckName, size, capacity, image, onClick }) {
  return (
    <div className="truck-card" onClick={onClick}>
      <img src={image} alt={truckName} />
      <div className="truck-info">
        <h3>{truckName}</h3>
        <p>Size: {size}</p>
        <p>Capacity: {capacity.toLocaleString()} KGs</p>
      </div>
    </div>
  );
}

export default TruckCard;
