import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

const authMiddleware = async(req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied from auth-middleware" });
  const jwtToken = token.replace("Bearer","").trim()
  console.log("Token from middleware",jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
        console.log(isVerified);
        const userData = await User.findOne({email:isVerified.email}).select({password:0})
        console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
    console.log(error);
    
  }
};

export default authMiddleware;
