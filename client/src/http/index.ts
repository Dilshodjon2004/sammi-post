import axios from "axios";

export const API_URL = `https://sammi-blog-chi.vercel.app`;

const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;
