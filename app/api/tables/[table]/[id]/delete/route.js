import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/**
 * This POST function is for the DELETE functionality, it performs the following operations:
 * 1. Extracts the table name and id from the request parameters.
 * 2. Constructs and executes SQL DELETE query to remove a record from the specified table with the given id.
 * 4. Returns a JSON response indicating success if the operation was successful, or failed.
 *
 * @param {object} request - The incoming HTTP request.
 * @param {object} params - An object containing route parameters.
 * @param {string} table - The name of the table from which to delete the record.
 * @param {string} id - The id of the record to delete.
 * 
 * @returns {NextResponse} A NextResponse object containing a JSON response.
 * @example
 * - Usage
 * * POST(request, { params: { table: 'users', id: '1' } });
 * - Success:
 * * { success: true }, { status: 200 }
 * - Failure:
 * * { error: "Error message" }, { status: 500 }
*/

export async function POST(request, { params }) {
  const { table, id } = params;

  try {
    const query = `DELETE FROM "${table}" WHERE id = $1`;
    await sql.query(query, [id]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting row:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}