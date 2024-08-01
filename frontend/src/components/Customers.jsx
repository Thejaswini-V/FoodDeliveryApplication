// src/components/Customers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa'; // For action icons

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/customers/getAll');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page whenever items per page changes
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">
                <input type="checkbox" />
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Phone</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Address</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.custId} className="hover:bg-gray-100">
                <td className="text-left py-3 px-4 border-b">
                  <input type="checkbox" />
                </td>
                <td className="text-left py-3 px-4 border-b">{customer.custName}</td>
                <td className="text-left py-3 px-4 border-b">{customer.custMail}</td>
                <td className="text-left py-3 px-4 border-b">{customer.custPhone}</td>
                <td className="text-left py-3 px-4 border-b">{customer.custAddress}</td>
                <td className="text-left py-3 px-4 border-b">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaEllipsisV />
                  </button>
                </td>
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
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, customers.length)} of {customers.length} items
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

export default Customers;
