import axios from "axios";

export const http = axios.create({
    baseURL: 'http://locaclhost:3000/api',
})

export const externalHttp =axios.create({
   baseURL: 'https://externallApp'
})