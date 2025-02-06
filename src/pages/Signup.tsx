import { useState } from "react";
import { signupUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../components/Toast";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signupUser(email, password, fullName);
            showSuccess("Signup successful! You can now log in.");
            navigate("/login");
        } catch (error) {
            showError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSignup} className="bg-white p-6 shadow-md rounded-md w-96">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded mb-2"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="bg-green-500 text-white w-full p-2 rounded">
                    Sign Up
                </button>
                <p className="mt-2 text-sm text-center">
                    Already have an account? <a href="/login" className="text-blue-500">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
