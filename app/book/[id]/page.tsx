import BuyButton from "@/app/components/BuyButton";
import { supabase } from "@/app/lib/supabase";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (!book || error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Book not found</h1>
        <p>URL ID: {id}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1>{book.title}</h1>
      {book.image_url && (
  <img
    src={book.image_url}
    alt={book.title}
    style={{
      width: 300,
      height: 420,
      objectFit: "cover",
      marginBottom: 20,
    }}
  />
)}
      <p>{book.summary}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ${book.price ?? "N/A"}</p>

      {book.buy_link && (
        <a href={book.buy_link} target="_blank">
          <button>Buy Now</button>
        </a>
      )}
    </main>
  );
}