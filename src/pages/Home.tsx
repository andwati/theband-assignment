import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">

            <Banner />
            <ProductList products={products} />
            <Testimonials />

        </div>
    );
};

export default Home;
