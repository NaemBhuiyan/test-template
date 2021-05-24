import axios from 'axios';
// import { message } from 'antd';
import { toast } from 'react-toastify';

const http = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// http.interceptors.request.use(config => {
//   const state = {
//     Auth: {
//       token: 'dadasdsa',
//     },
//   };

//   if (state?.Auth?.token) {
//     const token = `token ${state.Auth.token}`;
//     config.headers.Authorization = token;
//   }

//   return config;
// });
http.interceptors.response.use(null, error => {
  if (error?.response?.message) {
    toast.error(error?.response?.message || 'Somthing went wrong! Try again');
    return { error };
  }
  toast.error(error?.response?.message || 'Somthing went wrong! Try again');

  return { error };
});

export default http;
