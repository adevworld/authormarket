"use client";

import { useState } from "react";

export default function SuccessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

 const handleSubmit = async (e: any) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const res = await fetch("/api/books", {
    method: "POST",
    body: formData,
  });

  const text = await res.text();
  console.log("Raw submit response:", text);

  if (!res.ok) {
    alert("Submission failed. Check PowerShell.");
    return;
  }

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    alert("Server did not return JSON. Check PowerShell.");
    return;
  }

  console.log("Submit response:", data);

  if (data.success) {
    setSubmitted(true);
    alert("Book submitted!");
  } else {
    alert("Submission failed: " + data.error);
  }
};

  const handleImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Submit your book to get featured:</p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Book Title" required />
          <br />
          <br />

          <input name="author" placeholder="Author Name" required />
          <br />
          <br />

          <textarea
          
  name="summary"
  placeholder="Book Summary (140 characters max)"
  required
  maxLength={140}
  style={{ width: 300, height: 100 }}
/><input
  name="buy_link"
  placeholder="Buy Link (Amazon, etc)"
  style={{ width: "100%", padding: 12, marginBottom: 10 }}
/>

<input
  name="author_link"
  placeholder="Author Website"
  style={{ width: "100%", padding: 12, marginBottom: 10 }}
/>
          <br />
          <br />

          <input type="file" name="image" accept="image/*" onChange={handleImage} />
          <br />
          <br />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Book cover preview"
              style={{ width: 200 }}
            />
          )}

          <br />
          <br />

          <button type="submit">Submit Book</button>
        </form>
      ) : (
        <h2>✅ Book Submitted!</h2>
      )}
    </main>
  );
}
