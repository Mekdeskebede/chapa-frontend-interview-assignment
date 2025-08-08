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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-gray-800">
          Recent Transactions
        </h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full font-light">
          Last 3 transactions
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-gray-400 font-light">
            Loading transactions...
          </span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-6 text-red-500">
          <XCircle className="w-4 h-4 mr-2" />
          <span className="text-sm font-light">{error}</span>
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex items-center justify-center py-6 text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm font-light">No transactions found</span>
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.slice(0, 3).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Transaction Type and Icon */}
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-full ${
                    tx.type === "Deposit"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.type === "Deposit" ? (
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-normal text-gray-700">
                    {tx.type}
                  </span>
                  <span className="text-xs text-gray-400 font-light">
                    {tx.date}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <span
                  className={`text-sm font-medium ${
                    tx.type === "Deposit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "Deposit" ? "+" : "-"}
                  {tx.amount} ETB
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5">
                {tx.status === "Success" ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-light">Success</span>
                  </div>
                ) : tx.status === "Pending" ? (
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-light">Pending</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600">
                    <XCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-light">Failed</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
