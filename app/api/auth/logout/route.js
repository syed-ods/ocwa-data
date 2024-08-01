import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
      return NextResponse.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout failed:', error);
      return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
  }