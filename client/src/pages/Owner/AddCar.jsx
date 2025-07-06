import React, { useState } from 'react';
import Title from '../../components/Owner/Title';
import { assets } from '../../assets/assets';
import { InputField, SelectField } from '../../components/Owner/FormFields';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';


const AddCar = () => {
  const {axios, currency} = useAppContext()
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(isLoading) return null
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))
      const {data} = await axios.post('/api/owner/add-car', formData)
      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
           brand: '',
           model: '',
           year: 0,
           pricePerDay: 0,
           category: '',
           transmission: '',
           fuel_type: '',
           seating_capacity: 0,
           location: '',
           description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start px-6 py-16 bg-gradient-to-br from-[#d0f1ff] via-[#e0f7ff] to-[#f6fdff] transition-all duration-700">
      <div className="w-full max-w-5xl bg-white/60 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 transition-all border border-white/30">
        <Title
          title="Add New Car"
          subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
        />

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-6 text-gray-700 text-sm mt-6"
        >
          {/* Car Image */}
          <div className="flex items-center gap-4">
            <label htmlFor="Car-image" className="cursor-pointer">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_icon}
                alt="Upload"
                className="h-16 w-16 object-cover rounded-lg border border-gray-300 shadow-sm hover:scale-105 transition"
              />
              <input
                type="file"
                id="Car-image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <p className="text-sm text-gray-500">Upload a picture of your car</p>
          </div>

          {/* Brand & Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Brand" name="brand" value={car.brand} placeholder="e.g. BMW, Mercedes" onChange={setCar} />
            <InputField label="Model" name="model" value={car.model} placeholder="e.g. X5, E-Class" onChange={setCar} />
          </div>

          {/* Year, Price, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Year" name="year" type="number" value={car.year} placeholder="Manufactured Year" onChange={setCar} />
            <InputField label={`Daily Price (${currency})`} name="pricePerDay" type="number" value={car.pricePerDay} placeholder="100" onChange={setCar} />
            <SelectField
              label="Category"
              name="category"
              value={car.category}
              options={['Sedan', 'SUV', 'Van', 'Sports', 'Off-Road']}
              onChange={setCar}
            />
          </div>

          {/* Transmission, Fuel Type, Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectField
              label="Transmission"
              name="transmission"
              value={car.transmission}
              options={['Automatic', 'Manual', 'Semi-Automatic']}
              onChange={setCar}
            />
            <SelectField
              label="Fuel Type"
              name="fuel_type"
              value={car.fuel_type}
              options={['Gas', 'Petrol', 'Diesel', 'Electric']}
              onChange={setCar}
            />
            <InputField
              label="Seating Capacity"
              name="seating_capacity"
              type="number"
              value={car.seating_capacity}
              placeholder="4"
              onChange={setCar}
            />
          </div>

          {/* Location */}
          <SelectField
            label="Location"
            name="location"
            value={car.location}
            options={['New York', 'Los Angeles', 'Houston', 'Chicago']}
            onChange={setCar}
          />

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">Description</label>
            <textarea
              rows={5}
              placeholder="A luxurious SUV with a spacious interior and a powerful engine."
              required
              className="p-3 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-md outline-none focus:ring-2 focus:ring-sky-500 shadow-md transition"
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}
            ></textarea>
          </div>

         <div className="flex justify-center">
  <button
    type="submit"
    disabled={isLoading}
    className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-black bg-gradient-to-br from-blue-200 via-cyan-200 to-white shadow-lg backdrop-blur-md border border-white/30
      transition-all duration-500 ease-out
      hover:shadow-[0_8px_30px_rgba(0,255,255,0.5)] hover:scale-105
      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {/* Frosted shine overlay */}
    <span className="absolute inset-0 bg-white/10 rounded-xl blur-sm opacity-20"></span>

    {/* Subtle animated shimmer */}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/30 via-transparent to-white/30 rounded-xl animate-glacier"></span>

    {/* Button Content */}
    <span className="relative z-10 flex items-center gap-2">
      <CheckCircle size={20} className="text-green-500" />
      {isLoading ? 'Listing...' : 'List Your Car'}
    </span>
  </button>
</div>

        </form>
      </div>
    </div>
  );
};
export default AddCar;
