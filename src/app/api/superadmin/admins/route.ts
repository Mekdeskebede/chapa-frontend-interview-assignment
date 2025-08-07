import { NextResponse } from "next/server";

let admins = [
    { id: 101, name: "Admin1" },
    { id: 102, name: "Admin2" },
    { id: 103, name: "Admin3" },
];

export async function GET() {
    return NextResponse.json({ admins });
}
