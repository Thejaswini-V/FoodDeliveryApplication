// import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Customer_landing = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [snackbarVisible, setSnackbarVisible] = useState(true);
//   const [searchData, setSearchData] = useState([]);
//   const navigate = useNavigate();

//   const fetchData = async (value) => {
//     try {
//       const apiUrl = `http://localhost:9000/api/customers/search?name=${encodeURIComponent(value)}`;
//       const response = await axios.get(apiUrl);
//       setSearchData(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     // Fetch data only if search term is not empty
//     if (value) {
//       fetchData(value);
//     } else {
//       setSearchData([]); // Clear search data if input is empty
//     }
//   };

//   const handleResultClick = async (post) => {
//     try {
//       // Send a POST request to the /selectFood endpoint
//       await axios.post('http://localhost:9000/api/selectFood', {
//         food_name: post.foodName,
//         food_price: post.foodPrice,
//         food_cateogry: post.foodCategory,
//         rest_name: post.restaurantName,
//         food_veg: post.vegNonveg,
//       });

//       // Navigate to the RestaurantDetails page
//       navigate(`/restaurant/${post.restaurantId}`, { state: { post } });
//     } catch (error) {
//       console.error('Error selecting food:', error);
//       alert('Failed to select food. Please try again.');
//     }
//   };

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 2000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     cssEase: 'linear',
//     pauseOnHover: false,
//   };

//   return (
//     <div className="min-h-screen min-w-screen bg-gray-100">
//       <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           {snackbarVisible && (
//             <div className="bg-gray-800 text-white px-4 py-2 rounded-md mr-4">
//               Snackbar message here
//               <button onClick={() => setSnackbarVisible(false)} className="ml-2 text-gray-400 hover:text-gray-200">
//                 x
//               </button>
//             </div>
//           )}
//           <h1 className="text-2xl font-bold">Food Delivery</h1>
//         </div>

//         <div className="relative flex items-center">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search for restaurants or dishes..."
//             className="px-4 py-2 text-black rounded-l-md border-none focus:ring-2 focus:ring-orange-600"
//           />
//           <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md">
//             Search
//           </button>

//           {/* Search results dropdown */}
//           {searchData.length > 0 && (
//             <div className="absolute left-0 top-12 w-full bg-white shadow-md rounded-md overflow-hidden z-10">
//               <ul className="divide-y divide-gray-200">
//                 {searchData.map((post, index) => (
//                   <li
//                     key={index}
//                     onClick={() => handleResultClick(post)}
//                     className="cursor-pointer px-4 py-2 hover:bg-gray-100"
//                   >
//                     <div className="font-semibold text-gray-800">{post.restaurantName}</div>
//                     <div className="text-sm text-gray-600">{post.foodName} - ₹{post.foodPrice}</div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <Link to="/custpage">
//           <img className="w-10 h-10 rounded-full" src="./images/profile.png" alt="Rounded avatar" />
//         </Link>
//       </header>

//       <div className="p-6 bg-white">
//         <Slider {...sliderSettings}>
//           <div>
//             <img src="./images/carousel1.png" alt="Slide 1" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="./images/carousel2.png" alt="Slide 2" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="./images/carousel3.png" alt="Slide 3" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="./images/carousel4.png" alt="Slide 4" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="https://via.placeholder.com/800x300?text=Image+5" alt="Slide 5" className="w-full h-80 object-cover" />
//           </div>
//         </Slider>
//       </div>

//       <main className="p-6">
//         {showSearchResults && searchResults.length > 0 && (
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
//               {searchResults.map((item, index) => (
//                 <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//                   <img src={`./images/${item.restaurantName.toLowerCase().replace(/\s/g, '')}.png`} alt={item.restaurantName} className="w-full h-40 object-cover rounded-t-lg" />
//                   <h3 className="text-xl font-bold mt-4">{item.restaurantName}</h3>
//                   <p className="text-gray-600">{item.foodCategory}</p>
//                   <p className="text-gray-600">{item.foodPrice}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-800">Welcome to the Best Food Delivery Service</h2>
//           <p className="text-lg text-gray-600 mt-4">Delicious food delivered to your doorstep in minutes!</p>
//         </div>

