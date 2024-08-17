import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup'

import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import api from '../../config/configApi';

export const EditProfile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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

        await api.put("/edit-profile", { name, email }, headers)
            .then((response) => {
                localStorage.setItem('name', name);
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
            name: yup.string("Erro: Necessario preencher todos os campos nome!").required("Erro: Necessario preencher todos os campos nome!"),
            email: yup.string("Erro: Necessario preencher todos os campos e-mail!").email("Erro: Necessario preencher todos os campos e-mail!").required("Erro: Necessario preencher todos os campos e-mail!")
        })

        try {
            await schema.validate({
                name: name,
                email: email
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
                                        <label class="title-input">Nome</label>
                                        <input type="text" name="name" id="name" class="input-adm" placeholder="Nome completo do usuário" value={name} onChange={text => setName(text.target.value)} />
                                    </div>
                                </div>

                                <div class="row-input">
                                    <div class="column">
                                        <label class="title-input">E-mail</label>
                                        <input type="email" name="email" id="email" class="input-adm" placeholder="Melhor e-mail do usuário" value={email} onChange={text => setEmail(text.target.value)} />
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