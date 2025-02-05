import Client from './Client';
import { URLSearchParams } from "node:url";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import { CatMinInfo, Cat, CatsLIst, FailAddCat } from "../../@types/common";


export default class CoreApi extends Client {
    // endpoint core Api
    static api: string = 'core/cats';
    // получении http клиента
    static coreApiHttpClient: AxiosInstance = Client.getInstance();

};
