"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminUserList from "@/components/AdminUserList";
import TransferSection from "@/components/TransferSection";
import UserPaymentsChart from "@/components/UserPaymentsChart";
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
  const [selectedCard, setSelectedCard] = useState<number>(0);
  // ...existing code...

  useEffect(() => {
    // ...existing code...
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full p-8 rounded-xl bg-white shadow-xl">
        {/* System Statistics Card */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingStats ? (
              <div className="col-span-3 flex justify-center items-center h-32">
                <p className="text-gray-500">Loading stats...</p>
              </div>
            ) : errorStats ? (
              <div className="col-span-3 flex justify-center items-center h-32">
                <p className="text-red-500">{errorStats}</p>
              </div>
            ) : stats ? (
              <>
                {/* Card 1: Colorful by default, others white, selected gets color */}
                <div
                  className={`rounded-xl p-6 shadow cursor-pointer flex flex-col items-center transition-all duration-200
                                        ${
                                          selectedCard === 0
                                            ? "bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white"
                                            : "bg-white text-primary"
                                        }`}
                  onClick={() => setSelectedCard(0)}
                >
                  <span className="text-lg font-semibold mb-2">
                    Total Payments
                  </span>
                  <span className="text-3xl font-bold">
                    ${stats.totalPayments}
                  </span>
                </div>
                <div
                  className={`rounded-xl p-6 shadow cursor-pointer flex flex-col items-center transition-all duration-200
                                        ${
                                          selectedCard === 1
                                            ? "bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white"
                                            : "bg-white text-primary"
                                        }`}
                  onClick={() => setSelectedCard(1)}
                >
                  <span className="text-lg font-semibold mb-2">
                    Active Users
                  </span>
                  <span className="text-3xl font-bold">
                    {stats.activeUsers}
                  </span>
                </div>
                <div
                  className={`rounded-xl p-6 shadow cursor-pointer flex flex-col items-center transition-all duration-200
                                        ${
                                          selectedCard === 2
                                            ? "bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white"
                                            : "bg-white text-primary"
                                        }`}
                  onClick={() => setSelectedCard(2)}
                >
                  <span className="text-lg font-semibold mb-2">
                    Total Users
                  </span>
                  <span className="text-3xl font-bold">{stats.totalUsers}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {/* Graph Section - moved up */}
        <div className="mb-8">
          <div className="p-4">
            <UserPaymentsChart />
          </div>
        </div>
      </div>
    </div>
  );
}
