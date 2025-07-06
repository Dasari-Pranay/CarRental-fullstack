import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/Owner/Title';
import { Car, ListChecks, Clock, CheckCircle, XCircle, Users, Download, AlertCircle, Star, Calendar } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
    topCars: [],
    upcomingBookings: [],
    notifications: [],
  });

  const dashboardCards = [
    {
      title: (
        <span className='flex items-center gap-1'>
          <Car size={16} className="text-blue-900" />
          Total Cars
        </span>
      ),
      value: data.totalCars,
      icon: assets.carIconColored,
      gradient: 'from-sky-300 via-blue-400 to-blue-500',
    },
    {
      title: (
        <span className='flex items-center gap-1'>
          <ListChecks size={16} className="text-purple-900" />
          Total Bookings
        </span>
      ),
      value: data.totalBookings,
      icon: assets.listIconColored,
      gradient: 'from-purple-300 via-pink-400 to-pink-500',
    },
    {
      title: (
        <span className='flex items-center gap-1'>
          <Clock size={16} className="text-yellow-900" />
          Pending
        </span>
      ),
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
      gradient: 'from-yellow-100 via-yellow-300 to-yellow-600',
    },
    {
      title: (
        <span className='flex items-center gap-1'>
          <CheckCircle size={16} className="text-green-900" />
          Confirmed
        </span>
      ),
      value: data.completedBookings,
      icon: assets.listIconColored,
      gradient: 'from-green-300 via-green-400 to-green-500',
    },
    {
      title: (
        <span className='flex items-center gap-1'>
          <XCircle size={16} className="text-red-900" />
          Cancelled
        </span>
      ),
      value: data.cancelledBookings,
      icon: assets.cautionIconColored,
      gradient: 'from-red-300 via-rose-400 to-rose-500',
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/owner/dashboard');
        if (response.data.success) {
          // Ensure all properties have defaults if missing
          setData({
            totalCars: response.data.dashboardData.totalCars || 0,
            totalBookings: response.data.dashboardData.totalBookings || 0,
            pendingBookings: response.data.dashboardData.pendingBookings || 0,
            completedBookings: response.data.dashboardData.completedBookings || 0,
            cancelledBookings: response.data.dashboardData.cancelledBookings || 0,
            recentBookings: response.data.dashboardData.recentBookings || [],
            monthlyRevenue: response.data.dashboardData.monthlyRevenue || 0,
            topCars: response.data.dashboardData.topCars || [],
            upcomingBookings: response.data.dashboardData.upcomingBookings || [],
            notifications: response.data.dashboardData.notifications || [],
          });
        } else {
          toast.error(response.data.message || "Failed to fetch dashboard data");
        }
      } catch (error) {
        toast.error(error.message || "Error fetching dashboard data");
      }
    };

    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner, axios]); // Correct dependencies

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        align="left"
      />

      {/* Dashboard Cards */}
      <div className='flex flex-wrap gap-6 my-8'>
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className={`flex gap-4 items-center justify-between p-5 w-[260px] rounded-2xl text-white shadow-md bg-gradient-to-br ${card.gradient} transition-all duration-300 hover:shadow-xl hover:scale-[1.03]`}
          >
            <div className="flex flex-col gap-1">
              <h1 className='text-sm font-medium'>{card.title}</h1>
              <p className='text-2xl font-bold'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-inner'>
              <img src={card.icon} alt="" className='h-5 w-5' />
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
        {/* Recent Bookings */}
        <div className='p-4 md:p-6 rounded-lg shadow-md bg-gradient-to-br from-[#e0f7fa] via-[#f0f4ff] to-[#d9dcff] max-w-lg w-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02]'>
          <h1 className='text-lg font-semibold'>Recent Bookings</h1>
          <p className='text-sm text-gray-600'>Latest customer bookings</p>
          {data.recentBookings?.length > 0 ? (
            data.recentBookings.map((booking, index) => {
              const statusMap = {
                confirmed: {
                  bg: 'bg-green-100',
                  text: 'text-green-700',
                  icon: <CheckCircle className="text-green-600" size={18} />,
                },
                pending: {
                  bg: 'bg-yellow-100',
                  text: 'text-yellow-700',
                  icon: <Clock className="text-yellow-600" size={18} />,
                },
                cancelled: {
                  bg: 'bg-red-100',
                  text: 'text-red-700',
                  icon: <XCircle className="text-red-600" size={18} />,
                },
              };

              const status = statusMap[booking.status] || {
                bg: 'bg-gray-100',
                text: 'text-gray-700',
                icon: <Clock size={18} className='text-gray-500' />,
              };

              return (
                <div key={index} className='mt-4 flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${status.bg}`}>
                      {status.icon}
                    </div>
                    <div>
                      <p className='font-medium'>
                        {booking?.car?.brand || 'Unknown'} {booking?.car?.model || ''}
                      </p>
                      <p className='text-sm text-gray-500'>{booking?.createdAt?.split('T')[0] || 'N/A'}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-medium'>{currency}{booking?.price || 0}</p>
                    <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p className='text-gray-500 italic mt-4'>No recent bookings available.</p>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className='p-4 md:p-6 rounded-md shadow-md bg-gradient-to-br from-[#e0f7fa] via-[#f0faff] to-[#d9f4ff] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] w-full max-w-sm'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-600'>Revenue for current month</p>
          <p className='text-2xl font-bold text-green-500'>
            <span className='font-outfit'>{currency}</span>{data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
