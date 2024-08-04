// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';
// // import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';

// // const Dp_orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     axios.get('http://localhost:9000/api/delivery_partner/findOrders', { withCredentials: true })
// //       .then(response => {
// //         setOrders(response.data);
// //       })
// //       .catch(error => {
// //         setError('There was an error fetching the orders!');
// //         console.error('Error fetching orders:', error);
// //       });
// //   }, []);
// //   const handleShipment = async orderId => {
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:9000/api/delivery_partner/delivered',
// //         null,
// //         {
// //           params: { order_id: orderId },
// //           withCredentials: true,
// //         }
// //       );
// //       alert(response.data); // Display success message
// //       // Update the order status locally
// //       setOrders(prevOrders =>
// //         prevOrders.map(order =>
// //           order.orderId === orderId
// //             ? { ...order, orderStatus: 'Delivered' }
// //             : order
// //         )
// //       );
// //     } catch (err) {
// //       console.error('Error updating shipment status:', err);
// //       alert('There was an error updating the shipment status.');
// //     }
// //   };
// //   return (
// //     <div className="container mx-auto p-6">
// //       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
// //       {error && <p className="text-red-500 mb-4">{error}</p>}
// //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //         {orders.map(order => (
// //           <motion.div
// //             key={order.orderId}
// //             className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-xl font-semibold text-gray-700">{order.foodName}</h3>
// //               {order.orderStatus === 'Delivered' ? (
// //                 <FaCheckCircle className="text-green-500 text-2xl" />
// //               ) : (
// //                 <FaTimesCircle className="text-red-500 text-2xl" />
// //               )}
// //             </div>
// //             <div className="space-y-2">
// //               <p className="text-gray-600"><strong>Quantity:</strong> {order.quantity}</p>
// //               <p className="text-gray-600"><strong>Order Total:</strong> ${order.order_total}</p>
// //               <p className="text-gray-600"><strong>Order Status:</strong> {order.orderStatus}</p>
// //               <p className="text-gray-600"><strong>Delivery Partner ID:</strong> {order.dpId}</p>
// //               <p className="text-gray-600"><strong>Suggestion:</strong> {order.suggestion}</p>
              
// //             </div>
// //             <div className="mt-4">
// //               <FaUser className="inline-block text-gray-500 mr-2" />
// //               <span className="text-gray-500 text-sm">Order ID: {order.orderId}</span>
// //               {order.orderStatus !== 'Delivered' && (
// //                 <button
// //                   onClick={() => handleShipment(order.orderId)}
// //                   className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
// //                 >
// //                   Mark as Delivered
// //                 </button>
// //               )}
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dp_orders;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';
// // import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';

// // const Dp_orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:9000/api/delivery_partner/findOrders', {
// //           withCredentials: true
// //         });
// //         const fetchedOrders = response.data;

// //         // Group orders by customer, restaurant, and order time
// //         const groupedOrders = fetchedOrders.reduce((acc, order) => {
// //           const key = `${order.custId}-${order.restName}-${order.orderTime}`;
// //           if (!acc[key]) {
// //             acc[key] = {
// //               restName: order.restName,
// //               custId: order.custId,
// //               orderTime: order.orderTime,
// //               items: [],
// //               orderTotal: 0,
// //               orderStatus: order.orderStatus,
// //               orderId: order.orderId
// //             };
// //           }

// //           order.items.forEach(item => {
// //             acc[key].items.push(item);
// //             acc[key].orderTotal += item.quantity * item.price;
// //           });

// //           return acc;
// //         }, {});

// //         const formattedOrders = Object.keys(groupedOrders).map(key => ({
// //           ...groupedOrders[key],
// //           orderId: groupedOrders[key].orderId,
// //           orderStatus: groupedOrders[key].orderStatus
// //         }));

// //         setOrders(formattedOrders);
// //       } catch (error) {
// //         setError('There was an error fetching the orders!');
// //         console.error('Error fetching orders:', error);
// //       }
// //     };

// //     fetchOrders();
// //   }, []);

