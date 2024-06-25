'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function TablePage() {
  const { table } = useParams();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!table) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/tables/${table}`);
        const result = await response.json();
        setData(result.rows || []);
        setColumns(result.columns || []);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData();
  }, [table]);

  const handleEdit = (id) => {
    router.push(`/tables/${table}/${id}/update`);
  };

  const handleAdd = () => {
    router.push(`/tables/${table}/add`);
  };

  return (
    <div>
      <h1>{table.charAt(0).toUpperCase() + table.slice(1)}</h1>
      <div style={{ overflow: 'auto', height: '400px', width: '100%' }}>
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
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
        <button onClick={handleAdd}>Add Record</button>
      </div>
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
