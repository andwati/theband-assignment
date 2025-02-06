// src/components/Layout.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import useStore from '../store/useStore'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const cart = useStore((state) => state.cart)
    const isAuthenticated = useStore((state) => state.isAuthenticated)

    const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4">
                    <div className="h-16 flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold">
                            The Band Store
                        </Link>

                        <nav className="hidden md:flex space-x-6">
                            <Link to="/" className="hover:text-primary">
                                Home
                            </Link>
                            <Link to="/products" className="hover:text-primary">
                                Products
                            </Link>
                            <Link to="/about" className="hover:text-primary">
                                About
                            </Link>
                            <Link to="/contact" className="hover:text-primary">
                                Contact
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <Link to="/cart" className="relative">
                                <ShoppingCart className="h-6 w-6" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                                )}
                            </Link>
                            <Link to={isAuthenticated ? "/admin" : "/login"}>
                                <User className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="bg-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">About Us</h3>
                            <p className="text-gray-600">
                                The Band Store - Your one-stop shop for all musical needs.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Contact</h3>
                            <p className="text-gray-600">Phone: (254) 115-767-696</p>
                            <p className="text-gray-600">Email: info@theband.co.ke</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-600 hover:text-primary">
                                    Facebook
                                </a>
                                <a href="#" className="text-gray-600 hover:text-primary">
                                    Twitter
                                </a>
                                <a href="#" className="text-gray-600 hover:text-primary">
                                    Instagram
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Newsletter</h3>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-2 border rounded-l"
                                />
                                <button className="px-4 py-2 bg-primary text-white rounded-r">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout