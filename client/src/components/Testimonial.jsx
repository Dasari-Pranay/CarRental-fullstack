import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      address: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional."
    },
    {
      name: "John Smith",
      address: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!"
    },
    {
      name: "Ava Johnson",
      address: "Sydney, Australia",
      image: assets.testimonial_image_1,
      testimonial: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service."
    }
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2, ease:'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="group bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-300 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
              <div>
                <p className="text-xl group-hover:text-white transition-colors duration-300">{testimonial.name}</p>
                <p className="text-gray-500 group-hover:text-blue-100 transition-colors duration-300">{testimonial.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon}
                    alt="star-icon"
                    className="w-5 h-5 transition duration-300 group-hover:filter group-hover:brightness-150 group-hover:sepia group-hover:hue-rotate-[330deg]" // red glow
                  />
                ))}
            </div>

            <p className="text-gray-500 group-hover:text-white max-w-90 mt-4 font-light transition-colors duration-300">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
