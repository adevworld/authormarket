export default function SuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 40,
          borderRadius: 12,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1>Payment Successful ✅</h1>

        <p style={{ marginTop: 10 }}>
          Thank you for supporting independent authors.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "12px 20px",
            background: "#111827",
            color: "white",
            textDecoration: "none",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Back to Store
        </a>
      </div>
    </main>
  );
}