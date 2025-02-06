// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProductList from './pages/product/ProductList.tsx'
import ProductDetail from './pages/product/ProductDetail.tsx'
import Login from './pages/auth/Login.tsx'
import AdminDashboard from './pages/admin/AdminDashboard'
import useStore from './store/useStore'

// Auth guard component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" replace />
}

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App