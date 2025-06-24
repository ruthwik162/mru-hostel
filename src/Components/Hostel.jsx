import React from 'react';
import { motion } from 'framer-motion';
import { FaWifi, FaUtensils, FaBook, FaShieldAlt, FaTshirt, FaBed } from 'react-icons/fa';

const Hostel = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const features = [
    { icon: <FaWifi className="text-2xl" />, title: "High-Speed WiFi", description: "Uninterrupted internet access for studies and leisure" },
    { icon: <FaUtensils className="text-2xl" />, title: "Quality Mess", description: "Nutritious and hygienic meals served daily" },
    { icon: <FaBook className="text-2xl" />, title: "Study Areas", description: "Dedicated quiet spaces for academic work" },
    { icon: <FaShieldAlt className="text-2xl" />, title: "24/7 Security", description: "Round-the-clock safety with CCTV surveillance" },
    { icon: <FaTshirt className="text-2xl" />, title: "Laundry", description: "Regular laundry services for residents" },
    { icon: <FaBed className="text-2xl" />, title: "Comfortable Rooms", description: "Spacious rooms with modern furniture" }
  ];

  return (
    <section className="py-5 ">
      <div className="container  mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="max-w-9xl px-5 py-12  mx-auto bg-gradient-to-r from-blue-100 to-indigo-300 rounded-2xl shadow-lg"
        >
          <motion.h2 
            variants={item}
            className="mb-4 text-3xl  font-bold text-center text-indigo-600 sm:text-4xl md:mb-8"
          >
            Hostel Overview
          </motion.h2>
          
          <motion.p 
            variants={item}
            className="max-w-7xl text-sm md:text-lg mx-auto mb-12 leading-relaxed text-center text-gray-600 "
          >
            Malla Reddy University hostel is a home away from home for our students. Our separate facilities for 
            girls and boys provide all modern amenities in a secure, walled campus with single entry and 
            24-hour security. We foster a family atmosphere that encourages self-discipline and holistic 
            development of body, mind, and soul.
          </motion.p>

          <motion.div 
            variants={container}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="p-6 transition-all  duration-300 bg-gray-50 rounded-xl hover:shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 mr-4 text-white bg-indigo-500 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-md md:text-lg font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-sm md:text-lg text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hostel;