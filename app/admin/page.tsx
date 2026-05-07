"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
const [message, setMessage] = useState("");

async function handleSubmit(e: any) {
e.preventDefault();

const form = e.target;
const formData = new FormData(form);

const imageFile = formData.get("image_file") as File;
const authorImageFile = formData.get("author_image_file") as File;

let imageUrl = "";
let authorImageUrl = "";

// =========================
// BOOK COVER UPLOAD
// =========================
if (imageFile && imageFile.size > 0) {
const fileName = `${Date.now()}-${imageFile.name}`;

const { error: uploadError } = await supabase.storage
.from("authors")
.upload(fileName, imageFile);

if (uploadError) {
setMessage("❌ Book image upload failed: " + uploadError.message);
return;
}

const { data } = supabase.storage
.from("authors")
.getPublicUrl(fileName);

imageUrl = data.publicUrl;
}

// =========================
// AUTHOR PHOTO UPLOAD
// =========================
if (authorImageFile && authorImageFile.size > 0) {
const authorFileName = `${Date.now()}-${authorImageFile.name}`;

const { error: authorUploadError } = await supabase.storage
.from("authors")
.upload(authorFileName, authorImageFile);

if (authorUploadError) {
setMessage(
"❌ Author image upload failed: " +
authorUploadError.message
);
return;
}

const { data: authorData } = supabase.storage
.from("authors")
.getPublicUrl(authorFileName);

authorImageUrl = authorData.publicUrl;
}

// =========================
// APPEND URLS
// =========================
formData.delete("image_file");
formData.delete("author_image_file");

formData.append("image_url", imageUrl);
formData.append("author_image_url", authorImageUrl);

// =========================
// SEND TO API
// =========================
const res = await fetch("/api/books", {
method: "POST",
body: formData,
});

const data = await res.json();

if (data.success) {
setMessage("✅ Book Added Successfully");
form.reset();
} else {
setMessage("❌ " + data.error);
}
}

return (
<main
style={{
maxWidth: 700,
margin: "40px auto",
padding: 20,
fontFamily: "Arial",
}}
>
<h1>Author Market Admin</h1>

<form
onSubmit={handleSubmit}
style={{
display: "flex",
flexDirection: "column",
gap: 12,
}}
>
<input
name="title"
placeholder="Book Title"
required
/>

<input
name="author"
placeholder="Author Name"
required
/>

<textarea
name="summary"
placeholder="Book Summary"
required
/>

<label>Book Cover</label>
<input
type="file"
name="image_file"
accept="image/*"
required
/>

<label>Author Headshot</label>
<input
type="file"
name="author_image_file"
accept="image/*"
/>

<input
name="buy_link"
placeholder="Amazon or Buy Link"
/>

<input
name="author_link"
placeholder="Author Website"
/>

<input
name="download_url"
placeholder="PDF Download URL"
/>

<input
name="price"
type="number"
step="0.01"
placeholder="Price"
/>

<label>
<input
type="checkbox"
name="featured"
/>
Featured Book
</label>

<button type="submit">
Add Book
</button>
</form>

<p>{message}</p>
</main>
);
}
