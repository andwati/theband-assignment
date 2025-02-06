import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const Navbar = () => {
    const { cart } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (cart.length > 0) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
        }
    }, [cart.length]);

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            <h1 className="text-xl font-bold">ShopMate</h1>
            <ul className="flex space-x-4">
                <li className="hover:text-blue-500 cursor-pointer">Home</li>
                <li className="hover:text-blue-500 cursor-pointer">Products</li>
                <li className="hover:text-blue-500 cursor-pointer">About</li>
                <li className="hover:text-blue-500 cursor-pointer">Contact</li>
            </ul>
            <div className="relative">
                <FiShoppingCart className="text-2xl cursor-pointer" />
                {cart.length > 0 && (
                    <span
                        className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full ${
                            isAnimating ? "animate-bounce" : ""
                        }`}
                    >
            {cart.length}
          </span>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
