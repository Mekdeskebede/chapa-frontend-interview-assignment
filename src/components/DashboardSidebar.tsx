import React from "react";
import { User } from "lucide-react";
import Button from "./Button";

interface DashboardSidebarProps {
    activeTab?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab }) => (
    <aside className="bg-white w-56 min-h-screen flex flex-col items-center py-8 shadow-md">
        <div className="mb-8 text-2xl font-bold tracking-wide">
            <span></span>Chapa App
        </div>
        <nav className="w-full">
            <Button
                className={`w-full flex items-center gap-2 px-6 py-3 rounded-lg transition-colors font-semibold text-lg cursor-pointer ${
                    activeTab === "dashboard"
                        ? "bg-transparent text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-dark"
                        : "hover:bg-white hover:bg-opacity-5 text-primary"
                }`}
            >
                <User
                    className={
                        activeTab === "dashboard"
                            ? "w-5 h-5 text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-dark"
                            : "w-5 h-5 text-black"
                    }
                />
                <span
                    className={
                        activeTab === "dashboard"
                            ? "text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-dark"
                            : "text-black"
                    }
                >
                    Dashboard
                </span>
            </Button>
        </nav>
    </aside>
);

export default DashboardSidebar;
