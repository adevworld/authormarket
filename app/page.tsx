"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const res = await fetch("/api/books", { cache: "no-store" });
      const data = await res.json();
      setBooks(data);
    };

    loadBooks();
  }, []);

  return (
  <div style={{ padding: 24 }}>
    <h1>Author Market</h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20,
      }}
    >
      {books.map((book) => (
        <Link key={book.id} href={`/book/${book.id}`}>
          <div
            style={{
              cursor: "pointer",
              background: "white",
              padding: 16,
              borderRadius: 10,
              border: "1px solid #eee",
            }}
          >
            {book.image_url && (
              <img
                src={book.image_url}
                alt={book.title}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                }}
              />
            )}

            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
}