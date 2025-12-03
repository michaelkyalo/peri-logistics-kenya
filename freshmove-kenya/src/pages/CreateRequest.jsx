import React, { useState } from "react";
import "../pages/CreateRequest.css";
import { api } from "../api";

const couriers = [
  { name: "QuickMove", available: true },
  { name: "Swift Logistics", available: true },
  { name: "FreshLink Transport", available: false },
  { name: "Kenya Express", available: true },
  { name: "Farm2Market Couriers", available: true },
];

function CreateRequest() {
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [goodsType, setGoodsType] = useState("");
  const [weight, setWeight] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [submittedOrder, setSubmittedOrder] = useState(null); // new

  const handleCourierSelect = (courier) => {
    setSelectedCourier(courier);
    setSubmittedOrder(null); // reset any previous order
  };

  const handlePriceEstimate = () => {
    const pricePerKg = 50;
    const price = weight ? weight * pricePerKg : 0;
    setEstimatedPrice(price);
  };

  const handleSubmitOrder = async () => {
    if (!pickup || !dropoff || !goodsType || !weight) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      customer_id: 1, 
      goods: goodsType,
      weight_kg: parseFloat(weight),
      pickup_location: pickup,
      dropoff_location: dropoff,
      status: "pending",
    };

    try {
      const response = await api.post("/requests/", payload);

      // Show submitted order details instead of redirecting
      setSubmittedOrder({
        courier: selectedCourier.name,
        pickup: payload.pickup_location,
        dropoff: payload.dropoff_location,
        goods: payload.goods,
        weight: payload.weight_kg,
        price: payload.weight_kg * 50,
        status: payload.status,
      });

      // Clear form inputs
      setPickup("");
      setDropoff("");
      setGoodsType("");
      setWeight("");
      setEstimatedPrice(null);
    } catch (error) {
      console.error(error);
      alert("Failed to submit order.");
    }
  };

  return (
    <div className={`create-request-container ${!selectedCourier ? "courier-page" : "order-page"}`}>
      <h2>Create a Delivery Request</h2>

      {!selectedCourier ? (
        <>
          <p>Select a courier service:</p>
          <div className="services-grid">
            {couriers
              .filter((c) => c.available)
              .map((c, idx) => (
                <div
                  key={idx}
                  className="service-card"
                  onClick={() => handleCourierSelect(c)}
                >
                  {c.name}
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="request-form">
          <label>Pickup Location</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />

          <label>Dropoff Location</label>
          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />

          <label>Goods Type</label>
          <input
            type="text"
            value={goodsType}
            onChange={(e) => setGoodsType(e.target.value)}
          />

          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <button type="button" onClick={handlePriceEstimate}>
            Estimate Price
          </button>

          {estimatedPrice !== null && (
            <p>Estimated Price: KES {estimatedPrice.toLocaleString()}</p>
          )}

          <button type="button" onClick={handleSubmitOrder}>
            Submit Order
          </button>

          <button type="button" onClick={() => setSelectedCourier(null)}>
            Back
          </button>

          {submittedOrder && (
            <div className="submitted-order">
              <h3>Order Submitted!</h3>
              <p><strong>Courier:</strong> {submittedOrder.courier}</p>
              <p><strong>Pickup:</strong> {submittedOrder.pickup}</p>
              <p><strong>Dropoff:</strong> {submittedOrder.dropoff}</p>
              <p><strong>Goods:</strong> {submittedOrder.goods}</p>
              <p><strong>Weight:</strong> {submittedOrder.weight} KGs</p>
              <p><strong>Estimated Price:</strong> KES {submittedOrder.price.toLocaleString()}</p>
              <p><strong>Status:</strong> {submittedOrder.status}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateRequest;


