import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaUserEdit } from 'react-icons/fa';

const Cust_profile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/customers/get', { withCredentials: true })
      .then((response) => {
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch customer details.');
        setLoading(false);
        console.error('Error fetching customer details:', error);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative bg-white shadow-2xl rounded-2xl p-8 max-w-lg mx-auto text-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            src="./images/profile.png" // Placeholder image, replace with actual image URL
            alt="Profile"
          />
        </div>

        {/* Profile Content */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            {customer.custName}
          </h2>
          <div className="space-y-5 text-left text-gray-700">
            <div className="flex items-center justify-center">
              <FaEnvelope className="mr-3 text-orange-500" />
              <strong className="mr-2">Email:</strong>
              <span>{customer.custMail}</span>
            </div>
            <div className="flex items-center justify-center">
              <FaMapMarkerAlt className="mr-3 text-orange-500" />
              <strong className="mr-2">Address:</strong>
              <span>{customer.custAddress}</span>
            </div>
            <div className="flex items-center justify-center">
              <FaPhone className="mr-3 text-orange-500" />
              <strong className="mr-2">Phone:</strong>
              <span>{customer.custPhone}</span>
            </div>
            {/* Add other fields as needed */}
          </div>
          {/* <button className="mt-8 bg-gradient-to-r from-orange-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 hover:from-orange-700 hover:to-orange-700 transition-all duration-300">
            <FaUserEdit />
            Update Profile
          </button> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Cust_profile;
