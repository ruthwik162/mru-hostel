import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const Reports = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8087/user/all');
        const filteredStudents = res.data.filter(user => user.role !== 'admin');
        setStudents(filteredStudents);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchUsers();
  }, []);

  const boys = students.filter(student => student.gender?.toLowerCase() === 'male');
  const girls = students.filter(student => student.gender?.toLowerCase() === 'female');

  const riceForBoys = boys.length * 400;
  const curryForBoys = boys.length * 100;

  const riceForGirls = girls.length * 300;
  const curryForGirls = girls.length * 100;

  const totalRice = riceForBoys + riceForGirls;
  const totalCurry = curryForBoys + curryForGirls;
  const totalDesserts = students.length;

  const toKg = (grams) => (grams / 1000).toFixed(2);

  const data = [
    { name: 'Boys', value: boys.length },
    { name: 'Girls', value: girls.length }
  ];

  const COLORS = ['#8884d8', '#ff8884'];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="container mx-auto py-30 p-8 bg-[url('/src/assets/heroImage.png')] bg-cover bg-no-repeat max-w-full min-h-screen">
      <h1 className="text-2xl items-center justify-center flex font-bold mb-4 text-indigo-700">
        Cafeteria Requirement Report
      </h1>

      <div className="flex flex-wrap justify-between mb-6">
        {/* Boys vs Girls PieChart */}
        <motion.div
          className="w-full md:w-3/4 p-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-red-900/60 flex flex-col items-center justify-center rounded-2xl p-4 h-60 text-white text-lg font-semibold text-center">
            <h2 className="text-xl font-semibold text-indigo-300 mb-2">Boys vs Girls</h2>
            <PieChart width={250} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={20} />
            </PieChart>
          </div>
        </motion.div>

        {/* Total Food Required */}
        <motion.div
          className="w-full md:w-1/4 p-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-red-900/60 flex flex-col items-center justify-center rounded-2xl p-4 h-60 text-white text-lg font-semibold text-center">
            <h2 className="text-xl font-semibold text-indigo-300 mb-2">Total Food Required</h2>
            <p>Total Rice: {toKg(totalRice)} kg</p>
            <p>Total Curry: {toKg(totalCurry)} kg</p>
            <p>Total Desserts: {totalDesserts}</p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-between mb-6">
        {/* Breakdown for Boys */}
        <motion.div
          className="w-full md:w-1/2 p-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-red-900/60 flex flex-col items-center justify-center rounded-2xl p-4 h-60 text-white text-lg font-semibold text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Breakdown (Boys)</h2>
            <p>Rice: {toKg(riceForBoys)} kg</p>
            <p>Curry: {toKg(curryForBoys)} kg</p>
            <p>Desserts: {boys.length}</p>
          </div>
        </motion.div>

        {/* Breakdown for Girls */}
        <motion.div
          className="w-full md:w-1/2 p-2"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bg-red-900/60 flex flex-col items-center justify-center rounded-2xl p-4 h-60 text-white text-lg font-semibold text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Breakdown (Girls)</h2>
            <p>Rice: {toKg(riceForGirls)} kg</p>
            <p>Curry: {toKg(curryForGirls)} kg</p>
            <p>Desserts: {girls.length}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
