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
                backgroundColor: "#3b82f6",
            },
        ],
    };

    return (
        <div className="bg-white border border-blue-100 rounded-lg p-4 mb-8">
            {loading ? (
                <p className="text-blue-500">Loading chart...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <Bar data={data} options={options} />
            )}
        </div>
    );
}
