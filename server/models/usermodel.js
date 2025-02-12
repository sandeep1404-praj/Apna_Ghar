import mongoose from "mongoose";
import bycryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema(
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePicture: { type: String, default: "" },
      userType: { type: String, enum: ["buyer", "seller"], required: true },
      isAdmin:{
        type:Boolean,
        default:false
      }
    },
    { timestamps: true }
  );

//! securing the password
userSchema.pre("save",async function(next){
  const user = this //users ka sara data this method me hai
  if(!user.password){
      next()
  }
  try {
      const saltRount = await bycryptjs.genSalt(10);
      const hash_password = await bycryptjs.hash(user.password,saltRount);
      user.password = hash_password;
  } catch (error) {
      next(error)
  }
})
// json web token
userSchema.methods.generateToken = async function() {
  try {
      return jwt.sign({
          userId:this._id.toString(),
          email:this.email,
          isAdmin:this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn:"1D"  
      })
  } catch (error) {
      console.error(error);
      
  }
  
}
//! compareing the password
userSchema.methods.comparePassword = async function (password) {
 return bycryptjs.compare(password,this.password)
  
}
export const User = mongoose.model("User", userSchema);
