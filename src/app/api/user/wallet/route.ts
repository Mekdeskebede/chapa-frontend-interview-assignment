import { NextResponse } from "next/server";

export async function GET() {
    // Mock wallet balance
    return NextResponse.json({ balance: 1250.75 });
}
