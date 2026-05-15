"use client";

export default function ShareButton({ book }: { book: any }) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/book/${book.id}`
      : "https://www.theauthormarket.com";

  const shareText = `Check out "${book.title}" on The Author Market`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: book.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      window.location.href = `mailto:?subject=${encodeURIComponent(
        book.title
      )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    }
  };

  return (
    <button
      onClick={handleShare}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        background: "#f9fafb",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
        color: "#374151",
        width: "100%",
      }}
    >
      Share
    </button>
  );
}