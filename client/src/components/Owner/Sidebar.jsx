import React, { useState } from 'react';
import { assets,  ownerMenuLinks } from '../../assets/assets';
import { useLocation, NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const {user, axios, fetchUser } = useAppContext()
  const location = useLocation();
  const [image, setImage] = useState('');

  const updateImage = async() => {
    try {
      const formData = new FormData()
      formData.append('image',image)
      const {data} = await axios.post('/api/owner/update-image', formData)
      if(data.success){
        fetchUser()
        toast.success(data.message)
        setImage('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-10 w-full max-w-14 md:max-w-64 bg-gradient-to-b from-[#e3f2fd] via-[#edf6fb] to-[#f0faff] border-r border-white/30 backdrop-blur-2xl shadow-xl transition-all z-50">
      
      {/* Profile Image Section */}
      <div className="relative group w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#cce7f6] shadow-lg transition-all duration-300">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://unsplash.com/photos/smiling-woman-wearing-white-and-black-pinstriped-collared-top-QXevDflbl8A'
            }
            alt="User"
            className="w-full h-full object-cover rounded-full cursor-pointer"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/20 transition-all duration-300 cursor-pointer">
            <img src={assets.edit_icon} alt="Edit" className="w-6 h-6" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="mt-2 flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Save
          <img src={assets.check_icon} alt="Save" width={14} />
        </button>
      )}

      {/* User Name */}
      <p className="mt-4 text-[15px] font-medium text-gray-800 max-md:hidden">
        {user?.name}
      </p>

      {/* Menu Navigation */}
      <div className="w-full mt-8 space-y-1">
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname;
          return (
            <NavLink
              key={index}
              to={link.path}
              className={`relative flex items-center gap-3 px-6 py-3 w-full group transition-all rounded-r-full ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-100 via-white to-white text-blue-800 font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-white/60 hover:backdrop-blur-sm'
              }`}
            >
              <img
                src={isActive ? link.coloredIcon : link.icon}
                alt={link.name}
                className="w-5 h-5"
              />
              <span className="max-md:hidden">{link.name}</span>

              {/* Active Tab Highlight Bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-r-lg animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
