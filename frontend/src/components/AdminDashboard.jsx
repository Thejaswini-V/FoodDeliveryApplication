// // src/components/AdminDashboard.js

// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Customers from './Customers';
// import Restaurants from './Restaurants';
// import DeliveryPartners from './DeliveryPartners';
// import OrderStats from './OrderStats';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('customers');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'customers':
//         return <Customers />;
//       case 'restaurants':
//         return <Restaurants />;
//       case 'deliveryPartners':
//         return <DeliveryPartners />;
//       case 'orderStats':
//         return <OrderStats />;
//       default:
//         return <Customers />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar setActiveTab={setActiveTab} />
//       <div className="flex-1 ml-64 p-6"> {/* Adjusted width */}
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
// src/components/AdminDashboard.js

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Customers from './Customers';
import Restaurants from './Restaurants';
import DeliveryPartners from './DeliveryPartners';
import OrderStats from './OrderStats';
import AvailableFoods from './AvailableFoods'; // Import AvailableFoods component
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt, FaUserCircle, FaClipboardList } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customers');

  const renderContent = () => {
    switch (activeTab) {
      case 'customers':
        return <Customers />;
      case 'restaurants':
        return <Restaurants />;
      case 'deliveryPartners':
        return <DeliveryPartners />;
      case 'orderStats':
        return <OrderStats />;
      case 'availableFoods': // Add new case for Available Foods
        return <AvailableFoods />;
      default:
        return <Customers />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
