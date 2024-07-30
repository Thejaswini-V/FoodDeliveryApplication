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

const Cust_orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

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

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => (
          <motion.div
            key={order.orderId}
            className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Order ID: {order.orderId}</h3>
              <p className="text-gray-600"><strong>Restaurant Name:</strong> {order.restName}</p>
              <p className="text-gray-600"><strong>Order Total:</strong> ${order.orderTotal}</p>
              
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gray-700">Items:</h4>
              {order.items.map((item, index) => (
                <div key={index} className="pl-4 border-l-2 border-gray-200">
                  <p className="text-gray-600"><strong>Food Name:</strong> {item.foodName}</p>
                  <p className="text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
                  <p className="text-gray-600"><strong>Suggestion:</strong> {item.suggestion}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cust_orders;
