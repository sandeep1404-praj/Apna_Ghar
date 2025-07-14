import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components/Layout/Loader";

export const PropertyEdit = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: "",
    location: "",
    price: "",
    propertyType: "",
    available: false,
  });
  const [loading, setLoading] = useState(true);

  // Fetch Property Details
  useEffect(() => {
    setLoading(true);
    fetch(`https://apna-ghar-2.onrender.com/api/property/${propertyId}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error("Error fetching property:", err))
      .finally(() => setLoading(false));
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty({
      ...property,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://apna-ghar-2.onrender.com/api/property/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });

      if (response.ok) {
        toast.success("Property updated successfully!");
        navigate("/profile"); // Redirect to profile or property list
      } else {
        toast.error("Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="modern-property-form-container fade-in-up">
      <div className="modern-property-form-card">
        <h2>Edit Property</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={property.title} onChange={handleChange} required className="modern-property-input" placeholder="Title" />
          <input type="text" name="location" value={property.location} onChange={handleChange} required className="modern-property-input" placeholder="Location" />
          <input type="number" name="price" value={property.price} onChange={handleChange} required className="modern-property-input" placeholder="Price (₹)" />
          <select name="propertyType" value={property.propertyType} onChange={handleChange} required className="modern-property-input">
            <option value="">Select Property Type</option>
            <option value="Flat">Flat</option>
            <option value="House">House</option>
            <option value="Villa">PG</option>
            <option value="Villa">Other</option>
          </select>
          <label style={{marginTop:'0.7rem'}}>
            <input type="checkbox" name="available" checked={property.available} onChange={handleChange} style={{marginRight:'0.5rem'}} />
            Available
          </label>
          <button type="submit" className="modern-btn" style={{marginTop:'1.1rem'}}>Update Property</button>
        </form>
      </div>
    </div>
  );
};
