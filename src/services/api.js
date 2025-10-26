import axios from 'axios';


const API_KEY = "9fd473de8744fe51df0de18ff0249ca3";

export const geocodingApi = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/', // Replace with your backend URL
});

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/', // Replace with your backend URL
});

export const countryApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/', // Replace with your backend URL
});


export { API_KEY };