// //   // Function to handle delivery
// //   const handleDelivery = async orderId => {
// //     try {
// //       const response = await axios.post(
// //         'http://localhost:9000/api/delivery_partner/delivered',
// //         null,
// //         {
// //           params: { order_id: orderId },
// //           withCredentials: true,
// //         }
// //       );
// //       alert(response.data); // Display success message
// //       // Update the order status locally
// //       setOrders(prevOrders =>
// //         prevOrders.map(order =>
// //           order.orderId === orderId
// //             ? { ...order, orderStatus: 'Delivered' }
// //             : order
// //         )
// //       );
// //     } catch (err) {
// //       console.error('Error updating delivery status:', err);
// //       alert('There was an error updating the delivery status.');
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       <motion.h2
// //         initial={{ opacity: 0, y: -20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.3 }}
// //         className="text-3xl font-bold mb-6 text-gray-800"
// //       >
// //         Delivery Partner Orders
// //       </motion.h2>
// //       {error && (
// //         <motion.p
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ duration: 0.3 }}
// //           className="text-red-500 mb-4"
// //         >
// //           {error}
// //         </motion.p>
// //       )}
// //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //         {orders.map(order => (
// //           <motion.div
// //             key={order.orderId}
// //             className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-xl font-semibold text-gray-700">{order.restName}</h3>
// //               {order.orderStatus === 'Delivered' ? (
// //                 <FaCheckCircle className="text-green-500 text-2xl" />
// //               ) : (
// //                 <FaTimesCircle className="text-red-500 text-2xl" />
// //               )}
// //             </div>
// //             <div className="space-y-2">
// //               {order.items.map((item, index) => (
// //                 <div key={index} className="border-b border-gray-300 pb-2 mb-2">
// //                   <p className="text-gray-600">
// //                     <strong>Food:</strong> {item.foodName}
// //                   </p>
// //                   <p className="text-gray-600">
// //                     <strong>Quantity:</strong> {item.quantity}
// //                   </p>
// //                   <p className="text-gray-600">
// //                     <strong>Suggestion:</strong> {item.suggestion || 'None'}
// //                   </p>
// //                 </div>
// //               ))}
// //               <p className="text-gray-600">
// //                 <strong>Order Total:</strong> ${order.orderTotal.toFixed(2)}
// //               </p>
// //               <p className="text-gray-600">
// //                 <strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}
// //               </p>
// //               <p className="text-gray-600">
// //                 <strong>Order Status:</strong> {order.orderStatus}
// //               </p>
// //               <p className="text-gray-600">
// //                 <strong>Delivery Partner ID:</strong> {order.dpId}
// //               </p>
// //             </div>
// //             <div className="mt-4 flex justify-between items-center">
// //               <FaUser className="inline-block text-gray-500 mr-2" />
// //               <span className="text-gray-500 text-sm">Customer ID: {order.custId}</span>
// //               {order.orderStatus !== 'Delivered' && (
// //                 <button
// //                   onClick={() => handleDelivery(order.orderId)}
// //                   className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
// //                 >
// //                   Mark as Delivered
// //                 </button>
// //               )}
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dp_orders;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';
// // import { FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';

// // const Dp_orders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         // Fetch orders
// //         const response = await axios.get('http://localhost:9000/api/delivery_partner/findOrders', { withCredentials: true });
// //         const fetchedOrders = response.data;

// //         // Process orders to include food and restaurant names
// //         const processedOrders = fetchedOrders.map(order => ({
// //           ...order,
// //           foodName: order.items.map(item => item.foodName).join(', '),
// //           quantity: order.items.reduce((acc, item) => acc + item.quantity, 0),
// //           suggestion: order.items.map(item => item.suggestion).join(', ')
// //         }));

// //         setOrders(processedOrders);
// //       } catch (err) {
// //         console.error('Error fetching orders:', err);
// //         setError('There was an error fetching the orders or names!');
// //       }
// //     };

// //     fetchOrders();
// //   }, []);

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>
// //       {error && <p className="text-red-500 mb-4">{error}</p>}
// //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //         {orders.map(order => (
// //           <motion.div
// //             key={order.orderId}
// //             className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="text-xl font-semibold text-gray-700">{order.foodName}</h3>
// //               {order.orderStatus === 'Delivered' ? (
// //                 <FaCheckCircle className="text-green-500 text-2xl" />
// //               ) : (
// //                 <FaTimesCircle className="text-red-500 text-2xl" />
// //               )}
// //             </div>
// //             <div className="space-y-2">
// //               <p className="text-gray-600"><strong>Quantity:</strong> {order.quantity}</p>
// //               <p className="text-gray-600"><strong>Order Total:</strong> ${order.orderTotal}</p>
// //               {/* <p className="text-gray-600"><strong>Order Status:</strong> {order.orderStatus}</p> */}
// //               <p className="text-gray-600"><strong>Restaurant Name:</strong> {order.restName}</p>
// //               <p className="text-gray-600"><strong>Suggestion:</strong> {order.suggestion}</p>
// //             </div>
// //             <div className="mt-4">
// //               <FaUser className="inline-block text-gray-500 mr-2" />
// //               <span className="text-gray-500 text-sm">Order ID: {order.orderId}</span>
// //             </div>
// //             <button
// //                   onClick={() => handleShipment(order.restName)}
// //                   className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
// //                 >
// //                   Mark as Delivered
// //                 </button>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dp_orders;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaCheckCircle, FaTimesCircle, FaUser, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
// import { FiPhone } from 'react-icons/fi';

