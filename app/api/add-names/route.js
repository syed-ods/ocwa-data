import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get('first_name');
  const lastName = searchParams.get('last_name');
 
  try {
    if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await sql`INSERT INTO names (first_name, last_names) VALUES (${firstName}, ${lastName});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const names = await sql`SELECT * FROM names;`;
  return NextResponse.json({ names }, { status: 200 });
}