import React from "react";

interface DashboardHeaderProps {
    username: string;
}

function getInitials(name: string) {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => (
    <header className="flex items-center justify-end w-full h-14 px-8 bg-white shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-white text-lg">
                {getInitials(username)}
            </div>
            <div className="flex flex-col">
                {/* <span className="text-base font-semibold text-gray-800">
                    {getInitials(username)}
                </span> */}
                <span className="text-xs text-gray-500">{username}</span>
            </div>
        </div>
    </header>
);

export default DashboardHeader;
