"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", minHeight: "100vh", placeItems: "center", textAlign: "center", background: "#0B132B", color: "#fff", margin: 0, padding: 24 }}>
        <div>
          <h1 style={{ fontSize: 32, margin: 0 }}>Something went wrong</h1>
          <p style={{ opacity: 0.75 }}>The site could not load its content. Please try again in a moment.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ marginTop: 16, padding: "12px 28px", borderRadius: 999, border: 0, background: "#39FF88", color: "#0B132B", fontWeight: 600, fontSize: 16, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}