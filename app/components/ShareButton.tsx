"use client";

export default function ShareButton({ book }: { book: any }) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/book/${book.id}`
      : "https://www.theauthormarket.com";

  const message = `Check out "${book.title}" on The Author Market: ${shareUrl}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(message);
    alert("Book link copied. You can paste it in text, email, or social media.");
  };

  return (
    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
      <button
        onClick={copyLink}
        style={{
          flex: 1,
          textAlign: "center",
          padding: "7px 8px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          background: "#f9fafb",
          color: "#374151",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Copy Link TEST 123
      </button>

      <a
        href={`mailto:?subject=${encodeURIComponent(book.title)}&body=${encodeURIComponent(message)}`}
        style={{
          flex: 1,
          textAlign: "center",
          padding: "7px 8px",
          borderRadius: 8,
          border: "1px solid #d1d5db",
          background: "#f9fafb",
          color: "#374151",
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Email
      </a>
    </div>
  );
}