"use client";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
 const [selectedCategory, setSelectedCategory] = useState("All"); 
 const categories = [
  "All",
  "Featured Authors",
  "Business",
  "Self Publishing",
  "Entrepreneurship",
  "Book Marketing",
];

const filteredBooks = books;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [output, setOutput] = useState("Your AI response will appear here.");
  const [loading, setLoading] = useState(false);
const [allBooks, setAllBooks] = useState<any[]>([]);
  const loadBooks = async () => {
    
    const res = await fetch("/api/books", { cache: "no-store" });
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const checkout = async (price: number) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    });

    const data = await res.json();

    if (data.url) {
      window.open(data.url, "_blank");
    } else {
      alert("Checkout error. Check terminal.");
    }
  };

  const generate = async () => {
    setLoading(true);
    setOutput("Generating...");

    try {
      const res = await fetch("/api/ai/book-promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, summary }),
      });

      const data = await res.json();
      setOutput(data.result || "No result came back.");
    } catch {
      setOutput("AI Book Booster error. Check terminal.");
    }

    setLoading(false);
  };

  return (
    <main style={{ background: "#f3f4f6", minHeight: "100vh", fontFamily: "Arial" }}>
      {/* HEADER */}
      <header
        style={{
          background: "#111827",
          color: "white",
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 26 }}>📚 Author Market</h1>

        <input
          placeholder="Search books, authors, topics..."
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 6,
            border: "none",
            fontSize: 15,
          }}
        />

        <button
          onClick={() => checkout(19900)}
          style={{
            background: "#facc15",
            border: "none",
            padding: "12px 18px",
            borderRadius: 6,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sell Your Book
        </button>
      </header>
<div style={{ display: "flex", gap: 10, padding: "10px 40px", background: "#111827" }}>
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      style={{
        background: selectedCategory === category ? "#facc15" : "transparent",
        color: selectedCategory === category ? "#111827" : "white",
        border: "none",
        padding: "10px 14px",
        cursor: "pointer",
        fontWeight: 600,
        borderRadius: 6,
      }}
    >
      {category}
    </button>
  ))}
</div>
      

      {/* HERO */}
      <section
        style={{
          margin: 40,
          padding: 40,
          borderRadius: 14,
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: 44, marginBottom: 10 }}>
          Get Your Book Featured.
        </h2>
        <p style={{ fontSize: 19, color: "#cbd5e1", maxWidth: 720 }}>
          Author Market helps authors get discovered, promoted, and positioned in front of readers who care about business, legacy, leadership, and growth.
        </p>

        <button
          onClick={() => checkout(49700)}
          style={{
            marginTop: 20,
            background: "#22c55e",
            color: "black",
            border: "none",
            padding: "14px 22px",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Get Featured Today
        </button>
      </section>

     {/* BOOK OF THE MONTH */}
<section style={{ padding: "40px", background: "#111827", color: "white" }}>
  <h2 style={{ fontSize: 28, marginBottom: 20 }}>
    🏆 Book of the Month
  </h2>

  {books
    .filter((b) => b.book_of_month)
    .slice(0, 1)
    .map((book) => (
      <div
        key={book.id}
        style={{
          display: "flex",
          gap: 30,
          alignItems: "center",
          background: "#1f2937",
          padding: 30,
          borderRadius: 12,
        }}
      >
        {book.image_url && (
          <img
            src={book.image_url}
            alt={book.title}
            style={{ width: 150, borderRadius: 8 }}
          />
        )}

        <div>
          <h3 style={{ fontSize: 22 }}>{book.title}</h3>
          <p style={{ color: "#9ca3af" }}>by {book.author}</p>

          <Link href={`/book/${book.id}`}>
  <button style={{ marginTop: 10 }}>
    Buy Book
  </button>
</Link>
        </div>
      </div>
    ))}
</section>
      {/* PRICING */}
      <section style={{ padding: "0 40px 30px" }}>
        <h2 style={{ color: "#111827" }}>Choose Your Author Package</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              price: "$199",
              title: "Author Listing",
              text: "List your book in the marketplace.",
              amount: 19900,
            },
            {
              price: "$497",
              title: "Featured Author",
              text: "Get homepage visibility and featured placement.",
              amount: 49700,
            },
            {
              price: "$997",
              title: "Book of the Month",
              text: "Premium spotlight placement for serious authors.",
              amount: 99700,
            },
          ].map((pkg) => (
            <div
              key={pkg.title}
              style={{
                background: "white",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: 30, margin: 0 }}>{pkg.price}</h3>
              <h4>{pkg.title}</h4>
              <p style={{ color: "#4b5563" }}>{pkg.text}</p>
              <button
                onClick={() => checkout(pkg.amount)}
                style={{
                  background: "#facc15",
                  border: "none",
                  padding: "12px 16px",
                  borderRadius: 8,
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Buy {pkg.title}
              </button>
            </div>
          ))}
        </div>
      </section>


      {/* BOOK GRID */}
      <section style={{ padding: "20px 40px" }}>
        <h2 style={{ color: "#111827" }}>🔥 Featured Books</h2>

        {books.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No featured books yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            <div
            {filteredBooks.slice(0, 6).map((book) => (
  <Link key={book.id} href={`/book/${book.id}`}>
    <div
      style={{
        cursor: "pointer",
        background: "white",
        padding: 18,
        borderRadius: 12,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      {book.image_url && (
        <img
          src={book.image_url}
          alt={book.title}
          style={{
            width: "100%",
            height: 260,
            objectFit: "contain",
            background: "#f9fafb",
            borderRadius: 8,
            marginBottom: 12,
            padding: 8,
          }}
        />
      )}

      <h3>{book.title}</h3>
      <p>{book.summary}</p>
    </div>
  </Link>
))}
      </section>

      {/* AI TOOL */}
 
      <p style={{ fontSize: 12, color: "#666" }}>
        by {book.author}
      </p>
    </div>
  </Link>
))}
  
</section>
      <section
        style={{
          margin: 40,
          padding: 30,
          background: "#111827",
          color: "white",
          borderRadius: 14,
        }}
      >
        <h2>🤖 AI Book Booster</h2>
        <p style={{ color: "#cbd5e1" }}>
          Generate a quick promotional blurb for your book.
        </p>

        <div style={{ maxWidth: 520 }}>
          <input
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 12, marginBottom: 10 }}
          />

          <input
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: "100%", padding: 12, marginBottom: 10 }}
          />

          <textarea
            placeholder="Book Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={140}
            style={{ width: "100%", padding: 12, minHeight: 100, marginBottom: 10 }}
          />

          <button
            onClick={generate}
            style={{
              background: "#22c55e",
              color: "black",
              border: "none",
              padding: 14,
              borderRadius: 8,
              width: "100%",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Generating..." : "Generate Promo"}
          </button>
        </div>

        <pre
          style={{
            marginTop: 20,
            background: "#020617",
            padding: 20,
            color: "#22c55e",
            whiteSpace: "pre-wrap",
            borderRadius: 8,
          }}
        >
          {output}
        </pre>
      </section>
    </main>
  );
}