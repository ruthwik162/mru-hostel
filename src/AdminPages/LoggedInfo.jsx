import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const COLORS = ['#6366f1', '#c7d2fe'];
const TOTAL_ROOM_CAPACITY = 96;


const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const EditUserForm = ({ userData, setUserData, updateUser, setEditingUser }) => (
  <motion.div
    className="w-full md:w-1/2 p-4 mt-4"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="bg-indigo-500/60 p-4 rounded-2xl text-white">
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser();
        }}
      >
        {['username', 'email', 'mobile'].map((field) => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block text-sm capitalize">
              {field}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              required
              value={userData[field]}
              onChange={(e) => setUserData({ ...userData, [field]: e.target.value })}
              className="w-full p-2 rounded-md text-black"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm">Gender</label>
          {['male', 'female', 'other'].map((genderOption) => (
            <label key={genderOption} className="mr-4 capitalize">
              <input
                type="radio"
                name="gender"
                value={genderOption}
                checked={userData.gender === genderOption}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
              />{' '}
              {genderOption}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditingUser(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  </motion.div>
);

const LoggedInfo = () => {
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({ username: '', email: '', mobile: '', gender: '' });


  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:8087/user/all');
      const filteredStudents = res.data.filter((user) => user.role !== 'admin');
      setStudents(filteredStudents);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get('http://localhost:8087/user/contactus/all');
      setMessages(res.data);
    };
    fetchMessages();
  }, []);

  const remainingSlots = TOTAL_ROOM_CAPACITY - students.length;
  const data = [
    { name: 'Occupied', value: students.length },
    { name: 'Available', value: remainingSlots },
  ];

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:8087/user/register/${id}`);
      setStudents((prev) => prev.filter((student) => student.id !== id));
      toast.success('User deleted successfully');
    } catch {
      toast.error('Failed to delete user');
    }
  };



  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:8087/user/register/${editingUser.id}`, userData);
      setStudents((prev) =>
        prev.map((user) => (user.id === editingUser.id ? { ...user, ...userData } : user))
      );
      setEditingUser(null);
      setUserData({ username: '', email: '', mobile: '', gender: '' });
      toast.success('User updated successfully');
    } catch {
      toast.error('Failed to update user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserData({
      username: user.username || '',
      email: user.email || '',
      mobile: user.mobile || '',
      gender: user.gender || '',
    });
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`http://localhost:8087/user/contactus/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      toast.success('Message deleted successfully');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="flex py-10 flex-wrap w-full">
      <motion.div
        className="w-full md:w-1/2 p-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-red-900/60 rounded-2xl shadow-md p-4 flex flex-col items-center justify-center md:h-60">
          <h2 className="text-lg font-semibold text-white mb-2">Rooms Occupancy</h2>
          <PieChart width={250} height={200}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={60} dataKey="value" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 p-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >

      <div className="bg-red-900/60 flex-wrap flex items-center p-10 gap-10 justify-center rounded-2xl md:h-60 h-50 cursor-pointer text-white text-lg font-semibold text-center">
        {['Girls-1', 'Girls-2', 'Boys-1', 'Boys-2', 'Boys-3'].map((block) => (
          <Link to={`/adminhome/${block}`} key={block}>
            <div
              className="h-20 w-20 hover:scale-110 transition-transform duration-300 rounded-2xl flex items-center justify-center text-black bg-green-200"
            >
              {block}
            </div>
          </Link>
        ))}
      </div>
      </motion.div>

      <motion.div
        className="w-full md:w-full py-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-indigo-500/60 rounded-2xl md:h-60 h-auto p-4 text-white text-lg font-semibold">
          <p className="mb-3">
            Total Students: {students.length} | Remaining Slots: {remainingSlots}
          </p>
          <div className="overflow-y-auto max-h-40 bg-white rounded-md shadow">
            <table className="min-w-full border-collapse text-black text-sm bg-white">
              <thead className="bg-indigo-100 sticky top-0 z-10 text-indigo-800">
                <tr>
                  <th className="text-left px-4 py-2 border-b">Name</th>
                  <th className="text-left px-4 py-2 border-b">Email</th>
                  <th className="text-left px-4 py-2 border-b">Mobile</th>
                  <th className="text-left px-4 py-2 border-b">Gender</th>
                  <th className="text-center px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">{user.username || 'N/A'}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.mobile}</td>
                    <td className="px-4 py-2">{user.gender}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(user)}>
                          <img className="w-5 active:scale-90 cursor-pointer hover:scale-110 transition-transform duration-300 h-5" src={assets.edit} alt="Edit" />
                        </button>
                        <button onClick={() => deleteUser(user.id)}>
                          <img className="w-5 active:scale-90 cursor-pointer hover:scale-110 transition-transform duration-300 h-5" src={assets.delete_icon} alt="Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {editingUser && (
        <EditUserForm
          userData={userData}
          setUserData={setUserData}
          updateUser={updateUser}
          setEditingUser={setEditingUser}
        />
      )}

      <motion.div
        className="w-full md:w-full py-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="bg-green-500/60 rounded-2xl md:h-60 h-auto p-4 text-white text-lg font-semibold">
          <p className="mb-3">Messages from Users</p>
          <div className="overflow-y-auto max-h-40 bg-white rounded-md shadow">
            <table className="min-w-full border-collapse text-black text-sm bg-white">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th className="text-left px-4 py-2 border-b">Name</th>
                  <th className="text-left px-4 py-2 border-b">Email</th>
                  <th className="text-left px-4 py-2 border-b">Message</th>
                  <th className="text-center px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">{msg.fullname || 'N/A'}</td>
                    <td className="px-4 py-2">{msg.email}</td>
                    <td className="px-4 py-2">{msg.message}</td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => deleteMessage(msg.id)}>
                        <img className="w-5 active:scale-90 cursor-pointer h-5" src={assets.delete_icon} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoggedInfo;
