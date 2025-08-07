import { NextResponse } from "next/server";

export async function GET() {
    // Mock recent transactions
    return NextResponse.json({
        transactions: [
            { id: 1, date: "2025-08-01", amount: 200, status: "Success" },
            { id: 2, date: "2025-08-03", amount: 75, status: "Pending" },
            { id: 3, date: "2025-08-05", amount: 150, status: "Failed" },
        ],
    });
}
