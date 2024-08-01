import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryPartners = () => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);

  useEffect(() => {
    const fetchDeliveryPartners = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/delivery_partner/getAllDP');
        setDeliveryPartners(response.data);
      } catch (error) {
        console.error('Error fetching delivery partners:', error);
      }
    };

    fetchDeliveryPartners();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Delivery Partners</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Availability</th>
            </tr>
          </thead>
          <tbody>
            {deliveryPartners.map((partner) => (
              <tr key={partner.delId}>
                <td className="text-left py-3 px-4">{partner.deliveryId}</td>
                <td className="text-left py-3 px-4">{partner.deliveryName}</td>
                
                <td className="text-left py-3 px-4">{partner.dpMail}</td>
                <td className="text-left py-3 px-4">{partner.deliveryPhn}</td>
                
                <td className="text-left py-3 px-4">{partner.dpavailable?"Yes":"No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryPartners;
