import React, { useEffect, useState, useCallback } from 'react';
import Title from '../../components/Owner/Title';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageBooking = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner');
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios]); // Only depends on axios

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, [fetchOwnerBookings]); // ✅ No ESLint warning

  const renderStatus = (status) => {
    const commonClasses = 'flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ring-1';

    if (status === 'confirmed') {
      return (
        <span className={`${commonClasses} bg-green-100 text-green-600 ring-green-300`}>
          <CheckCircle className="w-4 h-4" /> Confirmed
        </span>
      );
    }
    if (status === 'cancelled') {
      return (
        <span className={`${commonClasses} bg-red-100 text-red-600 ring-red-300`}>
          <XCircle className="w-4 h-4" /> Cancelled
        </span>
      );
    }
    return (
      <span className={`${commonClasses} bg-yellow-100 text-yellow-600 ring-yellow-300`}>
        <Clock className="w-4 h-4" /> Pending
      </span>
    );
  };

  return (
    <div className="px-4 pt-10 md:px-12 w-full min-h-screen bg-gradient-to-br from-[#e6f3ff] via-[#f0faff] to-white">
      <Title
        title="Manage Bookings"
        subTitle="Track all your bookings, approve or cancel requests, and manage booking statuses."
        align="left"
      />

      <div className="w-full max-w-7xl mt-10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/50 border border-white/30 transition-all">
        <table className="w-full border-collapse text-left text-base text-gray-800">
          <thead className="bg-gradient-to-r from-[#d0e8ff] to-[#f4faff] text-gray-700 uppercase tracking-wider text-[15px]">
            <tr>
              <th className="p-5 font-semibold">Car</th>
              <th className="p-5 font-semibold max-md:hidden">Date Range</th>
              <th className="p-5 font-semibold">Total</th>
              <th className="p-5 font-semibold max-md:hidden">Payment</th>
              <th className="p-5 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="backdrop-blur-md">
            {bookings.map((booking, index) => (
              <tr key={index} className="border-t border-gray-300 hover:bg-white/70 transition-all">
                <td className="p-5 flex items-center gap-4">
                  <img
                    src={booking.car.image}
                    alt=""
                    className="h-14 w-14 rounded-md object-cover shadow"
                  />
                  <p className="font-medium max-md:hidden">
                    {booking.car.brand} {booking.car.model}
                  </p>
                </td>

                <td className="p-5 max-md:hidden">
                  {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                </td>

                <td className="p-5">
                  <span className="font-semibold text-blue-700">
                    {currency}
                    {booking.price}
                  </span>
                </td>

                <td className="p-5 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Offline</span>
                </td>

                <td className="p-5">
                  {booking.status === 'pending' ? (
                    <select
                      onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                      value={booking.status}
                      className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  ) : (
                    renderStatus(booking.status)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
