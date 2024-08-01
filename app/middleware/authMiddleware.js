import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function authenticateToken(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect('/login');
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect('/login');
  }
}
