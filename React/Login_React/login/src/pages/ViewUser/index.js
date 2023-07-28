import React, { useEffect, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'

import { servDeleteUser } from '../../services/servDeleteUser';
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
                        type: 'redError',
                        mensagem: "Erro: Usuário não encontrado!"
                    })
                }   
            }).catch((err) => {
                if(err.response) {
                    setStatus({
                        type: 'redError',
                        mensagem: err.response.data.mensagem
                    })
                } else {
                    setStatus({
                        type: 'redError',
                        mensagem: "Erro: Tente mais tarde!"
                    })
                }
            })
        }
        getUser()
    }, [id])

    const deleteUser = async (idUser) => {

        const response = await servDeleteUser(idUser)
        // console.log(response)

        if(response) {
            if(response.type === "success") {
                setStatus({
                    type: "redSuccess",
                    mensagem: response.mensagem
                })
            } else {
                setStatus({
                    type: response.type,
                    mensagem: response.mensagem
                })
            }
        } else {
            setStatus({
                type: "redError",
                mensagem: "Erro: Tente mais tarde!"
            })
        }
    }

    return(
        <div>
            <Link to="/dashboard">Dashboard</Link><br/>
            <Link to="/users">Usuários</Link><br/>

            <h1>Detalhes do Usuário</h1>

            <Link to="/users"><button type='button'>Listar</button></Link>{" "}
            <Link to={"/edit-user/" + data.id}><button type='button'>Editar</button></Link>{" "}
            <Link to="#"><button type='button' onClick={() => deleteUser(data.id)}>Apagar</button></Link>{" "}        

            {status.type === 'redSuccess'? 
            <Redirect to={{
                pathname: "/users",
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }}/> : ""}

            {status.type === 'redError'? 
            <Redirect to={{
                pathname: "/users",
                state: {
                    type: "error",
                    mensagem: status.mensagem
                }
            }}/> : ""}
            {status.type === 'success'? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
            
            <hr/>
            
            <span>{data.id}</span><br />
            <span>{data.name}</span><br />
            <span>{data.email}</span><br />
        </div>
    )
}