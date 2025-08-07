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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: { position: "top" as const },
        title: { display: true, text: "Weekly Deposit & Withdrawal Report" },
    },
};

async function fetchWeeklyTransactions() {
    const res = await fetch("/api/user/transactions");
    const data = await res.json();
    return data.transactions;
}

export default function UserWeeklyReportChart() {
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchWeeklyTransactions()
            .then((txs) => {
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
                            (tx: any) =>
                                tx.date === day && tx.type === "Deposit"
                        )
                        .reduce((sum: number, tx: any) => sum + tx.amount, 0)
                );
                const withdrawals = days.map((day) =>
                    txs
                        .filter(
                            (tx: any) =>
                                tx.date === day && tx.type === "Withdrawal"
                        )
                        .reduce((sum: number, tx: any) => sum + tx.amount, 0)
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
                            borderColor: "#34d399",
                            backgroundColor: "#34d39922",
                            tension: 0.4,
                        },
                        {
                            label: "Withdrawals",
                            data: withdrawals,
                            borderColor: "#f87171",
                            backgroundColor: "#f8717122",
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
        <div className="bg-white border border-primary/10 rounded-xl p-6 mb-8 shadow flex flex-col items-center">
            {loading ? (
                <p className="text-primary">Loading weekly report...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <Line data={chartData} options={options} />
            )}
        </div>
    );
}
