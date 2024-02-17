import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../config/configApi';

import { Context } from '../../Context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export const Login = () => {

    const { state } = useLocation();

    const history = useHistory();

    const { signIn } = useContext(Context);

    // console.log("Situação do usuário na página login: " + authenticated);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
        loading: false
    });

    const valorInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const loginSubmit = async e => {
        e.preventDefault();
        //console.log(user.password);
        setStatus({
            loading: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post("/login", user, { headers })
            .then((response) => {
                console.log(response);
                setStatus({
                    /*type: 'success',
                    mensagem: response.data.mensagem,*/
                    loading: false
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('image', response.data.user.image);
                signIn(true);
                return history.push('/dashboard');
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
        <div className="d-flex">
            <div className="container-login">
                <div className="wrapper-login">

                    <div className="title">
                        <span>Área Restrita</span>
                    </div>               

                    <form onSubmit={loginSubmit} className="form-login">
                        {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}

                        {status.loading ? <p className="alert-success">Validando...</p> : ""}

                        <div className="row">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput} />
                        </div>

                        <div className="row">
                            <i className="fa-solid fa-lock"></i>
                            <input type="password" name="password" placeholder="Digite a senha" autoComplete="on" onChange={valorInput} />
                        </div>

                        <div className="row button">
                            {status.loading ? <button type="submit" className="button-login" disabled>Acessando...</button> : <button type="submit" className="button-login">Acessar</button>}
                        </div>

                        <div className="signup-link">
                            <Link to="/add-user-login" className="link-pg-login">Cadastrar</Link>{" - "}
                            <Link to="/recover-password" className="link-pg-login">Esqueceu a Senha</Link>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};