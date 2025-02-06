import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail     from "./components/ProductDetail.tsx";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";


const App = () => {
    return (
        <CartProvider>
        <Router>
            <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />

            </Routes>
            </Layout>
        </Router>
        </CartProvider>
    );
};

export default App;
