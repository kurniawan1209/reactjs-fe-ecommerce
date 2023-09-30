import React, { useState, useEffect } from 'react';
import { authLogin } from '../services/AuthServices';

export const LoginPage = () => {

    const [credential, setCredential] = useState({
        "username": "",
        "password": ""
    })

    const handleOnChange = (e) => { 
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await authLogin(credential);
        
            localStorage.clear();
            localStorage.setItem("access_token", result.data.access);
            localStorage.setItem("refresh_token", result.data.refresh);

            window.location.href = '/';

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        import('../assets/css/login.css').then(() => {});
    }, [])

    return (
        <div className="contain bg-gray-100 h-full py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 overflow-hidden bg-white rounded-2xl">
                <h2 className="text-2xl uppercase font-medium mb-1 text-center">Login</h2>
                <p className="text-gray-600 mb-6 text-sm text-center">
                    welcome back customer
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                            <input type="text" name="username" id="username"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="john_doe3306" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                            <input type="password" name="password" id="password"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="*******" onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <a href="#" className="text-primary">Forgot password</a>
                    </div>
                    <div className="mt-4">
                        <button type="submit"
                            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Login</button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-600">Don't have account? <a href="register.html"
                    className="text-primary">Register
                    now</a></p>
            </div>
        </div>
    );
}