import React, {createContext, useEffect, useState} from 'react';

import api from '../config/configApi';

const Context = createContext();

function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getLogin = async () => {
            const token = localStorage.getItem('token');

            if(token){
                api.defaults.headers.Authorization = `Bearer ${(token)}`;
                setAuthenticated(true);
            };

            setLoading(false);
        }

        getLogin();
    },[]);

    async function signIn(sit){
        setAuthenticated(true);
    }

    function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
    }

    if(loading){
        return <h1>Carregando...</h1>;
    }

    return(
        <Context.Provider value={{authenticated, signIn, handleLogout}}>
            {children}
        </Context.Provider>
    );
}

export {Context, AuthProvider};