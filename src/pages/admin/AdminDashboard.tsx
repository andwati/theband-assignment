// src/pages/AdminDashboard.tsx
import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Package,
    Users,
    BarChart,
    Settings,
    Menu,
    X
} from 'lucide-react'
import ProductManagement from './admin/ProductManagement'
import Analytics from './admin/Analytics'
import UserManagement from './admin/UserManagement'
import Overview from './admin/Overview'

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const location = useLocation()

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Overview', exact: true },
        { path: '/admin/products', icon: Package, label: 'Products' },
        { path: '/admin/analytics', icon: BarChart, label: 'Analytics' },
        { path: '/admin/users', icon: Users, label: 'Users' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' }
    ]

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-0 left-0 m-4 z-20">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md bg-white shadow"
                >
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-150 ease-in-out z-10
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
                <div className="p-6">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                </div>
                <nav className="mt-6">
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={`
                flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100
                ${location.pathname === path ? 'bg-blue-50 text-blue-600' : ''}
              `}
                        >
                            <Icon className="h-5 w-5 mr-3" />
                            {label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <main className={`
        transition-all duration-150 ease-in-out
        ${isSidebarOpen ? 'lg:ml-64' : ''}
        pt-16 lg:pt-0
      `}>
                <div className="p-6">
                    <Routes>
                        <Route path="/" element={<Overview />} />
                        <Route path="/products" element={<ProductManagement />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/settings" element={<div>Settings</div>} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard