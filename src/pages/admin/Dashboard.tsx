import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
};

export default AdminDashboard;
