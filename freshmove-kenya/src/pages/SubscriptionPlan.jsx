import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function SubscriptionPlan() {
  const navigate = useNavigate();

  // Example subscription plans
  const plans = [
    {
      name: "Basic Plan",
      price: 120000,
      features: [
        "Access to standard deliveries",
        "Limited refrigerated trucks",
        "Basic customer support",
        "Track up to 5 deliveries per month",
        "Email notifications",
      ],
      type: "basic",
    },
    {
      name: "Premium Plan",
      price: 150000,
      features: [
        "Unlimited deliveries",
        "Full refrigerated trucks access",
        "Priority support",
        "Track up to 50 deliveries per month",
        "SMS & Email notifications",
        "Discounts on select deliveries",
      ],
      type: "premium",
    },
    {
      name: "Farm Fresh Plan",
      price: 200000,
      features: [
        "All Premium features",
        "Discounts on bulk orders",
        "Dedicated account manager",
        "Custom packaging options",
        "Extended refrigerated storage",
        "24/7 customer support",
        "Weekly analytics reports",
      ],
      type: "farmfresh",
    },
  ];

  const handleSubscribe = async (planName, price) => {
    try {
      // Get user info from localStorage
      const userId = localStorage.getItem("userId"); // store this on login
      if (!userId) {
        alert("Please login first to subscribe!");
        return;
      }

      const payload = {
        user_id: parseInt(userId), // backend expects integer
        plan: planName,
        price: price,
      };

      await api.post("/subscriptions/", payload);
      alert(`You have successfully subscribed to the ${planName}!`);
      navigate("/dashboard"); // Redirect after subscription
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Failed to subscribe. Make sure you are logged in.");
    }
  };

  return (
    <div className="subscription-container">
      {/* Go Back Button */}
      <button
        className="go-back-button"
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#3498db",
          color: "#fff",
          cursor: "pointer",
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
            <p className="price">KSh {plan.price.toLocaleString()}/month</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button
              className="subscribe-button"
              onClick={() => handleSubscribe(plan.name, plan.price)}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionPlan;

