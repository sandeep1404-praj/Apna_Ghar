import { Contact } from "../models/contact-modal.js";

export const contactForm = async(req,res)=>{
    try {
        const response = req.body;
        
        await Contact.create(response)
       return  res.status(200).json({mess:req.body})
    } catch (error) {
       return  res.status(500).json({mess:"Message is not delivered"})
    }
}