import React, { useEffect, useState, useCallback } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/bookings/user');
      if (data && data.bookings) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }, [axios]);

  useEffect(() => {
    if (user) fetchMyBookings();
  }, [user, fetchMyBookings]);

  const getStatusStyles = (status) => {
    if (status === 'confirmed') return 'bg-green-400/15 text-green-600';
    if (status === 'cancelled') return 'bg-red-400/15 text-red-600';
    return 'bg-yellow-400/15 text-yellow-600';
  };

  const getStatusIcon = (status) => {
    if (status === 'confirmed') return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (status === 'cancelled') return <XCircle className="h-4 w-4 text-red-600" />;
    return <Clock className="h-4 w-4 text-yellow-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
    >
      <Title title="My Bookings" subTitle="View and manage all your car bookings" align="left" />

      <div>
        {bookings
          .filter((booking) => booking.car) // Skip bookings where car is null
          .map((booking, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              key={booking._id}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
            >
              {/* Car Image + Info */}
              <div className="md:col-span-1">
                <div className="rounded-md overflow-hidden mb-3">
                  <img
                    src={booking.car.image || assets.placeholder_image}
                    alt={`${booking.car.brand || 'Car'} image`}
                    className="w-full h-auto aspect-video object-cover"
                  />
                </div>
                <p className="text-lg font-medium mt-2">
                  {booking.car.brand || 'Unknown'} {booking.car.model || ''}
                </p>
                <p className="text-gray-500">
                  {booking.car.year || 'Year N/A'} · {booking.car.category || 'Category N/A'} ·{' '}
                  {booking.car.location || 'Location N/A'}
                </p>
              </div>

              {/* Booking Info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <p className="px-3 py-1.5 bg-blue-50 rounded">Booking #{index + 1}</p>
                  <p
                    className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusStyles(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                    {getStatusIcon(booking.status)}
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <img src={assets.calendar_icon_colored} alt="" className="w-4 h-4 mt-1" />
                  <div>
                    <p className="text-gray-500">Rental Period</p>
                    <p>
                      {booking.pickupDate?.split('T')[0]} To {booking.returnDate?.split('T')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-3">
                  <img src={assets.location_icon_colored} alt="" className="w-4 h-4 mt-1" />
                  <div>
                    <p className="text-gray-500">Pick-up Location</p>
                    <p>{booking.car.location || 'Location not available'}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="md:col-span-1 flex flex-col justify-between gap-6">
                <div>
                  <p>Total Price</p>
                  <h1 className="text-2xl font-semibold text-blue-500">
                    {currency}
                    {booking.price}
                  </h1>
                  <p>Booked on {booking.createdAt?.split('T')[0]}</p>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

export default MyBookings;