// const Dp_orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           'http://localhost:9000/api/delivery_partner/findOrders',
//           { withCredentials: true }
//         );
//         const fetchedOrders = response.data;
//         setOrders(fetchedOrders);
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//         setError('There was an error fetching the orders!');
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleShipment = async (orderId) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:9000/api/delivery_partner/delivered',
//         null,
//         {
//           params: { order_id: orderId },
//           withCredentials: true,
//         }
//       );
//       alert(response.data); // Display success message
//       // Update the order status locally
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order.orderId === orderId
//             ? { ...order, orderStatus: 'Delivered' }
//             : order
//         )
//       );
//     } catch (err) {
//       console.error('Error updating shipment status:', err);
//       alert('There was an error updating the shipment status.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="text-3xl font-bold mb-8 text-gray-900"
//       >
//         Delivery Partner Orders
//       </motion.h2>
//       {error && (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className="text-red-500 mb-4"
//         >
//           {error}
//         </motion.p>
//       )}
//       <div className="space-y-8">
//         {orders.map(order => (
//           <motion.div
//             key={order.orderId}
//             className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Order ID: {order.orderId}
//               </h3>
//               {order.orderStatus === 'Delivered' ? (
//                 <FaCheckCircle className="text-green-500 text-2xl" />
//               ) : (
//                 <FaTimesCircle className="text-red-500 text-2xl" />
//               )}
//             </div>
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <p className="text-gray-700 text-lg font-medium">
//                   <strong>Restaurant Name:</strong> {order.restName}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Order Total:</strong> ₹{order.orderTotal}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Food Items:</strong> {order.items.map((item) => item.foodName).join(', ')}
//                 </p>
//               </div>
//               <div className="text-sm text-gray-600 flex items-center">
//                 <FaClock className="text-yellow-500 mr-1" /> {/* Clock Icon */}
//                 <span>Expected Delivery: {order.expectedDeliveryTime} mins</span>
//               </div>
//             </div>
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//               <div className="mb-4 md:mb-0 flex-1">
//                 <h4 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
//                   <FaMapMarkerAlt className="mr-2 text-xl" /> Delivery Address:
                  
