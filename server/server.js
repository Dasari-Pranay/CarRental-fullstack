import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Initialize Express App
const app = express();

// Connect to Database
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow frontend
  credentials: true // Allow cookies & headers
}));
app.use(express.json());

// Test Route
app.get('/', (req, res) => res.send("🚀 Server is running!"));

// API Routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// For Vercel serverless deployment
export default app;
