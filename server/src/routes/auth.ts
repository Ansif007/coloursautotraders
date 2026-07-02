import { Router } from "express";
import bcrypt from "bcryptjs";
import { getDb } from "../db";
import { signToken, authMiddleware, TOKEN_NAME } from "../auth";

const router = Router();

const ADMIN_PIN_HASH = process.env.ADMIN_PIN_HASH || bcrypt.hashSync("admin123", 10);

router.post("/login", (req, res) => {
  const { pin } = req.body;
  if (!pin || typeof pin !== "string") {
    res.status(400).json({ error: "PIN is required" });
    return;
  }

  if (!bcrypt.compareSync(pin, ADMIN_PIN_HASH)) {
    res.status(401).json({ error: "Invalid PIN" });
    return;
  }

  const token = signToken();
  res.cookie(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 8 * 60 * 60 * 1000,
    path: "/",
  });

  res.json({ ok: true });
});

router.post("/logout", (_req, res) => {
  res.clearCookie(TOKEN_NAME, { path: "/" });
  res.json({ ok: true });
});

router.get("/me", authMiddleware, (_req, res) => {
  res.json({ role: "admin" });
});

export default router;
