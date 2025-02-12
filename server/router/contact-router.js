import express from 'express';
import { contactForm } from '../controllers/contact-comtroller.js';
export const contactRouter = express.Router();
contactRouter.route("/contact").post(contactForm)