import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import {Menu} from '../../components/Menu'
import api from '../../config/configApi';

export const ViewProfile = () => {

    const { state } = useLocation();

    const [data, setData] = useState('');
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

            await api.get("/view-profile", headers)
                .then((response) => {
                    if (response.data.user) {
                        // console.log(response.data)
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
                // console.log("Conectar Backend")
        }

        getUser();
    }, []);

    return (
        <div>
            <Menu/>

            <h1>Perfil</h1>
            <Link to="/edit-profile"><button type="button">Editar</button></Link>{" "}
            <Link to="/edit-profile-password"><button type="button">Editar Senha</button></Link>{" "}

            {status.type === 'redError' ?
                <Redirect to={{
                    pathname: '/login',
                    state: {
                        type: "error",
                        mensagem: status.mensagem
                    }
                }} /> : ""}
            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}

            <hr />
            
            <span>{data.id}</span><br />
            {/* <span>{data.image ? <img src={endImg + data.image} alt="Imagem do Usuário" width="150" height="150" /> : <img src="https://celke.com.br/app/lms/assets/imagens/curso_clms/45/curso-de-node-js-react-native.jpg" alt="Imagem do Usuário" width="150" height="150" />}</span><br /> */}
            <span>{<img src={endImg} alt="Imagem do Usuário" width="150" height="150" />}</span><br />
            <span>{data.name}</span><br />
            <span>{data.email}</span><br />
        </div>
    )
}