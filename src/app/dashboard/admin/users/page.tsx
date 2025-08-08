"use client"
import AdminUserList from "@/components/AdminUserList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminUsersPage() {
    const router = useRouter();
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            router.push("/login");
        }
    }, []);
    const handleToggle = () => {
        // Implement toggle logic if needed
    };
    return (
        <div className="gap-8 min-h-screen flex flex-col bg-white">
            <div className="p-6">
                <AdminUserList onToggle={handleToggle} />
            </div>
        </div>
    );
}
