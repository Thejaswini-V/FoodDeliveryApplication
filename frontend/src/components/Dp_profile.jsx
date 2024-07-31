import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Dp_profile = () => {
  const [deliveryPartner, setDeliveryPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/delivery_partner/get', { withCredentials: true })
      .then((response) => {
        setDeliveryPartner(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch delivery partner details.');
        setLoading(false);
        console.error('Error fetching delivery partner details:', error);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto text-center"
      >
        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-12">
          <img
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            src="https://via.placeholder.com/150" // Placeholder image, replace with actual image URL
            alt="Profile"
          />
        </div>

        {/* Profile Content */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {deliveryPartner.deliveryName}
          </h2>
          <div className="space-y-4 text-left">
            <p className="text-gray-700 flex items-center justify-center">
              <FaEnvelope className="mr-2 text-purple-500" />
              <strong>Email:</strong> {deliveryPartner.dpMail}
            </p>
            <p className="text-gray-700 flex items-center justify-center">
              <FaPhone className="mr-2 text-purple-500" />
              <strong>Phone:</strong> {deliveryPartner.deliveryPhn}
            </p>
            <p className="text-gray-700 flex items-center justify-center">
              <FaMapMarkerAlt className="mr-2 text-purple-500" />
              <strong>Availability:</strong> {deliveryPartner.dpavailable ? 'Yes' : 'No'}
            </p>
            {/* Additional fields if needed */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dp_profile;
