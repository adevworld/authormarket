"use client";

export default function ShareButton({ book }: { book: any }) {
  const author = book.author || "";
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/author/${encodeURIComponent(author)}`
      : `https://www.theauthormarket.com/author/${encodeURIComponent(author)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: "#facc15",
        color: "#111827",
        border: "none",
        borderRadius: 8,
        width: 82,
        height: 42,
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
      }}
    >
      Share
    </a>
  );
}