//         {/* Static cards for popular restaurants */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="./images/A2B.png" alt="Restaurant 1" className="w-full h-40 object-cover rounded-t-lg" />
//             <h3 className="text-xl font-bold mt-4">Adayar Ananda Bhavan</h3>
//             <p className="text-gray-600">Best Vegetarian dishes in town.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="./images/wowmomo.png" alt="Restaurant 2" className="w-full h-40 object-cover rounded-t-lg" />
//             <h3 className="text-xl font-bold mt-4">Wow Momos</h3>
//             <p className="text-gray-600">Authentic momos and more.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="./images/thalapakkati.png" alt="Restaurant 3" className="w-full h-40 object-cover rounded-t-lg" />
//             <h3 className="text-xl font-bold mt-4">Dindugul Thalapakkati</h3>
//             <p className="text-gray-600">Tasty native non-veg food with a twist.</p>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-gray-800 text-white p-6 text-center">
//         <p>&copy; 2024 Food Delivery. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Customer_landing;
// import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { Link } from 'react-router-dom'; // Import Link from React Router

// const Customer_landing = () => {
//   const [snackbarVisible, setSnackbarVisible] = useState(true);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 2000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     cssEase: 'linear',
//     pauseOnHover: false,
//   };

//   return (
//     <div className="min-h-screen min-w-screen bg-gray-100">
//       <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <h1 className="text-2xl font-bold">Foodie</h1>
//         </div>

//         <div className="flex items-center">
//           {/* Link to the new search page */}
//           <Link to="/search">
//             <button className="flex items-center  text-white px-4 py-2 rounded-md">
//               <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 10-11 0 5.5 5.5 0 0011 0z" />
//               </svg>
//               Search For Foods
//             </button>
//           </Link>
//         </div>

//         <Link to="/custpage">
//           <img className="w-10 h-10 rounded-full" src="./images/profile.png" alt="Rounded avatar" />
//         </Link>
//       </header>

//       <div className="p-6 bg-white">
//         <Slider {...sliderSettings}>
//           <div>
//             <img src="./images/carousel1.png" alt="Slide 1" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="./images/carousel2.png" alt="Slide 2" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="./images/carousel3.png" alt="Slide 3" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="./images/carousel4.png" alt="Slide 4" className="w-full h-80 object-cover" />
//           </div>
//           <div>
//             <img src="./images/carousel2.png" alt="Slide 5" className="w-full h-80 object-cover" />
//           </div>
//         </Slider>
//       </div>

//       <main className="p-6">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-800">Welcome to the Best Food Delivery Service</h2>
//           <p className="text-lg text-gray-600 mt-4">Delicious food delivered to your doorstep in minutes!</p>
//         </div>

//         {/* Static cards for popular restaurants */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="./images/A2B.png" alt="Restaurant 1" className="w-full h-40 object-cover rounded-t-lg" />
//             <h3 className="text-xl font-bold mt-4">Adayar Ananda Bhavan</h3>
//             <p className="text-gray-600">Best Vegetarian dishes in town.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="./images/wowmomo.png" alt="Restaurant 2" className="w-full h-40 object-cover rounded-t-lg" />
//             <h3 className="text-xl font-bold mt-4">Wow Momos</h3>
//             <p className="text-gray-600">Authentic momos and more.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <img src="./images/thalapakkati.png" alt="Restaurant 3" className="w-full h-40 object-cover rounded-t-lg" />
//             <h3 className="text-xl font-bold mt-4">Dindugul Thalapakkati</h3>
//             <p className="text-gray-600">Tasty native non-veg food with a twist.</p>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-gray-800 text-white p-6 text-center">
//         <p>&copy; 2024 Food Delivery. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Customer_landing;
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';

