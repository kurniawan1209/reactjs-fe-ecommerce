import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductServices';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


export default function NewArrival () {

    const [product, setProduct] = useState([]);
    const fetchProducts = async () => {
        const token = localStorage.getItem("access_token");
        try {
            const params = {
                limit: 4,
                page: 1,
                token: token,
                structure: "summary"
            }
            const res = await getProducts(params);
            setProduct(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container pb-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {product.map((item) =>
                    <div className="bg-white shadow rounded overflow-hidden group" key={item.id}>
                        <div className="relative">
                            <img src={"http://localhost:9000/media/" + item.image} alt="product 1" className="w-auto py-4 px-2 h-64" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                <a href="#"
                                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                    title="view product">
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </a>
                                <a href="#"
                                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                    title="add to wishlist">
                                        <FontAwesomeIcon icon={faHeart}/>
                                </a>
                            </div>
                        </div>
                        <div className="pt-4 pb-3 px-4">
                            <Link to={"product/" + item.id}>
                                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-2">{item.name}</h4>
                            </Link>
                            <div className="flex items-baseline mb-1 space-x-2">
                                <p className="text-xl text-primary font-semibold">$45.00</p>
                                <p className="text-sm text-gray-400 line-through">$55.90</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                    <span><FontAwesomeIcon icon={faStar}/></span>
                                </div>
                                <div className="text-xs text-gray-500 ml-3">(150)</div>
                            </div>
                        </div>
                        <a href="#"
                            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                            to cart</a>
                    </div>
                )}

            </div>
        </div>
    )
}
