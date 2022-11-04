import axios from "axios";

export const connectAPI = axios.create({
    baseURL: "https://backmeet.herokuapp.com/"
})