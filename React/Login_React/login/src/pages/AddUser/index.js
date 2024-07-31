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
            password: yup.string("Erro: Necessario preencher o campo senha!").required("Erro: Necessario preencher o campo senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!"),
            email: yup.string("Erro: Necessario preencher o campo e-mail!").email("Erro: Necessario preencher o campo e-mail!").required("Erro: Necessario preencher o campo e-mail!"),
            name: yup.string("Erro: Necessario preencher o campo nome!").required("Erro: Necessario preencher o campo nome!")
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

                <div class="wrapper">
                    <div class="row">

                        <div class="top-content-adm">
                            <span class="title-content">Cadastrar Usuário</span>
                            <div class="top-content-adm-rigth">
                                <Link to="/users">
                                    <button type="button" class="btn-info">Listar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className='alert-danger'>{status.mensagem}</p> : ""}
                            {status.type === 'success' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}
                        </div>

                        <div class="content-adm">
                            <form onSubmit={addUser} class="form-adm">

                                <div class="row-input">
                                    <div class="column">
                                        <label class="title-input">Nome</label>
                                        <input type="text" name="name" id="name" class="input-adm" placeholder="Nome completo do usuário" onChange={valueInput} />
                                    </div>
                                </div>

                                <div class="row-input">
                                    <div class="column">
                                        <label class="title-input">E-mail</label>
                                        <input type="email" name="email" id="email" class="input-adm" placeholder="Melhor e-mail do usuário" onChange={valueInput} />
                                    </div>

                                    <div class="column">
                                        <label class="title-input">Senha</label>
                                        <input type="password" name="password" id="password" class="input-adm" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={valueInput} />
                                    </div>
                                </div>

                                <button type="submit" class="btn-success">Cadastrar</button>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};