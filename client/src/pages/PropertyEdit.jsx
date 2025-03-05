import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  // Fetch Property Details
  useEffect(() => {
    fetch(`https://apna-ghar-2.onrender.com/api/property/${propertyId}`)
      .then((res) => res.json())
      .then((data) => setProperty(data))
      .catch((err) => console.error("Error fetching property:", err));
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
    }
  };

  return (
    <div className="edit-property-container">
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={property.title} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={property.location} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={property.price} onChange={handleChange} required />

        <label>Property Type:</label>
        <input type="text" name="propertyType" value={property.propertyType} onChange={handleChange} required />

        <label>
          Available:
          <input type="checkbox" name="available" checked={property.available} onChange={handleChange} />
        </label>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
