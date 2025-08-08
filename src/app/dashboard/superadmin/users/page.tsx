"use client"
import AdminUserList from "@/components/AdminUserList";

export default function AdminUsersPage() {
    const handleToggle = () => {
        // Implement toggle logic if needed
    };
    return (
        <div className="gap-8 min-h-screen flex flex-col bg-white">
            <div className="p-6">
                <AdminUserList onToggle={handleToggle} />
            </div>
        </div>
    );
}
