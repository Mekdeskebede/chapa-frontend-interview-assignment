"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WalletBalance from "@/components/WalletBalance";
import RecentTransactions from "@/components/RecentTransactions";
import TransactionForm from "@/components/TransactionForm";

export default function UserDashboard() {
    const router = useRouter();
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "user") {
            router.push("/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-blue-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl border border-blue-200">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    User Dashboard
                </h1>
                <WalletBalance />
                <RecentTransactions />
                <TransactionForm />
            </div>
        </div>
    );
}
