import api from "./api";


export const getProductById = async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (product: any) => {
    const response = await api.post("/products", product);
    return response.data;
};

export const updateProduct = async (id: number, product: any) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};


export const getProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        showError("Failed to fetch products.");
        throw error;
    }
};

export const deleteProduct = async (id: number) => {
    try {
        await api.delete(`/products/${id}`);
    } catch (error) {
        showError("Error deleting product.");
        throw error;
    }
};