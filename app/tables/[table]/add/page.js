"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Form from "@/app/components/Form";

let watersamples;

export default function AddPage() {
  const router = useRouter();
  const { table } = useParams();
  const [newRowData, setNewRowData] = useState({});
  const [columns, setColumns] = useState([]);

  watersamples = table == "watersamples" ? true : false;

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch(`/api/tables/${table}`);
        const result = await response.json();
        setColumns(result.columns);
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };

    fetchColumns();
  }, [table]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevNewRowData) => ({
      ...prevNewRowData,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const response = await fetch(`/api/tables/${table}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRowData),
      });
      const result = await response.json();
      if (result.success) {
        if (table === 'products') {
          const { title, product_id } = result.data;
          const notificationMessage = `${title} with id ${product_id} added to the product list`;
          await fetch(`/api/notifications`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: notificationMessage }),
          });
        }
        router.push(`/tables/${table}`);
      } else {
        console.error("Error adding record:", result.error);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  if (watersamples) {
    return (
      <Form
        handleSubmit={handleAdd}
        handleChange={handleChange}
        handleCancel={() => router.push(`/tables/${table}`)}
        formData={newRowData}
      />
    );
  } else {
    return (
      <div>
        <h2>Add New Record</h2>
        <form onSubmit={handleAdd}>
          {columns.map((col) => (
            <div key={col}>
              <label>{col}:</label>
              <input
                name={col}
                value={newRowData[col] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="crud-buttons">
            <button
              type="button"
              onClick={() => router.push(`/tables/${table}`)}
            >
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}