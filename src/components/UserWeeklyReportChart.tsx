import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import UserWeeklyReportChartShimmer from "@/components/shimmers/UserWeeklyReportChartShimmer";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Transaction {
    id: string;
    date: string;
    type: "Deposit" | "Withdrawal";
    amount: number;
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
            labels: {
                font: {
                    size: 12,
                    weight: "normal" as const,
                },
                padding: 20,
                usePointStyle: true,
                pointStyle: "circle",
            },
        },
        title: {
            display: false,
            text: "Weekly Transaction Report",
            font: {
                size: 16,
                weight: "bold" as const,
            },
            padding: {
                top: 10,
                bottom: 20,
            },
        },
        tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            titleColor: "#374151",
            bodyColor: "#6b7280",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            titleFont: {
                size: 13,
                weight: "bold" as const,
            },
            bodyFont: {
                size: 12,
                weight: "normal" as const,
            },
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 11,
                    weight: "normal" as const,
                },
                color: "#6b7280",
            },
        },
        y: {
            grid: {
                color: "#f3f4f6",
                drawBorder: false,
            },
            ticks: {
                font: {
                    size: 11,
                    weight: "normal" as const,
                },
                color: "#6b7280",
                // callback: function (value: number) {
                //   return `$${value}`;
                // },
            },
        },
    },
    elements: {
        point: {
            radius: 4,
            hoverRadius: 6,
            borderWidth: 2,
        },
        line: {
            borderWidth: 2,
        },
    },
};

async function fetchWeeklyTransactions() {
    const res = await fetch("/api/user/transactions");
    const data = await res.json();
    return data.transactions;
}

export default function UserWeeklyReportChart() {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
            tension: number;
        }[];
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchWeeklyTransactions()
            .then((txs: Transaction[]) => {
                // Group by date and type
                const days = [
                    "2025-08-01",
                    "2025-08-02",
                    "2025-08-03",
                    "2025-08-04",
                    "2025-08-05",
                    "2025-08-06",
                    "2025-08-07",
                ];
                const deposits = days.map((day) =>
                    txs
                        .filter(
                            (tx) => tx.date === day && tx.type === "Deposit"
                        )
                        .reduce((sum: number, tx) => sum + tx.amount, 0)
                );
                const withdrawals = days.map((day) =>
                    txs
                        .filter(
                            (tx) => tx.date === day && tx.type === "Withdrawal"
                        )
                        .reduce((sum: number, tx) => sum + tx.amount, 0)
                );
                setChartData({
                    labels: days.map((day) =>
                        new Date(day).toLocaleDateString("en-US", {
                            weekday: "short",
                        })
                    ),
                    datasets: [
                        {
                            label: "Deposits",
                            data: deposits,
                            borderColor: "#10b981",
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            tension: 0.4,
                        },
                        {
                            label: "Withdrawals",
                            data: withdrawals,
                            borderColor: "#ef4444",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            tension: 0.4,
                        },
                    ],
                });
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load weekly report");
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-medium text-gray-800 mb-1">
                        Weekly Transaction Report
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                        Track your deposits and withdrawals over the past week
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-gray-600 font-medium">
                            Deposits
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-gray-600 font-medium">
                            Withdrawals
                        </span>
                    </div>
                </div>
            </div>

            <div className="h-64">
                {loading ? (
                    <UserWeeklyReportChartShimmer />
                ) : error ? (
                    <div className="flex items-center justify-center h-full text-red-500">
                        <span className="text-sm font-light">{error}</span>
                    </div>
                ) : chartData ? (
                    <Line data={chartData} options={options} />
                ) : null}
            </div>
        </div>
    );
}
