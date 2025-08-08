"use client";

import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { User, Lock, FolderSync } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

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
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 min-h-screen bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute -bottom-1/4 -left-1/6 opacity-30">
          <Image width={384} height={384} src="/circle.png" alt="Circle" className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <FolderSync className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-wide drop-shadow-lg">
              <span className="text-white">
                <span className="text-primary">መለኛ</span>App
              </span>
            </h1>
          </div>
          <p className="text-lg opacity-90 font-medium">
            Your secure payment gateway
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-50 px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600 text-base">Sign in to your account</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <Input
                type="text"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                icon={<User className="w-5 h-5" />}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                icon={<Lock className="w-5 h-5" />}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <Button onClick={handleLogin} loading={loading}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
