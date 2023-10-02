import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { userRegistration } from '../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {

    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [buttonClass, setButtonClass] = useState("flex items-center justify-center w-full py-2 text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium gap-4");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setButtonClass("flex items-center justify-center w-full py-2 border border-primary rounded bg-transparent text-primary transition uppercase font-roboto font-medium gap-4");
            setDisabled(true);

            userRegistration(user)
                .then(response => {
                    toast.success("User created sucessfully! Redirecting to login in 2 seconds", {
                        position: toast.POSITION.TOP_RIGHT,
                        onClose: () => {
                            setIsLoading(false);
                            setButtonClass("flex items-center justify-center w-full py-2 text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium gap-4");
                            setDisabled(false);
                            console.log("harusnya ini dijalankan di awal");

                            setTimeout(() => {
                                navigate("/login");
                            }, 2000);
                        }
                    });

                })
                .error(response => {
                    console.log(response);
                    console.log("error");
                    toast.error("Error when creating user!", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
        } catch (error) {

        }
    }

    return (
        <div className="contain py-16 bg-gray-100">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden bg-white">
                <h2 className="text-2xl uppercase font-medium mb-1 text-center">Create an account</h2>
                <p className="text-gray-600 mb-6 text-sm text-center">
                    Register for new cosutumer
                </p>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="first_name" className="text-gray-600 mb-2 block">First Name</label>
                            <input type="text" name="first_name" id="first_name"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="John" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="text-gray-600 mb-2 block">Last Name</label>
                            <input type="text" name="last_name" id="last_name"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="Doe Taslim" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                            <input type="email" name="email" id="email"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="youremail.@domain.com" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="username" className="text-gray-600 mb-2 block">Username</label>
                            <input type="text" name="username" id="username"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="john_doe_taslim" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                            <input type="password" name="password" id="password"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="*******" onChange={handleOnChange} />
                        </div>
                        <div>
                            <label htmlFor="confirm" className="text-gray-600 mb-2 block">Confirm password</label>
                            <input type="password" name="confirm" id="confirm"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="*******" onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex items-center">
                            <input type="checkbox" name="aggrement" id="aggrement"
                                className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                            <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a
                                href="#" className="text-primary">terms & conditions</a></label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button type="submit"
                            className={buttonClass} disabled={disabled}>create
                            account
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
                        <ToastContainer />
                    </div>
                </form>

                <p className="mt-4 text-center text-gray-600">Already have account? <a href="login.html"
                    className="text-primary">Login now</a></p>
            </div>
        </div>
    )
}

export default RegisterPage