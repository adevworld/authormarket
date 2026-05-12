import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import BuyButton from "@/app/components/BuyButton";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const authorName = decodeURIComponent(name);
const { data: authorBooks } = await supabase
  .from("books")
  .select("*")
  .ilike("author", authorName);
  return (
    <main
      style={{
        padding: "40px 20px",
        background: "#f3f4f6",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 30,
            background: "white",
            padding: 25,
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <img
src={
authorBooks?.find((b) => b.author_image_url)
?.author_image_url || "/founder.jpg"
}
alt={authorName}
style={{
width: 120,
height: 120,
borderRadius: "50%",
objectFit: "cover",
border: "4px solid #facc15",
}}
/>


          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <h1 style={{ margin: 0 }}>
                {authorName}
              </h1>

              <span
                style={{
                  background: "#facc15",
                  color: "#111827",
                  padding: "5px 10px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Featured Author
              </span>
            </div>

            <p
              style={{
                color: "#666",
                marginTop: 8,
              }}
            >
              Author • Entrepreneur • Thought Leader
            </p>

            <p
              style={{
                marginTop: 15,
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
              {authorName} is an author focused on business,
              growth, leadership, and strategy.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
<a href={authorBooks?.[0]?.author_link || "#"} target="_blank">
Website
</a>

<a href="#" target="_blank">
LinkedIn
</a>

<a href="#" target="_blank">
Instagram
</a>
</div>

          </div>
        </div>

        <h2
                  style={{
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          Books by {authorName}
        </h2>
        <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 20,
  }}
>
  {authorBooks?.map((book) => (
<div
key={book.id}
style={{
width: 180,
background: "white",
border: "1px solid #e5e7eb",
borderRadius: 12,
padding: 14,
boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
}}
>
<Link
href={`/book/${book.id}`}
style={{
textDecoration: "none",
color: "inherit",
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

<h3 style={{ fontSize: 15 }}>
{book.title}
</h3>
</Link>

<p style={{ fontWeight: "bold" }}>
${book.price || "9.99"}
</p>

<BuyButton
  title={book.title}
  price={Number(book.price || 9.99)}
  priceId={book.stripe_price_id}
  buyLink={book.buy_link}
/>
</div>
))}
</div>
      </div>
    </main>
  );
}