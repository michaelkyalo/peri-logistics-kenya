import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { api } from "../api";

const trucks = [
  { size: "Small", capacity: 4000, basePrice: 3000 },
  { size: "Medium", capacity: 8000, basePrice: 5000 },
  { size: "Large", capacity: 15000, basePrice: 8000 },
];

const couriers = [
  { name: "QuickMove", available: true },
  { name: "Swift Logistics", available: true },
  { name: "FreshLink Transport", available: false },
  { name: "Kenya Express", available: true },
  { name: "Farm2Market Couriers", available: true },
];

const regions = [
  { name: "Mombasa", multiplier: 1.5 },
  { name: "Kisumu", multiplier: 1.3 },
  { name: "Eldoret", multiplier: 1.2 },
  { name: "Nakuru", multiplier: 1.1 },
  { name: "Thika", multiplier: 1.05 },
];

function CreateRequest() {
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const navigate = useNavigate();

  const handleSelectCourier = (courier) => {
    setSelectedCourier(courier);
    setSelectedRegion(null);
    setSelectedTruck(null);
    setEstimatedPrice(null);
  };

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSelectedTruck(null);
    setEstimatedPrice(null);
  };

  const handleSelectTruck = (truck) => {
    setSelectedTruck(truck);
    const price = truck.basePrice * selectedRegion.multiplier;
    setEstimatedPrice(price);
  };

  const handleSubmitOrder = async () => {
    if (!selectedCourier || !selectedRegion || !selectedTruck) return;

    const payload = {
      courier: selectedCourier.name,
      region: selectedRegion.name,
      truck: selectedTruck.size,
      capacity: selectedTruck.capacity,
      weight_kg: selectedTruck.capacity,
      pickup_location: selectedRegion.name + " Depot",
      dropoff_location: "Nairobi Town",
      status: "pending",
    };

    try {
      await api.post("/requests/", payload);
      alert("Order submitted successfully!");
      navigate("/view-requests");
    } catch (error) {
      console.error(error);
      alert("Failed to submit order.");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Go Back Button */}
      <button 
        className="go-back-button" 
        onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem" }}
      >
        &larr; Go Back
      </button>

      <h2>Order a Truck to Nairobi Town</h2>

      {!selectedCourier && (
        <>
          <p>Select a courier:</p>
          <div className="services-grid">
            {couriers
              .filter((c) => c.available)
              .map((courier, idx) => (
                <div
                  key={idx}
                  className="service-card"
                  onClick={() => handleSelectCourier(courier)}
                >
                  {courier.name}
                </div>
              ))}
          </div>
        </>
      )}

      {selectedCourier && !selectedRegion && (
        <>
          <p>Courier: {selectedCourier.name}</p>
          <p>Select pickup region:</p>

          <div className="services-grid">
            {regions.map((region, idx) => (
              <div
                key={idx}
                className="service-card"
                onClick={() => handleSelectRegion(region)}
              >
                {region.name}
              </div>
            ))}
          </div>

          <button onClick={() => setSelectedCourier(null)}>Back</button>
        </>
      )}

      {selectedCourier && selectedRegion && (
        <>
          <p>
            Courier: {selectedCourier.name} | Pickup: {selectedRegion.name} →
            Nairobi Town
          </p>
          <p>Select Truck Size:</p>

          <div className="services-grid">
            {trucks.map((truck, idx) => (
              <div
                key={idx}
                className="service-card"
                onClick={() => handleSelectTruck(truck)}
              >
                <h3>{truck.size}</h3>
                <p>Capacity: {truck.capacity.toLocaleString()} KGs</p>
                <p>Base Price: KES {truck.basePrice.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {estimatedPrice && (
            <div className="price-box">
              Estimated Price: KES {estimatedPrice.toLocaleString()}
            </div>
          )}

          {selectedTruck && (
            <button
              style={{ marginTop: "1rem" }}
              className="service-button"
              onClick={handleSubmitOrder}
            >
              Confirm Order
            </button>
          )}

          <button onClick={() => setSelectedRegion(null)}>Back</button>
        </>
      )}
    </div>
  );
}

export default CreateRequest;
