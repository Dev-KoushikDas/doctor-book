import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://doctor-api2.onrender.com/api",
 // withCredentials: true,
 // origin:"*"
});

export default newRequest;
