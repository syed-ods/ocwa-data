import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

/**
 * This GET function fetches the clicked record from the specified table with the given id.
 * 1. Extracts the table name and id from the request parameters.
 * 2. Constructs and executes a SQL SELECT query to fetch a record from the specified table with the given id.
 * 3. Returns a JSON response containing the fetched record if the operation was successful, or an error message if it failed.
 *
 * @param {object} request - The incoming HTTP request.
 * @param {object} params - An object containing route parameters.
 * @param {string} table - The name of the table from which to fetch the record.
 * @param {string} id - The id of the record to fetch.
 * 
 * @returns {NextResponse} A NextResponse object containing a JSON response.
 * @example
 * - Usage
 * * GET(request, { params: { table: 'users', id: '1' } });
 * - Success:
 * * { row: { id: 1, name: 'John Doe' }, columns: ['id', 'name'] }
 * - Failure:
 * * { error: "Error message" }, { status: 500 }
 */

export async function GET(request, { params }) {
  const { table, id } = params;

  try {
    const query = `SELECT * FROM ${table} WHERE id = $1`;
    const result = await sql.query(query, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({
      row: result.rows[0],
      columns: result.fields.map((field) => field.name),
    });
  } catch (error) {
    console.error("Error fetching row data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * This POST function is for the UPDATE functionality on the fetched record, it performs the following operations:
 * 1. Extracts the table name and id from the request parameters.
 * 2. Constructs and executes a SQL UPDATE query to update a record in the specified table with the given id.
 * 3. Returns a JSON response indicating success if the operation was successful, or an error message if it failed.
 *
 * @param {object} request - The incoming HTTP request.
 * @param {object} params - An object containing route parameters.
 * @param {string} table - The name of the table in which to update the record.
 * @param {string} id - The id of the record to update.
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

  if (!request.body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  const rowData = await request.json();

  try {
    const columns = Object.keys(rowData);
    const values = Object.values(rowData);
    const setClause = columns.map((col, idx) => `"${col}" = $${idx + 1}`).join(", ");

    const query = `UPDATE "${table}" SET ${setClause} WHERE id = $${values.length + 1}`;
    await sql.query(query, [...values, id]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating row data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
