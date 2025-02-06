import api from "./api";
import { useAuthStore } from "../store/authStore";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post("/token", { username: email, password });
        useAuthStore.getState().login(response.data.access_token);
        return response.data;
    } catch (error) {
        throw new Error("Invalid login credentials");
    }
};

export const signupUser = async (email: string, password: string, fullName?: string) => {
    try {
        const response = await api.post("/signup", { email, password, full_name: fullName });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || "Signup failed");
    }
};
