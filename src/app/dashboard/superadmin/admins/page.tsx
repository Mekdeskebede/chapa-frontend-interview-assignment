"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addAdminUser,
  removeAdminUser,
  fetchAdminList,
} from "@/services/superAdminService";
import AdminListShimmer from "@/components/shimmers/AdminListShimmer";
import { useRouter } from "next/navigation";
interface ApiAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function AdminListPage() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("admin");
  const [showAddModal, setShowAddModal] = useState(false);

  interface Admin {
    id: number;
    name: string;
    email?: string;
    role?: string;
    status?: string;
    createdAt?: string;
  }

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [errorAdmins, setErrorAdmins] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "superadmin") {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    fetchAdminList()
      .then((data) => {
        const enhancedData = data.map((admin: ApiAdmin) => ({
          ...admin,
          email:
            admin.email ||
            `${admin.name.toLowerCase().replace(/\s+/g, ".")}@company.com`,
          role: admin.role || "Administrator",
          status: admin.status || "Active",
          createdAt: admin.createdAt || "2024-01-15",
        }));
        setAdmins(enhancedData);
        setLoadingAdmins(false);
      })
      .catch(() => {
        setErrorAdmins("Failed to load admin list");
        setLoadingAdmins(false);
        toast.error("Failed to load admin list");
      });
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName.trim() || !adminEmail.trim()) {
      toast.warning("Please fill in all required fields");
      return;
    }

    const result = await addAdminUser(adminName);
    if (result.success) {
      const newAdmin = {
        id: result.id,
        name: adminName,
        email: adminEmail,
        role: adminRole === "admin" ? "Administrator" : "Super Admin",
        status: "Active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      toast.success(`Admin '${adminName}' added successfully!`);
      setAdmins((prev) => [...prev, newAdmin]);
      setAdminName("");
      setAdminEmail("");
      setAdminRole("admin");
      setShowAddModal(false);
    } else {
      toast.error("Failed to add admin. Please try again.");
    }
  };

  const handleRemoveAdmin = async (id: number) => {
    const adminToRemove = admins.find((admin) => admin.id === id);
    const result = await removeAdminUser(id);
    if (result.success) {
      toast.success(`Admin '${adminToRemove?.name}' removed successfully!`);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } else {
      toast.error("Failed to remove admin. Please try again.");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="gap-8 min-h-screen flex flex-col bg-white">
      <div className="flex w-full gap-8 justify-between">
        {loadingAdmins ? (
          <AdminListShimmer />
        ) : errorAdmins ? (
          <div className="mb-8 w-full">
            <p className="text-red-500">{errorAdmins}</p>
          </div>
        ) : (
          <div className="mb-8 w-full p-6">
            <div className="flex items-center justify-end mb-4">
              <button
                className="px-4 py-2 rounded-full bg-primary cursor-pointer hover:bg-primary-light text-white transition-colors"
                onClick={() => setShowAddModal(true)}
              >
                Add Admin
              </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        Admin Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr
                        key={admin.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <span className="text-xs font-semibold text-blue-600">
                                {getInitials(admin.name)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {admin.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {admin.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {admin.role}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {admin.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            onClick={() => handleRemoveAdmin(admin.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Add Admin Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Add New Admin
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter admin's full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter admin's email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={adminRole}
                    onChange={(e) => setAdminRole(e.target.value)}
                  >
                    <option value="admin">Administrator</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                  >
                    Add Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
