import { useEffect } from "react"
import { useAuth } from "../store/auth"
import { Navigate } from "react-router-dom"

export const LogoutPage = ()=>{
    const {Logout} = useAuth()
    useEffect(()=>{
        Logout()
    },[Logout])
    return <Navigate to='/login'/>
}