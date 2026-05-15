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
        padding: "8px 10px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        background: "#ffffff",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 12,
        color: "#374151",
      }}
    >
      Copy Link
    </button>
  );
}