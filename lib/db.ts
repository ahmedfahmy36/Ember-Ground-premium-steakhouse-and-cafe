import { sql } from "@vercel/postgres";

export interface ReservationRow {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  message?: string;
}

export async function initDb(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS reservations (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL,
      email      VARCHAR(255) NOT NULL,
      phone      VARCHAR(50) NOT NULL,
      date       VARCHAR(50) NOT NULL,
      time       VARCHAR(50) NOT NULL,
      party_size INTEGER NOT NULL,
      message    TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function insertReservation(data: ReservationRow): Promise<number> {
  // Ensure table exists (for testing/development convenience)
  await initDb();
  
  const result = await sql`
    INSERT INTO reservations (name, email, phone, date, time, party_size, message)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.date},
      ${data.time},
      ${data.party_size},
      ${data.message ?? null}
    )
    RETURNING id;
  `;
  
  return result.rows[0].id;
}
