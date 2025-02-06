import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/productService";
import ConfirmModal from "../components/ConfirmModal";
import { showSuccess, showError } from "../components/Toast";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async () => {
        if (selectedProduct) {
            try {
                await deleteProduct(selectedProduct.id);
                fetchProducts();
                setDeleteModalOpen(false);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <div>
            <h1>Product Management</h1>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <p>{product.title} - ${product.price}</p>
                        <button className="bg-yellow-500 p-2 m-2" onClick={() => setSelectedProduct(product)}>Edit</button>
                        <button
                            className="bg-red-500 text-white p-2"
                            onClick={() => { setSelectedProduct(product); setDeleteModalOpen(true); }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                description="Are you sure you want to delete this product? This action cannot be undone."
            />
        </div>
    );
};

export default ProductManagement;
