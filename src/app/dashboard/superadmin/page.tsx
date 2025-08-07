"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminUserList from "@/components/AdminUserList";
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
    const [admins, setAdmins] = useState<any[]>([]);
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
        <div className="min-h-screen bg-purple-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-purple-200">
                <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
                    Super Admin Dashboard
                </h1>
                <AdminUserList onToggle={() => {}} />
                <UserPaymentsChart />
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-purple-700 mb-4">
                        Add Admin User
                    </h2>
                    <form onSubmit={handleAddAdmin} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Admin Name"
                            className="p-2 border rounded w-full"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </form>
                    {addFeedback && (
                        <p className="text-green-600 mt-2 text-sm">
                            {addFeedback}
                        </p>
                    )}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-purple-700 mb-4">
                        Admin List
                    </h2>
                    {loadingAdmins ? (
                        <p className="text-purple-500">Loading admins...</p>
                    ) : errorAdmins ? (
                        <p className="text-red-500">{errorAdmins}</p>
                    ) : (
                        <ul className="list-disc pl-6">
                            {admins.map((admin) => (
                                <li
                                    key={admin.id}
                                    className="flex items-center justify-between mb-2"
                                >
                                    <span>{admin.name}</span>
                                    <button
                                        className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() =>
                                            handleRemoveAdmin(admin.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {removeFeedback && (
                        <p className="text-green-600 mt-2 text-sm">
                            {removeFeedback}
                        </p>
                    )}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-purple-700 mb-4">
                        System Statistics
                    </h2>
                    {loadingStats ? (
                        <p className="text-purple-500">Loading stats...</p>
                    ) : errorStats ? (
                        <p className="text-red-500">{errorStats}</p>
                    ) : stats ? (
                        <ul className="list-disc pl-6">
                            <li>
                                Total Payments:{" "}
                                <span className="font-bold">
                                    ${stats.totalPayments}
                                </span>
                            </li>
                            <li>
                                Active Users:{" "}
                                <span className="font-bold">
                                    {stats.activeUsers}
                                </span>
                            </li>
                            <li>
                                Total Users:{" "}
                                <span className="font-bold">
                                    {stats.totalUsers}
                                </span>
                            </li>
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
