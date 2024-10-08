import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup'

import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import api from '../../config/configApi';

export const EditProfilePassoword = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editUser = async e => {
        e.preventDefault();

        if (!(await validate())) return

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/edit-profile-password", { password }, headers)
            .then((response) => {
                setStatus({
                    type: 'redSuccess',
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
                        mensagem: 'Erro: Tente mais tarde!'
                    });
                }
            });
    }

    useEffect(() => {
        const getUser = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/view-profile", headers)
                .then((response) => {
                    if (response.data.user) {
                        setName(response.data.user.name);
                        setEmail(response.data.user.email);
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Usuário não encontrado!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redWarning',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }

        getUser();
    }, []);

    async function validate() {
        let schema = yup.object().shape({
            password: yup.string("Erro: Necessario preencher o campo senha!").required("Erro: Necessario preencher o campo senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!")
        })

        try {
            await schema.validate({
                password: password
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
                <Sidebar active="profile" />

                <div class="wrapper">
                    <div class="row">

                        <div class="top-content-adm">
                            <span class="title-content">Editar Usuário</span>
                            <div class="top-content-adm-rigth">
                                <Link to="/view-profile">
                                    <button type="button" class="btn-info">Perfil</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/login',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/view-profile',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
                        </div>

                        {/*1 - não encontrou - warning
                        2 - Não editou - error
                        3 - API editou - success */}

                        <div class="content-adm">
                            <form onSubmit={editUser} class="form-adm">
                                <div class="row-input">
                                    <div class="column">
                                        <label>Nome: {name}</label>
                                    </div>

                                    <div class="column">
                                        <label>E-mail: {email}</label>
                                    </div>
                                </div>

                                <div class="row-input">
                                    <div class="column">
                                        <label class="title-input">Senha</label>
                                        <input type="password" name="password" id="password" class="input-adm" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={text => setPassword(text.target.value)} />
                                    </div>
                                </div>

                                <button type="submit" class="btn-warning">Salvar</button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}