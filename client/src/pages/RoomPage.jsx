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

  // State for saved properties
  const [savedProperties, setSavedProperties] = useState([]);

  // Load saved properties from localStorage on component mount
  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("savedProperties")) || [];
    setSavedProperties(storedProperties);
  }, []);

  // Save Property Function
  const saveProperty = (property) => {
    // Check if already saved
    if (savedProperties.some((p) => p._id === property._id)) {
      alert("This property is already saved.");
      return;
    }

    const updatedProperties = [...savedProperties, property];

    localStorage.setItem("savedProperties", JSON.stringify(updatedProperties));
    setSavedProperties(updatedProperties);
    alert("Property saved!");
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
      const response = await fetch("http://localhost:3000/api/property/contact-seller", {
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
  const searchdata = room.filter((room)=>room.location.toLowerCase().includes(search.toLocaleLowerCase()))
  if (isPending) return <Loader />;

  return (
    <>
    <div className="room-search">
      <input type="text" placeholder='Search location' value={search} onChange={(e)=>setSearch(e.target.value)} />
    </div>
      <ul className="cardcontainer">
        {searchdata.map((curRoom, index) => {
          const { title, description, location, price, propertyType, available, images, _id } = curRoom;

          return (
            <li className="card" key={index}>
              <div className="img">
                <img src={images[0]} alt={title} />
              </div>
              <h1>{title}</h1>
              <h2>Location: {location}</h2>
              <h3><span>Property Type:</span> {propertyType}</h3>
              <h3><span>Price:</span> ₹{price}</h3>
              <h4><span>Available:</span> {available ? "Available" : "Not Available"}</h4>
              <p><span>Description:</span> {description}</p>

              {/* Show input field only when Contact button is clicked */}
              {activeProperty === _id && (
                <input
                  type="text"
                  placeholder="Enter your message"
                  value={messages[_id] || ""}
                  onChange={(e) => handleMessageChange(_id, e.target.value)}
                  className="message-input"
                />
              )}

              {/* Button toggles input and sends data */}
              <button className="contact-but" onClick={() => handleContactSeller(_id)}>
                {activeProperty === _id ? "Send Message" : "Contact"}
              </button>

              {/* Save to Card Button */}
              <button onClick={() => saveProperty(curRoom)}>Save To Card</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
