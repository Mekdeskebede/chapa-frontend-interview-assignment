import { NextResponse } from "next/server";

const users = [
    { id: 1, name: "Mekdes", active: true, totalPayments: 1200 },
    { id: 2, name: "Abel", active: false, totalPayments: 800 },
    { id: 3, name: "Sara", active: true, totalPayments: 950 },
    { id: 4, name: "John", active: true, totalPayments: 400 },
];

export async function GET() {
    return NextResponse.json({ users });
}
