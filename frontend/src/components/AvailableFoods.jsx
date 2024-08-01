// src/components/AvailableFoods.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBowlFood } from 'react-icons/fa'; // Import icon for usage

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/items/selectAllFoods');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(foods.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page whenever items per page changes
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaBowlFood className="mr-3 text-orange-500" />
        Available Foods
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">
                Food ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Category</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Type</th>
            </tr>
          </thead>
          <tbody>
            {currentFoods.map((food) => (
              <tr key={food.foodId} className="hover:bg-gray-100">
                <td className="text-left py-3 px-4 border-b">{food.foodId}</td>
                <td className="text-left py-3 px-4 border-b">{food.foodName}</td>
                <td className="text-left py-3 px-4 border-b">{food.foodCategory}</td>
                <td className="text-left py-3 px-4 border-b">{food.vegNonveg ? 'Veg' : 'Non-Veg'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination and Items Per Page */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="mr-2">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div>
            <span className="text-sm">
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, foods.length)} of {foods.length} items
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-2 py-1 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                } hover:bg-blue-400 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableFoods;
