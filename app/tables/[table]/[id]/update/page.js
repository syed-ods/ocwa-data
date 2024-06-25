"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Form from "@/app/components/Form";

let watersamples;

export default function UpdatePage() {
  const { table, id } = useParams();
  const router = useRouter();
  const [columns, setColumns] = useState([]);
  const [editRowData, setEditRowData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  watersamples = table == "watersamples" ? true : false;

  useEffect(() => {
    if (!table || !id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/tables/${table}/${id}/update`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result.row && result.row.sample_date) {
          result.row.sample_date = new Date(result.row.sample_date)
            .toISOString()
            .split("T")[0];
        }

        setColumns(result.columns || []);
        setEditRowData(result.row || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [table, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRowData((prevData) => ({ 
      ...prevData, 
      [name]: value === "" ? null : value 
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const response = await fetch(`/api/tables/${table}/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editRowData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push(`/tables/${table}`);
    } catch (error) {
      console.error("Network error or fetch failed:", error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/tables/${table}/${id}/delete`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push(`/tables/${table}`);
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (watersamples) {
    return (
      <Form
        handleSubmit={handleSave}
        handleChange={handleChange}
        handleCancel={() => router.push(`/tables/${table}`)}
        handleDelete={handleDelete}
        formData={editRowData}
      />
    );
  } else {
    return (
      <div>
        <h2>Edit Record</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSave}>
          {columns.length > 0 ? (
            columns.map((col) => (
              <div key={col}>
                <label>{col}:</label>
                <input
                  name={col}
                  value={editRowData[col] || ""}
                  onChange={handleChange}
                />
              </div>
            ))
          ) : (
            <p>No columns available</p>
          )}
          <button onClick={() => router.push(`/tables/${table}`)}>
            Cancel
          </button>
          <button onClick={handleDelete}>Delete</button>
          <button type="submit" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    );
  }
}
