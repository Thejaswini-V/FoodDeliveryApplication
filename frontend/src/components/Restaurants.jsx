// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const Restaurants = () => {
// //   const [restaurants, setRestaurants] = useState([]);

// //   useEffect(() => {
// //     const fetchRestaurants = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:9000/api/restaurants/getAllRestaurants');
// //         setRestaurants(response.data);
// //       } catch (error) {
// //         console.error('Error fetching restaurants:', error);
// //       }
// //     };

// //     fetchRestaurants();
// //   }, []);

// //   return (
// //     <div className="bg-white shadow-md rounded-lg p-6">
// //       <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full bg-white">
// //           <thead>
// //             <tr>
// //               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
// //               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
// //               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
// //               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
// //               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Address</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {restaurants.map((restaurant) => (
// //               <tr key={restaurant.restId}>
// //                 <td className="text-left py-3 px-4">{restaurant.restId}</td>
// //                 <td className="text-left py-3 px-4">{restaurant.restName}</td>
// //                 <td className="text-left py-3 px-4">{restaurant.restMail}</td>
// //                 <td className="text-left py-3 px-4">{restaurant.restPhone}</td>
// //                 <td className="text-left py-3 px-4">{restaurant.restAddress}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Restaurants;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Restaurants = () => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get('http://localhost:9000/api/restaurants/getAllRestaurants');
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error);
//       }
//     };

//     const interval = setInterval(() => {
//       fetchRestaurants();
//     }, 1000);
//   }, []);

//   // Function to handle approval
//   const handleApproval = async (restId) => {
//     try {
//       await axios.post(`http://localhost:9000/api/restaurants/approval?restId=${restId}`);
//       alert(`Restaurant with ID ${restId} approved successfully!`);
//     } catch (error) {
//       console.error('Error approving restaurant:', error);
//       alert('Failed to approve restaurant.');
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Address</th>
//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>

//               <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {restaurants.map((restaurant) => (
//               <tr key={restaurant.restId}>
//                 <td className="text-left py-3 px-4">{restaurant.restId}</td>
//                 <td className="text-left py-3 px-4">{restaurant.restName}</td>
//                 <td className="text-left py-3 px-4">{restaurant.restMail}</td>
//                 <td className="text-left py-3 px-4">{restaurant.restPhone}</td>
//                 <td className="text-left py-3 px-4">{restaurant.restAddress}</td>
//                 <td className="text-left py-3 px-4">{restaurant.approve_status}</td>
//                 <td className="text-left py-3 px-4">
//                   <button
//                     className="text-blue-500 hover:text-blue-700"
//                     onClick={() => handleApproval(restaurant.restId)}
//                   >
//                     Approve
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Restaurants;
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

    const interval = setInterval(() => {
      fetchRestaurants();
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to handle approval
  const handleApproval = async (restId) => {
    try {
      await axios.post(`http://localhost:9000/api/restaurants/approval?restId=${restId}`);
      alert(`Restaurant with ID ${restId} approved successfully!`);
      // Update restaurant status locally to "approved"
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.restId === restId
            ? { ...restaurant, approve_status: 'approved' }
            : restaurant
        )
      );
    } catch (error) {
      console.error('Error approving restaurant:', error);
      alert('Failed to approve restaurant.');
    }
  };

  // Function to handle rejection
  const handleRejection = async (restId) => {
    try {
      await axios.post(`http://localhost:9000/api/restaurants/rejection?restId=${restId}`);
      alert(`Restaurant with ID ${restId} rejected successfully!`);
      // Update restaurant status locally to "rejected"
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.restId === restId
            ? { ...restaurant, approve_status: 'rejected' }
            : restaurant
        )
      );
    } catch (error) {
      console.error('Error rejecting restaurant:', error);
      alert('Failed to reject restaurant.');
    }
  };

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
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
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
                <td className="text-left py-3 px-4">{restaurant.approve_status}</td>
                <td className="text-left py-3 px-4 flex space-x-2">
                  <button
                    className={`text-blue-500 hover:text-blue-700 ${
                      restaurant.approve_status === 'approved' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleApproval(restaurant.restId)}
                    disabled={restaurant.approve_status === 'approved'}
                  >
                    Approve
                  </button>
                  <button
                    className={`text-red-500 hover:text-red-700 ${
                      restaurant.approve_status === 'Rejected' || restaurant.approve_status === 'not approved' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => handleRejection(restaurant.restId)}
                    disabled={
                      restaurant.approve_status === 'Rejected' ||
                      restaurant.approve_status === 'not approved'
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurants;
