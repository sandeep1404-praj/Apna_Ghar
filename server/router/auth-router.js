import express from 'express'
import { home, login, signup, updateUserById, user } from '../controllers/auth-comtrollers.js'
import authMiddleware from '../middlewares/auth-middleware.js'
import { validate } from '../middlewares/validate-middleware.js'
import { loginSchema, signupSchema } from '../validation/auth-validation.js'
export const authrouter = express.Router()
authrouter.route('/').get(home)
authrouter.route('/signup').post(signup)
authrouter.route('/login').post(validate(loginSchema),login)
authrouter.route('/user').get(authMiddleware,user)
authrouter.route("/users/update/:id").patch(authMiddleware,updateUserById)