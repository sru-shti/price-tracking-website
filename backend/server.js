// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import admin from "firebase-admin";
import dotenv from "dotenv"; // For .env
import cron from "node-cron"; // For scheduling
import fs from "fs"; // To read Firebase key file
import priceRoutes from "./routes/priceRoutes.js";
import { checkProductUpdates } from "./controllers/priceController.js";

// ✅ Load environment variables from .env file
dotenv.config();

// ✅ Initialize Firebase Admin securely
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Optional: connect to MongoDB if MONGO_URI is defined
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected ✅"))
    .catch((err) => console.error("MongoDB connection error:", err));
} else {
  console.log("⚠️  MONGO_URI not found in .env — skipping MongoDB connection.");
}

// ✅ Load Gmail credentials (for Nodemailer)
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// ✅ Routes
app.use("/api/prices", priceRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Cron Job — runs every 6 hours
cron.schedule("0 */6 * * *", async () => {
  console.log("🔁 Running scheduled price update check...");
  await checkProductUpdates();
});
