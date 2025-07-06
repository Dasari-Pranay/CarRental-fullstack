import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets, menuLinks } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Navbar = () => {
  const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () =>{
    try{
      const { data } = await axios.post('/api/owner/change-role')
      if(data.success){
      setIsOwner(true)
      toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <motion.div 
    initial={{y: -20, opacity: 0}}
    animate={{y:0,opacity: 1}}
    transition={{duration: 0.5}}
    className="relative z-50 bg-[#f5f8fb] border-b border-gray-200 px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600">
      {/* Main Navbar Row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.img  whileHover={{scale:1.05}} src={assets.logo} alt="logo" className="h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Search Bar */}
          <div className="flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
            <input
              type="text"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              placeholder="Search product"
            />
            <img src={assets.search_icon} alt="Search" />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button onClick={() => isOwner ?  navigate('/owner') : changeRole()} 
            className="cursor-pointer text-sm text-gray-700 hover:text-gray-900">
              {isOwner ? 'Dashboard' : 'List Cars'}
            </button>
            <button
              onClick={() => {user ? logout() : setShowLogin(true)}}
              className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-blue-500/50 transition-all duration-300"
            >
             {user ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>

        {/* Hamburger Icon */}
        <button className="lg:hidden cursor-pointer z-50" onClick={() => setOpen(!open)}>
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white px-6 py-4 flex flex-col gap-4 z-50 shadow-md">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              navigate('/owner');
              setOpen(false);
            }}
            className="text-left text-sm text-gray-700 hover:text-gray-900"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              setShowLogin(true);
              setOpen(false);
            }}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-blue-500/50 transition-all duration-300"
          >
            Login
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
