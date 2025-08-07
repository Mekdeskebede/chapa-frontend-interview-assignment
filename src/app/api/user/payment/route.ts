import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const secretKey = process.env.CHAPA_SECRET_KEY;

    const chapaRes = await fetch(
        "https://api.chapa.co/v1/transaction/initialize",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    const data = await chapaRes.json();
    return NextResponse.json(data, { status: chapaRes.status });
}
