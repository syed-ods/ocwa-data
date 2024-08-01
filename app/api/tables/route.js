import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { authenticateToken } from '../../middleware/authMiddleware';

/**
 * This GET function fetches the names of all tables in the 'public' schema of our PostgreSQL database hosted on Vercel.
 * 1. Constructs and executes a SQL SELECT query to fetch the names of all tables in the 'public' schema.
 * 2. Returns a JSON response containing the names of the tables if the operation was successful, or an error message if it failed.
 *
 * @returns {NextResponse} A NextResponse object containing a JSON response.
 * @example
 * - Usage
 * * GET();
 * - Success:
 * * Maps over the result rows and extract the 'table_name' property from each row
 * * { tables: ['users', 'orders', 'products'] }
 * - Failure:
 * * { error: "Error fetching tables" }, { status: 500 }
 */

export async function GET(req) {
  const authResult = authenticateToken(req);
  if (authResult.status) return authResult;

  try {
    const result = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_name NOT IN ('users', 'watersamples');
    `;

    const tables = result.rows.map(row => row.table_name);
    return NextResponse.json({ tables });
  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.json({ error: 'Error fetching tables' }, { status: 500 });
  }
}
