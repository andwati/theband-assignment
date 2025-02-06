// src/pages/admin/Analytics.tsx
import { useState } from 'react'
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import useStore from '../../store/useStore'

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('7d')
    const products = useStore(state => state.products)

    // Mock data - in real app, this would come from API
    const salesData = [
        { date: '2024-01', sales: 4000, revenue: 2400 },
        { date: '2024-02', sales: 3000, revenue: 1398 },
        { date: '2024-03', sales: 2000, revenue: 9800 },
        { date: '2024-04', sales: 2780, revenue: 3908 },
        { date: '2024-05', sales: 1890, revenue: 4800 },
        { date: '2024-06', sales: 2390, revenue: 3800 }
    ]

    const categoryData = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const pieData = Object.entries(categoryData).map(([name, value]) => ({
        name,
        value
    }))

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border rounded-md px-3 py-2"
                >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                </select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Sales</h3>
                    <p className="text-2xl font-bold">$24,780</p>
                    <span className="text-green-500 text-sm">+12% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Orders</h3>
                    <p className="text-2xl font-bold">156</p>
                    <span className="text-red-500 text-sm">-3% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Customers</h3>
                    <p className="text-2xl font-bold">86</p>
                    <span className="text-green-500 text-sm">+8% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Avg. Order Value</h3>
                    <p className="text-2xl font-bold">$158.85</p>
                    <span className="text-green-500 text-sm">+5% from last month</span>
                </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#82ca9d"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Product Categories</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Top Products</h2>
                    <div className="space-y-4">
                        {products.slice(0, 5).map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-10 h-10 rounded object-cover"
                                    />
                                    <span className="ml-3">{product.name}</span>
                                </div>
                                <span className="font-medium">
                  ${product.price.toFixed(2)}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics