import React, { useEffect, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'

import api from '../../config/configApi'

export const ViewUser = (props) => {

    const [data, setData] = useState('')
    const [id] = useState(props.match.params.id)
    // console.log(id)

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    useEffect(() => {
        const getUser = async () => {
            
            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get('/user/' + id, headers)
            .then((response) => {
                if(response.data.user) {
                    // console.log(response.data.user)
                    setData(response.data.user)
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Usuário não encontrado!"
                    })
                }   
            }).catch((err) => {
                if(err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    })
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente mais tarde!"
                    })
                }
            })
        }
        getUser()
    }, [id])

    return(
        <div>
            <Link to="/dashboard">Dashboard</Link><br/>
            <Link to="/users">Usuários</Link><br/>

            <h1>Detalhes do Usuário</h1>

            <Link to="/users">Listar</Link><br/>

            {status.type === 'error'? 
            <Redirect to={{
                pathname: "/users",
                state: {
                    type: status.type,
                    mensagem: status.mensagem
                }
            }}/> : ""}
            {status.type === 'success'? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
            
            <span>{data.id}</span><br />
            <span>{data.name}</span><br />
            <span>{data.email}</span><br />
        </div>
    )
}