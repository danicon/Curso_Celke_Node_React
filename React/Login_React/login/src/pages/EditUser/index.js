import React, { useState, useEffect } from 'react'

import {Link, Redirect} from 'react-router-dom'

import api from '../../config/configApi'

export const EditUser = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [id] = useState(props.match.params.id)
    // console.log(id)

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const editUser = async e => {
        e.preventDefault()
        // console.log(name)

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put('/user', {id, name, email, password}, headers)
        .then((response) => {
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            })
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
                    setName(response.data.user.name)
                    setEmail(response.data.user.email)
                } else {
                    setStatus({
                        type: 'warning',
                        mensagem: "Erro: Usuário não encontrado!"
                    })
                }   
            }).catch((err) => {
                if(err.response) {
                    setStatus({
                        type: 'warning',
                        mensagem: err.response.data.mensagem
                    })
                } else {
                    setStatus({
                        type: 'warning',
                        mensagem: "Erro: Tente mais tarde!"
                    })
                }
            })
        }
        getUser()
    }, [id])

    return (
        <div>
            <Link to="/dashboard">Dashboard</Link><br/>
            <Link to="/users">Usuários</Link><br/>

            <h1>Editar Usuário</h1>

            <Link to="/users">Listar</Link><br/>

            {status.type === 'warning'? 
            <Redirect to={{
                pathname: "/users",
                state: {
                    type: "error",
                    mensagem: status.mensagem
                }
            }}/> : ""}
            {status.type === 'success'? <Redirect to={{
                pathname: "/users",
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }}/> : ""}
            {status.type === 'error'? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}

            {/* 1 - não encontrou - warning
                2 - não editou - error
                3 - api editou - success */}
                <hr/>
                <form onSubmit={editUser}>
                    <label>Nome: </label>
                    <input type='text' name='name' placeholder='Nome completo do usuário' value={name} onChange={text => setName(text.target.value)} /><br/><br/>

                    <label>E-mail: </label>
                    <input type='email' name='email' placeholder='Melhor e-mail do usuário' value={email} onChange={text => setEmail(text.target.value)} /><br/><br/>

                    <label>Senha: </label>
                    <input type='password' name='password' placeholder='Senha para acessar o sistema'  autoComplete='on' onChange={text => setPassword(text.target.value)} /><br/><br/>

                    <button type='submit'>Salvar</button>
                </form>

        </div>
    )
}