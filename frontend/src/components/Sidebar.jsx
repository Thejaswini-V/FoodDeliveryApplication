import React from 'react';
import { FaUsers, FaUtensils, FaTruck, FaChartBar } from 'react-icons/fa';
import "./sidebar.css"

const Sidebar = ({ setActiveTab }) => (
  <div className="w-64 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 shadow-lg h-screen fixed">
    <div className="flex items-center justify-center py-4 border-b">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
    </div>
    <ul className="mt-6">
      <li onClick={() => setActiveTab('customers')} className="sidebar-item">
        <FaUsers className="mr-3 text-xl" />
        Customers
      </li>
      <li onClick={() => setActiveTab('restaurants')} className="sidebar-item">
        <FaUtensils className="mr-3 text-xl" />
        Restaurants
      </li>
      <li onClick={() => setActiveTab('deliveryPartners')} className="sidebar-item">
        <FaTruck className="mr-3 text-xl" />
        Delivery Partners
      </li>
      <li onClick={() => setActiveTab('orderStats')} className="sidebar-item">
        <FaChartBar className="mr-3 text-xl" />
        Order Stats
      </li>
    </ul>
  </div>
);

export default Sidebar;
