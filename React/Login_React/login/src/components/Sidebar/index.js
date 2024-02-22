import React, { useContext } from "react";
import { Context } from '../../Context/AuthContext'

import {Link} from "react-router-dom"

export const Sidebar = (props) => {

    const { handleLogout } = useContext(Context)

    return (
        <div id="barsSidebar" className="sidebar">
            <Link to="/dashboard" className={props.active === "dashboard" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa-solid fa-gauge-high"></i><span>Dashboard</span></Link>
            <Link to="/users" className={props.active === "users" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa-solid fa-users"></i><span>Usuário</span></Link>
            <Link to="/view-profile" className={props.active === "profile" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fa-solid fa-user"></i><span>Perfil</span></Link>
            <Link to="#" onClick={handleLogout} className="sidebar-nav"><i className="icon fa-solid fa-right-from-bracket"></i><span>Sair</span></Link>
        </div>
    )
}