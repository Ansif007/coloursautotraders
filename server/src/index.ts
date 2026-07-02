import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import path from "path";

import authRoutes from "./routes/auth";
import partsRoutes from "./routes/parts";
import inquiriesRoutes from "./routes/inquiries";
import { seed } from "./seed";

const PORT = parseInt(process.env.PORT || "3001", 10);
const isProduction = process.env.NODE_ENV === "production";

const app = express();

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS — allow Vite dev server
app.use(
  cors({
    origin: isProduction ? false : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "2mb" }));

// Cookie parsing
app.use(cookieParser());

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts — try again later." },
});
app.use("/api/auth/login", authLimiter);

const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many inquiries — try again later." },
});
app.use("/api/inquiries", inquiryLimiter);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/inquiries", inquiriesRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// In production, serve the built frontend
if (isProduction) {
  const distPath = path.resolve(import.meta.dirname, "..", "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Start server
seed();

app.listen(PORT, () => {
  console.log(`Colours Auto Traders API running on http://localhost:${PORT}`);
  if (!isProduction) {
    console.log(`Dev mode — frontend at http://localhost:5173`);
  }
});
