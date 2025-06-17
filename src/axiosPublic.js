import axios from 'axios';

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:5000', 
  baseURL: 'https://backend-ecommerce-clothing.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosPublic;
