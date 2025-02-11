import {assert} from 'chai';
import CoreApi from '../src/http/CoreApi';
import * as allure from "allure-js-commons";
import {Severity} from "allure-js-commons";

describe('Проверка кота', async () => {
    // Id идентификатор теста @allure.id:⟨VALUE⟩
    it('Проверка имени кота по Id @allure.id: 123', async () => {
        /*
        * Metadata метаданные { @link https://allurereport.org/docs/mocha-reference/#metadata }
         */
        // Description описание теста
        await allure.description("Этот тест проверяет соответствует ли имя кота с именем, полученным по id");
        // Owner автор(владелец)
        await allure.owner("Кот Матроскин");
        // Tag тэг
        await allure.tag("getNameById");
        await allure.tags("getNameById", "getCatById");
        // Severity серьезность теста
        await allure.severity(Severity.CRITICAL);
        // Label
        await allure.label("feature", "");
        // Link ссылка
        await allure.link(
            "https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA/get_cats_get_by_id",
            "Swagger UI"
        );
        await allure.link("https://meowle.fintech-qa.ru", "Meowle");

        await allure.step("Load data from remote server", async ()=> {
            const name = 'Бамбино';
            // Parameter
            await allure.parameter("name", name);
            const id = 130185;
            await allure.parameter("id", id.toString());
            await allure.parameter("time", new Date().toString(), { excluded: true });

            const response = await CoreApi.getCatById(id);

            await allure.logStep(`выполнен запрос GET /get-by-id c параметром id = ${id}`);
            await allure.logStep(`получены данные о коте из ответа по запросу`);
            await allure.attachment(
                'cat',
                JSON.stringify(response.data.cat, null, 2),
                'application/json'
            );

            assert.equal(response.data.cat.name, name, 'Имена не соответствуют');
            await allure.logStep(`выполнена проверка на эквивалент имён: из параметров и имени, полученного из запроса`)
        });

    })
})