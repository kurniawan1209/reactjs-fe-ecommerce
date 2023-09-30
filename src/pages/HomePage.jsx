import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Features from "../components/Features";
import NewArrival from "../components/NewArrival";

import { LoginValidation } from "../utils/loginValidation";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function HomePage() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuthenticatedResult = LoginValidation();
        setIsAuthenticated(isAuthenticatedResult);

        if (!isAuthenticatedResult) {
            navigate('/login');
        }
    }, []);

    return isAuthenticated ? (
        <>
            <Header />
            <Banner />
            <Features />
            <Categories />
            <NewArrival />
            <Footer />
        </>
    ) : null;
}