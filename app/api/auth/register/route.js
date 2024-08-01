import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (username, password) VALUES (${username}, ${hashedPassword})
    `;
    
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}