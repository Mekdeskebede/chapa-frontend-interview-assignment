import React, { useEffect, useState } from "react";
import { fetchRecentTransactions } from "@/services/paymentService";

export default function RecentTransactions() {
    const [transactions, setTransactions] = useState<any[]>([]);
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
        <div className="bg-white border border-blue-100 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Recent Transactions
            </h3>
            {loading ? (
                <p className="text-blue-500">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="py-2 px-3 text-left">Date</th>
                            <th className="py-2 px-3 text-left">Amount</th>
                            <th className="py-2 px-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-t">
                                <td className="py-2 px-3">{tx.date}</td>
                                <td className="py-2 px-3">${tx.amount}</td>
                                <td
                                    className={`py-2 px-3 font-medium ${
                                        tx.status === "Success"
                                            ? "text-green-600"
                                            : tx.status === "Pending"
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {tx.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
