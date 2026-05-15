"use client";

export default function ShareButton({ book }: { book: any }) {
  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const baseUrl = window.location.origin;
    const author = book.author || "";
    const url = `${baseUrl}/author/${encodeURIComponent(author)}`;
    const text = `Check out "${book.title}" on The Author Market`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: book.title,
          text,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      alert("Book link copied!");
    } catch {
      window.prompt("Copy this book link:", url);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
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