import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
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
    const storedProperties = JSON.parse(localStorage.getItem("savedProperties")) || [];
    setSavedProperties(storedProperties);
  }, []);

  return (<>
      <h1 style={{fontSize:"25px",fontWeight:"700",textAlign:"center"}}>Saved Properties</h1>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",flexWrap:"wrap"}}>
      {savedProperties.length === 0 ? (
        <p>No properties saved yet.</p>
      ) : (
        savedProperties.map((property, index) => (
          <div key={index} className="property-card" style={{width:"20%",height:"auto",marginBottom:"15px"}}>
            <img src={property.images} alt={property.title} className="property-img" />
            <h2>{property.title}</h2>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Price:</strong> ₹{property.price}</p>
            <p><strong>Description:</strong> {property.description}</p>
            <p><strong>PropertyType:</strong> {property.propertyType}</p>
            <button onClick={() => removeSavedProperty(property._id)}>Remove</button>
          </div>
        ))
      )}
    </div>
    </>);
};

export default SavedProperties;
