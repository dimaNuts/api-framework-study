import Client from './Client';
import { URLSearchParams } from 'url';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import { CatMinInfo, Cat, CatsLIst, FailAddCat } from '../../@types/common';


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

    /**
     * Get-Метод получения списка котов, сгруппированный по группам с указанием количества котов в группе
     * [allByLetter] {@link https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA/get_cats_allByLetter }
     * @param limit=5 - количество котов в группе
     * @param order - сортировка, принимает значения desc | asc
     * @param gender - пол, принимает значения male | female | unisex
     */
    static async getAllByLetter(limit: number=0, order= '', gender= ''): Promise<AxiosResponse<{
        groups: { title:string; cats: Cat[] }[] }>> {
        let response: AxiosResponse;

        try {
            let params:any;
            // url, в зависимости от заданных параметров
            if( isFinite(limit) && order.trim() && gender.trim() ) {
                params = new URLSearchParams({limit: limit.toString(), order, gender});
            } else if ( isFinite(limit) && order.trim() ) {
                params = new URLSearchParams({limit: limit.toString(), order});
            } else if( isFinite(limit) && gender.trim() ) {
                params = new URLSearchParams({limit: limit.toString(), gender});
            } else {
                params = new URLSearchParams({limit: limit.toString()});
            }

            response = await this.coreApiHttpClient.get(`${this.api}/allByLetter?${(params)}`);
        } catch (error) {
            // см.докум @link https://axios.rest/pages/advanced/api-reference.html
            if (axios.isAxiosError(error)) {
                response = error.response;
            } else {
                console.error(error);
            }
        }
        return response;

    }


};
