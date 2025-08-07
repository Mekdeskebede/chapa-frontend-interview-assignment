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
import Button from "@/components/Button";

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
    const [admins, setAdmins] = useState<any[]>([]);
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
                                <p className="text-gray-500">
                                    Loading stats...
                                </p>
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
                                    <span className="text-3xl font-bold">
                                        {stats.totalUsers}
                                    </span>
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

                {/* Bank List Section (optional, left as is) */}
                <div className="mb-8">
                    <div className="p-4">
                        {/* BankList component renders here */}
                        <AdminUserList onToggle={() => {}} />
                        {/* Replace above with <BankList /> if you want only banks here */}
                    </div>
                </div>
                {/* Transfer Initialization & Status Check */}
                <div className="flex w-full gap-8 justify-between ">
                    {/* Admin List Section - improved table UI */}
                    <div className="mb-8 w-[60%] ">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                Admin List
                            </h2>
                            <button
                                className="px-4 py-2 rounded-full bg-primary cursor-pointer hover:bg-primary-light text-white"
                                onClick={() => setShowAddModal(true)}
                            >
                                Add Admin
                            </button>
                        </div>
                        {loadingAdmins ? (
                            <p className="text-gray-500">Loading admins...</p>
                        ) : errorAdmins ? (
                            <p className="text-red-500">{errorAdmins}</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-separate border-spacing-y-2">
                                    <thead className="bg-gray-100 rounded-lg">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 rounded-tr-lg">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admins.map((admin) => (
                                            <tr
                                                key={admin.id}
                                                className="bg-white shadow rounded-lg hover:bg-primary-light/20 transition-all"
                                            >
                                                <td className="px-6 py-3 text-gray-800 rounded-l-lg">
                                                    {admin.name}
                                                </td>
                                                <td className="px-6 py-3 rounded-r-lg">
                                                    <button
                                                        className=" px-4 py-2 transition-all cursor-pointer text-red-500"
                                                        onClick={() =>
                                                            handleRemoveAdmin(
                                                                admin.id
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {removeFeedback && (
                            <p className="text-green-600 mt-2 text-sm">
                                {removeFeedback}
                            </p>
                        )}
                    </div>
                    {/* Add Admin Modal */}
                    {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                                <h3 className="text-lg font-bold mb-4 text-gray-800">
                                    Add Admin User
                                </h3>
                                <form
                                    onSubmit={(e) => {
                                        handleAddAdmin(e);
                                        setShowAddModal(false);
                                    }}
                                    className="flex flex-col gap-3"
                                >
                                    <input
                                        type="text"
                                        placeholder="Admin Name"
                                        className="p-2 border rounded w-full focus:outline-none"
                                        value={adminName}
                                        onChange={(e) =>
                                            setAdminName(e.target.value)
                                        }
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                                            onClick={() =>
                                                setShowAddModal(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                                {addFeedback && (
                                    <p className="text-green-600 mt-2 text-sm">
                                        {addFeedback}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="w-[50%] mt-12">

                <TransferSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
