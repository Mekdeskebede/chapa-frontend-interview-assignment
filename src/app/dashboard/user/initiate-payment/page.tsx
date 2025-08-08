"use client";
import TransactionForm from "@/components/TransactionForm";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

const InitiatePayment = () => {
  const router = useRouter();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      router.push("/login");
    }
  }, [router]);
  return (
    <div>
      <div className="flex min-h-[85vh] ">
        <div className="w-full p-10 flex flex-col gap-8 bg-white rounded-xl">
          <Suspense fallback={<div>Loading...</div>}>
            <TransactionForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default InitiatePayment;
