import React, { useEffect, useState } from 'react';
import exclusiveOfferCardImg1 from '../assets/exclusiveOfferCardImg1.png';
import exclusiveOfferCardImg2 from '../assets/exclusiveOfferCardImg2.png';
import exclusiveOfferCardImg3 from '../assets/exclusiveOfferCardImg3.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PriceCategory = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      id: 1,
      name: 'Standard',
      image: exclusiveOfferCardImg1,
    },
    {
      id: 2,
      name: 'Premium',
      image: exclusiveOfferCardImg2,
    },
    {
      id: 3,
      name: 'Luxury',
      image: exclusiveOfferCardImg3,
    },
  ];

  return (
    <div className="container mx-auto py-20 shadow-2xl px-4 sm:px-8 lg:px-24 xl:px-34 bg-white max-w-full">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-900">Pricing Plans</h2>

      <div className="flex flex-wrap gap-10 items-center justify-center">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            onClick={() => navigate("/plan")}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-5 max-w-xs w-full transform transition duration-1000 ease-out hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 10 }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <img className="rounded-md h-40 w-full object-cover" src={plan.image} alt={plan.name} />
            <p className="text-gray-900 text-xl font-semibold mt-4">{plan.name}</p>
            <p className="text-gray-500 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PriceCategory;
