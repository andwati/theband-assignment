import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
    const { token } = useAuthStore();
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
