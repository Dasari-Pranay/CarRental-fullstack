import React from 'react'
import { assets } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className='flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-4 md:mx-auto rounded-2xl overflow-hidden'>
      
      {/* Text Section */}
      <div className='text-white max-w-xl'>
        <h2 className='text-3xl font-semibold mb-2'>Do You Own a Luxury Car?</h2>
        <p className='mb-1'>Monetize your vehicle effortlessly by listing it on CarRental.</p>
        <p className='mb-4'>We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.</p>
        <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='px-5 py-2 bg-white hover:bg-slate-100 text-black rounded-md text-sm transition-all cursor-pointer'>
          List your car
        </motion.button>
      </div>

      {/* Car Image */}
      <motion.img
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      src={assets.banner_car_image} alt="car" className='w-60 md:w-72 mt-8 md:mt-0' />
    </motion.div>
  )
}

export default Banner
