import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
    product: {
        id: number;
        image: string;
        title: string;
        price: number;
        rating: { rate: number };
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        <div className="bg-white p-4 shadow-md rounded-md">
            <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
            <div className="flex items-center">
                {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                ))}
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full hover:bg-blue-600"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
