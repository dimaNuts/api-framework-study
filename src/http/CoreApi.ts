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
            response = await this.coreApiHttpClient.get(`${this.api}/get-by-id/?${params}`);

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
    static async getAllByLetter(limit: number = 0, order: string = '', gender: string = ''): Promise<AxiosResponse<{
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

    /**
     * Get-Метод поиска кота по части начала имени [search-pattern]{@link https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA/get_cats_search_pattern}
     * @param name - имя
     * @param limit=10 - число записей
     */
    static async searchCatByPartName(name: string, limit: number = 10): Promise<AxiosResponse<CatsLIst>> {
        let response: AxiosResponse;
        try {
            const params = new URLSearchParams({ name, limit: limit.toString() });
            response = await this.coreApiHttpClient.get(`${this.api}/search-pattern?${params}`);
        } catch(error) {
            if (axios.isAxiosError(error)) {
                console.error(error);
            } else {
                console.error(error);
            }

        }
        return response;
    }

    /**
     * Post-Метод добавления кота(котов) по минимальному описанию [add]{@link https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5/post_cats_add}
     * @param cats минимальное описание кота (котов)
     * @param cats.name - имя
     * @param cats.description - описание
     * @param cats.gender - пол
     */
    static async addCats(cats: CatMinInfo): Promise<AxiosResponse<CatsLIst | FailAddCat>> {
        let response: AxiosResponse;

        try {
            // см. common.d.ts CatMinInfo/ здесь добавлены объект cats и массив [] для добавления кота см. Swagger
            response = await this.coreApiHttpClient.post(`${this.api}/add`, { cats: [cats] });

        } catch (error) {
            console.error(error);
        }
        return response;
    }
};
