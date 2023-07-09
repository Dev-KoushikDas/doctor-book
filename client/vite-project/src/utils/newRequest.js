import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://doctor-book-b4t2.vercel.app/api/",
  withCredentials: true,
 // origin:"*"
});

export default newRequest;
