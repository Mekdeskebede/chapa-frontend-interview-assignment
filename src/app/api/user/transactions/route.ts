import { NextResponse } from "next/server";

export async function GET() {
    // Mock weekly data for deposits and withdrawals
    return NextResponse.json({
        transactions: [
            {
                id: 1,
                type: "Deposit",
                amount: 500,
                date: "2025-08-01",
                status: "Success",
            },
            {
                id: 2,
                type: "Withdrawal",
                amount: 200,
                date: "2025-08-01",
                status: "Success",
            },
            {
                id: 3,
                type: "Deposit",
                amount: 300,
                date: "2025-08-02",
                status: "Success",
            },
            {
                id: 4,
                type: "Withdrawal",
                amount: 100,
                date: "2025-08-02",
                status: "Pending",
            },
            {
                id: 5,
                type: "Deposit",
                amount: 400,
                date: "2025-08-03",
                status: "Success",
            },
            {
                id: 6,
                type: "Withdrawal",
                amount: 150,
                date: "2025-08-03",
                status: "Success",
            },
            {
                id: 7,
                type: "Deposit",
                amount: 250,
                date: "2025-08-04",
                status: "Success",
            },
            {
                id: 8,
                type: "Withdrawal",
                amount: 120,
                date: "2025-08-04",
                status: "Success",
            },
            {
                id: 9,
                type: "Deposit",
                amount: 350,
                date: "2025-08-05",
                status: "Success",
            },
            {
                id: 10,
                type: "Withdrawal",
                amount: 180,
                date: "2025-08-05",
                status: "Success",
            },
            {
                id: 11,
                type: "Deposit",
                amount: 200,
                date: "2025-08-06",
                status: "Success",
            },
            {
                id: 12,
                type: "Withdrawal",
                amount: 90,
                date: "2025-08-06",
                status: "Success",
            },
            {
                id: 13,
                type: "Deposit",
                amount: 100,
                date: "2025-08-07",
                status: "Success",
            },
            {
                id: 14,
                type: "Withdrawal",
                amount: 60,
                date: "2025-08-07",
                status: "Success",
            },
        ],
    });
}
