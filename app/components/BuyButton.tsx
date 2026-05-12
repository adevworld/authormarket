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
  window.location.href = buyLink;
  return;
}  
    if (!priceId) {
      alert("No Stripe product connected");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed");
    }
  };

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