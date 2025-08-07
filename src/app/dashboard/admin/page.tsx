"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminUserList from "@/components/AdminUserList";
import UserPaymentsChart from "@/components/UserPaymentsChart";
import BankList from "@/components/BankList";

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
        <div className="min-h-screen flex flex-col bg-white">
            <div className="w-full flex flex-col gap-8">
                {/* <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-left">
                    Admin Dashboard
                </h1> */}
                <div className="gap-8">
                    {/* Users Table Card */}
                    <div className=" p-6">
                        <AdminUserList onToggle={handleToggle} />
                    </div>
                </div>
                <div className="w-full">
                    <UserPaymentsChart />
                </div>
                <div>
                    {/* Creative Supported Banks List */}
                    <BankList />
                </div>
            </div>
        </div>
    );
}
