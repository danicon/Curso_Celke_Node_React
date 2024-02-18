import React, { useContext, useState } from "react";
import { Context } from '../../Context/AuthContext'

import { Link } from 'react-router-dom'

export const Navbar = () => {

    const [image] = useState(localStorage.getItem('image'))
    const [name] = useState(localStorage.getItem('name'))

    const { handleLogout } = useContext(Context)

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
                    <img src={image} alt={name} />
                    <div className="dropdow-menu setting">
                        <div className="item">
                            <span className="fa-solid fa-user"></span> Perfil
                        </div>
                        <div className="item">
                            <span className="fa-solid fa-gear"></span> Configuração
                        </div>
                        <div className="item">
                            <span className="fa-solid fa-right-from-bracket"></span> Sair
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}