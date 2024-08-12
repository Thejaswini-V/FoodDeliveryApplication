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

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/orders/getAllOrders');
        setOrderStats(response.data);
        processChartData(response.data);
      } catch (error) {
        console.error('Error fetching order stats:', error);
      }
    };

    fetchOrderStats();
  }, []);

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
                backgroundColor: labels.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16)), 
                hoverOffset: 4
              }
            ]
          });
        };
    

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
      <div className="overflow-x-auto">
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', }}> <h3 className="text-xl font-bold mb-4">Order Status Distribution</h3> <div style={{ width: '300px', height: '300px' }}> <Pie data={chartData} /> </div> </div>
    </div>
  );
};

export default OrderStats;
