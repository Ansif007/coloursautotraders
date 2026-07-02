import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth";
import partsRoutes from "./routes/parts";
import inquiriesRoutes from "./routes/inquiries";
import vehiclesRoutes from "./routes/vehicles";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  cors({
    origin: isProduction ? false : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

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

app.use("/api/auth", authRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/inquiries", inquiriesRoutes);
app.use("/api/vehicles", vehiclesRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

export default app;
