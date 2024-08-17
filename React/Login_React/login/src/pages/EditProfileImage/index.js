import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

import api from '../../config/configApi';

export const EditProfileImage = () => {

    const [image, setImage] = useState("");
    const [endImg, setEndImg] = useState('');
    // const [endImg, setEndImg] = useState(localStorage.getItem('image'));

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editUser = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/edit-profile-image", formData, headers)
            .then((response) => {
                // console.log(response.data)
                localStorage.setItem('image', response.data.image);
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
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/view-profile", headers)
                .then((response) => {
                    if (response.data.user) {
                        setEndImg(response.data.endImage);
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

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="profile" />

                <div class="wrapper">
                    <div class="row">

                        <div class="top-content-adm">
                            <span class="title-content">Editar Foto do Perfil</span>
                            <div class="top-content-adm-rigth">
                                <Link to="/view-profile">
                                    <button type="button" class="btn-info">Perfil</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/view-profile',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
                        </div>

                        <div class="content-adm">
                            <form onSubmit={editUser} class="form-adm">

                                <div class="row-input">
                                    <div class="column">
                                        <label class="title-input">Imagem</label>
                                        <input type="file" name="image" id="image" class="input-adm" onChange={e => setImage(e.target.files[0])} />
                                    </div>
                                </div>

                                <div class="row-input">
                                    <div class="column">
                                        {image ? <img src={URL.createObjectURL(image)} alt="Imagem do usuário" width="150" height="150" /> : <img src={endImg} alt="Imagem do usuário" width="150" height="150" />}
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