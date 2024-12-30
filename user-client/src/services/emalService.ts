import axios from "axios";

export const emailsApi = axios.create({
  baseURL: "http://localhost:3335",
});
