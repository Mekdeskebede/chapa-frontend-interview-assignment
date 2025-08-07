import { NextResponse } from "next/server";

export async function GET() {
    // Mocked system-wide statistics
    return NextResponse.json({
        totalPayments: 3350,
        activeUsers: 3,
        totalUsers: 4,
    });
}
