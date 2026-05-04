import Link from "next/link";

const books = [
  {
    id: 1,
    title: "Scrum Master Book",
    author: "Alexis Coates",
    image_url: "/IMG_1681.jpeg",
    summary: "A practical guide for Scrum Masters and Agile teams.",
  },
  {
    id: 2,
    title: "51 Golf Tips",
    author: "Alexis Coates",
    image_url: "/IMG_1682.jpeg",
    summary: "Simple golf tips to improve your game.",
  },
  {
    id: 3,
    title: "51 Agile Ideas",
    author: "Alexis Coates",
    image_url: "/IMG_1683.jpeg",
    summary: "Proven Agile ideas for project success.",
  },
];

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const authorName = decodeURIComponent(name);

  const authorBooks = books.filter(
    (book) =>
      book.author.toLowerCase().trim() === authorName.toLowerCase().trim()
  );
console.log("AUTHOR NAME:", authorName);
console.log("AUTHOR BOOKS:", authorBooks);
  return (
    <main
  style={{
    padding: "40px 20px",
    background: "#f3f4f6",
    minHeight: "100vh",
  }}
>
  <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Link href="/" style={{ color: "#2563eb" }}>
        ← Back to Home
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 24 }}>
  <img
    src="/founder.jpg"
    alt={authorName}
    style={{
      width: 120,
      height: 120,
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #facc15",
    }}
  />

  <div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <h1 style={{ margin: 0 }}>{authorName}</h1>

  <span
    style={{
      background: "#facc15",
      color: "#111827",
      padding: "5px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: "bold",
    }}
  >
    ⭐ Featured Author
  </span>
</div>
    <p style={{ color: "#666", marginTop: 6 }}>
      Author • Entrepreneur • Thought Leader
    </p>
  </div>
</div> 
<p style={{ marginTop: 20, maxWidth: 600, lineHeight: 1.6 }}>
  {authorName} is an author focused on business, growth, and strategy.
  Their work helps readers think differently and take action.
</p>
<div style={{ marginTop: 15, display: "flex", gap: 15 }}>
  <a
    href="https://yourwebsite.com"
    target="_blank"
    style={{ color: "#2563eb", fontWeight: 500 }}
  >
    🌐 Website
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    style={{ color: "#2563eb", fontWeight: 500 }}
  >
    💼 LinkedIn
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    style={{ color: "#2563eb", fontWeight: 500 }}
  >
    📸 Instagram
  </a>
</div>
      <p style={{ color: "#666" }}>
        Author profile and book collection.
      </p>

      <h2 style={{ marginTop: 30 }}>Books by {authorName}</h2>
<h2 style={{ marginTop: 30 }}>
  Books by {authorName}
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 24,
    marginTop: 20,
  }}
>
  {authorBooks.map((book) => (
  <Link
    href={`/book/${book.id}`}
    key={book.id}
    style={{
      textDecoration: "none",
      color: "inherit",
      display: "block",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
        borderRadius: 8,
        padding: 12,
        cursor: "pointer",
      }}
    >
      <img
        src={book.image_url}
        alt={book.title}
        style={{
          width: "100%",
          height: 220,
          objectFit: "contain",
        }}
      />

      <h3>{book.title}</h3>
      <p style={{ color: "#666" }}>{book.summary}</p>
    </div>
  </Link>
))}
</div>
    </div>
  </main>
);
}