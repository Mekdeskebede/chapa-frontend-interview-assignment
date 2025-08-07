import React, { useEffect, useState } from "react";
import { fetchAdminUsers } from "@/services/adminService";

export default function AdminUserList({
    onToggle,
}: {
    onToggle: (id: number) => void;
}) {
    const [users, setUsers] = useState<any[]>([]);
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
            <h2 className="text-xl font-bold text-blue-700 mb-4">Users</h2>
            {loading ? (
                <p className="text-blue-500">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full text-sm border">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="py-2 px-3 text-left">Name</th>
                            <th className="py-2 px-3 text-left">Status</th>
                            <th className="py-2 px-3 text-left">
                                Total Payments
                            </th>
                            <th className="py-2 px-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="py-2 px-3">{user.name}</td>
                                <td
                                    className={`py-2 px-3 font-medium ${
                                        user.active
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {user.active ? "Active" : "Inactive"}
                                </td>
                                <td className="py-2 px-3">
                                    ${user.totalPayments}
                                </td>
                                <td className="py-2 px-3">
                                    <button
                                        className={`px-3 py-1 rounded text-white ${
                                            user.active
                                                ? "bg-red-500 hover:bg-red-600"
                                                : "bg-green-500 hover:bg-green-600"
                                        }`}
                                        onClick={() => handleToggle(user.id)}
                                    >
                                        {user.active
                                            ? "Deactivate"
                                            : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
