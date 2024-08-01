import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

/**
 * This POST function is for the ADD/INSERT functionality, it performs the following operations:
 * 1. Extracts the table name from the request parameters.
 * 2. Constructs and executes a SQL INSERT query to add a new record to the specified table.
 * 3. Returns a JSON response indicating success if the operation was successful, or an error message if it failed.
 *
 * @param {object} request - The incoming HTTP request.
 * @param {object} params - An object containing route parameters.
 * @param {string} table - The name of the table in which to insert the new record.
 * 
 * @returns {NextResponse} A NextResponse object containing a JSON response.
 * @example
 * - Usage
 * * POST(request, { params: { table: 'users' } });
 * - Success:
 * * { success: true }, { status: 200 }
 * - Failure:
 * * { error: "Error message" }, { status: 500 }
 */

export async function POST(request, { params }) {
  const { table } = params;
  const rowData = await request.json();

  try {
    const columns = Object.keys(rowData);
    const values = Object.values(rowData);

    const columnsStr = columns.map(column => `"${column}"`).join(', ');
    const placeholders = columns.map((_, idx) => `$${idx + 1}`).join(', ');

    const query = `INSERT INTO "${table}" (${columnsStr}) VALUES (${placeholders}) RETURNING *`;
    await sql.query(query, values);

    const insertedRecord = result.rows[0];

    if (table === 'products') {
      const { title, product_id } = insertedRecord;
      const notificationMessage = `${title} with id ${product_id} added to the product list`;
      await sql.query(
        `INSERT INTO "notifications" (message) VALUES ($1)`,
        [notificationMessage]
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}