import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authLogout } from '../services/AuthServices';

const Logout = () => {

    useEffect(() => {

        (async () =>{

            try {
                const response = await authLogout();
                console.log(response);

                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login';
            } catch (error) {
                console.log(error);
            }

        })();

    }, []);

    return (
        <div></div>
    )
}

export default Logout;