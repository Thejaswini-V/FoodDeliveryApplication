import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/restaurants/getAllRestaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Address</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.restId}>
                <td className="text-left py-3 px-4">{restaurant.restId}</td>
                <td className="text-left py-3 px-4">{restaurant.restName}</td>
                <td className="text-left py-3 px-4">{restaurant.restMail}</td>
                <td className="text-left py-3 px-4">{restaurant.restPhone}</td>
                <td className="text-left py-3 px-4">{restaurant.restAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurants;
