import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth";
export const Header = ()=>{
    const {isLogin} = useAuth()
    return(<>
    <header>
        <div>
            <div className="container">
                <nav>
                    <div className="left-nav">
                        <img src="logo.png" alt="" />
                    </div>
                    <div className="right-nav">
                        <ul className="nav-containt">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/about'>About</NavLink></li>
                            <li><NavLink to='/room'>Rooms</NavLink></li>
                            <li><NavLink to='/contact'>Contact</NavLink></li>
                            {isLogin? (<>
                          <li><NavLink to= '/logout'>Logout</NavLink></li>
                          <li><NavLink to='/profile'><span>Profile</span></NavLink></li>
                          </>
                        ):(<>

                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/signup'>Sign Up</NavLink></li>
                        
                        </>
                        )}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    </>)
}