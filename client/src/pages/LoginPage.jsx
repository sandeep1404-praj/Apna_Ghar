import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const LoginPage = ()=>{
    const [user, setUser] = useState({
        email: "",
        password: ""
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const navigate = useNavigate()
    
        const {storeTokenInLS} = useAuth()
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("https://apna-ghar-2.onrender.com/api/auth/login",
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(user)
                }
            )
            const res_data = await response.json()
                console.log("response after login up:",res_data);
                storeTokenInLS(res_data.toke)
                
                if(response.ok){
                    toast.success("Login Successfuly")
                    setUser({
                        username:"",
                        phone:"",
                        email:"",
                        password:""
                    })
                    
                    navigate("/")
                }else {
                  toast.error(res_data.message || "Login failed"); // ✅ Display backend error
                }
        } catch (error) {
          console.error("Login Error:", error);
          toast.error("Something went wrong! Please try again.");
        }
      };
    return(<>
      
    <div className="sign-container">
      <div className="sign-left">
        <img src="signuphome.jpg" alt="Sign Up" height="300px" />
      </div>

      <div className="container">
        <div className="form_area">
        <form onSubmit={handleSubmit}> {/* ✅ Only one form tag */}
          <p className="title">Login</p>


          <div className="form_group">
            <label className="sub_title" htmlFor="email">Email:</label>
            <input
              placeholder="Enter your email"
              className="form_style"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="form_group">
            <label className="sub_title" htmlFor="password">Password:</label>
            <input
              placeholder="Enter your password"
              className="form_style"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
      </div>
    </div>
  );
    </>)
}