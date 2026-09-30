import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contact.js";

const app = express();

// Render (and most hosts) put a reverse proxy in front of the app. Trust the
// first proxy so req.ip is the real visitor IP, which the contact-form rate
// limiter relies on. Without this, every visitor shares one rate-limit bucket.
app.set("trust proxy", 1);

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/contact", contactRoutes);

// Fallback 404 for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found." });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  // Bind explicitly to 0.0.0.0 (all IPv4 interfaces). On some Windows +
  // Node setups, "localhost" resolves to the IPv6 address (::1) on the
  // client side while the server only listens on IPv4, causing the dev
  // proxy to get an ECONNRESET instead of connecting. Binding explicitly
  // avoids that mismatch.
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
});