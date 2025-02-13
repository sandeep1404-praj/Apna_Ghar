import express from 'express'
import { authrouter } from './router/auth-router.js';
import { connectDb } from './utility/db.js';
import { sellerrouter } from './router/seller-route.js';
import { propertyrouter } from './router/property-router.js';
import cors from 'cors'
import { contactRouter } from './router/contact-router.js';
import { userRouters } from './router/userRoute.js';

const app = express()
app.use(express.urlencoded({ extended: true })); 
const PORT = 3000;  
const corsOptions = {
    origin: "http://localhost:5173",
    method:"GET, POST, PUT, PATCH, DELETE,HEAD",
    CredentialS:true,
  }
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authrouter);
app.use("/api/user", userRouters);
app.use("/api/form",contactRouter)
app.use("/api/seller", sellerrouter);
app.use('/api/property',propertyrouter)

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Your App is running at Port 3000`);
        
    })
})
