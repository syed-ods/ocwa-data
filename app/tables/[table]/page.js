"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";

export default function TablePage() {
  const { table } = useParams();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const fetchData = async (filter = false, count = false) => {
    try {
      let url = `/api/tables/${table}`;
      if (filter) {
        url += '?filter=past30days';
      } else if (count) {
        url += '?count=true';
      }
      const response = await fetch(url);
      const result = await response.json();
      setData(result.rows || []);
      setColumns(result.columns || []);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    if (!table) return;
    fetchData();
  }, [table]);

  const handleEdit = (id) => {
    router.push(`/tables/${table}/${id}/update`);
  };

  const handleAdd = () => {
    router.push(`/tables/${table}/add`);
  };

  const handleFilter = () => {
    fetchData(true);
  };

  const handleCount = () => {
    fetchData(false, true);
  };

  return (
    <div>
      <h1>{table.charAt(0).toUpperCase() + table.slice(1)} Data</h1>
      <Link className="back-link" href="/tables">
        <BsArrowLeftShort className="back-arrow" />
        Back to tables
      </Link>
      <div
        className="table-container"
        style={{ overflow: 'auto', width: '100%' }}
      >
        {table === 'products' && (
          <>
            <button onClick={handleFilter}>Filter last month</button>
            <button onClick={handleCount}>Count per category</button>
          </>
        )}
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
                <td>
                  <button onClick={() => handleEdit(row.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAdd}>Add Data</button>
      <style jsx>{`
        .edit-dialog,
        .add-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}