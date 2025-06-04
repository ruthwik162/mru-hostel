import React from 'react';
import { assets } from '../assets/assets';
import Hostel from './Hostel';
import { motion } from 'framer-motion'; // Import Framer Motion

const HostelImages = () => {
  return (
    <div className="container mx-auto py-30 px-4 sm:px-8 lg:px-24 max-w-full">
      
      {/* About Hostel Section */}
      <motion.div 
        className='py-20 px-4'
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-4">About Our Hostel</h2>
        <div className='border-2 p-10 border-indigo-200 rounded-2xl bg-white/70 backdrop-blur'>
          <Hostel />
        </div>
      </motion.div>

      {/* Mess Section Intro */}
      <motion.h2 
        className="text-4xl font-bold text-center text-black-600 mb-4"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        Our Mess
      </motion.h2>
      <motion.p 
        className="text-center text-lg text-gray-800 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        We provide separate mess facilities for both girls and boys, ensuring healthy, hygienic, and home-style meals prepared with care and cleanliness.
      </motion.p>

      {/* Mess Details */}
      <div className="flex flex-col  gap-14">
        {/* Girls' Mess */}
        <motion.div
          className="flex flex-col lg:flex-row items-center rounded-xl shadow-lg p-6 bg-indigo-100 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }}
        >
          <img
            className="w-full lg:w-1/2 rounded-2xl transition-transform duration-500 hover:scale-105"
            src={assets.hoste_girls}
            alt="Girls Mess"
          />
          <div className="mt-6 lg:mt-0 lg:ml-8 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Girls' Mess</h3>
            <p className="text-gray-700 mb-3">
              The girls’ mess offers a secure and welcoming space focused on nutrition and hygiene. A female-led staff manages meal preparation and service, prioritizing quality and cleanliness.
            </p>
            <p className="text-gray-700 font-medium">Our weekly rotating menu includes:</p>
            <ul className="list-disc list-inside text-gray-600 mb-3">
              <li><strong>Breakfast:</strong> Idli, dosa, poha, upma, stuffed parathas, boiled eggs</li>
              <li><strong>Lunch:</strong> Rice, chapati, dal, paneer, mixed vegetables, curd, pickles</li>
              <li><strong>Snacks:</strong> Fruit bowls, samosas, tea, biscuits</li>
              <li><strong>Dinner:</strong> Khichdi, pulao, roti-subzi, and occasional desserts like kheer or halwa</li>
            </ul>
            <p className="text-gray-700">
              Feedback is encouraged to enhance quality. Special festive meals bring a homely and celebratory atmosphere.
            </p>
          </div>
        </motion.div>

        {/* Boys' Mess */}
        <motion.div
          className="flex flex-col lg:flex-row-reverse items-center rounded-xl shadow-lg p-6 bg-indigo-100 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }}
        >
          <img
            className="w-full lg:w-1/2 rounded-2xl transition-transform duration-500 hover:scale-105"
            src={assets.hostel_boys}
            alt="Boys Mess"
          />
          <div className="mt-6 lg:mt-0 lg:mr-8 text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-blue-700 mb-3">Boys' Mess</h3>
            <p className="text-gray-700 mb-3">
              The boys’ mess provides structured, nutritious meals to support active student lifestyles. Meals are prepared fresh daily and served on time in a friendly environment.
            </p>
            <p className="text-gray-700 font-medium">Highlights from our weekly menu:</p>
            <ul className="list-disc list-inside text-gray-600 mb-3 ">
              <li><strong>Breakfast:</strong> Dosa, idli, omelette, toast, puri-bhaji, milk</li>
              <li><strong>Lunch:</strong> Rice, sambar, dal, chapati, seasonal curries, egg curry (select days)</li>
              <li><strong>Snacks:</strong> Pakoras, bonda, fresh juice, tea</li>
              <li><strong>Dinner:</strong> Biryani, tomato rice, roti-sabzi, desserts like gulab jamun or payasam</li>
            </ul>
            <p className="text-gray-700">
              Hygiene is top priority, and menu suggestions from students are welcomed. Occasionally, non-vegetarian dishes are served based on preference and availability.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HostelImages;
