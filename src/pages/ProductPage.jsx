import Breadcumb from "../components/Breadcumb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductFilter from "../components/ProductFilter";
import Product from "../components/Product";
import { LoginValidation } from "../utils/loginValidation";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function ProductPage() {

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
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <ProductFilter />
        <Product />
      </div>
      <Footer />
    </>
  ) : null;

}

export default ProductPage;