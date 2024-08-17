import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { servDeleteUser } from '../../services/servDeleteUser';
import api from '../../config/configApi';

export const ViewUser = (props) => {

    const { state } = useLocation();

    const [data, setData] = useState('');
    const [id] = useState(props.match.params.id);
    const [endImg, setEndImg] = useState('');

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

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
                        setEndImg(response.data.endImage)
                        setData(response.data.user);
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Usuário não encontrado!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redError',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }

        getUser();
    }, [id]);

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser);

        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: "redSuccess",
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: response.type,
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: "redError",
                mensagem: "Erro: Tente mais tarde!"
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
                            <span class="title-content">Visualizar Usuário</span>
                            <div class="top-content-adm-rigth">
                                <Link to="/users">
                                    <button type="button" class="btn-info">Listar</button>
                                </Link>{" "}

                                <Link to={"/edit-user/" + data.id}>
                                    <button type="button" class="btn-warning">Editar</button>
                                </Link>{" "}

                                <Link to={"/edit-user-password/" + data.id}>
                                    <button type="button" class="btn-warning">Editar Senha</button>
                                </Link>{" "}

                                <Link to={"/edit-user-image/" + data.id}>
                                    <button type="button" class="btn-warning">Editar Imagem</button>
                                </Link>{" "}

                                <Link to={"#"}>
                                    <button type="button" class="btn-danger" onClick={() => deleteUser(data.id)}>Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}

                            {status.type === 'redError' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'error' ? <p className='alert-danger'>{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className='alert-success'>{status.mensagem}</p> : ""}
                        </div>

                        <div class="content-adm">
                            <div class="view-det-adm">
                                <span class="view-adm-title">Imagem: </span>
                                <span class="view-adm-info">{<img src={endImg} alt="Imagem do Usuário" width="150" height="150" />}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">ID: </span>
                                <span class="view-adm-info">{data.id}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">Nome: </span>
                                <span class="view-adm-info">{data.name}</span>
                            </div>

                            <div class="view-det-adm">
                                <span class="view-adm-title">E-mail: </span>
                                <span class="view-adm-info">{data.email}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}