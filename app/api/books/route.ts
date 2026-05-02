import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const image = formData.get("image") as File | null;
    let imageUrl = "";

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("book-covers")
        .upload(fileName, buffer, {
          contentType: image.type,
        });

      if (uploadError) {
        return Response.json({ success: false, error: uploadError.message });
      }

      const { data } = supabase.storage
        .from("book-covers")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("books").insert([
      {
  title: formData.get("title"),
  author: formData.get("author"),
  summary: formData.get("summary"),
  image_url: imageUrl,
  buy_link: formData.get("buy_link"),
  author_link: formData.get("author_link"),
  featured: false,
},
    ]);

    if (error) {
      return Response.json({ success: false, error: error.message });
    }

    return Response.json({ success: true });

  } catch (err: any) {
    return Response.json({
      success: false,
      error: err.message || "Server error",
    });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    return Response.json([]);
  }

  return Response.json(data || []);
}