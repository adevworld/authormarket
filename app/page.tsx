"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import BuyButton from "./components/BuyButton";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadBooks() {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("ERROR:", error);
      } else {
        setBooks(data || []);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(search.toLowerCase())
  );

  const featuredBooks = filteredBooks.filter((book) => book.featured);
  const regularBooks = filteredBooks.filter((book) => !book.featured);

  function BookCard({ book }: { book: any }) {
    return (
      <div
        key={book.id}
        style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 14,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: 180,
        }}
      >
        <Link
          href={`/book/${book.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {book.image_url && (
            <img
              src={book.image_url}
              alt={book.title}
              style={{
                width: "100%",
                height: 220,
                objectFit: "contain",
                marginBottom: 10,
              }}
            />
          )}

          <h3 style={{ fontSize: 16 }}>{book.title}</h3>

          <Link
  href={`/author/${encodeURIComponent(book.author)}`}
  style={{
    fontSize: 13,
    color: "#2563eb",
    textDecoration: "none",
  }}
>
  {book.author}
</Link>

          <p style={{ fontWeight: "bold", color: "#111" }}>
            ${book.price || "9.99"}
          </p>
        </Link>

        <BuyButton
          title={book.title}
          price={Number(book.price || 9.99)}
        />
      </div>
    );
  }

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
          background: "#111827",
          color: "white",
          padding: "24px 30px",
          borderRadius: 16,
          marginBottom: 30,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 34 }}>Author Market</h1>
        <p style={{ color: "#d1d5db" }}>
          Discover books from independent authors, entrepreneurs, and creators.
        </p>

        <input
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "none",
            width: "100%",
            maxWidth: 300,
          }}
        />
      </div>

      <h2>Featured Books</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 20,
        }}
      >
        {featuredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <h2 style={{ marginTop: 50 }}>All Books</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 20,
        }}
      >
        {regularBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div
  style={{
    marginTop: 80,
    padding: "40px 20px",
    background: "#111827",
    borderRadius: 20,
    color: "white",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: 32,
      marginBottom: 10,
    }}
  >
    Author Marketing Packages
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#d1d5db",
      marginBottom: 40,
    }}
  >
    Grow your brand. Sell more books. Build your audience.
  </p>

  <div
    style={{
      display: "flex",
      gap: 20,
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >

    <div style={{
      background: "white",
      color: "#111",
      padding: 30,
      borderRadius: 16,
      width: 280,
    }}>
      <h3>Starter</h3>
      <h1>$49</h1>
      <p>Basic author profile</p>
      <p>1 featured book</p>
      <p>Social links</p>
    </div>

    <div style={{
      background: "#facc15",
      color: "#111",
      padding: 30,
      borderRadius: 16,
      width: 280,
      transform: "scale(1.05)",
    }}>
      <h3>Professional</h3>
      <h1>$99</h1>
      <p>Featured homepage placement</p>
      <p>Unlimited books</p>
      <p>Author branding page</p>
    </div>

    <div style={{
      background: "white",
      color: "#111",
      padding: 30,
      borderRadius: 16,
      width: 280,
    }}>
      <h3>Enterprise</h3>
      <h1>$299</h1>
      <p>Homepage banner</p>
      <p>Press release feature</p>
      <p>BlackBusinessReview spotlight</p>
    </div>

  </div>
</div>
    </main>
  );
}