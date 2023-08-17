import axios from "axios";

export const api = axios.create({
  baseURL: "https://testfood.onrender.com",
});