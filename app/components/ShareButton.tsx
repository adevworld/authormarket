"use client";

export default function ShareButton({ book }: { book: any }) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/book/${book.id}`
      : "https://www.theauthormarket.com";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Book link copied!");
    } catch {
      window.prompt("Copy this book link:", shareUrl);
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
  padding: "8px 12px",
  fontWeight: 700,
  fontSize: 12,
  cursor: "pointer",
  minWidth: 78,
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
}}
    >
      Share
    </button>
  );
}