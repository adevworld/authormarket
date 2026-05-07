import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = String(formData.get("title") || "");
    const author = String(formData.get("author") || "");
    const summary = String(formData.get("summary") || "");
    const image_url = String(formData.get("image_url") || "");
    const price = Number(formData.get("price") || 9.99);
    const download_url = String(formData.get("download_url") || "");
    const featured = formData.get("featured") === "on";

    const { data, error } = await supabase
      .from("books")
      .insert([
        {
          title,
          author,
          summary,
          image_url,
          price,
          download_url,
          featured,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}