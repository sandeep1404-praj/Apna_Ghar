import { useState } from "react"
import { Bounce, toast } from "react-toastify"
import { useAuth } from "../store/auth"
import { Tooltip } from "./ToolTip"

export const ContactPage = ()=>{
    const [contect,setContect] = useState({
        email:"",
        fullName:"",
        message:"",
    })
    const [userData, setUserData] = useState(true)

    const {user}= useAuth()
    if(userData && user){
        setContect({
            fullName:user.fullName,
            email:user.email,
            message:""
        })
        setUserData(false)
    }
    const handalInput = (e)=>{
        const {name,value}= e.target;
        setContect((prev) =>({...prev,[name]:value}))
    
    
    }
    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        try {
            const response = await fetch("https://apna-ghar-2.onrender.com/api/form/contact",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(contect)
            })
            if(response.ok){
                setContect({
                    message:"",
                })
                toast('🦄 Message Send!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }else{
                toast.error("Messagenot send")
            }

        } catch (error) {
            console.log("contact error",error);
            
        }

    }

    return(<>
    <form onSubmit={handleFormSubmit}>
    <div className="contact-container">
<div className="card-conatct ">
  <p className="heading-contact">Form</p>
  
 <div className="input-div">
    <div className="input-div">
    <input className="input-conatct" type="text" placeholder="Full Name" name="fullName" value={contect.fullName} onChange={handalInput} required/>
    </div>
    <input type="text" className="input-conatct" placeholder="Email" name="email" value={contect.email} onChange={handalInput} required/>
    </div>
    <div className="input-div">
    <textarea className="input-conatct" cols= '35' rows='5' type="text" placeholder="Message" name='message'value={contect.message} onChange={handalInput} required/>
    </div>
    <div className="button-div">
      <button className="submit-conatct">Submit</button>
    </div>
</div>
    </div>
    </form>
    <Tooltip/>
    </>)
}