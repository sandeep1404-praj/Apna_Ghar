import { useEffect, useState, useTransition } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { Loader } from "../components/Layout/Loader";
export const SellerProperties = ({ sellerId }) => {
    const {user} =useAuth()
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
    const navigate = useNavigate()
    const handleDelete = async (propertyId) => {
        if (!propertyId) {
          toast.error("Invalid property ID");
          return;
        }
      
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (!confirmDelete) return;
      
        try {
          const response = await fetch(`https://apna-ghar-2.onrender.com/api/property/remove-property/${propertyId}`, {
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
          setProperties((prev) => prev.filter((property) => property._id !== propertyId));
        } catch (error) {
          console.error("Error deleting property:", error);
          toast.error(error.message);
        }
      };
      

  useEffect(() => {
    const fetchSellerProperties = async () => {
      try {
        if (!sellerId) {
          setError("Seller ID is missing!");
          return;
        }

        const response = await fetch(`https://apna-ghar-2.onrender.com/api/property/seller/${sellerId}`);
  
        
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProperties();
  }, [sellerId]);

  if (loading) return  <Loader />
  if (error) return <p>Error: {error}</p>;
  if (properties.length === 0) return <p>No properties found.</p>;
    if (isPending) return <Loader />;

  return (<>
  <h1 style={{fontSize:"25px",fontWeight:"700",textAlign:"center"}}>Your Property</h1>
    <ul className="property-list-pro">
      {properties.map((property, index) => {
        const { title, description, location, price, propertyType, available, images, _id,propertyId} = property;

        return (<>
            <li key={index} className="property-card">
            <img src={images[0]} alt={title} className="property-img" />
            <h2>{title}</h2>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Price:</strong> ₹{price}</p>
            <p><strong>Type:</strong> {propertyType}</p>
            <p><strong>Available: </strong>{available ? "Available" : "Not Available"}</p>
            <button className="contact-btn" style={{margin:"5px 5px",padding:"11px 19px"}} onClick={() => navigate(`/edit-property/${_id}`)}> Edit</button>
            <button className="contact-btn" style={{ margin: "5px 5px" }} onClick={() => handleDelete(_id)}>Delete</button>

          </li>
          
        </>
        );
        
      })}
    <div className="addproperty" >
      <NavLink className="plus-button" to='/add-property'>+</NavLink>
    </div>
    </ul>
    
  
  </>
  );
};