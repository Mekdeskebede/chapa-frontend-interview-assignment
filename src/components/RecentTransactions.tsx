import React, { useEffect, useState } from "react";
import { fetchRecentTransactions } from "@/services/paymentService";
import {
    ArrowDownLeft,
    ArrowUpRight,
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";

export default function RecentTransactions() {
    interface Transaction {
        id: number;
        type: string;
        amount: number;
        status: string;
        date: string;
    }
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRecentTransactions()
            .then((txs) => {
                setTransactions(txs);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load transactions");
                setLoading(false);
            });
    }, []);

    return (
        <div className="mb-6 flex justify-center gap-4">
            <div className="bg-white rounded-xl shadow p-5 ">
                {/* <h3 className="text-base font-semibold text-gray-700 mb-3">
                    Recent Transactions
                </h3> */}
                {loading ? (
                    <p className="text-primary">Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : transactions.length === 0 ? (
                    <p className="text-gray-400">No transactions found.</p>
                ) : (
                    <ul className="space-y-3 space-x-4">
                        {transactions.slice(0, 3).map((tx) => (
                            <li
                                key={tx.id}
                                className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg px-4 py-2 space-x-4"
                            >
                                <span className="flex items-center gap-2">
                                    {tx.type === "Deposit" ? (
                                        <ArrowDownLeft className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <ArrowUpRight className="w-4 h-4 text-red-500" />
                                    )}
                                    <span className="font-medium text-gray-800">
                                        {tx.type}
                                    </span>
                                </span>
                                <span className="font-bold text-primary-dark">
                                    {tx.amount} ETB
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                    {tx.status === "Success" ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : tx.status === "Pending" ? (
                                        <Clock className="w-4 h-4 text-yellow-500" />
                                    ) : (
                                        <XCircle className="w-4 h-4 text-red-500" />
                                    )}
                                    {tx.status}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {tx.date}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
