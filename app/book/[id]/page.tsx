import BuyButton from "@/app/components/BuyButton";
const books = [
  {
    id: 1,
    title: "Scrum Master Book",
    author: "Alexis Coates",
    image_url: "/IMG_1681.jpeg",
    summary: "A practical guide for Scrum Masters and Agile teams.",
    price: "$9.99",
  },
  {
    id: 2,
    title: "51 Golf Tips",
    author: "Alexis Coates",
    image_url: "/IMG_1682.jpeg",
    summary: "Simple golf tips to improve your game.",
    price: "$9.99",
  },
  {
    id: 3,
    title: "51 Agile Ideas",
    author: "Alexis Coates",
    image_url: "/IMG_1683.jpeg",
    summary: "Proven Agile ideas for project success.",
    price: "$9.99",
  },
];
export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  

  const book = books.find((b: any) => String(b.id).trim() === String(id).trim());

  if (!book) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Book not found</h1>
        <p>URL ID: {id}</p>
        <p>Available IDs: {books.map((b: any) => String(b.id)).join(", ")}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1>{book.title}</h1>

      <img
        src={book.image_url}
        alt={book.title}
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 10,
          marginTop: 20,
        }}
      />

      <p style={{ marginTop: 20, fontSize: 18 }}>{book.summary}</p>

     <p style={{ marginTop: 10, fontWeight: "bold" }}>
  {book.price}
</p>

<BuyButton title={book.title} />

      
    </main>
  );
}