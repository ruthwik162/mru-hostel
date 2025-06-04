import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    mobile: '',
    gender: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    mobile: '',
    gender: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserData({
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        mobile: parsedUser.mobile || '',
        gender: parsedUser.gender || '',
      });
    }
  }, []);

  const handleUpdate = async () => {
    if (!user.id) {
      toast.error('User ID is missing');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8087/user/register/${user.id}`,
        userData
      );
      console.log(response)
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
        <img
          className="rounded-md max-h-40 w-full object-cover mb-4"
          src={user.profileimage || 'https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400'}
          alt="User"
        />

        {isEditing ? (
          <>
            <input
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              type="text"
              name="username"
              value={userData.username}
              placeholder="Username"
              onChange={handleInputChange}
            />
            <input
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              type="email"
              name="email"
              value={userData.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
            <input
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              type="text"
              name="mobile"
              value={userData.mobile}
              placeholder="Mobile"
              onChange={handleInputChange}
            />
            <select
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800">{user.username || 'No Name'}</h2>
            <p className="text-gray-600 text-sm mt-1">Email: {user.email || 'N/A'}</p>
            <p className="text-gray-600 text-sm">Mobile: {user.mobile || 'N/A'}</p>
            <p className="text-gray-600 text-sm">Gender: {user.gender || 'N/A'}</p>
          </>
        )}

        <div className="mt-6 flex justify-center">
          <QRCode
            value={JSON.stringify({
              name: user.username,
              email: user.email,
              mobile: user.mobile,
              gender: user.gender,
            })}
            size={150}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <button
          onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md mt-6 w-full transition"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
