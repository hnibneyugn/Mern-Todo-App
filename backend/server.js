import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import "dotenv/config";

import todoRoutes from "./routes/todo.route.js";
import connectDB from "./config/database.js";

// fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(cors());

// ===== API ROUTES =====
app.use("/api/todos", todoRoutes);

// ===== SERVE FRONTEND (PRODUCTION) =====
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
