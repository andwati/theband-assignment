import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!localStorage.getItem("authToken")
    );
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        // Simulated authentication (Replace with real API call)
        if (email === "admin@shopmate.com" && password === "admin123") {
            localStorage.setItem("authToken", "sample-token");
            setIsAuthenticated(true);
            navigate("/admin/dashboard");
        } else {
            throw new Error("Invalid email or password");
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        navigate("/admin/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
