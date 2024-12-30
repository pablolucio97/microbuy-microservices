import axios from "axios";

export const couponsApi = axios.create({
  baseURL: "http://localhost:3333",
});
