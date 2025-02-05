import Client from './Client';
import { URLSearchParams } from "node:url";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import { CatMinInfo, Cat, CatsLIst, FailAddCat } from "../../@types/common";


export default class CoreApi extends Client {
    // endpoint core Api
    static api: string = 'core/cats';
    // получении http клиента
    static coreApiHttpClient: AxiosInstance = Client.getInstance();

    /**
     * Get-Метод получения кота по id [get-by-id]{@link https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA/get_cats_get_by_id}
     * @param id - id
     */
    static async getCatById(id: number): Promise<AxiosResponse<{cat: Cat}>> {
        let response: AxiosResponse;
        try {
            const params = new URLSearchParams({ id: id.toString() });
            response = await this.coreApiHttpClient(`${this.api}/get-by-id/?${params}`);

        } catch (error) {
            console.error(error);
        }
        return response;
    }
};
