import { useEffect, useState, useTransition } from "react";
import { useAuth } from "../store/auth";
import { Loader } from "../components/Layout/Loader";
import { toast } from "react-toastify";

export const RoomPage = () => {
  const { room, user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [activeProperty, setActiveProperty] = useState(null); 
  const [messages, setMessages] = useState({}); 
  const [search,setSearch] = useState("")
  const [loading, setLoading] = useState(true);
  const [roomData, setRoomData] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("savedProperties")) || [];
    setSavedProperties(storedProperties);
    const fetchRooms = async () => {
      setLoading(true);
      try {
        setRoomData(room);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [room]);
  if (loading) return <Loader />;

  // Save Property Function
  const saveProperty = (property) => {
    if (savedProperties.some((p) => p._id === property._id)) {
      toast.warn("This property is already saved.");
      return;
    }
    const updatedProperties = [...savedProperties, property];
    localStorage.setItem("savedProperties", JSON.stringify(updatedProperties));
    setSavedProperties(updatedProperties);
    toast.success("Property saved!");
  };

  // Handle message input change
  const handleMessageChange = (propertyId, value) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [propertyId]: value,
    }));
  };

  // Function to handle contact request
  const handleContactSeller = async (propertyId) => {
    if (!activeProperty || activeProperty !== propertyId) {
      setActiveProperty(propertyId);
      return;
    }
    const message = messages[propertyId] || "I am interested in this property. Please contact me.";
    try {
      const response = await fetch("https://apna-ghar-2.onrender.com/api/property/contact-seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          buyerId: user._id,
          message,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Contact request sent successfully!");
        setMessages((prevMessages) => ({ ...prevMessages, [propertyId]: "" }));
        setActiveProperty(null);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request.");
    }
  };
  const searchdata = roomData.filter((room)=>room.location.toLowerCase().includes(search.toLocaleLowerCase()))
  if (isPending) return <Loader />;

  return (
    <>
      <div className="room-search animate-fade-in">
        <input
          type="text"
          placeholder="Search location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="modern-search-bar"
        />
      </div>
      <ul className="room-cardcontainer">
        {searchdata.map((curRoom, index) => {
          const { title, description, location, price, propertyType, available, images, _id } = curRoom;
          return (
            <li className="room-property-card fade-in-up" key={index} style={{animationDelay: `${index * 0.05}s`}}>
              <div className="room-img-wrap">
                <img src={images[0]} alt={title} className="room-property-img" />
              </div>
              <div className="room-property-content">
                <h1>{title}</h1>
                <h2>Location: {location}</h2>
                <h3><span>Property Type:</span> {propertyType}</h3>
                <h3><span>Price:</span> ₹{price}</h3>
                <h4><span>Available:</span> {available ? "Available" : "Not Available"}</h4>
                <p><span>Description:</span> {description}</p>
                {activeProperty === _id && (
                  <input
                    type="text"
                    placeholder="Enter your message"
                    value={messages[_id] || ""}
                    onChange={(e) => handleMessageChange(_id, e.target.value)}
                    className="modern-message-input"
                  />
                )}
                <div className="room-property-actions">
                  <button className="modern-btn contact" onClick={() => handleContactSeller(_id)}>
                    {activeProperty === _id ? "Send Message" : "Contact"}
                  </button>
                  <button className="modern-btn save" onClick={() => saveProperty(curRoom)}>
                    Save To Card
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
