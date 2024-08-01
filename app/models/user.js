import { sql } from '@vercel/postgres';

export async function createUser(username, hashedPassword) {
  const result = await sql`
    INSERT INTO users (username, password)
    VALUES (${username}, ${hashedPassword})
    RETURNING *;
  `;
  return result.rows[0];
}

export async function findUserByUsername(username) {
  const result = await sql`
    SELECT * FROM users WHERE username = ${username};
  `;
  return result.rows[0];
}