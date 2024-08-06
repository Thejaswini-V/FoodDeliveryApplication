// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderStats = () => {
//   const [orderStats, setOrderStats] = useState([]);

//   useEffect(() => {
//     const fetchOrderStats = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/api/orders/getAllOrders');
//         setOrderStats(response.data);
//       } catch (error) {
//         console.error('Error fetching order stats:', error);
//       }
//     };

//     fetchOrderStats();
//   }, []);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Customer ID</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Restaurant ID</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total Amount</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderStats.map((order) => (
//               <tr key={order.orderId}>
//                 <td className="text-left py-3 px-4">{order.orderId}</td>
//                 <td className="text-left py-3 px-4">{order.custId}</td>
//                 <td className="text-left py-3 px-4">{order.restId}</td>
//                 <td className="text-left py-3 px-4">{order.order_total}</td>
//                 <td className="text-left py-3 px-4">{order.orderStatus}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderStats;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const OrderStats = () => {
  const [orderStats, setOrderStats] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverOffset: 4
      }
    ]
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['Customers', 'Restaurants', 'Delivery Partners'],
    datasets: [
      {
        label: 'Count',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  });

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const [orderResponse, customerResponse, restaurantResponse, deliveryPartnerResponse] = await Promise.all([
          axios.get('http://localhost:9000/api/orders/getAllOrders'),
          axios.get('http://localhost:9000/api/customers/customerCount'),
          axios.get('http://localhost:9000/api/restaurants/restaurantCount'),
          axios.get('http://localhost:9000/api/delivery_partner/deliveryPartnerCount')
        ]);

        setOrderStats(orderResponse.data);
        processChartData(orderResponse.data);

        // Assuming the responses contain a single number representing the counts
        processBarChartData({
          customerCount: customerResponse.data.count,
          restaurantCount: restaurantResponse.data.count,
          deliveryPartnerCount: deliveryPartnerResponse.data.count
        });
      } catch (error) {
        console.error('Error fetching order stats:', error);
      }
    };

    const processChartData = (data) => {
      const statusCounts = data.reduce((acc, order) => {
        acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(statusCounts);
      const counts = Object.values(statusCounts);

      setChartData({
        labels: labels,
        datasets: [
          {
            data: counts,
            backgroundColor: labels.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)), // Random colors
            hoverOffset: 4
          }
        ]
      });
    };

    const processBarChartData = (counts) => {
      setBarChartData({
        ...barChartData,
        datasets: [
          {
            ...barChartData.datasets[0],
            data: [counts.customerCount, counts.restaurantCount, counts.deliveryPartnerCount]
          }
        ]
      });
    };

    fetchOrderStats();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Customer ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Restaurant ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total Amount</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderStats.map((order) => (
              <tr key={order.orderId}>
                <td className="text-left py-3 px-4">{order.orderId}</td>
                <td className="text-left py-3 px-4">{order.custId}</td>
                <td className="text-left py-3 px-4">{order.restId}</td>
                <td className="text-left py-3 px-4">{order.order_total}</td>
                <td className="text-left py-3 px-4">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-4">Order Status Distribution</h3>
        <Pie data={chartData} />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Counts of Entities</h3>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default OrderStats;