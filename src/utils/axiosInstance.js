import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true,
  });

  const authToken = localStorage.getItem('authToken');
console.log('authToken:', authToken);

if (authToken) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}
 
  export default axiosInstance;
