// src/pages/ProductDetail.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus, Minus } from 'lucide-react'
import useStore from '../store/useStore'

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const { products, addToCart } = useStore()

    const product = products.find(p => p.id === id)

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Product not found</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Products
                    </button>
                </div>
            </div>
        )
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        // Show success message
        alert('Added to cart successfully!')
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Products
            </button>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="mt-4 text-xl font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="mt-4">
                        <h2 className="text-sm font-medium text-gray-900">Description</h2>
                        <p className="mt-2 text-gray-600">{product.description}</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-sm font-medium text-gray-900">Quantity</h2>
                        <div className="mt-2 flex items-center space-x-4">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="p-2 border rounded-full hover:bg-gray-100"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-gray-900">{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="p-2 border rounded-full hover:bg-gray-100"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 border-t pt-8">
                        <div className="prose prose-sm text-gray-500">
                            <p>In Stock: {product.stock}</p>
                            <p>Category: {product.category}</p>
                            <p>SKU: {product.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail