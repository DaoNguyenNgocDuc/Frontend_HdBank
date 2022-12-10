import React from 'react'
import { useState } from 'react';
import userImage from "../../Images/userImage.png"
import logo from "../../Images/LogoHDBank.png"
import { Link } from 'react-router-dom';
import "./navbar.css"
function Navbar() {
    const [user, setUser] = useState(false);
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logoNavbar" />
                </Link>
                {user ? (
                    <Link to="/">
                        <img
                            src={userImage}
                            alt=""
                            className="navBarImgUser"
                        />
                    </Link>
                ) : (
                    <div className="navItems">
                        <Link className="link" to="/login">
                            
                            <button className="btnButton btnDN">Đăng nhập</button>
                        </Link>
                        <Link className="link" to="/register">
                            <button className="btnButton btnDK">Đăng ký</button>
                        </Link>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar
