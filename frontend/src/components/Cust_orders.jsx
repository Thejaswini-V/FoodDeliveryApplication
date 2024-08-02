// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';

// const Cust_orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:9000/api/customers/findOrders', { withCredentials: true })
//       .then(response => {
//         const fetchedOrders = response.data;
//         const foodNameRequests = fetchedOrders.map(order =>
//           axios.get('http://localhost:9000/api/items/findFoodName', {
//             params: { foodId: order.foodId }
//           }).then(res => ({
//             ...order,
//             foodName: res.data
//           }))
//         );

//         Promise.all(foodNameRequests)
//           .then(ordersWithFoodNames => {
//             setOrders(ordersWithFoodNames);
//           })
//           .catch(err => {
//             console.error('Error fetching food names:', err);
//             setError('There was an error fetching the food names!');
//           });

//           // const restNameRequests = fetchedOrders.map(order =>
//           //   axios.get('http://localhost:9000/api/restaurants/findRestName', {
//           //     params: { restId: order.restId ,foodId: order.foodId }
//           //   }).then(res => ({
//           //     ...order,
//           //     restName: res.data
//           //   }))
//           // );
  
//           // Promise.all(restNameRequests)
//           //   .then(ordersWithRestNames => {
//           //     setOrders(ordersWithRestNames);
//           //   })
//           //   .catch(err => {
//           //     console.error('Error fetching rest names:', err);
//           //     setError('There was an error fetching the rest names!');
//           //   });

//       })
//       .catch(error => {
//         setError('There was an error fetching the orders!');
//         console.error('Error fetching orders:', error);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {orders.map(order => (
//           <motion.div
//             key={order.orderId}
//             className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-semibold text-gray-700">{order.foodName}</h3>
//               {order.orderStatus === 'Delivered' ? (
//                 <FaCheckCircle className="text-green-500 text-2xl" />
//               ) : (
//                 <FaTimesCircle className="text-red-500 text-2xl" />
//               )}
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-600"><strong>Quantity:</strong> {order.quantity}</p>
//               <p className="text-gray-600"><strong>Order Total:</strong> ${order.order_total}</p>
//               <p className="text-gray-600"><strong>Order Status:</strong> {order.orderStatus}</p>
//               <p className="text-gray-600"><strong>Restaurant Name</strong> {order.dpId}</p>
//               <p className="text-gray-600"><strong>Suggestion:</strong> {order.suggestion}</p>
              
//             </div>
//             <div className="mt-4">
//               <FaUser className="inline-block text-gray-500 mr-2" />
//               <span className="text-gray-500 text-sm">Order ID: {order.orderId}</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cust_orders;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa'; // Added a clock icon for delivery time
import { MdOutlineFastfood } from 'react-icons/md';

const Cust_orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/customers/findOrders', { withCredentials: true });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('There was an error fetching the orders!');
      }
    };

    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Your Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-8">
        {orders.map(order => (
          <motion.div
            key={order.orderId}
            className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Order ID: {order.orderId}</h3>
              {order.orderStatus === 'Delivered' ? (
                <FaCheckCircle className="text-green-500 text-2xl" />
              ) : (
                <FaTimesCircle className="text-red-500 text-2xl" />
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-700 text-lg font-medium"><strong>Restaurant Name:</strong> {order.restName}</p>
                <p className="text-gray-600"><strong>Order Total:</strong> ₹{order.orderTotal}</p>
                <p className="text-gray-600"><strong>Order Status:</strong> {order.status}</p>
              </div>
              <div className="text-sm text-gray-600 flex items-center">
                <FaRegClock className="text-yellow-500 mr-1" /> {/* Clock Icon */}
                <span>Expected Delivery: {order.expectedDeliveryTime} mins</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0 flex-1">
                <h4 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                  <MdOutlineFastfood className="mr-2 text-xl" /> Items:
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center border-b pb-2">
                      <div className="flex-1">
                        <p className="text-gray-700 font-medium">{item.foodName}</p>
                        <p className="text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
                        <p className="text-gray-600"><strong>Suggestion:</strong> {item.suggestion || 'No suggestion'}</p>
                      </div>
                      {/* <div className="text-right">
                        <p className="text-gray-600 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Paid</span>
                <span className="text-lg font-bold text-gray-800">₹{order.orderTotal}</span>
              </div>
              
            </div>
            <div className="mt-4">
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
                Reorder
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cust_orders;

