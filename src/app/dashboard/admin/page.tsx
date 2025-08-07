"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminUserList from "@/components/AdminUserList";
import UserPaymentsChart from "@/components/UserPaymentsChart";

export default function AdminDashboard() {
    const router = useRouter();
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            router.push("/login");
        }
    }, [router]);

    const handleToggle = (id: number) => {
        // Optionally handle toggle logic here (e.g., API call)
    };

    return (
        <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-indigo-200">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
                    Admin Dashboard
                </h1>
                <AdminUserList onToggle={handleToggle} />
                <UserPaymentsChart />
            </div>
        </div>
    );
}
