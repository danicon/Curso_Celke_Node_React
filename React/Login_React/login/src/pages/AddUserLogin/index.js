import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import api from '../../config/configApi';

export const AddUserLogin = () => {

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
                'Content-Type': 'application/json'
            }
        };

        await api.post('/add-user-login', user, headers)
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
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });
    }

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
        <div className="d-flex">
            <div className="container-login">
                <div className="wrapper-login">

                    <div className="title">
                        <span>Cadastrar Usuário</span>
                    </div>

                    <form onSubmit={addUser} className="form-login">

                        {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        {status.type === 'redSuccess' ?
                            <Redirect to={{
                                pathname: '/',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} />
                            : ""}

                        <div className="row">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="name" placeholder="Nome completo do usuário" onChange={valueInput} />
                        </div>

                        <div className="row">
                            <i class="fa-solid fa-envelope"></i>
                            <input type="email" name="email" placeholder="Melhor e-mail do usuário" onChange={valueInput} />
                        </div>

                        <div className="row">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={valueInput} />
                        </div>

                        <div className="row button">
                            <button type="submit" className="button-login">Cadastrar</button>
                        </div>

                        <div className="signup-link">
                            <Link to="/" className="link-pg-login">Acessar</Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};