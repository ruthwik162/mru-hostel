import React from 'react';
import { motion } from 'framer-motion'; 
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <motion.footer
            className="px-6  sm:pt-1 md:pt-5 md:px-16 lg:px-24 xl:px-32 w-full bg-black/90 text-gray-500 mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <motion.div
                    className="md:max-w-96"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, type: 'spring' }}
                >
                    {/* Apply invert effect to the image */}
                    <img className="h-30 filter invert" src={assets.mrulogo} alt="dummyLogoDark" />
                    <p className="mt-4">
                        Maisammaguda, Dulapally, Hyderabad, Telangana 500100
                        <br />
                        Phone: 94971-94971, 91778-78365
                        <br />
                        <a href="mailto:info@mallareddyuniversity.ac.in" className="text-indigo-300">info@mallareddyuniversity.ac.in</a>
                        <br />
                        <a href="mailto:admissions@mallareddyuniversity.ac.in" className="text-indigo-300">admissions@mallareddyuniversity.ac.in</a>
                    </p>
                </motion.div>
                
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <motion.div
                        className="space-y-4"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: 'spring' }}
                    >
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-indigo-400">Home</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-indigo-400">About us</a></li>
                            <li><a href="/contactus" className="text-gray-400 hover:text-indigo-400">Contact us</a></li>
                            <li><a href="/plan" className="text-gray-400 hover:text-indigo-400">Plan</a></li>
                        </ul>
                    </motion.div>
                    
                    <motion.div
                        className="space-y-4"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: 'spring' }}
                    >
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+91 94971-94971</p>
                            <p>+91 91778-78365</p>
                            <p><a href="mailto:mallareddyuniversity.ac.in" className="text-indigo-300">mallareddyuniversity.ac.in</a></p>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            <motion.p
                className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                © {new Date().getFullYear()} Malla Reddy University Hostels. All Rights Reserved.
            </motion.p>
        </motion.footer>
    );
};

export default Footer;
