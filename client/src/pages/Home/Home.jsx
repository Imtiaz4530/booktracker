import { useQuery } from "@tanstack/react-query";

import styles from "./Home.module.css";
import { getBooks } from "../../api/bookApi";
import EditModal from "../../components/EditModal/EditModal";
import { useContext, useState } from "react";
import Loading from "../../components/loading/Loading";
import { AuthContext } from "../../context/AuthContext";
import NotFound from "../../components/NotFound/NotFound";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const { token } = useContext(AuthContext);

  if (!token) {
    return <NotFound title="Please log in to view your books." />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className={styles.error}>
        {error?.response?.data?.message || "Failed to load books"}
      </p>
    );
  }

  const books = data || [];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Your Reading Progress</h1>

      <div className={styles.grid}>
        {books.length === 0 ? (
          <NotFound title="No books found. Add one!" />
        ) : (
          books.map((item) => (
            <div
              key={item._id}
              className={`${styles.card} ${
                item.completed ? styles.completed : ""
              }`}
              onClick={() => setSelectedBook(item)}
            >
              <h2 className={styles.title}>{item.name}</h2>

              <div className={styles.details}>
                <p className={styles.page}>
                  Page: <span>{item.page}</span>
                </p>

                {item.ayah && (
                  <p className={styles.ayah}>
                    Ayah: <span>{item.ayah}</span>
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <EditModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
