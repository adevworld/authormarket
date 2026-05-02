"use client";

export default function BuyButton({ title }: { title: string }) {
  return (
    <button
      style={{
        marginTop: 20,
        padding: "12px 20px",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 16,
      }}
      onClick={() => alert(`Buying ${title}`)}
    >
      Buy Now
    </button>
  );
}