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
        width: "78px",
        height: "44px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        background: "#ffffff",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 12,
        color: "#374151",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1.1,
        textAlign: "center",
      }}
    >
      Copy Link
    </button>
  );
}