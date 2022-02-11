import axios from "axios";

export const axiosGlovoClient = axios.create({ 
    baseURL: `${process.env.GLOVO_URL}`,
    headers: {
        Authorization: `Basic ${process.env.GLOVO_TOKEN}`
    }
})