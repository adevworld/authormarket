"use client";

export default function ShareButton({ book }: { book: any }) {
  const getBookUrl = () => {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://www.theauthormarket.com";

    return `${baseUrl}/book/${book.id}`;
  };

  const copyLink = async () => {
    const url = getBookUrl();

    try {
      await navigator.clipboard.writeText(url);
      alert("Book link copied!");
    } catch {
      prompt("Copy this book link:", url);
    }
  };

  return (
    <button
      type="button"
      onClick={copyLink}
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
        textAlign: "center",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
      }}
    >
      Share
    </button>
  );
}