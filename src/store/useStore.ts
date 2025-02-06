import { create } from 'zustand'
import { Product } from '../types'

interface CartItem extends Product {
    quantity: number
}

interface StoreState {
    products: Product[]
    cart: CartItem[]
    isLoading: boolean
    error: string | null

    // Products
    fetchProducts: () => Promise<void>
    addProduct: (product: Product) => Promise<void>
    updateProduct: (id: string, product: Product) => Promise<void>
    deleteProduct: (id: string) => Promise<void>

    // Cart
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateCartItemQuantity: (productId: string, quantity: number) => void

    // Auth
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const useStore = create<StoreState>((set, get) => ({
    products: [],
    cart: [],
    isLoading: false,
    error: null,
    isAuthenticated: false,

    fetchProducts: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch('https://api.example.com/products')
            const data = await response.json()
            set({ products: data, isLoading: false })
        } catch (error) {
            set({ error: 'Failed to fetch products', isLoading: false })
        }
    },

    addProduct: async (product) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch('https://api.example.com/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })
            const newProduct = await response.json()
            set((state) => ({
                products: [...state.products, newProduct],
                isLoading: false,
            }))
        } catch (error) {
            set({ error: 'Failed to add product', isLoading: false })
        }
    },

    updateProduct: async (id, product) => {
        set({ isLoading: true, error: null })
        try {
            await fetch(`https://api.example.com/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })
            set((state) => ({
                products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
                isLoading: false,
            }))
        } catch (error) {
            set({ error: 'Failed to update product', isLoading: false })
        }
    },

    deleteProduct: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await fetch(`https://api.example.com/products/${id}`, {
                method: 'DELETE',
            })
            set((state) => ({
                products: state.products.filter((p) => p.id !== id),
                isLoading: false,
            }))
        } catch (error) {
            set({ error: 'Failed to delete product', isLoading: false })
        }
    },

    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === product.id)
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                }
            }
            return {
                cart: [...state.cart, { ...product, quantity: 1 }],
            }
        })
    },

    removeFromCart: (productId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId),
        }))
    },

    updateCartItemQuantity: (productId, quantity) => {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            ),
        }))
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            if (!response.ok) throw new Error('Invalid credentials')
            set({ isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: 'Login failed', isLoading: false })
        }
    },

    logout: () => {
        set({ isAuthenticated: false })
    },
}))

export default useStore