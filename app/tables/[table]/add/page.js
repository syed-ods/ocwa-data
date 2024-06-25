'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AddPage() {
  const router = useRouter();
  const { table } = useParams();
  const [newRowData, setNewRowData] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch(`/api/tables/${table}`);
        const result = await response.json();
        setColumns(result.columns);
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchColumns();
  }, [table]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRowData(prevNewRowData => ({
      ...prevNewRowData,
      [name]: value
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(`/api/tables/${table}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRowData),
      });
      const result = await response.json();
      if (result.success) {
        router.push(`/tables/${table}`);
      } else {
        console.error('Error adding record:', result.error);
      }
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div>
      <h2>Add New Record</h2>
      {columns.map((col) => (
        <div key={col}>
          <label>{col}:</label>
          <input
            name={col}
            value={newRowData[col] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button onClick={() => router.push(`/tables/${table}`)}>Cancel</button>
      <button onClick={handleAdd}>Save</button>
    </div>
  );
}
