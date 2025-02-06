// src/pages/admin/ProductManagement.tsx
import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import useStore from '../../store/useStore'

interface ProductFormData {
    name: string
    description: string
    price: number
    category: string
    stock: number
    image: string
}

const initialFormData: ProductFormData = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: ''
}

const ProductManagement = () => {
    const { products, addProduct, updateProduct, deleteProduct, isLoading } = useStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState<string | null>(null)
    const [formData, setFormData] = useState<ProductFormData>(initialFormData)

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editingProduct) {
                await updateProduct(editingProduct, formData)
            } else {
                await addProduct(formData)
            }
            setShowForm(false)
            setEditingProduct(null)
            setFormData(initialFormData)
        } catch (error) {
            console.error('Error saving product:', error)
        }
    }

    const handleEdit = (product: typeof products[0]) => {
        setFormData(product)
        setEditingProduct(product.id)
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <button
                    onClick={() => {
                        setFormData(initialFormData)
                        setEditingProduct(null)
                        setShowForm(true)
                    }}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                </div>
            </div>

            {/* Product Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false)
                                        setEditingProduct(null)
                                        setFormData(initialFormData)
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {isLoading ? 'Saving...' : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={product.image}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {product.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {product.category}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.stock}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement