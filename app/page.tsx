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

      <BuyButton title={book.title} price={Number(book.price || 9.99)} />
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
  const { data: books } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  const featuredBooks = books?.filter((book) => book.featured) || [];
  const regularBooks = books?.filter((book) => !book.featured) || [];

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#111827",
          color: "white",
          padding: 40,
          borderRadius: 16,
          marginBottom: 40,
        }}
      >
        <h1>Author Market</h1>
        <p>Discover books from independent authors, entrepreneurs, and creators.</p>
        <p style={{ color: "#d1d5db" }}>Search books...</p>
      </div>

      <h2>Featured Books</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 60,
        }}
      >
        {featuredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <h2>All Books</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 80,
        }}
      >
        {regularBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div
        style={{
          marginTop: 80,
          padding: "40px 20px",
          background: "#111827",
          borderRadius: 20,
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: 32, marginBottom: 10 }}>
          Author Marketing Packages
        </h2>

        <p style={{ textAlign: "center", color: "#d1d5db", marginBottom: 40 }}>
          Grow your brand. Sell more books. Build your audience.
        </p>

        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <PackageCard
  title="Launch"
  price="$49"
  buttonText="Get Started"
  buttonLink="https://buy.stripe.com/4gM9AT3S7bQN44Rb50bV600"
  features={[
    "Author profile page",
    "1 featured book",
    "Social media links",
    "Marketplace listing",
    "Email support",
  ]}
/>

          <PackageCard
  title="Authority"
  price="$99"
  buttonText="Get Started"
  buttonLink="https://buy.stripe.com/9B64gz3S7aMJ7h32yubV601"
  featured
  features={[
    "Featured homepage placement",
    "Up to 6 books",
    "Premium author branding",
    "Featured Author badge",
    "Priority placement",
  ]}
/>

          <PackageCard
  title="Legacy"
  price="$299"
  buttonText="Get Started"
  buttonLink="https://buy.stripe.com/6oU9ATgET5sp0SF7SObV602"
  features={[
    "BlackBusinessReview spotlight",
    "Homepage banner feature",
    "Press release article",
    "Up to 12 books",
    "Social media promotion",
    "Premium media branding",
  ]}
/>
        </div>

        <p style={{ textAlign: "center", marginTop: 25, color: "#d1d5db" }}>
          Limited featured homepage placements available each month.
        </p>
      </div>
    </main>
  );
}