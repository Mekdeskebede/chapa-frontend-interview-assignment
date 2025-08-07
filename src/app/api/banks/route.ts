import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const secretKey = process.env.CHAPA_SECRET_KEY;
    const chapaRes = await fetch("https://api.chapa.co/v1/banks", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
        },
    });
    const data = await chapaRes.json();
    return NextResponse.json(data, { status: chapaRes.status });
}
