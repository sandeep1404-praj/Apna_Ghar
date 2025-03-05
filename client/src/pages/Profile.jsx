import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import { SellerProperties } from "./SellerProperties";
import { BuyerRequests } from "./seller-contact";
import { Loader } from "../components/Layout/Loader";
import { toast } from "react-toastify";
import SavedProperties from "./SaveProperty";

export const Profile = () => {
    const { user } = useAuth();
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const [userData, setUserData] = useState({
        id: user._id || "", 
        name: user.fullName || "",
        email: user.email || "",
        role: user.userType || "",
        profilePicture: user.profilePicture || "", 
        properties: user.properties || [] // Ensure properties array exists
    });
 
   // Fetch updated user data
 const fetchUser = async () => {
    try {
        const id = params.id || user._id; // Use logged-in user ID if no params.id
        
        const response = await fetch(`https://apna-ghar-2.onrender.com/api/user/${id}`,{
            method:"GET"
        });
        const data = await response.json();
        
        
        if (response.ok) {
            setUserData(data); // Update user data
        } else {
            console.error("Error fetching user data:", data.message);
            console.log(data);
            
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

  
    useEffect(() => {
        
        if (user?._id) fetchUser();
    }, [user?._id]);
  if (isPending) return <Loader />;
    // Handle Profile Picture Update
    const handleUpdateProfilePic = async () => {
        try {
            console.log("User Data before update:", userData); // Debugging
            console.log(user.profilePicture);
            
            const response = await fetch(`https://apna-ghar-2.onrender.com/api/user/updateProfile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userData._id,  // Make sure this is defined
                    profilePicture: userData.profilePicture, // Send updated image URL
                }),
            });
    
            const data = await response.json();
            console.log("Server Response:", data); // Log response for debugging
    
            if (response.ok) {
                toast.success("Profile picture updated successfully!");
            } else {
                toast.error(`Error: ${data.message || "Failed to update profile picture"}`);
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Error updating profile picture");
        }
    };
    
    

    return (
        <>
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-pic-container">
                        <img className="profile-pic" src={userData.profilePicture || "https://source.unsplash.com/150x150/?person"} alt="Profile" />
                        <input
                            type="text"
                            placeholder="Enter Image URL"
                            value={userData.profilePicture}
                            onChange={(e) => setUserData({ ...userData, profilePicture: e.target.value })}
                        />
                        <button onClick={handleUpdateProfilePic}>Update Profile Picture</button>
                    </div>
                    <h2>{userData.name}</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.userType}</p>
                </div>
            </div>
        
        {userData.userType === "seller" && (
            <SellerProperties sellerId={user._id}/>
        )}
        
        {userData.userType === "seller" && (
            <BuyerRequests sellerId={user._id}/>
        )}
        {
            userData.userType ==="buyer"&&(
                <SavedProperties/>
            )
        }
        </>
    );
};
