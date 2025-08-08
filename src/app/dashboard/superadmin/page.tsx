"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminUserList from "@/components/AdminUserList";
import TransferSection from "@/components/TransferSection";
import UserPaymentsChart from "@/components/UserPaymentsChart";
import StatsCardsShimmer from "@/components/shimmers/StatsCardsShimmer";
import {
  fetchSystemStats,
  addAdminUser,
  removeAdminUser,
  fetchAdminList,
} from "@/services/superAdminService";

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<{
    totalPayments: number;
    activeUsers: number;
    totalUsers: number;
  } | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState("");
  const [adminName, setAdminName] = useState("");
  const [addFeedback, setAddFeedback] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  interface Admin {
    id: number;
    name: string;
  }
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [errorAdmins, setErrorAdmins] = useState("");
  const [removeFeedback, setRemoveFeedback] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "superadmin") {
      router.push("/login");
    }
    fetchSystemStats()
      .then((data) => {
        setStats(data);
        setLoadingStats(false);
      })
      .catch(() => {
        setErrorStats("Failed to load stats");
        setLoadingStats(false);
      });
    fetchAdminList()
      .then((data) => {
        setAdmins(data);
        setLoadingAdmins(false);
      })
      .catch(() => {
        setErrorAdmins("Failed to load admin list");
        setLoadingAdmins(false);
      });
  }, [router]);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddFeedback("");
    if (!adminName.trim()) return;
    const result = await addAdminUser(adminName);
    if (result.success) {
      setAddFeedback(`Admin '${adminName}' added! (mock)`);
      setAdmins((prev) => [...prev, { id: result.id, name: adminName }]);
      setAdminName("");
    } else {
      setAddFeedback("Failed to add admin.");
    }
  };

  const handleRemoveAdmin = async (id: number) => {
    setRemoveFeedback("");
    const result = await removeAdminUser(id);
    if (result.success) {
      setRemoveFeedback("Admin removed! (mock)");
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } else {
      setRemoveFeedback("Failed to remove admin.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full p-8 rounded-xl bg-white shadow-xl">
        {/* System Statistics Cards */}
        {loadingStats ? (
          <StatsCardsShimmer />
        ) : errorStats ? (
          <div className="mb-8">
            <div className="col-span-3 flex justify-center items-center h-32">
              <p className="text-red-500">{errorStats}</p>
            </div>
          </div>
        ) : stats ? (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              System Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Payments Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +12.5%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Payments
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    ${stats.totalPayments.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Across all users and transactions
                  </p>
                </div>
              </div>

              {/* Active Users Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    +8.2%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {stats.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Currently using the platform
                  </p>
                </div>
              </div>

              {/* Total Users Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    +15.3%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Registered on the platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Graph Section */}
        <div className="mb-8">
          <div className="p-4">
            <UserPaymentsChart />
          </div>
        </div>
      </div>
    </div>
  );
}
