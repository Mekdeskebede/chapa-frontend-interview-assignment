import React, { useEffect, useState } from "react";
import { fetchAdminUsers } from "@/services/adminService";

export default function AdminUserList({
    onToggle,
}: {
    onToggle: (id: number) => void;
}) {
    interface User {
        id: number;
        name: string;
        totalPayments: number;
        active: boolean;
    }
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAdminUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load users");
                setLoading(false);
            });
    }, []);

    const handleToggle = (id: number) => {
        setUsers((users) =>
            users.map((user) =>
                user.id === id ? { ...user, active: !user.active } : user
            )
        );
        onToggle(id);
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">Users</h2>
            {loading ? (
                <p className="text-blue-500">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between shadow"
                        >
                            <div>
                                <div className="text-lg font-semibold text-blue-800">
                                    {user.name}
                                </div>
                                <div className="text-xs text-gray-500 mb-1">
                                    Payments: ${user.totalPayments}
                                </div>
                                <div
                                    className={`text-xs font-medium ${
                                        user.active
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {user.active ? "Active" : "Inactive"}
                                </div>
                            </div>
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={user.active}
                                        onChange={() => handleToggle(user.id)}
                                        className="sr-only"
                                    />
                                    <div
                                        className={`block w-10 h-6 rounded-full ${
                                            user.active
                                                ? "bg-green-400"
                                                : "bg-gray-300"
                                        }`}
                                    ></div>
                                    <div
                                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                                            user.active ? "translate-x-4" : ""
                                        }`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
