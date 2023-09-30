import React, { useEffect, useState } from "react";
import { getThings } from "../services/ProductServices";

export default function Categories() {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const res = await getThings(6, 1, token, "category");
                setCategory(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="container py-16">
            <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
            <div className="grid grid-cols-3 gap-3">

                {category.map((item) =>
                    <div className="relative rounded-sm overflow-hidden group" key={item.id}>
                        <img src={item.image} alt="category 1" className="w-full" />
                        <a href="#"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                            {item.name}
                        </a>
                    </div>
                )}
                
            </div>
        </div>
    );
}