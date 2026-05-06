"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*");

      if (error) {
        console.error("ERROR:", error);
      } else {
        setBooks(data);
      }
    };

    loadBooks();
  }, []);

  return (
  <main
  style={{
    padding: 20,
    maxWidth: 1600,
    margin: "0 auto",
  }}
>
    
    <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 20,
  }}
>
      {books.map((book) => (
  <Link
    key={book.id}
    href={`/book/${book.id}`}
    style={{ textDecoration: "none", color: "inherit", 
    display: "block"
     }}
  >
    <div
  style={{
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 14,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.14)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
  }}
>
      {book.image_url && (
        <img
          src={book.image_url}
          alt={book.title}
          style={{
            width: "100%",
           height: 220,
objectFit: "contain",
background: "#f9fafb",
padding: 10,
            marginBottom: 10,
          }}
        />
      )}

      <h3
  style={{
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 4,
    lineHeight: "1.3",
  }}
>
  {book.title}
</h3>

<p
  style={{
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 6,
  }}
>
  {book.author}
</p>

<p
  style={{
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  }}
>
  ${book.price || "9.99"}
  <button
  style={{
    marginTop: 10,
    width: "100%",
    background: "#facc15",
    border: "none",
    padding: "10px 12px",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  }}
>
  Buy Now
</button>
</p>
    </div>
  </Link>
      ))}
    </div>
  </main>
);
}