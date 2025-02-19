import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { Profile } from './pages/Profile'
import { ContactPage } from './pages/ContactPage'
import { RoomPage } from './pages/RoomPage'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { AppLaout } from './components/Layout/AppLaout'
import './App.css'
import { LogoutPage } from './pages/LogoutPage'
import { PropertyEdit } from './pages/PropertyEdit'
import AddProperty from './pages/AddProperty'
import { ErrorPage } from './components/Layout/Error'
const App = ()=>{
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLaout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<HomePage/>,
        },
        {
          path:'/about',
          element:<AboutPage/>
        },
        {
          path:'/room',
          element:<RoomPage/>
        },
        {
          path:'/contact',
          element:<ContactPage/>
        },
        {
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/add-property',
          element:<AddProperty/>
        },
        {
          path:'/edit-property/:propertyId',
          element:<PropertyEdit/>
        },
        {
          path:'/login',
          element:<LoginPage/>
        },
        {
          path:'/logout',
          element:<LogoutPage/>
        },
        {
          path:'/signup',
          element:<SignUpPage/>
        },
        
      ]
    }
  ])
  return(<>
  <RouterProvider router={router}></RouterProvider>
  </>)
}

export default App