import styles from "./EditModal.module.css";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../../api/bookApi";

export default function EditModal({ book, onClose }) {
  const [form, setForm] = useState({
    page: "",
    ayah: "",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (book) {
      setForm({
        page: book.page || "",
        ayah: book.ayah || "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 React Query Update Mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ id, data }) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]); // refresh Home list
      onClose(); // close modal
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      id: book._id,
      data: form,
    });
  };

  if (!book) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Edit Book</h2>

        {isError && (
          <p className={styles.error}>
            {error?.response?.data?.message || "Update failed"}
          </p>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Book Name</label>
          <input
            type="text"
            value={book.book}
            className={`${styles.input} ${styles.disabledField}`}
            disabled
          />

          <label className={styles.label}>Page Number</label>
          <input
            type="number"
            name="page"
            value={form.page}
            onChange={handleChange}
            className={styles.input}
          />

          {book?.ayah && (
            <>
              <label className={styles.label}>Ayah</label>
              <input
                type="number"
                name="ayah"
                value={form.ayah}
                onChange={handleChange}
                className={styles.input}
              />
            </>
          )}

          <button className={styles.btn} type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </button>

          <button type="button" className={styles.closeBtn} onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
