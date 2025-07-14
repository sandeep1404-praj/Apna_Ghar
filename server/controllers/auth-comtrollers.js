//! Authentication ke liye Router ke pages eg.home page,login page etc.

import { User } from "../models/usermodel.js";

//* ________________________________________
//* Home Page
//*_________________________________________
export const home = (req,res)=>{
    try {
        res.send("Hello Home Page")
        
    } catch (error) {
        res.send("Internal Server Error From Home page")
    }
}

//* ________________________________________
//* signup Page
//*_________________________________________

export const signup = async (req, res) => {
    try {
      const { fullName, email, phone, password, userType } = req.body;
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      // Create new user
      const usecreated = await User.create({fullName,email,phone,password,userType})
        res.json({
            mess:"user created",
            toke:await usecreated.generateToken(),
            userId:usecreated._id.toString(),
            })
    
    } catch (error) {
      res.status(500).json({error});
      
    }
  };
//* ________________________________________
//*login Page
//*_________________________________________

export const login =  async (req, res) => {
    try {
      const { email, password } = req.body;
      const userexist = await User.findOne({ email });
  
      if (!userexist) return res.status(400).json({ message: "User not found" });
  
      const user = await userexist.comparePassword(password);
        if(user){
            return res.json({
                mess:"User Login ",
                toke:await userexist.generateToken(),
                userId:userexist._id.toString(),
                })
        } 
        else{
            res.status(401).json({ message: "invalid Email or Password" })
        }
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }

export const user = (req,res) =>{
  try {
    const userData = req.user
    return res.json({userData})
  } catch (error) {
    console.log(`Error From The User Data ${error}`);
    
  }
}

export const updateUserById =async (req,res,next)=>{
  try {
      const id = req.params.id;
      const newData = req.body;
      const updateData = await User.updateOne(
          {_id:id},
          {
              $set:newData
          })
          if (!id || !newData) {
              return res.status(400).json({ message: "Invalid data provided" });
            }
        
         return res.status(200).json(updateData)
  } catch (error) {
      next(error)
  }
}