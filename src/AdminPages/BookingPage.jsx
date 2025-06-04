import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { blockId } = useParams(); // Extract blockId from the URL
  const [blockData, setBlockData] = useState(null);

  useEffect(() => {
    // Sample data for rooms and slots, this can be replaced with a backend API call
    const blocks = {
      'Girls-1': { name: 'Girls Block 1', rooms: 60, slots: Array(60).fill(false) }, // false means slot is available
      'Girls-2': { name: 'Girls Block 2', rooms: 60, slots: Array(60).fill(false) },
      'Boys-1': { name: 'Boys Block 1', rooms: 60, slots: Array(60).fill(false) },
      'Boys-2': { name: 'Boys Block 2', rooms: 60, slots: Array(60).fill(false) },
      'Boys-3': { name: 'Boys Block 3', rooms: 60, slots: Array(60).fill(false) },
    };

    // Set the block data based on the selected blockId
    setBlockData(blocks[blockId]);
  }, [blockId]);

  const handleSlotBooking = (index) => {
    // Mark the slot as booked (filled)
    const updatedSlots = [...blockData.slots];
    updatedSlots[index] = true;
    setBlockData((prevData) => ({ ...prevData, slots: updatedSlots }));
  };

  if (!blockData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full px-30 py-35 bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">{blockData.name}</h1>
      <p className="text-center mb-6">Total Rooms: {blockData.rooms}</p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {blockData.slots.map((isBooked, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg text-center cursor-pointer ${isBooked ? 'bg-gray-400' : 'bg-green-300 scale-80 hover:scale-95 transition-all'}`}
            onClick={() => !isBooked && handleSlotBooking(index)}  
          >
            {isBooked ? 'Booked' : `Slot ${index + 1}`}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="font-semibold text-lg">Slots Available: {blockData.slots.filter((slot) => !slot).length}</p>
        <p className="font-semibold text-lg">Slots Booked: {blockData.slots.filter((slot) => slot).length}</p>
      </div>
    </div>
  );
};

export default BookingPage;
