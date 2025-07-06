import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className="relative py-20 px-6 text-white text-center font-[Outfit] bg-gradient-to-br from-[#d0f0ff] via-[#a8dcf0] to-[#89cbea]">
      {/* Typing animation heading */}
      <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y:0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="typing-animation text-3xl md:text-4xl font-bold tracking-wide mb-2 drop-shadow-lg text-[#0d1c2b]">
        Never Miss a Deal!
      </motion.h2 >
      <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-base md:text-lg mb-6 opacity-90 text-[#1a2b3d]">
        ❄️ Stay cool with updates, exclusive offers & refreshing content — straight to your inbox!
      </motion.p>

      <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex justify-center items-center flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-5 py-3 rounded-full text-black w-full sm:w-80 text-base placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <button className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md">
          ❄️ Subscribe Now
        </button>
      </motion.form>

      {/* CSS for typing effect */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap');

          .typing-animation {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #0d1c2b;
            animation: typing 2.5s steps(22, end), blink 0.7s step-end infinite;
          }

          @keyframes typing {
            from { width: 0 }
            to { width: 18ch }
          }

          @keyframes blink {
            0%, 100% { border-color: transparent }
            50% { border-color: #0d1c2b }
          }
        `}
      </style>
    </motion.div>
  );
};

export default Newsletter;
