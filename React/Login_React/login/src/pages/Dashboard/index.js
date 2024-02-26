import React from 'react';
import { Navbar } from "../../components/Navbar"
import { Sidebar } from '../../components/Sidebar'

export const Dashboard = () => {

    // console.log("Situação do usuário na página dashboard: " + authenticated);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="dashboard" />
                <div className="wrapper">
                    <div className="row">
                        <div className="box box-first">
                            <span className="fa-solid fa-users"></span>
                            <span>397</span>
                            <span>Usuários</span>
                        </div>

                        <div className="box box-second">
                            <span className="fa-solid fa-truck-ramp-box"></span>
                            <span>43</span>
                            <span>Entregas</span>
                        </div>

                        <div className="box box-third">
                            <span className="fa-solid fa-circle-check"></span>
                            <span>12</span>
                            <span>Completas</span>
                        </div>

                        <div className="box box-fourth">
                            <span className="fa-solid fa-triangle-exclamation"></span>
                            <span>3</span>
                            <span>Alertas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}