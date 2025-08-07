import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if (username === "mekdes" && password === "chapa123") {
        return NextResponse.json(
            { message: "Login successful", role: "user" },
            { status: 200 }
        );
    } else if (username === "admin" && password === "admin123") {
        return NextResponse.json(
            { message: "Login successful", role: "admin" },
            { status: 200 }
        );
    } else if (username === "superadmin" && password === "superadmin123") {
        return NextResponse.json(
            { message: "Login successful", role: "superadmin" },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { message: "Invalid username or password" },
            { status: 401 }
        );
    }
}
