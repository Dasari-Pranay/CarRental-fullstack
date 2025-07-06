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

// CORS Config
const allowedOrigins = [
  process.env.FRONTEND_URL,                    // Original frontend
  "https://car-rental-one-gamma.vercel.app",   // New frontend
  "http://localhost:5173"                      // Local dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));


app.use(express.json());

// Test Route
app.get('/', (req, res) => res.send("🚀 Server is running!"));

// API Routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// Export app for Vercel
export default app;
