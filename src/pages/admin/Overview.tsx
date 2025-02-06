// src/pages/admin/Overview.tsx
import { useEffect, useState } from 'react'
import {
    TrendingUp,
    TrendingDown,
    Users,
    Package,
    ShoppingCart,
    AlertCircle
} from 'lucide-react'
import useStore from '../../store/useStore'

const Overview = () => {
    const products = useStore(state => state.products)
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            type: 'warning',
            message: 'Low stock alert: 5 products below threshold',
            time: '2 hours ago'
        },
        {
            id: 2,
            type: 'info',
            message: 'New order #1234 received',
            time: '4 hours ago'
        }
    ])

    const recentOrders = [
        {
            id: '1234',
            customer: 'John Doe',
            total: 299.99,
            status: 'completed',
            date: '2024-02-06'
        },
        {
            id: '1235',
            customer: 'Jane Smith',
            total: 199.99,
            status: 'processing',
            status: 'processing',
            date: '2024-02-06'
        }
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded">
                            <ShoppingCart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-500 text-sm">Total Orders</p>
                            <p className="text-2xl font-bold">1,254</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center text-green-500 text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>12% increase</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-500 text-sm">Total Customers</p>
                            <p className="text-2xl font-bold">854</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center text-green-500 text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>8% increase</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded">
                            <Package className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-500 text-sm">Products</p>
                            <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center text-red-500 text-sm">
                        <TrendingDown className="h-4 w-4 mr-1" />
                        <span>3 low stock</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded">
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-500 text-sm">Alerts</p>
                            <p className="text-2xl font-bold">{alerts.length}</p>
                        </div>
                    </div>
                    <div className="mt-2 text-gray-500 text-sm">
                        Last updated 5m ago
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between border-b pb-4"
                            >
                                <div>
                                    <p className="font-medium">Order #{order.id}</p>
                                    <p className="text-sm text-gray-500">{order.customer}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">${order.total}</p>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                    {order.status}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all orders →
                    </button>
                </div>

                {/* Recent Alerts */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
                    <div className="space-y-4">
                        {alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="flex items-start space-x-4 border-b pb-4"
                            >
                                <div
                                    className={`p-2 rounded-full
                    ${alert.type === 'warning'
                                        ? 'bg-yellow-100'
                                        : 'bg-blue-100'
                                    }`}
                                >
                                    <AlertCircle
                                        className={`h-5 w-5
                      ${alert.type === 'warning'
                                            ? 'text-yellow-600'
                                            : 'text-blue-600'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">{alert.message}</p>
                                    <p className="text-sm text-gray-500">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all alerts →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Overview