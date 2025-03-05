import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const SignUpPage = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    userType: "", // Added userType to manage radio button selection
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
        const response = await fetch("https://apna-ghar-2.onrender.com/api/auth/signup",
            {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            }
        )
        const res_data = await response.json()
            console.log("response after sign up:",res_data);
            storeTokenInLS(res_data.toke)
            
            if(response.ok){
                toast.success("Register Successfuly")
                setUser({
                    username:"",
                    phone:"",
                    email:"",
                    password:""
                })
                
                navigate("/")
            }else{
                toast.error(res_data.extraDetail? res_data.extraDetail : res_data.message)
            }
    } catch (error) {
        console.log("sign Up Error:",error);
        
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-left">
        <img src="signuphome.jpg" alt="Sign Up" height="300px" />
      </div>

      <div className="container">
        <div className="form_area">
        <form onSubmit={handleSubmit}> {/* ✅ Only one form tag */}
          <p className="title">SIGN UP</p>

          <div className="form_group">
            <label className="sub_title" htmlFor="name">Name:</label>
            <input
              placeholder="Enter your full name"
              className="form_style"
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </div>

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
            <label className="sub_title" htmlFor="phone">Phone:</label>
            <input
              placeholder="Enter your phone number"
              className="form_style"
              type="phone"
              name="phone"
              value={user.phone}
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

          {/* ✅ Fixed Radio Buttons - Now they update state */}
          <div className="radio-input">
            <label className="label">
              <input
                type="radio"
                name="userType"
                value="buyer"
                checked={user.userType === "buyer"}
                onChange={handleChange}
              />
              <p className="text">Buyer</p>
            </label>

            <label className="label">
              <input
                type="radio"
                name="userType"
                value="seller"
                checked={user.userType === "seller"}
                onChange={handleChange}
              />
              <p className="text">Seller</p>
            </label>
          </div>

          <button className="btn" type="submit">SIGN UP</button>
        </form>

        <p>
          Have an Account?  
          <NavLink className="link" to="/login">Login Here!</NavLink>
        </p>
      </div>
      </div>
    </div>
  );
};
