// src/pages/ProductList.tsx
import {useEffect, useState} from 'react'
import useStore from '../../store/useStore.ts'

type ViewMode = 'grid' | 'list'
type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

const ProductList = () => {
    const {products, isLoading, error, fetchProducts} = useStore()
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [sortBy, setSortBy] = useState<SortOption>('name-asc')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const addToCart = useStore((state) => state.addToCart)

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const categories = ['all', ...new Set(products.map(product => product.category))]

    const sortProducts = (products: typeof useStore.getState
    ().products
) =>
    {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price
                case 'price-desc':
                    return b.price - a.price
                case 'name-asc':
                    return a.name.localeCompare(b.name)
                case 'name-desc':
                    return b.name.localeCompare(a.name)
                default:
                    return 0
            }
        })
    }

    const filteredProducts = products
        .filter(product => selectedCategory === 'all' || product.category === selectedCategory)

    const sortedProducts = sortProducts(filteredProducts)

    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>)
    }

    if (error) {
        return (<div className="text-center py-10">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => fetchProducts()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>)
    }

    return (<div className="container mx-auto px-4 py-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
                    >
                        <Grid className="h-5 w-5"/>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
                    >
                        <List className="h-5 w-5"/>
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 border rounded"
                    >
                        {categories.map(category => (<option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>))}
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="p-2 border rounded"
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>

            {/* Product Grid/List */}
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {sortedProducts.map((product) => (<div
                        key={product.id}
                        className={viewMode === 'grid' ? "border rounded-lg overflow-hidden hover:shadow-lg transition-shadow" : "flex border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"}
                    >
                        <div className={viewMode === 'grid' ? "aspect-w-1 aspect-h-1" : "w-48 h-48"}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className={viewMode === 'grid' ? "p-4" : "flex-1 p-4"}>
                            <Link
                                to={`/products/${product.id}`}
                                className="text-lg font-semibold hover:text-blue-600"
                            >
                                {product.name}
                            </Link>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            <div
                                className={viewMode === 'grid' ? "mt-4 flex justify-between items-center" : "mt-4 flex justify-between items-center"}>
                <span className="text-xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>))}
            </div>

            {sortedProducts.length === 0 && (<div className="text-center py-10">
                    <p className="text-gray-500">No products found.</p>
                </div>)}
        </div>)
}

export default ProductList