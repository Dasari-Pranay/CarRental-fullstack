import React, { useEffect, useState, useCallback } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const { axios, cars } = useAppContext();
  const [input, setInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  // ✅ Read & sanitize query params
const pickupLocation = decodeURIComponent(searchParams.get("pickupLocation") || "").trim();
const pickupDate = (searchParams.get("pickupDate") || "").trim();
const returnDate = (searchParams.get("returnDate") || "").trim();


  const isSearchData =
  pickupLocation && pickupDate && returnDate &&
  new Date(pickupDate) < new Date(returnDate);


  // ✅ Apply text filter on cars (local filter)
  const applyFilter = useCallback(() => {
    if (input === "") {
      setFilteredCars(cars);
      return;
    }
    const filtered = cars.filter((car) => {
      const searchStr = input.toLowerCase();
      return (
        car.brand.toLowerCase().includes(searchStr) ||
        car.model.toLowerCase().includes(searchStr) ||
        car.category.toLowerCase().includes(searchStr) ||
        car.transmission.toLowerCase().includes(searchStr) ||
        car.fuel_type.toLowerCase().includes(searchStr) ||
        car.seating_capacity.toLowerCase().includes(searchStr)
      );
    });
    setFilteredCars(filtered);
  }, [input, cars]);

  useEffect(() => {
    if (!isSearchData) {
      applyFilter();
    }
  }, [applyFilter, isSearchData]);

  // ✅ API call to fetch cars for location & date
 const searchCarAvailability = useCallback(async () => {
  try {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });

    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
         toast.error(" No cars available for selected location & dates", {
  id: "no-cars-toast", // 👈 only one toast with this ID
});

      }
    } else {
      toast.error(data.message || "Failed to fetch cars");
    }
  } catch (error) {
    toast.error(error.message || "Server error while fetching cars");
  }
}, [axios, pickupLocation, pickupDate, returnDate]);



  useEffect(() => {
  if (isSearchData) {
    searchCarAvailability();
  } else if (cars.length > 0) {
    setFilteredCars(cars);
  }
}, [isSearchData, cars, searchCarAvailability]);



  return (
    <div>
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut'}}
      className="flex flex-col items-center py-20 bg-blue-50 max-md:px-4">
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />
        <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img src={assets.filter_icon} alt="" className="w-4.5 h-4.5 ml-2" />
        </motion.div>
      </motion.div>

      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-600 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>
        {filteredCars.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            🚗 No cars available for selected location & dates.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
            {filteredCars.map((car, index) => (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4}}
              key={index}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cars;
