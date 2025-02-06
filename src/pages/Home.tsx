import {useEffect, useState} from "react";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import Testimonials from "../components/Testimonials";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (<div className="min-h-screen bg-gray-100 text-gray-900">

            <Banner/>
            <ProductList products={products}/>
            <Testimonials/>

        </div>);
};

export default Home;
