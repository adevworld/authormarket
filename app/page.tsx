import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import BuyButton from "./components/BuyButton";

function BookCard({ book }: { book: any }) {
  return (
    <div
      style={{
        width: 180,
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 14,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {book.image_url && (
        <img
          src={book.image_url}
          alt={book.title}
          style={{
            width: "100%",
            height: 220,
            objectFit: "contain",
            marginBottom: 10,
          }}
        />
      )}

      <h3 style={{ fontSize: 16 }}>{book.title}</h3>

      <Link
        href={`/author/${encodeURIComponent(book.author)}`}
        style={{
          fontSize: 13,
          color: "#2563eb",
          textDecoration: "none",
        }}
      >
        {book.author}
      </Link>

      <p style={{ fontWeight: "bold" }}>${book.price || "9.99"}</p>

      <BuyButton
  title={book.title}
  price={Number(book.price || 9.99)}
  priceId={book.stripe_price_id}
/>
    </div>
  );
}

function PackageCard({
  title,
  price,
  features,
  featured = false,
  buttonText,
  buttonLink,
}: {
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div
      style={{
        background: featured ? "#facc15" : "white",
        color: "#111",
        padding: 30,
        borderRadius: 16,
        width: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: featured ? "scale(1.05)" : "none",
        minHeight: 450,
alignItems: "stretch",
lineHeight: 1.8,
      }}
    >
      <div>
        {featured && (
          <p style={{ fontWeight: "bold", marginBottom: 10 }}>MOST POPULAR</p>
        )}

        <h3>{title}</h3>
        <h1>{price}</h1>

        {features.map((feature) => (
          <p key={feature}>{feature}</p>
        ))}

       <a
  href={buttonLink}
  target="_blank"
  style={{ textDecoration: "none" }}
>
  <button
    style={{
      marginTop: 15,
      background: featured ? "#111827" : "#facc15",
      color: featured ? "white" : "#111",
      border: "none",
      padding: "10px 16px",
      borderRadius: 8,
      fontWeight: "bold",
      cursor: "pointer",
      width: "100%",
    }}
  >
    {buttonText}
  </button>
</a> 
      </div>

     
    </div>
  );
}

export default async function Home() {
  const { data: books, error } = await supabase
  .from("books")
  .select("*");

console.log("BOOKS:", books);
console.log("ERROR:", error);

return (
  <pre>{JSON.stringify({ books, error }, null, 2)}</pre>
);
}