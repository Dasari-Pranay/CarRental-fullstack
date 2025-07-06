import React, { useEffect, useState, useCallback } from 'react';
import Title from '../../components/Owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import CarDetails from './../CarDetails';

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);

  // 🪝 Memoized function
  const fetchOwnerCars = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/owner/cars', { withCredentials: true });
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Fetch Owner Cars Error:", error);
    }
  }, [axios]);

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', {carId});
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Fetch Owner Cars Error:", error);
    }
  }

   const deletecar = async (carId) => {
    try {

      const confirm = window.confirm('Are you sure you want to delete this car?')
      if(!confirm) return null

      const { data } = await axios.post('/api/owner/delete-car', {carId});
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Fetch Owner Cars Error:", error);
    }
  }


  useEffect(() => {
    if (isOwner) fetchOwnerCars();
  }, [isOwner, fetchOwnerCars]); 

  return (
    <div className="px-4 pt-10 md:px-12 w-full min-h-screen bg-gradient-to-br from-[#e6f3ff] via-[#f0faff] to-white">
      <Title
        title="Manage Cars"
        subTitle="View all listed cars, update their details, or remove them from the booking platform."
        align="left"
      />

      <div className="w-full max-w-7xl mt-10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/50 border border-white/30 transition-all">
        <table className="w-full border-collapse text-left text-base text-gray-800">
          <thead className="bg-gradient-to-r from-[#d0e8ff] to-[#f4faff] text-gray-700 uppercase tracking-wider text-[15px]">
            <tr>
              <th className="p-5 font-semibold">#</th>
              <th className="p-5 font-semibold">Car</th>
              <th className="p-5 font-semibold max-md:hidden">Category</th>
              <th className="p-5 font-semibold">Price</th>
              <th className="p-5 font-semibold max-md:hidden">Status</th>
              <th className="p-5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="backdrop-blur-md">
            {cars.map((car, index) => (
              <tr
                key={car._id || index}
                className="border-t border-gray-300 hover:bg-white/70 transition-all"
              >
                <td className="p-5 font-medium text-gray-500">{index + 1}</td>
                <td className="p-5 flex items-center gap-5">
                  <img
                    src={car.image}
                    alt="car"
                    className="h-16 w-16 rounded-lg object-cover border border-gray-300 shadow-md"
                  />
                  <div className="max-md:hidden">
                    <p className="font-semibold text-[16px]">{car.brand} {car.model}</p>
                    <p className="text-sm text-gray-500">{car.seating_capacity} Seats • {car.transmission}</p>
                  </div>
                </td>
                <td className="p-5 max-md:hidden text-[15px]">{car.category}</td>
                <td className="p-5">
                  <span className="font-semibold text-blue-700 text-[15px]">
                    {currency}{car.pricePerDay}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">/day</span>
                </td>
                <td className="p-5 max-md:hidden">
                  <span
                    className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold shadow-sm w-max ${
                      car.isAvailable
                        ? 'bg-green-100 text-green-600 ring-1 ring-green-300'
                        : 'bg-red-100 text-red-600 ring-1 ring-red-300'
                    }`}
                  >
                    {car.isAvailable ? '✅ Available' : '❌ Unavailable'}
                  </span>
                </td>
                <td className="p-5 flex gap-5 items-center">
                  <img onClick={()=> toggleAvailability(car._id)}
                    src={ car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                    alt="toggle visibility"
                    className="cursor-pointer w-10 h-10 hover:scale-110 transition-transform duration-200"
                    title={ car.isAvailable ? 'Hide' : 'Show'}
                  />
                  <img onClick={()=> deletecar(car._id)}
                    src={assets.delete_icon}
                    alt="delete"
                    className="cursor-pointer w-10 h-10 hover:scale-110 hover:rotate-12 transition-transform duration-200"
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
