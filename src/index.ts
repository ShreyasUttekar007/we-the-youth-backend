import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import apiRoutes from "./routes/api";

// ✅ Ensure .env is always loaded from project root (works in src/, dist/, ts-node, or node)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const port = process.env.PORT || 5000;

// ✅ Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());

// ✅ MongoDB connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Basic health check route
app.get("/", (req, res) => {
  res.send("✅ Hello from We The Youth backend! Server is up and running 🚀");
});

// ✅ API routes
app.use("/api", apiRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌍 CORS Origin: ${process.env.CORS_ORIGIN || "all origins"}`);
  console.log(
    `📧 SendGrid Key Loaded: ${
      process.env.SENDGRID_API_KEY ? "✅" : "❌ MISSING"
    }`
  );
});
