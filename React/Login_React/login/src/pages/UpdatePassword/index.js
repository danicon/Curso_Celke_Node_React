import React, { useEffect, useState } from 'react';
import {Redirect, Link} from "react-router-dom"
import * as yup from 'yup'

import api from "../../config/configApi"

export const UpdatePassword = (props) => {

    const [key] = useState(props.match.params.key)
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    useEffect(() => {

        const valKey = async() => {
            const headers = {
                'headers': {
                    'Content-Type': 'application/json'
                }
            }

            await api.get("/val-key-recover-pass/" + key, headers)
            .then((response) => {
               
                // setStatus({
                //     type: 'success',
                //     mensagem: response.data.mensagem
                // });

            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'redDenger',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'redDenger',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            })
        }

        valKey()
    }, [key])

    const updatePassword = async e => {
        e.preventDefault();

        if(!(await validate())) return

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        await api.put("/update-password/" + key, { password }, headers)
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

    async function validate() {
        let schema = yup.object().shape({
            password: yup.string("Erro: Necessario preencher o campo senha!").required("Erro: Necessario preencher o campo senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!")
        })

        try {
            await schema.validate({
                password: password
            })
            return true
        } catch(err) {
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
            <h1>Editar a senha</h1>    

            {status.type === 'redDenger' ? <Redirect to={{
                pathname: '/',
                state: {
                    type: "error",
                    mensagem: status.mensagem
                }
            }} /> : ""}
            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: '/',
                state: {
                    type: "success",
                    mensagem: status.mensagem
                }
            }} /> : ""}
            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}

            <form onSubmit={updatePassword}>
            
                <label>Senha*: </label>
                <input type="password" name="password" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={text => setPassword(text.target.value)} /><br /><br />

                * Campo obrigatório<br /><br />

                <button type="submit">Salvar</button><br /><br />
            </form>

            Lembrou a Senha <Link to="/">Clique aqui!</Link>

        </div>
    );
}