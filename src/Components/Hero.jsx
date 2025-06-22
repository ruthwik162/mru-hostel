import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext/AppContext';

const Hero = () => {
  const { navigate, setShowUserLogin, user } = useAppContext();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = () => {
    if (!user) {
      setShowUserLogin(true);
    } else {
      navigate("/plan");
    }
  };

  return (
    <div className='flex flex-col md:py-10 py-20 text-white p-30 justify-center items-start px-6 md:px-6 lg:px-24 xl:px-34 bg-[url("/src/assets/heroMru.jpg")] bg-cover bg-no-repeat w-screen h-screen'>
      <div className={`h-[580px] w-full max-w-5xl mx-auto transition-all duration-1000 ease-out 
          ${animate ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'} 
          flex flex-col items-center border-2 rounded-2xl bg-orange-500/85 justify-center px-4 text-center`}
      >
        <div className="flex flex-row items-center justify-center gap-2.5 mb-6 border border-white-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-[1w]  text-white-800 max-w-full z-0">
          <p>Launching our new platform update.</p>
          <div className="flex items-center cursor-pointer gap-2 bg-indigo-400 border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
            <p>Explore</p>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-white-800">
          Malla Reddy University <br /> Hostels
        </h1>
        <p className="max-w-xl text-center mt-6 px-4">
          Unlock potential with tailored strategies designed for success. Simplify challenges, maximize results,
          and stay ahead in the competitive market.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={handleNavigation}
            type="button"
            className="w-40 py-3 active:scale-95 cursor-pointer transition text-sm text-white rounded-lg bg-indigo-500 hover:bg-indigo-600"
          >
            <p className="mb-0.5">Join Now</p>
          </button>

          <button
            onClick={() => navigate("/about")}
            className="group px-7 py-2.5 active:scale-95 flex items-center gap-2 font-medium border border-white rounded-lg hover:bg-white/10"
          >
            Learn more
            <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9"
              viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#ffffff" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
