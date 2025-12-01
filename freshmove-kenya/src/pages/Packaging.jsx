
// Package.jsx
import React, { useState } from "react";
import "../index.css";
import { api } from "../api";

function Package() {
  const [form, setForm] = useState({
    itemType: "",
    weight: "",
    packagingType: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        item_type: form.itemType,
        weight_kg: form.weight,
        packaging_type: form.packagingType,
        notes: form.notes,
      };

      await api.post("/packaging/", payload);

      alert("Packaging request submitted successfully!");
      // Optionally, clear form
      setForm({ itemType: "", weight: "", packagingType: "", notes: "" });
    } catch (error) {
      console.error("Failed to submit packaging request:", error);
      alert("Failed to submit packaging request. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="package-wrapper">
      <h1>After-Sale Service: Packaging</h1>
      <p>Secure and high-quality packaging options for your goods.</p>

      <form onSubmit={handleSubmit} className="packaging-form">
        <label>Type of Item</label>
        <input
          type="text"
          name="itemType"
          value={form.itemType}
          onChange={handleChange}
          placeholder="e.g. Apples, Strawberries"
          required
        />

        <label>Weight (KG)</label>
        <input
          type="number"
          name="weight"
          value={form.weight}
          onChange={handleChange}
          placeholder="e.g. 20"
          required
        />

        <label>Preferred Packaging Type</label>
        <select
          name="packagingType"
          value={form.packagingType}
          onChange={handleChange}
          required
        >
          <option value="">Select packaging</option>
          <option value="insulated-box">Insulated Box</option>
          <option value="shock-proof">Shock-Proof Cushioning</option>
          <option value="eco-friendly">Eco-Friendly Packaging</option>
        </select>

        <label>Additional Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any special instructions..."
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Packaging Request"}
        </button>
      </form>
    </div>
  );
}

export default Package;

