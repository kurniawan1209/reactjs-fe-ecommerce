import React, { useState, useEffect } from 'react';
import { authLogin } from '../services/AuthServices';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const [credential, setCredential] = useState({
        "username": "",
        "password": ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [buttonClass, setButtonClass] = useState("flex w-full py-2 items-center justify-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium gap-2");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setButtonClass("flex w-full py-2 items-center justify-center border border-primary rounded bg-transparent text-primary transition uppercase font-roboto font-medium gap-2 disabled");
            setDisabled(true);

            await authLogin(credential)
                .then(response => {
                    localStorage.clear();
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("refresh_token", response.data.refresh);

                    setIsLoading(false);
                    setButtonClass("flex w-full py-2 items-center justify-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium gap-2");
                    alert("Login succesfull")
                    setDisabled(false);

                    navigate("/");
                })
                .error(response => {
                    localStorage.clear();
                });


        } catch (error) {
            localStorage.clear();
        }
    }

    useEffect(() => {
        import('../assets/css/login.css').then(() => { });
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
                            <label htmlFor="username" className="text-gray-600 mb-2 block">Email address</label>
                            <input type="text" name="username" id="username"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="john_doe3306" onChange={handleOnChange} autoComplete="username" />
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
                            className={buttonClass} disabled={disabled}>
                            Login
                            {isLoading ?
                                <ThreeDots
                                    height="20"
                                    width="40"
                                    radius="6"
                                    color="#fd3d57"
                                    ariaLabel="three-dots-loading"
                                    visible={true}
                                /> : null}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-600">Don't have account?
                    <a href="/register"className="text-primary">Register now</a></p>
            </div>
        </div>
    );
}