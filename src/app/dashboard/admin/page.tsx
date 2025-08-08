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

    const handleToggle = () => {
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="w-full flex flex-col gap-8">
                <div className="w-full">
                    <UserPaymentsChart />
                </div>
            </div>
        </div>
    );
}
