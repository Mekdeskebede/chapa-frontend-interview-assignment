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
import UserPaymentsChartShimmer from "./shimmers/UserPaymentsChartShimmer";

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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          size: 14,
          weight: "600",
        },
        padding: 20,
      },
    },
    title: {
      display: true,
      text: "User Payments Summary",
      font: {
        size: 18,
        weight: 700,
      },
      padding: {
        top: 10,
        bottom: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#22c55e",
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function (context: { parsed: { y: number } }) {
          return `$${context.parsed.y.toLocaleString()}`;
        },
      },
    },
  },
};

export default function UserPaymentsChart() {
  interface User {
    id: number;
    name: string;
    totalPayments: number;
    active: boolean;
  }
  const [users, setUsers] = useState<User[]>([]);
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
        backgroundColor: users.map((u) => (u.active ? "#22c55e" : "#ef4444")),
        borderColor: users.map((u) => (u.active ? "#16a34a" : "#dc2626")),
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
        hoverBackgroundColor: users.map((u) =>
          u.active ? "#16a34a" : "#dc2626"
        ),
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Payment Analytics
        </h3>
        <p className="text-sm text-gray-600">
          Overview of user payment activities
        </p>
      </div>

      {loading ? (
        <UserPaymentsChartShimmer />
      ) : error ? (
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Please try again later</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="h-80">
            <Bar
              data={data}
              options={{
                ...options,
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      font: {
                        size: 12,
                        weight: "normal",
                      },
                      color: "#6b7280",
                    },
                    border: {
                      display: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "#f3f4f6",
                    },
                    ticks: {
                      font: {
                        size: 12,
                        weight: "normal",
                      },
                      color: "#6b7280",
                      // callback: function (value: any) {
                      //   return "$" + value.toLocaleString();
                      // },
                    },
                    border: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  ...options.plugins,
                  legend: {
                    position: "top" as const,
                    labels: {
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                      padding: 20,
                      usePointStyle: true,
                      pointStyle: "circle",
                    },
                  },
                },
              }}
            />
          </div>

          {/* Summary stats */}
          {users.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Total Revenue
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      $
                      {users
                        .reduce((sum, user) => sum + user.totalPayments, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Active Users
                    </p>
                    <p className="text-lg font-bold text-blue-800">
                      {users.filter((user) => user.active).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Avg Payment
                    </p>
                    <p className="text-lg font-bold text-purple-800">
                      $
                      {users.length > 0
                        ? (
                            users.reduce(
                              (sum, user) => sum + user.totalPayments,
                              0
                            ) / users.length
                          ).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
