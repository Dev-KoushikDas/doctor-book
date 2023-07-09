import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://vercel.com/dev-koushikdas/doctor-book-b4t2/",
  withCredentials: true,
  origin:"*"
});

export default newRequest;
