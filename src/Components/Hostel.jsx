import React, { useEffect, useState } from 'react';

const Hostel = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100); // Delay animation by 100ms
    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div className="flex items-center justify-center min-h-1/2"> {/* Centering the content */}
            <div
        className={`bg-white items-center justify-center rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 lg:p-10 max-w-4xl text-gray-700 text-lg leading-relaxed transform transition-all duration-1000 ease-out
        ${animate ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-24 scale-90 opacity-0'}`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-indigo-600 tracking-wide">
          Hostel Overview
        </h2>
        <p className="tracking-normal text-base sm:text-lg">
          Malla Reddy University hostel is a home away from home for the students.
          Separate Hostel Buildings for Girls & Boys are available. Malla Reddy University Hostels
          have all the required facilities for the students to have a comfortable stay and a family
          atmosphere. It aims at ensuring harmonious, friendly living among students from various
          places, inculcating self-discipline. The hostel serves as a training ground for a responsible,
          successful, and useful life through the development of the body, mind, and soul. It is a walled
          campus hostel with a single entry and 24-hour security.
        </p>
      </div>
    </div>
  );
};

export default Hostel;
