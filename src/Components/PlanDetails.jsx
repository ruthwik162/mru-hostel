import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const PlanDetails = () => {
  const [room, setRoom] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8087/user/plan");
        const foundRoom = response.data.find(plan => String(plan.id) === String(id));
        if (foundRoom) {
          setRoom({
            ...foundRoom,
            rating: foundRoom.rating || 4,
            offerPrice: foundRoom.offerPrice || foundRoom.priceMonthly,
            price: foundRoom.priceMonthly,
            description: foundRoom.description || [],
          });
        }
      } catch (error) {
        console.error("Error fetching plan:", error);
      }
    };
    fetchPlans();
  }, [id]);

  const handlePayment = () => {
    const options = {
      key: "rzp_live_0CAWJFt3q8oaUX", // Replace with your test/live Razorpay key
      amount: room.priceMonthly * 100,
      currency: "INR",
      name: "ExcelR",
      description: "Plan Payment",
      handler: async function (response) {
        const payload = {
          name: room.name,
          planId: id,
          paymentId: response.razorpay_payment_id,
          amount: room.priceMonthly,
          user: {
            name: "John Doe",
            email: "john@example.com",
            mobile: "9876543210"
          }
        };

        try {
          await axios.post("http://localhost:8087/save-order", payload);
          generateInvoice(response.razorpay_payment_id, payload);
          navigate("/dashboard");
        } catch (error) {
          console.error("Order saving failed:", error);
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const generateInvoice = (paymentId, data) => {
    const doc = new jsPDF();
    doc.setFontSize(20).text("Plan Invoice", 70, 20);
    doc.setFontSize(12).text(`Payment ID: ${paymentId}`, 20, 30);
    doc.text(`Customer: ${data.user.name}`, 20, 40);
    doc.text(`Email: ${data.user.email}`, 20, 50);
    doc.text(`Mobile: ${data.user.mobile}`, 20, 60);
    doc.text(`Plan Name: ${data.name}`, 20, 70);
    doc.text(`Amount: ₹${data.amount}`, 20, 80);
    doc.text("Thank you for your purchase!", 20, 100);
    doc.save("Plan_Invoice.pdf");
  };

  return room ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="py-20 pt-38 bg-indigo-300 px-6 md:px-20 lg:px-32"
    >
      <motion.div className="flex flex-col md:flex-row gap-10 bg-white shadow-lg p-8 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center items-center"
        >
          <img
            src={room.image}
            alt="Room"
            className="rounded-2xl shadow-2xl w-full max-h-[400px] object-cover"
          />
        </motion.div>

        <div className="w-full md:w-1/2 text-sm">
          <h1 className="text-3xl font-bold mb-3">{room.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            {Array(5).fill('').map((_, i) => (
              <svg key={i} width="16" height="15" viewBox="0 0 18 17" fill="none">
                <path
                  d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                  fill="#615fff"
                  fillOpacity={room.rating > i ? "1" : "0.35"}
                />
              </svg>
            ))}
            <p className="text-base ml-2">({room.rating})</p>
          </div>

          <div className="bg-indigo-100 p-4 rounded-2xl mb-6">
            <p className="text-gray-500/70 line-through">Monthly: ₹{room.priceMonthly}</p>
            <p className="text-xl font-semibold text-indigo-800">Yearly: ₹{room.priceYearly}</p>
            <span className="text-gray-500/70 text-sm">(inclusive of all taxes)</span>
          </div>

          <div className="bg-gray-100 p-5 rounded-2xl">
            <h2 className="text-base font-semibold mb-3 text-indigo-800">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              {room.features?.split(',').map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl shadow transition"
      >
        Book Now
      </motion.button>
    </motion.div>
  ) : (
    <div className="p-10 text-center text-gray-600">Loading plan details...</div>
  );
};

export default PlanDetails;
