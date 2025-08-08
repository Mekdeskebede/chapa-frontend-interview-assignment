import React from "react";
import { FolderSync } from "lucide-react";
import Image from "next/image";

interface DashboardHeaderProps {
  username: string;
}

// function getInitials(name: string) {
//   if (!name) return "?";
//   const parts = name.split(" ");
//   if (parts.length === 1) return parts[0][0].toUpperCase();
//   return (parts[0][0] + parts[1][0]).toUpperCase();
// }

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  const userImage =
    "https://media.licdn.com/dms/image/v2/D4E03AQF5XF2gsKmx2A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724700757256?e=1757548800&v=beta&t=SkVG6xVYXEzGjhTYucrQfgl3SPUZPOachjRhGlBIfgQ";
  return (
    <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full h-16 px-8 bg-white shadow-sm border-b border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center gap-1">
        <FolderSync className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold text-gray-800"><span className="text-primary">መለኛ</span>App</span>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-white text-lg">
          <Image src={userImage} width={32} height={32} alt="User" className="w-full h-full rounded-full" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
