import axios, { AxiosRequestConfig } from "axios";
import { FetchResMany, FetchResSingle } from "../types/types";

const axiosInstance = axios.create({
  baseURL: 'https://v2.jokeapi.dev/joke/',
})

class APIclient<T> {
  endpoint: string
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getJokes = (config?:AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResMany<T>>(this.endpoint, config)
      .then(res => res.data)    
  }
  getOneJoke = (config?:AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResSingle<T>>(this.endpoint, config)
      .then(res => res.data)    
  }  
}

export default APIclient;