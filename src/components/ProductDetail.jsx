import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Paginate } from '../utils/ArrayPaginator';

const ProductDetail = (props) => {

    const [product, setProduct] = useState([]);
    const [image, setImage] = useState([]);
    const [activeImage, setActiveImage] = useState();
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [spesification, setSpesification] = useState();

    const handleQuantity = (process) => {
        if (process === "add" && quantity >= 1) {
            setQuantity(quantity + 1);
        } else if (process === "substract" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const fetchData = () => {
        const token = localStorage.getItem("access_token");
        try {
            const params = {
                token: token,
                product: props.id
            }
            const products = getProducts(params);
            const images = products.data[0].details.filter((item) => {
                return item.key.slice(0, 6) === "images";
            })
            const sizes = products.data[0].inventory.map((item) => {
                return item.size;
            })
            const colors = products.data[0].inventory.map((item) => {
                return item.color;
            })
            const specs = Paginate(products.data[0].details.filter((item) => {
                return item.key.slice(0, 6) !== "images";
            }), 4);

            setProduct(products.data);
            setImage(images);
            setColor(Array.from(new Set(colors)));
            setSize(Array.from(new Set(sizes)));
            setSpesification(Array.from(new Set(specs)));

        } catch (error) {
            console.log("ini error");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <>
            <div className="container grid grid-cols-2 gap-6">

                <div className="">
                    <img src="http://127.0.0.1:9000/media/products/B08BLP231K/41OuvqjhaqL.jpg" alt="product" className="h-96 w-auto mx-auto py-16" />
                    <div className="grid grid-cols-5 gap-4 mt-4">
                        <div className="border border-primary">
                            <img src="http://127.0.0.1:9000/media/products/B08BLP231K/41OuvqjhaqL.jpg" alt="product2" className="h-24 w-auto mx-auto py-4" />
                        </div>
                        <div className="border">
                            <img src="http://127.0.0.1:9000/media/products/B08BLP231K/51zt+Bb48FL.jpg" alt="product2" className="cursor-pointer h-24 w-auto mx-auto py-4" />
                        </div>
                        <div className="border">
                            <img src="http://127.0.0.1:9000/media/products/B08BLP231K/51EXdVtkpAL.jpg" alt="product2" className="h-24 w-auto mx-auto py-4" />
                        </div>
                        <div className="border">
                            <img src="http://127.0.0.1:9000/media/products/B08BLP231K/41u3T2DxWkL.jpg" alt="product2" className="h-24 w-auto mx-auto py-4" />
                        </div>
                        <div className="border">
                            <img src="http://127.0.0.1:9000/media/products/B08BLP231K/41ZOt3pgbSL.jpg" alt="product2" className="h-24 w-auto mx-auto py-4" />
                        </div>
                    </div>
                </div>

                {product.map((item) =>
                    <div key={item.id}>
                        <h2 className="text-3xl font-medium uppercase mb-2 line-clamp-2">{item.name}</h2>
                        <div className="flex items-center mb-4">
                            <div className="flex gap-1 text-sm text-yellow-400">
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-800 font-semibold space-x-2">
                                <span>Availability: </span>
                                <span className="text-green-600">In Stock</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Brand: </span>
                                <span className="text-gray-600">{item.brand_name}</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Category: </span>
                                <span className="text-gray-600">{item.category_name}</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">SKU: </span>
                                <span className="text-gray-600">{item.code}</span>
                            </p>
                        </div>
                        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                            <p className="text-xl text-primary font-semibold">${item.price}</p>
                            {/* <p className="text-base text-gray-400 line-through">$55.00</p> */}
                        </div>

                        <p className="mt-4 text-gray-600 line-clamp-3">{item.description}</p>

                        <div className="pt-4">
                            <h3 className="text-sm text-gray-800 uppercase mb-1">Size</h3>
                            <div className="flex items-center gap-2">

                                {size.map((item_size) =>
                                    <div className="size-selector" key={item_size}>
                                        <input type="radio" name="size" id={"size-" + item_size} className="hidden" />
                                        <label htmlFor={"size-" + item_size}
                                            className="text-lg border border-gray-200 rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">{item_size}</label>
                                    </div>
                                )}


                            </div>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                            <div className="flex items-center gap-2">

                                {color.map((item_color) =>
                                    <div className="color-selector" key={item_color}>
                                        <input type="radio" name="color" id={item_color} className="hidden" />
                                        <label htmlFor={item_color}
                                            className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                                            style={{ backgroundColor: "#" + item_color }}></label>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={() => handleQuantity("substract")}>-</div>
                                <div className="h-8 w-8 text-base flex items-center justify-center">{quantity}</div>
                                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none" onClick={() => handleQuantity("add")}>+</div>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                            <a href="#"
                                className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                                <FontAwesomeIcon icon={faBagShopping} /> Add to cart
                            </a>
                            <a href="#"
                                className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                                <FontAwesomeIcon icon={faHeart} /> Wishlist
                            </a>
                        </div>
                    </div>
                )}

            </div>

            <div className="container pb-16">
                <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">Product details</h3>
                <div className="pt-6">
                    <div className="text-gray-600">
                        {product.map((item) => <p key={item.id}>asas{item.description}</p> )}
                    </div>

                    <table className="table-auto w-full text-left text-gray-600 text-sm mt-6">
                        <tbody>
                            {spesification.map((spec, index) =>
                                <tr key={index}>
                                    {spec.map((item) => 
                                        <td className='border border-gray-300  text-center py-1' key={item.id} width="25%">
                                            <span className='font-semibold text-base'>{item.key}</span><br></br>
                                            <span className='line-clamp-2'>{item.value}</span>
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default ProductDetail;