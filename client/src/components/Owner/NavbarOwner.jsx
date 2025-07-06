import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const {user} = useAppContext()

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-3 border-b border-blue-100 bg-white/40 backdrop-blur-md shadow-sm relative z-20">
      
      {/* Logo section (no background glow) */}
      <Link to="/" className="flex items-center gap-2 group">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-7 w-auto transition-transform duration-300 group-hover:scale-105"
        />
        <span className="font-semibold text-gray-800 text-lg hidden md:inline relative">
          CarRental
          {/* Decorative gradient underline */}
          <span className="block w-full h-1 mt-0.5 bg-gradient-to-r from-blue-300 to-cyan-400 rounded-full opacity-60"></span>
        </span>
      </Link>

      {/* Right: Welcome message & user avatar */}
      <div className="flex items-center gap-3">
        <p className="text-sm md:text-base text-gray-700 font-medium">
          Welcome, <span className="text-blue-600 font-semibold">{user?.name || 'Owner'}</span>
        </p>
        <div className="relative group w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-blue-200 hover:ring-blue-400 shadow-md transition-all duration-300">
          <img
            src={
              user?.image ||
              'https://unsplash.com/photos/smiling-woman-wearing-white-and-black-pinstriped-collared-top-QXevDflbl8A'
            }
            alt="User"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 bg-black/10 hidden group-hover:flex items-center justify-center rounded-full">
            <img src={assets.edit_icon} alt="Edit" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarOwner;
