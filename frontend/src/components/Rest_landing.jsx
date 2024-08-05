// import React, { useState } from 'react';

// // Components for different sections
// import Orders from './Orders';
// import AddMenu from './AddMenu';
// import AddFoodItem from './AddFoodItem';
// import Profile from './Profile';

// const RestLanding = () => {
//   const [selectedMenu, setSelectedMenu] = useState('orders');

//   const renderComponent = () => {
//     switch (selectedMenu) {
//       case 'orders':
//         return <Orders />;
//       case 'addmenu':
//         return <AddMenu />;
//       case 'additem':
//         return <AddFoodItem />;
//       case 'profile':
//         return <Profile />;
//       default:
//         return <Orders />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <nav className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
//         <h2 className="text-4xl font-bold mb-8 text-center">Restaurant Dashboard</h2>
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
//               onClick={() => setSelectedMenu('addmenu')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'addmenu' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Add Menu
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setSelectedMenu('additem')}
//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'additem' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}
//             >
//               Add Food Item
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
//         {renderComponent()}
//       </div>
//     </div>
//   );
// };

// export default RestLanding;


 

// Components for different sections

// import Orders from './Orders';

// import AddMenu from './AddMenu';

// import AddFoodItem from './AddFoodItem';

// import Profile from './Profile';

// import Mymenu from './Mymenu';
// import { FaSignOutAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

 

// const RestLanding = () => {

//   const [selectedMenu, setSelectedMenu] = useState('orders');
//   const navigate=useNavigate();
 

//   const renderComponent = () => {

//     switch (selectedMenu) {

//       case 'orders':

//         return <Orders />;

//       case 'addmenu':

//         return <AddMenu />;

//       case 'additem':

//         return <AddFoodItem />;

//       case 'Mymenu':

//         return <Mymenu/>;

//       case 'profile':

//         return <Profile />;

     

//       default:

//         return <Orders />;

//     }

//   };

 

//   return (

//     <div className="flex h-screen bg-gray-100">

//       <nav className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">

//         <h2 className="text-4xl font-bold mb-8 text-center">Restaurant Dashboard</h2>

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

//               onClick={() => setSelectedMenu('addmenu')}

//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'addmenu' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

//             >

//               Add Menu

//             </button>

//           </li>

//           <li>

//             <button

//               onClick={() => setSelectedMenu('additem')}

//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'additem' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

//             >

//               Add Food Item

//             </button>

//           </li>

//           <li>

//             <button

//               onClick={() => setSelectedMenu('Mymenu')}

//               className={`block w-full text-left py-3 px-5 rounded-lg transition-all ${selectedMenu === 'Mymenu' ? 'bg-white text-orange-500 shadow-lg' : 'hover:bg-orange-400 hover:shadow-md'}`}

//             >

//               Mymenu

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
//         <div>
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center space-x-3 hover:bg-orange-500 hover:shadow-md transition-all p-3 rounded-lg w-full"
//           >
//             <FaSignOutAlt className="text-2xl" />
//             <span className="text-lg font-medium">Logout</span>
//           </button>
//         </div>

//       </nav>
      

//       <div className="flex-1 p-10 bg-gray-100 overflow-auto">

//         {renderComponent()}

//       </div>

//     </div>

//   );

// };

 

// export default RestLanding;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUtensils, FaPlus, FaHamburger, FaUser, FaList } from 'react-icons/fa'; // Icons for navigation

// Components for different sections
import Orders from './Orders';
import AddMenu from './AddMenu';
import AddFoodItem from './AddFoodItem';
import Profile from './Profile';
import Mymenu from './Mymenu';

const RestLanding = () => {
  const [selectedMenu, setSelectedMenu] = useState('orders');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (selectedMenu) {
      case 'orders':
        return <Orders />;
      case 'addmenu':
        return <AddMenu />;
      case 'additem':
        return <AddFoodItem />;
      case 'Mymenu':
        return <Mymenu />;
      case 'profile':
        return <Profile />;
      default:
        return <Orders />;
    }
  };

  const handleLogout = async () => {
    try {
      // Perform logout request to the backend
      await axios.post('http://localhost:9000/api/restaurants/logout', {}, { withCredentials: true });
      setError(''); // Clear error message if any

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <nav className="w-1/4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 flex flex-col justify-between shadow-lg rounded-r-xl">
        <div>
          <h2 className="text-4xl font-bold mb-8 text-center">Restaurant Dashboard</h2>
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
                <FaList className="text-lg" />
                <span>Your Orders</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedMenu('addmenu')}
                className={`flex items-center space-x-3 w-full text-left py-3 px-5 rounded-lg transition-all ${
                  selectedMenu === 'addmenu'
                    ? 'bg-white text-orange-500 shadow-lg'
                    : 'hover:bg-orange-400 hover:shadow-md'
                }`}
              >
                <FaPlus className="text-lg" />
                <span>Add Menu</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedMenu('additem')}
                className={`flex items-center space-x-3 w-full text-left py-3 px-5 rounded-lg transition-all ${
                  selectedMenu === 'additem'
                    ? 'bg-white text-orange-500 shadow-lg'
                    : 'hover:bg-orange-400 hover:shadow-md'
                }`}
              >
                <FaHamburger className="text-lg" />
                <span>Add Food Item</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedMenu('Mymenu')}
                className={`flex items-center space-x-3 w-full text-left py-3 px-5 rounded-lg transition-all ${
                  selectedMenu === 'Mymenu'
                    ? 'bg-white text-orange-500 shadow-lg'
                    : 'hover:bg-orange-400 hover:shadow-md'
                }`}
              >
                <FaUtensils className="text-lg" />
                <span>My Menu</span>
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
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 hover:bg-orange-500 hover:shadow-md transition-all p-3 rounded-lg w-full mt-8"
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

      <div className="flex-1 p-10 bg-white shadow-inner overflow-auto rounded-xl">
        {renderComponent()}
      </div>
    </div>
  );
};

export default RestLanding;
