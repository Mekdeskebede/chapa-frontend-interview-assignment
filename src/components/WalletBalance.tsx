import React, { useEffect, useState } from "react";
import { fetchWalletBalance } from "@/services/paymentService";

import { CreditCard } from "lucide-react";

export default function WalletBalance() {
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const cardNumber = "**** 1234";
    const currency = "ETB";

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
        <div className="mb-6 flex justify-center">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-lg p-5 w-72 flex flex-col items-center relative">
                <CreditCard className="absolute top-4 left-4 w-7 h-7 text-white opacity-80" />
                <div className="text-xs text-white/70 mb-1">Wallet Balance</div>
                {loading ? (
                    <p className="text-white/80">Loading...</p>
                ) : error ? (
                    <p className="text-red-200">{error}</p>
                ) : (
                    <div className="text-3xl font-bold text-white mb-1">
                        {balance?.toLocaleString()}{" "}
                        <span className="text-base font-normal">
                            {currency}
                        </span>
                    </div>
                )}
                <div className="text-xs text-white/60">Card: {cardNumber}</div>
            </div>
        </div>
    );
}
