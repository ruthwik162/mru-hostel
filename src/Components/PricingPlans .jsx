import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../AppContext/AppContext";
import { motion } from "framer-motion";

const PricingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useAppContext();

  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:8087/user/plan");
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-35 p-10">
        Loading hostel plans...
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto py-35 p-8 bg-[url('/src/assets/heroImage.png')] bg-cover bg-no-repeat max-w-full min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-center text-3xl font-bold mb-10">Hostel Pricing Plans</h2>

      <motion.div
        className="flex flex-col p-10 lg:flex-row gap-5 justify-center items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className="w-full lg:w-1/4"  // Adjusted to make the cards smaller
            whileHover={{
              scale: 1.05,  // Slightly increase size on hover
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",  // Glow effect on hover
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.95, // Slight shrink effect when clicked
            }}
            initial={{ opacity: 0, y: 50 }}  // Cards initially slightly below the view
            animate={{
              opacity: 1,
              y: 0,  // Move into position
            }}
            transition={{ duration: 0.6, delay: index * 0.1 }}  // Sequential animation for staggered effect
          >
            <motion.div
              className="p-4 bg-white rounded-lg shadow-lg h-full flex flex-col justify-between"  // Reduced padding for smaller card
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",  // Glow effect on hover
                transition: { duration: 0.3 },
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-indigo-700">{plan.name}</h3>
              <p className="text-gray-500 mb-3">{plan.description}</p>
              <div className="mb-3">
                <span className="text-2xl font-bold">{plan.priceMonthly}</span>
                <span className="text-sm text-gray-500"> /month</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-indigo-600">
                  Or {plan.priceYearly} billed yearly
                </span>
              </div>
              <ul className="mt-4 mb-6 text-gray-600 space-y-2 flex-grow">
                {plan.features.split(",").map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature.trim()}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                onClick={() => (navigate(`/plan/${plan.id}`))}
                className="w-full py-2 px-4 bg-indigo-600 active:scale-95 cursor-pointer transition-transform duration-500 text-white rounded-lg text-sm hover:bg-indigo-700"
                whileHover={{ scale: 1.05 }}
              >
                View Details
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PricingPlans;
