import React from 'react';
import { FaUsers, FaUtensils, FaTruck, FaChartBar, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveTab }) => {
  // Move the useNavigate hook inside the component
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 shadow-lg h-screen fixed">
      <button
          onClick={() => navigate('/login')}
          className="flex items-center mb-6 space-x-3 p-1 rounded-lg hover:bg-orange-500 transition-all"
        >
          <FaArrowLeft className="text-2xl" />
        
        </button>
      <div className="flex items-center justify-center py-4 border-b flex-col">
        
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <ul className="mt-6">
        <li
          onClick={() => setActiveTab('customers')}
          className="sidebar-item flex items-center mb-4 p-3 rounded-lg hover:bg-orange-500 transition-all cursor-pointer"
        >
          <FaUsers className="mr-3 text-xl" />
          <span className="text-lg font-medium">Customers</span>
        </li>
        <li
          onClick={() => setActiveTab('restaurants')}
          className="sidebar-item flex items-center mb-4 p-3 rounded-lg hover:bg-orange-500 transition-all cursor-pointer"
        >
          <FaUtensils className="mr-3 text-xl" />
          <span className="text-lg font-medium">Restaurants</span>
        </li>
        <li
          onClick={() => setActiveTab('deliveryPartners')}
          className="sidebar-item flex items-center mb-4 p-3 rounded-lg hover:bg-orange-500 transition-all cursor-pointer"
        >
          <FaTruck className="mr-3 text-xl" />
          <span className="text-lg font-medium">Delivery Partners</span>
        </li>
        <li
          onClick={() => setActiveTab('orderStats')}
          className="sidebar-item flex items-center mb-4 p-3 rounded-lg hover:bg-orange-500 transition-all cursor-pointer"
        >
          <FaChartBar className="mr-3 text-xl" />
          <span className="text-lg font-medium">Order & User Statistics</span>
        </li>
      </ul>
      <div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:bg-orange-500 hover:shadow-md transition-all p-3 rounded-lg w-full"
          >
            <FaSignOutAlt className="text-2xl" />
            <span className="text-lg font-medium">Logout</span>
          </button>
        </div>
    </div>
  );
};

export default Sidebar;
