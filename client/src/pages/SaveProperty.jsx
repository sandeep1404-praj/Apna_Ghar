import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
    const handleDelete = async (propertyId) => {
        console.log(propertyId);
            if (!propertyId) {
                
              toast.error("Invalid property ID");
              return;
            }
          
            const confirmDelete = window.confirm("Are you sure you want to delete this property?");
            if (!confirmDelete) return;
          
            try {
              const response = await fetch(`http://localhost:3000/api/buyer/remove-property/${propertyId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
          
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete property");
              }
          
              toast.success("Property deleted successfully");
              setSavedProperties((prev) => prev.filter((savedProperties) => savedProperties._id !== propertyId));
            } catch (error) {
              console.error("Error deleting property:", error);
              toast.error(error.message);
            }
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
            <button onClick={()=>handleDelete(property._id)}>Remove</button>
          </div>
        ))
      )}
    </div>
    </>);
};

export default SavedProperties;
