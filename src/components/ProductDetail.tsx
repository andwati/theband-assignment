import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            <div className="bg-white p-6 shadow-md rounded-md flex flex-col md:flex-row">
                <img src={product.image} alt={product.title} className="h-60 mx-auto md:mr-6" />
                <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-gray-700 mt-2">{product.description}</p>
                    <p className="text-xl font-semibold mt-4">${product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
