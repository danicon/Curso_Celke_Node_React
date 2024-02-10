import React, { useEffect, useState } from 'react';
import {Redirect} from "react-router-dom"

import api from "../../config/configApi"

export const UpdatePassword = (props) => {

    const [key] = useState(props.match.params.key)

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
               
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                });

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

    return (
        <div>
            <h1>Update Password</h1>    

            {status.type === 'redDenger' ? <Redirect to={{
                pathname: '/',
                state: {
                    type: "error",
                    mensagem: status.mensagem
                }
            }} /> : ""}
            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}

        </div>
    );
}