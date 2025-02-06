import { FiShoppingCart } from "react-icons/fi";

interface NavbarProps {
    cartCount: number;
}

const Navbar = ({ cartCount }: NavbarProps) => {
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
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {cartCount}
        </span>
            </div>
        </nav>
    );
};

export default Navbar;
