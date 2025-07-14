import { useState, useTransition } from "react";
import { useAuth } from "../store/auth";
import { Loader } from "../components/Layout/Loader";
import { toast } from "react-toastify";

const AddProperty = () => {
    const {user} = useAuth()
    const sellerId = user._id;
    const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    propertyType: "",
    images: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://apna-ghar-2.onrender.com/api/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, sellerId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add property");
      }

      setSuccess("Property added successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        price: "",
        propertyType: "",
        images: "",
      });
      toast.success("Property Added")
    } catch (err) {
      setError(err.message);
      toast.success("Property not Added")
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loader />;
  if (isPending) return <Loader />;
  return (
    <div className="modern-property-form-container fade-in-up">
      <div className="modern-property-form-card">
        <h2>Add Property</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Property Title" value={formData.title} onChange={handleChange} required className="modern-property-input" />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="modern-property-input" />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="modern-property-input" />
          <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required className="modern-property-input" />
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} required className="modern-property-input">
            <option value="">Select Property Type</option>
            <option value="Flat">Flat</option>
            <option value="House">House</option>
            <option value="Villa">PG</option>
            <option value="Villa">Other</option>
          </select>
          <input type="text" name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} required className="modern-property-input" />
          <button type="submit" disabled={loading} className="modern-btn" style={{marginTop:'1.1rem'}}>{loading ? "Adding..." : "Add Property"}</button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
