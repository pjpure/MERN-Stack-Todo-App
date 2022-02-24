import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

export default httpClient;
