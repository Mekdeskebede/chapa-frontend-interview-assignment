"use client";
import React, { useEffect, useState } from "react";
import {
  Building2,
  CreditCard,
  Home,
  LogOut,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface SidebarItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface RoleConfig {
  [key: string]: SidebarItem[];
}

const sidebarConfig: RoleConfig = {
  user: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard/user",
      icon: Home,
    },
    {
      id: "initiate-payment",
      label: "Initiate Payment",
      path: "/dashboard/user/initiate-payment",
      icon: CreditCard,
    },
  ],
  admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard/admin",
      icon: Home,
    },
    {
      id: "users",
      label: "User Management",
      path: "/dashboard/admin/users",
      icon: Users,
    },
    // {
    //   id: "payments",
    //   label: "Payment Analytics",
    //   path: "/dashboard/admin/payments",
    //   icon: BarChart3,
    // },
    {
      id: "banks",
      label: "Bank Management",
      path: "/dashboard/admin/banks",
      icon: Building2,
    },
  ],
  superadmin: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard/superadmin",
      icon: Home,
    },
    // {
    //   id: "users",
    //   label: "User Management",
    //   path: "/dashboard/superadmin/users",
    //   icon: Users,
    // },
    // {
    //   id: "admins",
    //   label: "Admin Management",
    //   path: "/dashboard/superadmin/admins",
    //   icon: Shield,
    // },
    // {
    //   id: "payments",
    //   label: "Payment Analytics",
    //   path: "/dashboard/superadmin/payments",
    //   icon: BarChart3,
    // },
    // {
    //   id: "banks",
    //   label: "Bank Management",
    //   path: "/dashboard/superadmin/banks",
    //   icon: Building2,
    // },
    // {
    //   id: "stats",
    //   label: "System Statistics",
    //   path: "/dashboard/superadmin/stats",
    //   icon: Activity,
    // },
    // {
    //   id: "settings",
    //   label: "System Settings",
    //   path: "/dashboard/superadmin/settings",
    //   icon: Settings,
    // },
  ],
};

const DashboardSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string>("user");
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  useEffect(() => {
    // Get role from localStorage
    const userRole = localStorage.getItem("role") || "user";
    setRole(userRole);

    // Determine active tab based on current pathname
    const currentPath = pathname;
    const roleItems = sidebarConfig[userRole] || sidebarConfig.user;

    const activeItem = roleItems.find(
      (item) =>
        currentPath === item.path ||
        (item.id !== "dashboard" && currentPath.startsWith(item.path))
    );

    setActiveTab(activeItem?.id || "dashboard");
  }, [pathname]);

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // Redirect to login page
    router.push("/login");
  };

  const roleItems = sidebarConfig[role] || sidebarConfig.user;

  return (
    <aside className="bg-white w-64 min-h-screen flex flex-col items-center py-8 shadow-md fixed left-0 top-0 pt-24">
      <div className="mb-4 px-4 w-full">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {role === "superadmin"
            ? "Super Admin"
            : role === "admin"
            ? "Admin"
            : "User"}{" "}
          Panel
        </div>
      </div>

      <nav className="w-full px-4 flex-1">
        {roleItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-base cursor-pointer mb-1 block ${
                isActive ? "text-primary" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <IconComponent
                className={`w-5 h-5 ${
                  isActive ? "text-primary" : "text-gray-500"
                }`}
              />
              <span
                className={
                  isActive
                    ? "text-primary font-medium"
                    : "text-gray-600 font-normal"
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="w-full px-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-base cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
