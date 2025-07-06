import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Initialize Express App
const app = express();

// Connect Database
await connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend
  credentials: true               // Allow cookies & headers
}));
app.use(express.json());

// Test Route
app.get('/', (req, res) => res.send("Server is running 🚀"));

// Routers
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// Start Server
// At the very end of server.js
export default app;


