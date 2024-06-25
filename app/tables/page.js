"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Tables() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("/api/tables");
        const data = await response.json();
        setTables(data.tables);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div>
      <h1>Tables</h1>
      <ul className="tables-list">
        {tables.map((table) => (
          <li key={table}>
            <Link href={`/tables/${table}`}>
              {table.charAt(0).toUpperCase() + table.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
