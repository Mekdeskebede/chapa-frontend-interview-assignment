import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === 'mekdes' && password === 'chapa123') {
    return NextResponse.json(
      { message: 'User created successfully', role: 'user' },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: 'Invalid username or password' },
      { status: 401 }
    );
  }
}