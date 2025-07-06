import express from "express";
import {
  changeBookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getUserBookings,
  getOwnerBookings
} from "../controllers/bookingController.js";
import protect from "../middleware/auth.js";

const bookingRouter = express.Router();

// ✅ Search available cars (no auth needed)
bookingRouter.post('/check-availability', checkAvailabilityOfCar);

// ✅ Create booking (requires login)
bookingRouter.post('/create', protect, createBooking);

// ✅ Get user bookings (requires login)
bookingRouter.get('/user', protect, getUserBookings);

// ✅ Get owner bookings (requires login & owner role)
bookingRouter.get('/owner', protect, getOwnerBookings);

// ✅ Change booking status (requires login)
bookingRouter.post('/change-status', protect, changeBookingStatus);

export default bookingRouter;
