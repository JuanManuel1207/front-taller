import axios from "axios";
const API = process.env.REACT_APP_API;
export const connectAPI = axios.create({
    baseURL: API
})