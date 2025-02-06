import {ReactNode, useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    const [cartCount, setCartCount] = useState(0);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
            <Navbar cartCount={cartCount}/>
            <main className="flex-grow p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
