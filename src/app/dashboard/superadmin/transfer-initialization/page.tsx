"use client";
import TransferSection from "@/components/TransferSection";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TransferInitializationPage() {
  const router = useRouter();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "superadmin") {
      router.push("/login");
    }
  }, []);
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center bg-white">
      <div className="w-[50%] mt-12">
        <TransferSection />
      </div>
    </div>
  );
}