const CustomerLanding = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(true);
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnHover: false,
    appendDots: dots => (
      <div style={{ bottom: '-20px' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    dotsClass: 'slick-dots', // Add custom class if needed
  };
  

  // Function to handle navigation to the search page with a restaurant name or food item
  const handleNavigateToSearch = (name) => {
    navigate(`/search?name=${encodeURIComponent(name.replaceAll("\\s", ""))}`);
  };

  return (
    <div className="min-h-screen min-w-screen bg-white">
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Food Delivery</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/search">
            <button className="flex items-center text-white px-4 py-2 rounded-md">
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 10-11 0 5.5 5.5 0 0011 0z" />
              </svg>
              Search
            </button>
          </Link>
          <Link to="/custpage">
            <img className="w-10 h-10 rounded-full bg-white" src="./images/profile.png" alt="Rounded avatar" />
          </Link>
        </div>

       
      </header>

      <div className="p-6 bg-white">
        <Slider {...sliderSettings}>
          <div>
            <img src="./images/carousel1.png" alt="Slide 1" className="w-full h-96 object-cover" />
          </div>
          <div>
            <img src="./images/food1.jpg" alt="Slide 2" className="w-full h-96 object-cover" />
          </div>
          <div>
            <img src="./images/food4.jpg" alt="Slide 3" className="w-full h-96 object-cover" />
          </div>
          <div>
            <img src="./images/food7.jpg" alt="Slide 4" className="w-full h-96 object-cover" />
          </div>
          <div>
            <img src="./images/food5.jpg" alt="Slide 5" className="w-full h-96 object-cover" />
          </div>
        </Slider>
      </div>

      <main className="p-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Welcome to the Best Food Delivery Service</h2>
          <p className="text-lg text-gray-600 mt-4">Delicious food delivered to your doorstep in minutes!</p>
        </div>

        {/* New "What's on Your Mind" Section */}
        <section className="mb-12">
          <h1 className="text-2xl font-bold mb-4">What's on Your Mind?</h1>
          <div className="flex flex-wrap gap-2">
            <div
              className="bg-white p-4  cursor-pointer"
              onClick={() => handleNavigateToSearch('Biriyani')}
            >
              <img src="./images/foods/Biriyani.jpg" alt="Biriyani" className="w-full h-40 object-cover rounded-t-lg" />
           
            </div>
            <div
              className="bg-white p-4 cursor-pointer"
              onClick={() => handleNavigateToSearch('burger')}
            >
              <img src="./images/foods/burger.jpg" alt="Burger" className="w-full h-40 object-cover rounded-t-lg" />
           
            </div>
            <div
              className="bg-white p-4 cursor-pointer"
              onClick={() => handleNavigateToSearch('cake')}
            >
              <img src="./images/foods/Cakes.jpg" alt="Cakes" className="w-full h-40 object-cover rounded-t-lg" />
              
            </div>
            <div
              className="bg-white p-4 cursor-pointer"
              onClick={() => handleNavigateToSearch('vegmomos')}
            >
              <img src="./images/foods/Momos.jpg" alt="Momos" className="w-full h-40 object-cover rounded-t-lg" />
              
            </div>
            <div
              className="bg-white p-4 cursor-pointer"
              onClick={() => handleNavigateToSearch('Noodles')}
            >
              <img src="./images/foods/Noodles.jpg" alt="Noodles" className="w-full h-40 object-cover rounded-t-lg" />
             
            </div>
            <div
              className="bg-white p-4 cursor-pointer"
              onClick={() => handleNavigateToSearch('Parotta')}
            >
              <img src="./images/foods/Parotta.jpg" alt="Parotta" className="w-full h-40 object-cover rounded-t-lg" />
              
            </div>
            <div
              className="bg-white p-4 cursor-pointer"
              onClick={() => handleNavigateToSearch('pizza')}
            >
              <img src="./images/foods/pizza.png" alt="Parotta" className="w-full h-40 object-cover rounded-t-lg" />
              
            </div>
          </div>
        </section>

        {/* Popular Restaurants */}
        <h1 className="text-2xl font-bold m-2">Popular Restaurants in town</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleNavigateToSearch('a2b')}
          >
            <img src="./images/A2B.png" alt="Restaurant 1" className="w-full h-40 object-cover rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Adayar Ananda Bhavan</h3>
            <p className="text-gray-600">Best Vegetarian dishes in town.</p>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleNavigateToSearch('wowmomos')}
          >
            <img src="./images/wowmomo.png" alt="Restaurant 2" className="w-full h-40 object-cover rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Wow Momos</h3>
            <p className="text-gray-600">Authentic momos and more.</p>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleNavigateToSearch('dindugul thalapakkati')}
          >
            <img src="./images/thalapakkati.png" alt="Restaurant 3" className="w-full h-40 object-cover rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Dindugul Thalapakkati</h3>
            <p className="text-gray-600">Tasty native non-veg food with a twist.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-2 text-center">
        <p>&copy; 2024 Food Delivery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomerLanding;
