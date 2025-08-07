import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const secretKey = process.env.CHAPA_SECRET_KEY;
    const chapaRes = await fetch("https://api.chapa.co/v1/transfers", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await chapaRes.json();
    return NextResponse.json(data, { status: chapaRes.status });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");
    const secretKey = process.env.CHAPA_SECRET_KEY;
    const chapaRes = await fetch(
        `https://api.chapa.co/v1/transfers/${reference}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
        }
    );
    const data = await chapaRes.json();
    return NextResponse.json(data, { status: chapaRes.status });
}
