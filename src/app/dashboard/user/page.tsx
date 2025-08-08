"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WalletBalance from "@/components/WalletBalance";
import RecentTransactions from "@/components/RecentTransactions";
import TransactionForm from "@/components/TransactionForm";
import UserWeeklyReportChart from "@/components/UserWeeklyReportChart";

export default function UserDashboard() {
  const router = useRouter();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen ">
      {/* Main dashboard content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full p-10 flex flex-col gap-8 bg-white rounded-xl">
          {/* User Info & Wallet */}
          <div className="">
            <WalletBalance />
          </div>
          <div className="flex items-start gap-6 pb-6">
            <div className="flex-2">
              <UserWeeklyReportChart />
            </div>
            <div className="flex-1">
              <RecentTransactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
