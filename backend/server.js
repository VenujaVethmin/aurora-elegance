import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";


import { PrismaClient } from "../prisma/prisma-client";
import passport from "passport";
import { ensureJWTAuth } from "./middleware/jwtAuth.js";
import cloudinaryRoute from "./routes/cloudinary.route.js";

import jwt from "jsonwebtoken";

import "./services/passport.js";

const prisma = new PrismaClient();
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
  })
);

app.use(passport.initialize());

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/token?token=${token}`
    );
  }
);

app.get("/api/me", ensureJWTAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.use("/api/cloudinary",ensureJWTAuth, cloudinaryRoute);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
