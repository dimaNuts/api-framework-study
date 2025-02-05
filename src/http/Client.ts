import axios, { AxiosRequestConfig } from 'axios';


export default class Client {
    /*
    * Конфигурация клиента Axios по умолчанию
     */
    protected static config: AxiosRequestConfig = {};

    /*
    * Метод получения экземпляра Axios
     */
    protected static getInstance(config: AxiosRequestConfig) {};
};