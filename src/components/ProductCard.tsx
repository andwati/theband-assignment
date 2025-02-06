import { FaStar } from "react-icons/fa";

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
    return (
        <div className="bg-white p-4 shadow-md rounded-md">
            <img src={product.image} alt={product.title} className="h-40 mx-auto" />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
            <div className="flex items-center">
                {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
