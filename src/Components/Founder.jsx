import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Founder = () => {
  const leaders = [
    {
      name: 'Sri. Ch. Malla Reddy',
      title: 'Founder Chairman',
      image: assets.mallareddy,
      bio: 'Visionary leader who revolutionized education, making professional and technical education accessible to young aspirants.',
      achievements: [
        'Education revolutionary',
        'Technical education pioneer',
        'Established multiple institutions'
      ]
    },
    {
      name: 'Dr. VSK Reddy',
      title: 'Vice Chancellor - MRUH',
      image: assets.vsk,
      bio: 'Seasoned academic leader with 29+ years experience, alumnus of IIT, expert in Communications and Computer Science.',
      achievements: [
        'IIT alumnus',
        'Ph.D. holder',
        'Industry-academia bridge'
      ]
    }
  ];

  return (
    <section className="w-full py-20 bg-white px-4 sm:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 -right-20 w-64 h-64 rounded-full bg-blue-50 opacity-40"></div>
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            Our Leadership
          </span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Guiding Visionaries
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the exceptional minds shaping our institution's future
          </p>
        </motion.div>

        {/* Leadership cards */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12"
        >
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
              
              <div className="relative h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image section */}
                  <div className="md:w-1/3 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                    <img
                      className="w-full h-full bject-cover"
                      src={leader.image}
                      alt={leader.name}
                    />
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                      <p className="text-sm text-blue-100">{leader.title}</p>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="md:w-2/3 p-6">
                    <p className="text-gray-700 mb-4">{leader.bio}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Key Contributions
                      </h4>
                      <ul className="space-y-2">
                        {leader.achievements.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                        View Profile
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            View Full Leadership Team
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;