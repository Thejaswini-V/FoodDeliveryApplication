import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderStats = () => {
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/orders/stats');
        setOrderStats(response.data);
      } catch (error) {
        console.error('Error fetching order stats:', error);
      }
    };

    fetchOrderStats();
  }, []);

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
                <td className="text-left py-3 px-4">{order.totalAmount}</td>
                <td className="text-left py-3 px-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStats;
