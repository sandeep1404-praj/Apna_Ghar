import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
export const Header = ()=>{
    const {isLogin} = useAuth()
    const [menuOpen, setMenuOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleButtonToggle = () => {
        return setShow(!show);
      };
    
    return(<>
    <header>
      <div className="container">
        <nav>
          {/* Left Logo */}
          <div className="left-nav">
            <img src="logo.png" alt="Logo" />
          </div>

          {/* Right Navigation */}
          <div className="right-nav">
            {/* Hamburger Button */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            {/* Menu List */}
            <ul className={`nav-containt ${menuOpen ? "active" : ""}`}>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/room">Rooms</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              {isLogin ? (
                <>
                  <li><NavLink to="/logout">Logout</NavLink></li>
                  <li><NavLink to="/profile"><span>Profile</span></NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/login">Login</NavLink></li>
                  <li><NavLink to="/signup">Sign Up</NavLink></li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
    </>)
}