//                 </h4>
//                 <p className="text-gray-600">{order.location}</p>
//                 <h4 className="text-lg font-semibold text-gray-700 flex items-center mt-4 mb-2">
//                   <FiPhone className="mr-2 text-xl" /> Contact:
//                 </h4>
//                 <p className="text-gray-600">{order.custPhone}</p>
//               </div>
//             </div>
//             <div className="border-t mt-4 pt-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 font-medium">Total Amount</span>
//                 <span className="text-lg font-bold text-gray-800">₹{order.orderTotal}</span>
//               </div>
//               <div className="text-sm text-green-600 mt-2">
//                 <span>You have saved ₹{order.discount} on the bill!</span>
//               </div>
//             </div>
//             <div className="mt-4">
//               {order.orderStatus !== 'Delivered' && (
//                 <button
//                   onClick={() => handleShipment(order.orderId)}
//                   className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-lg hover:bg-orange-600 transition duration-200"
//                 >
//                   Mark as Delivered
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dp_orders;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaUser, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Custom Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const Dp_orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:9000/api/delivery_partner/findOrders',
          { withCredentials: true }
        );

        const fetchedOrders = response.data;

        // Fetch coordinates for each order's delivery and restaurant location
        const updatedOrders = await Promise.all(
          fetchedOrders.map(async (order) => {
            const deliveryCoordinates = await getCoordinates(order.location);
            const restaurantCoordinates = await getCoordinates(order.rest_addr);
            if (deliveryCoordinates && restaurantCoordinates) {
              const distance = haversineDistance(
                deliveryCoordinates.lat,
                deliveryCoordinates.lon,
                restaurantCoordinates.lat,
                restaurantCoordinates.lon
              );

              const averageSpeed = 40; // Average speed in km/h
              const estimatedTime = Math.ceil((distance / averageSpeed) * 60); // Time in minutes

              return {
                ...order,
                deliveryCoordinates,
                restaurantCoordinates,
                estimatedDeliveryTime: estimatedTime,
              };
            }

            return {
              ...order,
              deliveryCoordinates,
              restaurantCoordinates,
            };
          })
        );

        setOrders(updatedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('There was an error fetching the orders!');
      }
      finally{
        setLoading(false);
      }
    };

    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);
  }, []);

  // Function to fetch coordinates for an address using OpenStreetMap Nominatim API
  const getCoordinates = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      }
      return null;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const handleShipment = async (orderId) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/delivery_partner/delivered',
        null,
        {
          params: { order_id: orderId },
          withCredentials: true,
        }
      );
      alert(response.data); // Display success message
      // Update the order status locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatus: 'Delivered' }
            : order
        )
      );
    } catch (err) {
      console.error('Error updating shipment status:', err);
      alert('There was an error updating the shipment status.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <img
            src="./images/car.gif"
            alt="Loading..."
            style={{ width: '512px', height: '512px' }}
          />
        </div>
      ) :(
        <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold mb-8 text-gray-900"
      >
        Delivery Partner Orders
      </motion.h2>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-red-500 mb-4"
        >
          {error}
        </motion.p>
      )}
      <div className="space-y-8">
        {orders.map((order) => (
          <motion.div
            key={order.orderId}
            className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Order ID: {order.orderId}
              </h3>
              {order.orderStatus === 'Delivered' ? (
                <FaCheckCircle className="text-green-500 text-2xl" />
              ) : (
                <FaTimesCircle className="text-red-500 text-2xl" />
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-700 text-lg font-medium">
                  <strong>Restaurant Name:</strong> {order.restName}
                </p>
                <p className="text-gray-600">
                  <strong>Order Total:</strong> ₹{order.orderTotal}
                </p>
                <p className="text-gray-600">
                  <strong>Food Items:</strong>{' '}
                  {order.items.map((item) => item.foodName).join(', ')}
                </p>
              </div>
              <div className="text-sm text-gray-600 flex items-center">
                <FaClock className="text-yellow-500 mr-1" /> {/* Clock Icon */}
                <span>Estimated Delivery: {order.estimatedDeliveryTime || order.expectedDeliveryTime} mins</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0 flex-1">
                <h4 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2 text-xl" /> Delivery Address:
                </h4>
                <p className="text-gray-600">{order.location}</p>
                <h4 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2 text-xl" /> Restaurant Address:
                </h4>
                <p className="text-gray-600">{order.rest_addr}</p>
                <h4 className="text-lg font-semibold text-gray-700 flex items-center mt-4 mb-2">
                  <FiPhone className="mr-2 text-xl" /> Contact:
                </h4>
                <p className="text-gray-600">{order.custPhone}</p>
              </div>
            </div>

            {/* Display Leaflet Map with both Delivery and Restaurant Address Pins */}
            {order.deliveryCoordinates && order.restaurantCoordinates ? (
              <MapContainer
                center={[
                  (order.deliveryCoordinates.lat + order.restaurantCoordinates.lat) / 2,
                  (order.deliveryCoordinates.lon + order.restaurantCoordinates.lon) / 2,
                ]}
                zoom={13}
                style={{ width: '100%', height: '300px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marker for Delivery Location */}
                <Marker position={[order.deliveryCoordinates.lat, order.deliveryCoordinates.lon]}>
                  <Popup>
                    <strong>Delivery Location</strong>
                    <br />
                    {order.location}
                  </Popup>
                </Marker>

                {/* Marker for Restaurant Location */}
                <Marker
                  position={[
                    order.restaurantCoordinates.lat,
                    order.restaurantCoordinates.lon,
                  ]}
                >
                  <Popup>
                    <strong>Restaurant Location</strong>
                    <br />
                    {order.rest_addr}
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <p>Loading map...</p>
            )}

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Amount</span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{order.orderTotal}
                </span>
              </div>
            </div>
            <div className="mt-4">
              {order.orderStatus !== 'Delivered' && (
                <button
                  onClick={() => handleShipment(order.orderId)}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-lg hover:bg-orange-600 transition duration-200"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};

export default Dp_orders;
