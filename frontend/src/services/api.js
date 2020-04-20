import axios from "axios";

const api = axios.create({
  baseURL: "http://b2bmaterial.site:3001/api",
});

export default api;
