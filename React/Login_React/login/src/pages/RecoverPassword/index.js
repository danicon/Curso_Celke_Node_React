import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom'

import api from "../../config/configApi"

export const RecoverPassword = () => {

    const [user, setUser] = useState({
        email: "",
        url: "http://localhost:3000/update-password/"
    });

    const [status, setStatus] = useState({
        type: "",
        mensagem: "",
        loading: false
    });

    const valorInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const recoverPass = async e => {
        e.preventDefault();
        // console.log(user.email)

        setStatus({
            loading: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post("/recover-password", user, { headers })
        .then((response) => {
            //console.log(response);
            setStatus({
                type: 'redSuccess',
                mensagem: response.data.mensagem,
                loading: false
            });
        }).catch((err) => {
            if (err.response) {
                //console.log(err.response);
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem,
                    loading: false
                });
            } else {
                //console.log("Erro: tente mais tarde");
                setStatus({
                    type: 'error',
                    mensagem: "Erro: tente mais tarde!",
                    loading: false
                });
            }
        });

    }

    return (
        <div>
            <h1>Recuperar Senha</h1>

            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: '/',
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }} /> : ""}

            <form onSubmit={recoverPass}>
                <label>E-mail: </label>
                <input type="email" name="email" placeholder="Digite o e-mail" onChange={valorInput} /><br /><br />

                {status.loading ? <button type="submit" disabled>Enviando...</button> : <button type="submit">Enviar</button>} <br /><br />

            </form>

            <Link to="/add-user-login">Cadastrar</Link>{" "}
            - Lembrou a Senha <Link to="/">Clique aqui!</Link>

        </div>
    );
};