import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { fetchAdminUsers } from "@/services/adminService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: { position: "top" as const },
        title: { display: true, text: "User Payments Summary" },
    },
};

export default function UserPaymentsChart() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAdminUsers()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load user payments");
                setLoading(false);
            });
    }, []);

    const data = {
        labels: users.map((u) => u.name),
        datasets: [
            {
                label: "Total Payments",
                data: users.map((u) => u.totalPayments),
                backgroundColor: users.map((u) =>
                    u.active ? "#22c55e" : "#ef4444"
                ), // green for active, red for inactive
                borderRadius: 8,
                barPercentage: 0.7,
                categoryPercentage: 0.6,
            },
        ],
    };

    return (
        <div
            className="rounded-lg flex justify-start items-start px-8"
            style={{}}
        >
            {loading ? (
                <p className="text-primary">Loading chart...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div style={{ width: "100%", minWidth:"500px" }}>
                    <Bar
                        data={data}
                        options={{
                            ...options,
                            indexAxis: "x",
                            scales: {
                                x: {
                                    grid: { display: false },
                                    ticks: { font: { size: 16 } },
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: { font: { size: 16 } },
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}
