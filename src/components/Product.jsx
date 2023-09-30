import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { getProducts } from '../services/ProductServices';

const Product = () => {

    const [products, setProducts] = useState([])
    const fetchData = async () => {
        const token = localStorage.getItem("access_token");
        try {
            const params = {
                limit: 6,
                page: 1,
                token: token,
                structure: "summary"
            }
            const res = await getProducts(params);
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="col-span-3">
            <div className="flex items-center mb-4">
                <select name="sort" id="sort"
                    className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                    <option value="">Default sorting</option>
                    <option value="price-low-to-high">Price low to high</option>
                    <option value="price-high-to-low">Price high to low</option>
                    <option value="latest">Latest product</option>
                </select>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-2 gap-6">

                {products.map((item) =>
                    <div className="bg-white shadow rounded overflow-hidden group" key={item.id}>
                        <div className="relative">
                            <img src={"http://127.0.0.1:9000/media/" + item.image} alt="product 1" className="py-6 h-64 w-auto " />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                <a href="#"
                                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                    title="view product">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </a>
                                <a href="#"
                                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                    title="add to wishlist">
                                    <i className="fa-solid fa-heart"></i>
                                    <FontAwesomeIcon icon={faHeart} />
                                </a>
                            </div>
                        </div>
                        <div className="pt-4 pb-3 px-4">
                            <a href="#">
                                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-2">
                                    {item.name}
                                </h4>
                            </a>
                            <div className="flex items-baseline mb-1 space-x-2">
                                <p className="text-xl text-primary font-semibold">${item.price}</p>
                                {/* <p className="text-sm text-gray-400 line-through">$55.90</p> */}
                            </div>
                            <div className="flex items-center">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
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

export default Product;