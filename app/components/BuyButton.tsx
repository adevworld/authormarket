"use client";

export default function BuyButton({
  title,
  price,
}: {
  title: string;
  price: number;
}) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
      }),
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
        marginTop: 10,
        width: "100%",
        background: "#facc15",
        border: "none",
        padding: "10px 12px",
        borderRadius: 8,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Buy Now
    </button>
  );
}