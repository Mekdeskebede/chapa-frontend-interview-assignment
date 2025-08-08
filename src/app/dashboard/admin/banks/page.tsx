"use client";
import BankList from "@/components/BankList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminBanksPage() {
    const router = useRouter();
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            router.push("/login");
        }
    }, []);
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <BankList />
        </div>
    );
}
