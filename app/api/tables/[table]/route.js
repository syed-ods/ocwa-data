import { sql } from '@vercel/postgres';

export async function GET(req, { params }) {
  const { table } = params;

  // Validate the table name to prevent SQL injection
  const validTables = ['names', 'watersamples']; 
  if (!validTables.includes(table)) {
    return new Response(JSON.stringify({ error: 'Invalid table name' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // Construct the query dynamically
    const query = `SELECT * FROM ${table}`;
    const result = await sql.query(query);

    console.log('Fetched table data successfully');
    return new Response(JSON.stringify({
      columns: result.fields.map(field => field.name),
      rows: result.rows
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching table data:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
