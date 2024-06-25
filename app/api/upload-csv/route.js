import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500kb",
    },
  },
};

export async function POST(req, res) {
  const form = new IncomingForm();
  const uploadDir = path.join(process.cwd(), "/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the form:", err);
      return res.status(500).json({ error: "Error parsing the form" });
    }

    const file = files.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const filePath = file.path;
      const rows = await parseCSV(filePath);

      console.log(`Parsed ${rows.length} rows from CSV`);

      for (const row of rows) {
        const values = [
          row["Grid reference"],
          row["Location"],
          row["Sample"],
          row["Date"],
          row["Time (h)"],
          row["Trimetoprim (ug/L)"],
          row["Oxytetracyclin (ug/L)"],
          row["Ofloxacin (ug/L)"],
          row["Norfloxacin (ug/L)"],
          row["Oseltamivir (ug/L)"],
          row["Ciprofloxacin (ug/L)"],
          row["Naphazoline (ug/L)"],
          row["Azithromycin (ug/L)"],
          row["Cefotaxime (ug/L)"],
          row["Doxycyclin (ug/L)"],
          row["Sulfamethoxazole (ug/L)"],
          row["Oxymetazoline (ug/L)"],
          row["Erythromycin (ug/L)"],
          row["Xylometazoline (ug/L)"],
          row["Clarithromycin (ug/L)"],
        ].map((value) => (value === "-" ? null : value));

        console.log("Inserting row:", values);

        await sql`
          INSERT INTO WaterSamples (
            "Grid_Reference", "Location", "Sample", "Sample_Date", "Sample_Time", 
            "Trimetoprim", "Oxytetracyclin", "Ofloxacin", "Norfloxacin", "Oseltamivir", 
            "Ciprofloxacin", "Naphazoline", "Azithromycin", "Cefotaxime", "Doxycyclin", 
            "Sulfamethoxazole", "Oxymetazoline", "Erythromycin", "Xylometazoline", "Clarithromycin"
          ) VALUES (
            ${values[0]}, ${values[1]}, ${values[2]}, ${values[3]}, ${values[4]}, 
            ${values[5]}, ${values[6]}, ${values[7]}, ${values[8]}, ${values[9]}, 
            ${values[10]}, ${values[11]}, ${values[12]}, ${values[13]}, ${values[14]}, 
            ${values[15]}, ${values[16]}, ${values[17]}, ${values[18]}, ${values[19]}
          );
        `;

        console.log("Row inserted successfully");
      }
      return NextResponse.json({ message: "Data uploaded successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error uploading data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  });
}

// not working as expected