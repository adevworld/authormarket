"use client";

export default function ShareButton({ book }: any) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/book/${book.id}`
      : "";

  const shareText = `Check out "${book.title}" on The Author Market: ${shareUrl}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: book.title,
        text: `Check out "${book.title}" on The Author Market`,
        url: shareUrl,
      });
    } else {
      window.location.href = `mailto:?subject=${encodeURIComponent(
        book.title
      )}&body=${encodeURIComponent(shareText)}`;
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-100"
    >
      Share Book
    </button>
  );
}