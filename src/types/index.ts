export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    stock: number
    createdAt: string
    updatedAt: string
}

export interface User {
    id: string
    email: string
    name: string
    role: 'admin' | 'user'
}