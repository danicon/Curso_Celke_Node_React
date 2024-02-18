import React from 'react';
import {Navbar} from "../../components/Navbar"
import {Menu} from '../../components/Menu'

export const Dashboard = () => {

    // console.log("Situação do usuário na página dashboard: " + authenticated);

    return (
        <div>
            <Navbar />
            <Menu />
            <h1>Dashboard</h1>    
        </div>
    );
}