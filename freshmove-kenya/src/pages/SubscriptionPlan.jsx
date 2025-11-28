import React from "react";
import { useNavigate } from "react-router-dom";

function SubscriptionPlan() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic Plan",
      price: "$10/month",
      features: ["Access to standard deliveries", "Limited refrigerated trucks", "Basic support"],
      type: "basic",
    },
    {
      name: "Premium Plan",
      price: "$25/month",
      features: ["Unlimited deliveries", "Full refrigerated trucks access", "Priority support"],
      type: "premium",
    },
    {
      name: "Farm Fresh Plan",
      price: "$40/month",
      features: ["All Premium features", "Discounts on bulk orders", "Dedicated account manager"],
      type: "farmfresh",
    },
  ];

  return (
    <div className="subscription-container">
      {/* Go Back Button */}
      <button
        className="go-back-button"
        onClick={() => navigate(-1)} // navigate to previous page
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#3498db",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        ← Go Back
      </button>

      <h2>Subscription Plans</h2>
      <p>Select a plan that best fits your farming and delivery needs.</p>
      <div className="plan-cards">
        {plans.map((plan, index) => (
          <div key={index} className={`plan-card ${plan.type}`}>
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="subscribe-button">Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlan;
