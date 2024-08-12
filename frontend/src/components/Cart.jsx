
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaShoppingCart, FaPlus, FaMinus, FaCheckCircle, FaMicrophone } from 'react-icons/fa';

const Cart = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const [currentRest,setcurrentRest]=useState('');
  const location = useLocation();
    const fetchCartDetails = async () => {
        try {
          const response = await axios.get('http://localhost:9000/api/cart/show', {
            withCredentials: true,
          });
    
          if (typeof response.data === 'string' && response.data.includes('Cart is empty')) {
            setCart([]);
            setTotalPrice(0);
            setcurrentRest('');
          } else {
            const cartData = response.data;
            setCart(cartData.items);
            setTotalPrice(cartData.totalPrice);
            setcurrentRest(cartData.restaurantName);
          }
        } catch (error) {
          console.error('Error fetching cart details:', error);
          setCart([]);
          setTotalPrice(0);
        }
      };   
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold">{item.foodName}</h3>
                  <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <FaMinus className="h-4 w-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
                  >
                    <FaPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-lg font-bold">Total:</h3>
              <p className="text-xl font-bold text-orange-500">₹{totalPrice}</p>
            </div>
            
            
          </div>
  )
}

export default Cart