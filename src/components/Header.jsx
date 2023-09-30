import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "../assets/images/logo.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { cartServices, wishlistServices } from "../services/TrxServices";
import { userServices } from "../services/UserServices";
import { Menu, Transition } from "@headlessui/react";


export default function Header() {

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState([]);

    const fetchData = async () => {
        const token = localStorage.getItem("access_token");
        try {
            const carts = await cartServices(token, "get");
            const wishlists = await wishlistServices(token, "get");
            const users = await userServices({ token: token, structure: "summary", method: "get" })

            setCart(carts.data);
            setWishlist(wishlists.data);
            setUser(users.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <header className="py-4 bg-white shadow-lg sticky z-10 top-0">
            <div className="container flex items-center justify-between">
                <a href="index.html">
                    <img src={CompanyLogo} alt="Logo" className="w-32" />
                </a>

                <div className="w-full max-w-xl relative flex">
                    <span className="absolute left-4 top-3 text-lg text-gray-400">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </span>
                    <input type="text" name="search" id="search"
                        className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                        placeholder="search" />
                    <button
                        className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex items-center">Search</button>
                </div>

                <div className="flex items-center space-x-4 gap-2">
                    <Menu>
                        <Menu.Button as="a" className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-3xl">
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                            <div className="text-xs leading-3">Wishlist</div>
                            <div
                                className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                {wishlist.length}</div>
                        </Menu.Button>
                    </Menu>
                    <Menu>
                        <Menu.Button as="a" className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-3xl">
                                <FontAwesomeIcon icon={faBagShopping} />
                            </div>
                            <div className="text-xs leading-3">Cart</div>
                            <div
                                className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                {cart.length}
                            </div>
                        </Menu.Button>
                    </Menu>
                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button as="a" className="text-center text-gray-700 hover:text-primary transition relative">
                                    <div className="text-3xl">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <div className="text-xs leading-3">{user.username}</div>
                                </Menu.Button>
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-100"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-100"
                                >
                                    <Menu.Items
                                        static
                                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                    >
                                        <div className="px-4 py-3">
                                            <p className="text-sm leading-5">Signed in as</p>
                                            <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                                                tom@example.com
                                            </p>
                                        </div>

                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#account-settings"
                                                        className={`${active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700"
                                                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                    >
                                                        Account settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#support"
                                                        className={`${active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700"
                                                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                    >
                                                        My Transactions
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>

                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a href="/logout" className={`${active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        </header >
    );
}