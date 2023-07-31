import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup'

import api from '../../config/configApi';
import { servDeleteUser } from '../../services/servDeleteUser';

export const EditUser = (props) => {

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

        if(!(await validate())) return

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/user", { id, name, email, password }, headers)
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
            name: yup.string("Erro: Necessario preencher todos os campos nome!").required("Erro: Necessario preencher todos os campos nome!"),
            email: yup.string("Erro: Necessario preencher todos os campos e-mail!").email("Erro: Necessario preencher todos os campos e-mail!").required("Erro: Necessario preencher todos os campos e-mail!"),
            password: yup.string("Erro: Necessario preencher todos os campos senha!").required("Erro: Necessario preencher todos os campos senha!").min(6, "Erro: A senha deve ter no minimo 6 caracteres!")
        })

        try {
            await schema.validate({
                name: name,
                email: email,
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

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser);
        if (response) {
            if(response.type === "success"){
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.mensagem
                });
            }else{
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
            <Link to="/dashboard">Dashboard</Link><br />
            <Link to="/users">Usuários</Link><br />

            <h1>Editar Usuário</h1>

            <Link to="/users"><button type="button">Listar</button></Link>{" "}
            <Link to={"/view-user/" + id}><button type="button">Visualizar</button></Link>{" "}
            <Link to={"#"}><button type="button" onClick={() => deleteUser(id)}>Apagar</button></Link>
            <br />

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

            {/*1 - não encontrou - warning
                2 - Não editou - error
                3 - API editou - success */}
            <hr />
            <form onSubmit={editUser}>
                <label>Nome*: </label>
                <input type="text" name="name" placeholder="Nome completo do usuário" value={name} onChange={text => setName(text.target.value)} /><br /><br />

                <label>E-mail*: </label>
                <input type="email" name="email" placeholder="Melhor e-mail do usuário" value={email} onChange={text => setEmail(text.target.value)} /><br /><br />

                <label>Senha*: </label>
                <input type="password" name="password" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={text => setPassword(text.target.value)} /><br /><br />

                * Campo obrigatório<br /><br />

                <button type="submit">Salvar</button>
            </form>

        </div>
    )
}