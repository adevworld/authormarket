"use client";

export default function BuyButton({
  buyLink,
}: {
  buyLink?: string;
}) {

  const handleCheckout = async () => {
  if (buyLink) {
    window.location.href = buyLink;
    return;
  }

  alert("No payment link connected");
}

return (
  <a href={buyLink || "#"} style={{ textDecoration: "none" }}>
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