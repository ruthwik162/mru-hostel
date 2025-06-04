import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Founder = () => {
  return (
    <div className="w-full py-10 shadow-2xl pt-30 px-4 sm:px-8">
      <h1 className="font-bold text-4xl text-center text-gray-800 mb-12">Leadership Team</h1>

      <div className="flex flex-wrap items-center justify-center gap-10">
        {[{
          name: 'Sri. Ch. Malla Reddy',
          title: 'Founder Chairman',
          image: assets.mallareddy,
          bio: `Shri. Ch Malla Reddy, the most humble, dynamic and charismatic founder chairman, is a visionary who brought about a revolution in the field of education. He is the avant-garde in creating numerous avenues which made professional and technical education accessible to young aspirants.`,
        },
        {
          name: 'Dr. VSK Reddy',
          title: 'Vice Chancellor - MRUH',
          image: assets.vsk,
          bio: `Dr. VSK Reddy, Vice-Chancellor of Malla Reddy University, has over 29 years of experience in teaching and industry. An alumnus of IIT, he holds a Ph.D. and is versatile in Communications and Computer Science Engineering.`,
        }].map((leader, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full sm:w-80 lg:w-96 max-w-sm rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center pt-12 pb-6 px-4 relative">
              <img
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                src={leader.image}
                alt={leader.name}
              />
              <div className="pt-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{leader.name}</h2>
                <p className="text-sm text-gray-600">{leader.title}</p>
              </div>
            </div>
            <p className="px-6 pb-6 text-sm text-gray-600 text-center">
              <span className="font-semibold text-indigo-500">{leader.name}</span> {leader.bio}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Founder;
