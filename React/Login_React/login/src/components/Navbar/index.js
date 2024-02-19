import React, { useContext, useState } from "react";
import { Context } from '../../Context/AuthContext'

export const Navbar = () => {

    const [image] = useState(localStorage.getItem('image'))
    const [name] = useState(localStorage.getItem('name'))

    const { handleLogout } = useContext(Context)

    const dropdownUserNavbar = async () => {
        document.getElementById("dropNavbarUser").classList.toggle("dropdown-menu-action")
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="bars">
                    <i className="fa-solid fa-bars"></i>
                </div>
                <img src="logo.png" alt="Daniel" className="logo" />
            </div>

            <div className="navbar-content">
                <div className="avatar">
                    <span onClick={() => dropdownUserNavbar()} className="drop-nav-bar-user">
                        <img src={image} alt={name} />
                    </span>
                    <div id="dropNavbarUser" className="dropdow-menu setting">
                        <div className="item">
                            <span className="fa-solid fa-user"></span> Perfil
                        </div>
                        <div className="item">
                            <span className="fa-solid fa-gear"></span> Configuração
                        </div>
                        <div className="item" onClick={handleLogout}>
                            <span className="fa-solid fa-right-from-bracket"></span> Sair
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}