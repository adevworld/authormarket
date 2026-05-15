"use client";

export default function BuyButton({
 title,
price,
priceId,
buyLink,
}: {
  title: string;
  price: number;
  priceId?: string;
  buyLink?: string;
}) {

  const handleCheckout = async () => {
  if (buyLink) {
    window.open(buyLink, "_blank");
    return;
  }

  alert("No payment link connected");
}

return (
  <button
    onClick={handleCheckout}
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
);
}