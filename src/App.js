import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import Logout from "./components/Logout";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="register/" element={<RegisterPage />} />
        <Route path="logout/" element={<Logout />} />
        <Route path="product/" element={<ProductPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>    
  );
}

export default App;
