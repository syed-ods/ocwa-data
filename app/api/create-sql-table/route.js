import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS WaterSamples (
        GridReference VARCHAR(20),
        Location VARCHAR(50),
        Sample VARCHAR(20),
        SampleDate DATE,
        SampleTime TIME,
        Trimetoprim FLOAT,
        Oxytetracyclin FLOAT,
        Ofloxacin FLOAT,
        Norfloxacin FLOAT,
        Oseltamivir FLOAT,
        Ciprofloxacin FLOAT,
        Naphazoline FLOAT,
        Azithromycin FLOAT,
        Cefotaxime FLOAT,
        Doxycyclin FLOAT,
        Sulfamethoxazole FLOAT,
        Oxymetazoline FLOAT,
        Erythromycin FLOAT,
        Xylometazoline FLOAT,
        Clarithromycin FLOAT
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
