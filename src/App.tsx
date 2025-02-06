import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* Navigation Bar */}
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
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {cartCount}
          </span>
                </div>
            </nav>

            {/* Promotional Banner */}
            <div className="bg-blue-500 text-white text-center py-10">
                <h2 className="text-2xl font-bold">Exclusive Deals on Top Products!</h2>
                <p>Shop now and get amazing discounts.</p>
            </div>

            {/* Product Listing */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 shadow-md rounded-md">
                        <img src={product.image} alt={product.title} className="h-40 mx-auto" />
                        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                        <p className="text-gray-600">${product.price}</p>
                        <div className="flex items-center">
                            {[...Array(Math.round(product.rating.rate))].map((_, i) => (
                                <FaStar key={i} className="text-yellow-500" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-200 p-6 mt-6">
                <h2 className="text-center text-xl font-bold mb-4">What Our Customers Say</h2>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <div className="bg-white p-4 shadow-md rounded-md">
                        <p className="italic">"Amazing quality and fast delivery!"</p>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-500" />
                            ))}
                        </div>
                        <p className="text-right">- Jane Doe</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4 mt-6">
                <p>&copy; 2025 ShopMate. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <span>Facebook</span>
                    <span>Twitter</span>
                    <span>Instagram</span>
                </div>
            </footer>
        </div>
    );
};

export default App;
