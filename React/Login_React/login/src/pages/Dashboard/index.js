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
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}