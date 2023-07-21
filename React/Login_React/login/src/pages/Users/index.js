import React, {useEffect, useState} from 'react';

import api from '../../config/configApi'

import {Link} from 'react-router-dom'

export const Users = () => {

    const [data, setData] = useState([])

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const getUsers = async () => {

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/users", headers)
        .then((response) => {
            // console.log(response)
            setData(response.data.users)
        }).catch((err) => {
            if(err.response) {
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
                // console.log(err.response.data.mensagem)
            } else {
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                })
                // console.log("Erro: Tente mais tarde!")
            }
        })
    }

    useEffect(() => {
        getUsers()
    })

    return(
        <>
            <Link to="/dashboard">Dashboard</Link><br/>
            <Link to="/users">Usuários</Link><br/>
            
            <h1>Listar Usuários</h1>

            {status.type === 'error'? <p>{status.mensagem}</p> : ""}

            {data.map(user => (
                <div key={user.id}>
                    <span>{user.id}</span><br/>
                    <span>{user.name}</span><br/>
                    <span>{user.email}</span><br/><hr/>
                </div>
            ))}
        </>
    );
}