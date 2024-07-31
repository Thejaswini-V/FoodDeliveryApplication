import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/restaurants/get', { withCredentials: true })
      .then((response) => {
        setRestaurant(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch restaurant details.');
        setLoading(false);
        console.error('Error fetching restaurant details:', error);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-orange-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center"
      >
        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-12">
          <img
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            src="https://via.placeholder.com/150" // Placeholder image, replace with real image
            alt="Profile"
          />
        </div>

        {/* Action Icons */}
        

        {/* Profile Content */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {restaurant.restName}
          </h2>
          <p className="text-gray-600 mb-4">{restaurant.restAddress}</p>
          <p className="text-gray-700 font-medium mb-6">
            Culinary Expert - Special Dishes
          </p>
          

          <div className="flex justify-around text-gray-800 text-sm">
            <div>
              <span className="block text-xl font-bold">120</span>
              <span>Dishes</span>
            </div>
            
            <div>
              <span className="block text-xl font-bold">5 Star</span>
              <span>Ratings</span>
            </div>
          </div>
          <button className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-pink-700 transition duration-200">
            Update Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
