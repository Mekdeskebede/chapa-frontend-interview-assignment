// File: pages/login.tsx
"use client";

import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        if (!username.trim() || !password.trim()) {
            setError("username and password are required.");
            toast.error("Username and password are required.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("role", data.role);
                toast.success("Login successful!");
                setTimeout(() => {
                    if (data.role === "user") {
                        router.push("/dashboard/user");
                    } else if (data.role === "admin") {
                        router.push("/dashboard/admin");
                    } else if (data.role === "superadmin") {
                        router.push("/dashboard/superadmin");
                    } else {
                        router.push("/dashboard");
                    }
                }, 1200);
            } else {
                setError(data.message || "Login failed");
                toast.error(data.message || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side: Primary color */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 min-h-screen bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
                <div className="absolute -bottom-1/4 -left-1/6 opacity">
                    <img src="/circle.png" alt="Circle" className="w-96 h-96" />
                </div>
                <div className="relative z-10 flex flex-col items-">
                    <h1 className="text-3xl font-bold mb-1 tracking-wide drop-shadow-lg">
                        Chapa App
                    </h1>
                    <p className="text-sm opacity-80 mb-2">
                        Your secure payment gateway
                    </p>
                </div>
            </div>
            {/* Right side: Login form */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-8">
                <div className="bg-white rounded-xl p-8 w-full max-w-sm">
                    <h2 className="text-xl font-bold text-primary-text mb-2">
                        Hello again!
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">Welcome back</p>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Email address"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (error) setError("");
                            }}
                            icon={<User className="w-5 h-5" />}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError("");
                            }}
                            icon={<Lock className="w-5 h-5" />}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 mb-4 text-sm">{error}</p>
                    )}
                    <Button onClick={handleLogin} loading={loading}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}
