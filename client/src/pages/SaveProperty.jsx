import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader } from "../components/Layout/Loader";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const removeSavedProperty = (propertyId) => {
    // Filter out the property to be removed
    const updatedProperties = savedProperties.filter(property => property._id !== propertyId);
  
    // Update localStorage
    localStorage.setItem("savedProperties", JSON.stringify(updatedProperties));
  
    // Update state
    setSavedProperties(updatedProperties);
  
    toast.success("Property removed!");
  };
  
  useEffect(() => {
    setLoading(true);
    const storedProperties = JSON.parse(localStorage.getItem("savedProperties")) || [];
    setSavedProperties(storedProperties);
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (<>
      <h1 style={{fontSize:"25px",fontWeight:"700",textAlign:"center",marginBottom:"1.5rem"}}>Saved Properties</h1>
    <div className="saved-property-grid">
      {savedProperties.length === 0 ? (
        <p>No properties saved yet.</p>
      ) : (
        savedProperties.map((property, index) => (
          <div key={index} className="saved-property-card fade-in-up" style={{animationDelay: `${index * 0.05}s`}}>
            <img src={property.images} alt={property.title} className="saved-property-img" />
            <div className="saved-property-content">
              <h2>{property.title}</h2>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Price:</strong> ₹{property.price}</p>
              <p><strong>Description:</strong> {property.description}</p>
              <p><strong>PropertyType:</strong> {property.propertyType}</p>
              <button className="modern-btn delete" onClick={() => removeSavedProperty(property._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
    </>);
};

export default SavedProperties;
