"use client";

export default function ShareButton({ book }: { book: any }) {
  const shareBook = () => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/author/${encodeURIComponent(book.author)}`;

    window.prompt("Copy this link and send it by text or email:", url);
  };

  return (
    <button
      type="button"
      onClick={shareBook}
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
      }}
    >
      Share
    </button>
  );
}