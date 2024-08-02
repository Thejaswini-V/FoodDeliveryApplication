// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// import Cust_orders from './Cust_orders';
// import Cust_profile from './Cust_profile';

// const Cust_page = () => {
//   const [selectedMenu, setSelectedMenu] = useState('orders');

//   const renderComponent = () => {
//     switch (selectedMenu) {
//       case 'orders':
//         return <Cust_orders />;
//       case 'profile':
//         return <Cust_profile />;
//       default:
//         return <Cust_orders />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <nav className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//         <h2 className="text-4xl font-bold mb-8 text-center">Customer Dashboard</h2>
//         <ul className="space-y-4">
//           <li>
//             <button
//               onClick={() => setSelectedMenu('orders')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'orders' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Your Orders
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setSelectedMenu('profile')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'profile' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Profile
//             </button>
//           </li>
//         </ul>
//       </nav>
//       <div className="flex-1 p-10 bg-gray-100 overflow-auto">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {renderComponent()}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Cust_page;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt, FaUserCircle, FaClipboardList } from 'react-icons/fa'; // Importing icons

import Cust_orders from './Cust_orders';
import Cust_profile from './Cust_profile';

const Cust_page = () => {
  const [selectedMenu, setSelectedMenu] = useState('orders');
  const navigate = useNavigate(); // Using useNavigate for navigation

  const renderComponent = () => {
    switch (selectedMenu) {
      case 'orders':
        return <Cust_orders />;
      case 'profile':
        return <Cust_profile />;
      default:
        return <Cust_orders />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      {/* Sidebar Navigation */}
      <nav className="w-1/4 bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 flex flex-col justify-between shadow-lg">
        {/* Top Section with Go Back Button */}
        <div>
          <button
            onClick={() => navigate('/customerpage')}
            className="flex items-center mb-6 space-x-3 p-3 rounded-lg hover:bg-orange-500 transition-all"
          >
            <FaArrowLeft className="text-2xl" />
            <span className="text-lg font-medium">Go Back</span>
          </button>
          
          <h2 className="text-4xl font-bold mb-8 text-center">Customer Dashboard</h2>
          
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setSelectedMenu('orders')}
                className={`flex items-center space-x-3 w-full text-left py-3 px-5 rounded-lg transition-all ${
                  selectedMenu === 'orders'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'hover:bg-orange-500 hover:shadow-md'
                }`}
              >
                <FaClipboardList className="text-lg" />
                <span>Your Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedMenu('profile')}
                className={`flex items-center space-x-3 w-full text-left py-3 px-5 rounded-lg transition-all ${
                  selectedMenu === 'profile'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'hover:bg-orange-500 hover:shadow-md'
                }`}
              >
                <FaUserCircle className="text-lg" />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>
        
        {/* Bottom Section with Logout Button */}
        <div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:bg-orange-500 hover:shadow-md transition-all p-3 rounded-lg w-full"
          >
            <FaSignOutAlt className="text-2xl" />
            <span className="text-lg font-medium">Logout</span>
          </button>
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

export default Cust_page;

