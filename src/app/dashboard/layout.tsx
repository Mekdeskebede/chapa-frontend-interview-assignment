import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardHeader from "../../components/DashboardHeader";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For demo, use a static username. Replace with real user data as needed.
  const username =
    typeof window !== "undefined"
      ? localStorage.getItem("username") || "Mekdes Kebede"
      : "Mekdes Kebede";
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <DashboardHeader username={username} />
      <div className="flex-1 flex flex-col ml-64 pt-16">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
