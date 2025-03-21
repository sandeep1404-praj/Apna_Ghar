import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
     const [token,setToken] = useState(localStorage.getItem("Token"))
     const[isLoadind,setIsLodind] = useState(true)
     const [user,setUser] = useState("")
     const [room,setRoom] = useState([])
     const AuthorizationToken = `Bearer ${token}`
     const storeTokenInLS = (serverToken)=>{
        setToken(serverToken)
        return localStorage.setItem("Token",serverToken)
     }
     //! Logout Function
     let isLogin = !! token
     const Logout = ()=>{
        setToken("");
        localStorage.removeItem("Token")
     }
     const userAuthentication = async ()=>{
        try {
            const response = await fetch("https://apna-ghar-2.onrender.com/api/auth/user",{
                method:"GET",
                headers:{Authorization:AuthorizationToken}
            })
            setIsLodind(true)
            if(response.ok){
                const data = await response.json()
            
                setUser(data.userData)
              
                setIsLodind(false)
            }
        } catch (error) {
            console.error("error for fating the userd data")
        }
    }
    const propertyData = async()=>{
        const response  = await fetch("https://apna-ghar-2.onrender.com/api/property/all",{
            method:"GET",
        })
        
        if(response.ok){
            const data = await response.json();
            setRoom(data)
        }
    }
    
    useEffect(()=>{
        userAuthentication()
        propertyData()
    },[])
     return(
        <AuthContext.Provider value={{storeTokenInLS,Logout,isLogin,isLoadind,user,room}}>
            {children}
        </AuthContext.Provider>
     )
}
export const useAuth = ()=>{
    return useContext(AuthContext)
}