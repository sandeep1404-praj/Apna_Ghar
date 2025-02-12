import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../store/auth";
import {  toast } from 'react-toastify';
import { Loader } from "../components/Layout/Loader";

export const BuyerRequests = () => {
  const { user } = useAuth(); // Get logged-in seller details
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const handleMarkAsContacted = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/seller/remove-buyer-request/${requestId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
        toast.success("Request Deleted")
      } else {
        toast.error("Request Not Deleted")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchBuyerRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/seller/buyer-requests/${user._id}`);
        const data = await response.json();
        if (response.ok) {
          setRequests(data);
    
        } else {
          console.error("Error fetching requests:", data.message);
          toast.error("Message is Not Sended")
        }
      } catch (error) {
        console.error("Error fetching buyer requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchBuyerRequests();
    }
  }, [user]);
  if (isPending) return <Loader />;
  return (
    <div className="buyer-requests-container">
      <h2>Buyer Requests</h2>
      {loading ? (
         <Loader />
      ) : requests.length === 0 ? (
        <p>No buyer requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req._id} className="request-card">
              <h3>Buyer: {req.buyerId.fullName}</h3>
              <p><strong>Email:</strong> {req.buyerId.email}</p>
              <p><strong>Phone:</strong> {req.buyerId.phone}</p>
              <p><strong>Message:</strong> {req.message}</p>
              <p><strong>Requested On:</strong> {new Date(req.timestamp).toLocaleString()}</p>
              <button onClick={()=>handleMarkAsContacted(req._id)}>Mark as Contacted</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
