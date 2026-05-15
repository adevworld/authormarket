"use client";

export default function BuyButton({
  buyLink,
}: {
  buyLink?: string;
}) {
  return (
    <a
      href={buyLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <button
        style={{
          display: "block",
          marginTop: 10,
          padding: "8px 14px",
          background: "#facc15",
          color: "#111827",
          borderRadius: 8,
          fontWeight: "bold",
          textAlign: "center",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Buy Now
      </button>
    </a>
  );
}