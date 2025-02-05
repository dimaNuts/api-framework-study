import axios, { AxiosRequestConfig } from 'axios';


export default class Client {
    /*
    * Конфигурация клиента Axios по умолчанию
     */
    protected static config: AxiosRequestConfig = {
        baseURL: 'https://meowle.fintech-qa.ru/api/',
        timeout: 10000,
    };


};