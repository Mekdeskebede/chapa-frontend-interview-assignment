import React, { useEffect, useState } from "react";
import { fetchWalletBalance } from "@/services/paymentService";

export default function WalletBalance() {
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchWalletBalance()
            .then((bal) => {
                setBalance(bal);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load balance");
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Wallet Balance
            </h3>
            {loading ? (
                <p className="text-blue-500">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <p className="text-3xl font-bold text-blue-900">
                    $
                    {balance?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </p>
            )}
        </div>
    );
}
