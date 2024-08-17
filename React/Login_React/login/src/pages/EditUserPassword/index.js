import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup'

import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import api from '../../config/configApi';
import { servDeleteUser } from '../../services/servDeleteUser';

export const EditUserPassoword = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id] = useState(props.match.params.id);

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

        await api.put("/user-senha", { id, password }, headers)
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

            await api.get("/user/" + id, headers)
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
    }, [id]);

    // function validate() {
    //     if(!name) return setStatus({ type: 'error', mensagem: 'Erro: Necessario preencher o campo nome!' })
    //     if(!email) return setStatus({ type: 'error', mensagem: 'Erro: Necessario preencher o campo email!' })
    //     if(!password) return setStatus({ type: 'error', mensagem: 'Erro: Necessario preencher o campo senha!' })
    //     if(password.length < 6) return setStatus({ type: 'error', mensagem: 'Erro: A senha precisa ter pelo menos 6 caracteres!' })
    //     return true
    // }

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

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser);
        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: "error",
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: 'error',
                mensagem: 'Erro: Tente mais tarde!'
            });
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
                            <span class="title-content">Editar Usuário</span>
                            <div class="top-content-adm-rigth">
                                <Link to="/users">
                                    <button type="button" class="btn-info">Listar</button>
                                </Link>{" "}
                                <Link to={"/view-user/" + id}>
                                    <button type="button" class="btn-primary">Visualizar</button>
                                </Link>{" "}
                                <Link to={"#"}>
                                    <button type="button" class="btn-danger" onClick={() => deleteUser(id)}>Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/users',
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
        </div >
    )
}