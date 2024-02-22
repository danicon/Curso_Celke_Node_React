import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup'

import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import api from '../../config/configApi';

export const AddUser = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const addUser = async e => {
        e.preventDefault();

        if (!(await validate())) return

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/user', user, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });
    }

    // function validate() {
    //     if(!user.name) return setStatus({ type: 'error', mensagem: 'Erro: Necessario preencher o campo nome!' })
    //     if(!user.email) return setStatus({ type: 'error', mensagem: 'Erro: Necessario preencher o campo email!' })
    //     if(!user.password) return setStatus({ type: 'error', mensagem: 'Erro: Necessario preencher o campo senha!' })
    //     if(user.password.length < 6) return setStatus({ type: 'error', mensagem: 'Erro: A senha precisa ter pelo menos 6 caracteres!' })
    //     return true
    // }

    async function validate() {
        let schema = yup.object().shape({
            name: yup.string("Erro: Necessario preencher todos os campos nome!").required("Erro: Necessario preencher todos os campos nome!"),
            email: yup.string("Erro: Necessario preencher todos os campos e-mail!").email("Erro: Necessario preencher todos os campos e-mail!").required("Erro: Necessario preencher todos os campos e-mail!"),
            password: yup.string("Erro: Necessario preencher todos os campos senha!").required("Erro: Necessario preencher todos os campos senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!")
        })

        try {
            await schema.validate({
                name: user.name,
                email: user.email,
                password: user.password
            })
            return true
        } catch (err) {
            // console.log(err)
            setStatus({
                type: 'error',
                mensagem: err.errors
            })
            return false
        }

    }


    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="users" />

                <h1>Cadastrar Usuário</h1>
                <Link to="/users"><button type="button">Listar</button></Link><br />


                {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
                {status.type === 'success' ?
                    <Redirect to={{
                        pathname: '/users',
                        state: {
                            type: "success",
                            mensagem: status.mensagem
                        }
                    }} />
                    : ""}

                <hr />

                <form onSubmit={addUser}>
                    <label>Nome*: </label>
                    <input type="text" name="name" placeholder="Nome completo do usuário" onChange={valueInput} /><br /><br />

                    <label>E-mail*: </label>
                    <input type="email" name="email" placeholder="Melhor e-mail do usuário" onChange={valueInput} /><br /><br />

                    <label>Senha*: </label>
                    <input type="password" name="password" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={valueInput} /><br /><br />

                    * Campo obrigatório<br /><br />

                    <button type="submit">Cadastrar</button>
                </form>

            </div>
        </div>
    );
};