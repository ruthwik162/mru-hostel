import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion

const AboutCard = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8087/user/about")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setFeatures(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const localFeatures = [
    { icon: "🏠", title: "Spacious Rooms" },
    { icon: "📶", title: "High-Speed WiFi" },
    { icon: "🍽️", title: "Nutritious Meals" },
    { icon: "🔒", title: "24/7 Security" },
    { icon: "📚", title: "Study Rooms & Library" },
    { icon: "🎮", title: "Recreational Facilities" },
    { icon: "🧺", title: "Laundry & Housekeeping" },
    { icon: "🚑", title: "Medical Support" },
    { icon: "🚌", title: "Transportation" }
  ];

  const combinedFeatures = features.map((feature, index) => ({
    icon: localFeatures[index]?.icon || "❓",
    title: localFeatures[index]?.title || "Unknown Feature",
    description: feature.description || "No description available",
    information: feature.information || "More details available on request!"
  }));

  return (
    <div>
      {/* Section with Animation (No Background Image) */}
      <motion.section 
        className="container mx-auto p-15 px-4 bg-indigo-300 sm:px-8 md:xl-16 lg:px-24 xl:px-34 max-w-full h-half"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-4"></h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Our hostel provides a comfortable, secure, and well-equipped environment for students.
        </p>

        {/* Feature Cards Grid with Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {combinedFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-xl hover:shadow-xl hover:scale-90 scale-80 transition-transform duration-900 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="text-4xl items-center justify-center mb-3">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
              <p className="text-sm text-indigo-500 font-medium">{feature.information}</p>
            </motion.div>
          ))}
        </div>

        {/* View Plans Button with Hover Effect */}
        <div className="text-center mt-12">
          <Link to="/plan">
            <motion.button 
              className="w-40 py-3 cursor-pointer active:scale-95 transition text-sm text-white rounded-lg bg-indigo-500"
              whileHover={{ scale: 1.1 }} // Slight scale-up on hover
              whileTap={{ scale: 0.95 }} // Shrink on click
              transition={{ duration: 0.3 }}
            >
              View Plans
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

export default AboutCard;
