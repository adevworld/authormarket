"use client";

export default function ShareButton({ book }: { book: any }) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/book/${book.id}`
      : "https://www.theauthormarket.com";

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Book link copied!");
  };

  return (
  <button
    onClick={copyLink}
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #d1d5db",
      background: "#ffffff",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 13,
      color: "#374151",
      minWidth: 90,
      height: 44,
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    }}
  >
    🔗 Copy Link
  </button>
);
}