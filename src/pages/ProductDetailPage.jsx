import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetail from '../components/ProductDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { LoginValidation } from '../utils/loginValidation';
import Breadcumb from '../components/Breadcumb';
import RelatedProducts from '../components/RelatedProducts';


const ProductDetailPage = () => {
    const { id } = useParams();
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
            <Breadcumb />
            <ProductDetail id={id} />
            <RelatedProducts id={id}/>
            <Footer />
        </>
    ) : null;
}

export default ProductDetailPage;