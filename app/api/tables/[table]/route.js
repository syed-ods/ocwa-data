import { sql } from '@vercel/postgres';

export async function GET(req, { params }) {
  const { table } = params;
  const url = new URL(req.url);
  const filter = url.searchParams.get('filter');
  const count = url.searchParams.get('count');

  // Validate the table name to prevent SQL injection
  const validTables = ['names', 'watersamples', 'products']; 
  if (!validTables.includes(table)) {
    return new Response(JSON.stringify({ error: 'Invalid table name' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    let query = `SELECT * FROM ${table}`;
    const queryParams = [];

    if (table === 'products' && filter === 'past30days') {
      query = `SELECT * FROM ${table} WHERE date_created >= NOW() - INTERVAL '30 days'`;
    } else if (table === 'products' && count === 'true') {
      query = `SELECT category, COUNT(*) as count FROM ${table} GROUP BY category`;
    } else {
      query += ` ORDER BY id`; 
    }

    console.log('Executing query:', query); 

    const result = await sql.query(query, queryParams);

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