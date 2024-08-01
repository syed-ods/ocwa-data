import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: 'Token is valid' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
