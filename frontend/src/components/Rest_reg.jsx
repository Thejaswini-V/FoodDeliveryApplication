// import { useState } from 'react';
// import axios from 'axios';

// const Rest_reg = () => {
//   const [formData, setFormData] = useState({
//     restName: '',
//     restAddress: '',
//     restPhone: 0,
//     restMail: '',
//     restPswd: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   axios.defaults.withCredentials = true;
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:9000/api/restaurants/addRestaurant', formData)
//       .then(response => {
//         console.log('registered', response.data);
//       })
//       .catch(error => {
//         console.error('there was an error');
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Register as a Restaurant</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="restName" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             id="restName"
//             name="restName"
//             value={formData.restName}
//             onChange={handleChange}
//             placeholder="Enter restaurant name"
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="restAddress" className="block text-sm font-medium text-gray-700">
//             Address
//           </label>
//           <input
//             type="text"
//             id="restAddress"
//             name="restAddress"
//             value={formData.restAddress}
//             onChange={handleChange}
//             placeholder="Enter restaurant address"
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="restPhone" className="block text-sm font-medium text-gray-700">
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="restPhone"
//             name="restPhone"
//             value={formData.restPhone}
//             onChange={handleChange}
//             placeholder="Enter restaurant phone number"
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="restMail" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="restMail"
//             name="restMail"
//             value={formData.restMail}
//             onChange={handleChange}
//             placeholder="Enter restaurant email"
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="restPswd" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="restPswd"
//             name="restPswd"
//             value={formData.restPswd}
//             onChange={handleChange}
//             placeholder="Enter restaurant password"
//             className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Rest_reg;
import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const Rest_reg = () => {
  const [formData, setFormData] = useState({
    restName: '',
    restAddress: '',
    restPhone: 0,
    restMail: '',
    restPswd: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post data to backend for registration
      const response = await axios.post('http://localhost:9000/api/restaurants/addRestaurant', formData);
      console.log('registered', response.data);

      // Send confirmation email using EmailJS
      const templateParams = {
        to_email: formData.restMail,
        message: "Successful Registration as Restaurant"
      };

      emailjs.send('service_kzczxbo', 'template_ydy7ltc', templateParams, 'SAv1WXMZJtEM36D8b')
        .then((response) => {
          console.log('Email sent successfully:', response);
          setShowSuccessModal(true); // Show success modal
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          setEmailError('Registration successful, but there was an error sending the confirmation email.');
          setShowSuccessModal(true); // Show success modal even if email fails
        });
      
    } catch (error) {
      console.error('There was an error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/login'); // Navigate to /login after closing the modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register as a Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="restName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="restName"
              name="restName"
              value={formData.restName}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="restAddress" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="restAddress"
              name="restAddress"
              value={formData.restAddress}
              onChange={handleChange}
              placeholder="Enter restaurant address"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="restPhone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="restPhone"
              name="restPhone"
              value={formData.restPhone}
              onChange={handleChange}
              placeholder="Enter restaurant phone number"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="restMail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="restMail"
              name="restMail"
              value={formData.restMail}
              onChange={handleChange}
              placeholder="Enter restaurant email"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div>
            <label htmlFor="restPswd" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="restPswd"
              name="restPswd"
              value={formData.restPswd}
              onChange={handleChange}
              placeholder="Enter restaurant password"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Register
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Registration Successful</h3>
            <p>{emailError || 'A confirmation email has been sent to your address.'}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rest_reg;

