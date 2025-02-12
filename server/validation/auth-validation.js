import {z} from 'zod';
export const signupSchema = z.object({
    fullname:z
    .string({required_error:"Name is Required"})
    .trim()
    .min(3,{message:"Name Must be have Minimum 3 Number."})
    .max(225,{message:"Name Must be have Maximum 225 Number."}),
    email:z
    .string({required_error:"email is Required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{message:"Email Must be have Minimum 3 Number."})
    .max(225,{message:"Email Must be have Maximum 225 Number."}),
    phone:z
    .string({required_error:"phone is Required"})
    .trim()
    .min(10,{message:"phone Must be have Minimum 10 Number."})
    .max(20,{message:"phone Must be have Maximum 20 Number."}),
    password:z
    .string({required_error:"password is Required"})
    .trim()
    .min(6,{message:"password Must be have Minimum 3 Number."})
    .max(1024,{message:"password have Maximum 1024 Number."}),
    
}) 
export const loginSchema = z.object({
    email:z
    .string({required_error:"email is Required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{message:"Email Must be have Minimum 3 Number."})
    .max(225,{message:"Email Must be have Maximum 225 Number."}),
    
    password:z
    .string({required_error:"password is Required"})
    .trim()
    .min(6,{message:"Invalid Password"})
    .max(1024,{message:"password have Maximum 1024 Number."}),
    
}) 