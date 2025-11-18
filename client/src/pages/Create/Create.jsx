import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import styles from "./Create.module.css";
import { createBook } from "../../api/bookApi";

export default function Create() {
  const bookOptions = [
    "Al Quran",
    "Ar-Raheeq Al-Makhtum",
    "প্রোডাক্টিভ মুসলিম",
  ];

  const [form, setForm] = useState({
    name: "",
    page: "",
    ayah: "",
  });

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      setForm({ name: "", page: "", ayah: "" });
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Add New Book</h2>

        {isError && (
          <p className={styles.error}>
            {error?.response?.data?.message || "Something went wrong"}
          </p>
        )}

        <label className={styles.label}>Book Name</label>
        <select
          name="name"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="">Select a book</option>
          {bookOptions.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>

        <label className={styles.label}>Page Number</label>
        <input
          type="number"
          name="page"
          value={form.page}
          onChange={handleChange}
          className={styles.input}
          placeholder="Last page number"
          required
          inputMode="numeric"
          pattern="[0-9]*"
        />

        <label className={styles.label}>Ayah (Optional)</label>
        <input
          type="number"
          name="ayah"
          value={form.ayah}
          onChange={handleChange}
          className={styles.input}
          placeholder="Ayah number (for Quran)"
          inputMode="numeric"
          pattern="[0-9]*"
        />

        <button type="submit" className={styles.btn} disabled={isPending}>
          {isPending ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
