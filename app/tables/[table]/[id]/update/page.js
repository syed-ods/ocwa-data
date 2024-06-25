'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function UpdatePage() {
  const { table, id } = useParams();
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [editRowData, setEditRowData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!table || !id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/tables/${table}/${id}/update`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setColumns(result.columns || []);
        setEditRowData(result.row || {});
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [table, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRowData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/tables/${table}/${id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editRowData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push(`/tables/${table}`);
    } catch (error) {
      console.error('Error updating row data:', error);
      setError(error.message);
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tables/${table}/${id}/delete`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push(`/tables/${table}`);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Record</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {columns.length > 0 ? (
        columns.map(col => (
          <div key={col}>
            <label>{col}:</label>
            <input
              name={col}
              value={editRowData[col] || ''}
              onChange={handleChange}
            />
          </div>
        ))
      ) : (
        <p>No columns available</p>
      )}
      <button onClick={() => router.push(`/tables/${table}`)}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
