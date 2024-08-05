import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaTruck, FaUser } from 'react-icons/fa'; // Added some icons

import Dp_orders from './Dp_orders';
import Dp_profile from './Dp_profile';

const Del_landing = () => {
  const [selectedMenu, setSelectedMenu] = useState('orders');
  const [error, setError] = useState(''); // State for handling errors
  const navigate = useNavigate(); // Using useNavigate for navigation

  // Function to render components based on the selected menu
  const renderComponent = () => {
    switch (selectedMenu) {
      case 'orders':
        return <Dp_orders />;
      case 'profile':
        return <Dp_profile />;
      default:
        return <Dp_orders />;
    }
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9000/api/customers/logout', {}, { withCredentials: true });
      // Clear any existing error state
      setError('');
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {/* Sidebar Navigation */}
      <nav className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 flex flex-col justify-between shadow-lg rounded-r-xl">
        <div>
          <h2 className="text-4xl font-bold mb-8 text-center">
            Delivery Partner Dashboard
          </h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setSelectedMenu('orders')}
                className={`flex items-center space-x-3 w-full text-left py-3 px-5 rounded-lg transition-all ${
                  selectedMenu === 'orders'
                    ? 'bg-white text-orange-500 shadow-lg'
                    : 'hover:bg-orange-400 hover:shadow-md'
                }`}
              >
                <FaTruck className="text-lg" />
                <span>Your Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedMenu('profile')}
                className={`flex items-center space-x-3 w-full text-left py-3 px-5 rounded-lg transition-all ${
                  selectedMenu === 'profile'
                    ? 'bg-white text-orange-500 shadow-lg'
                    : 'hover:bg-orange-400 hover:shadow-md'
                }`}
              >
                <FaUser className="text-lg" />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>
        
        {/* Bottom Section with Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 hover:bg-orange-400 hover:shadow-md transition-all p-3 rounded-lg w-full mt-8"
          >
            <FaSignOutAlt className="text-2xl" />
            <span className="text-lg font-medium">Logout</span>
          </button>
          {error && (
            <div className="mt-4 p-2 bg-red-100 text-red-500 rounded text-center">
              {error}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-10 bg-white shadow-inner overflow-auto rounded-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderComponent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Del_landing;
