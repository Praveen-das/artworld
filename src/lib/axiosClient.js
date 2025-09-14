import axios from "axios";
import { BASE_URL } from "../Utils/urls";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
