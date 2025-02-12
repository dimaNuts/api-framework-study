import {assert} from 'chai';
import CoreApi from '../src/http/CoreApi';
import * as allure from "allure-js-commons";
import {Severity} from "allure-js-commons";

describe('Проверка методов получения данных api', async () => {
    // Id идентификатор теста @allure.id:⟨VALUE⟩
    it('Проверка имени кота по Id @allure.id: 001', async () => {
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

        await allure.step("Load data from remote server", async () => {
            const name = 'Бамбино';
            // Parameter
            await allure.parameter("name", name);
            const id = 130185;
            await allure.parameter("id", id.toString());
            // Date дата запуска
            await allure.parameter("time", new Date().toString(), {excluded: true});

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

    });

    it('Проверка списка котов на количество в группе @alure.id: 002', async () => {
        await allure.description("Это тест проверяет,что группа состоит из заданного количества количество котов");
        await allure.owner("Кот Матроскин");
        await allure.tag("getAllByLetter");
        await allure.severity(Severity.NORMAL);
        await allure.label("feature", "");
        await allure.link(
            'https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA/get_cats_allByLetter',
            "Swagger UI");
        await allure.link('http://meowle.fintech-qa.ru', 'Meowle');

        await allure.step("Load data from remote server", async () => {
            const limit = 5;
            const order: string = '';
            const gender: string = '';
            await allure.parameter('limit', limit.toString());
            await allure.parameter("order", order);
            await allure.parameter("gender", gender);
            await allure.parameter("time", new Date().toString(), {excluded: true});

            console.info('тест id:002 🚀:', 'выполняется запрос GET /список котов по группам');
            const response = await CoreApi.getAllByLetter(limit, order, gender);
            await allure.logStep(`выполнен запрос GET / Get-Метод получения списка котов сгруппированный по группам `);
            await allure.logStep('получен список котов из запроса');

            const data = JSON.stringify(response.data, null, 2);
            console.info('тест id:002 🚀:',
                'получен ответ на запрос GET / список котов сгруппированных в алфавитном порядке');

            await allure.attachment(
                'CatsList',
                data,
                'application/json'
            );

            await allure.step(
                'выполнена проверка количества котов в группе из запроса с ожидаемым',
                () => {
                    allure.logStep(`Фактическое количество котов в группе из ответа`);
                    allure.attachment('actual limit', response.data.groups[0]["count_in_group"].toString(), 'text/plain');
                    allure.logStep(`По заданным параметрам запроса количество котов в группе ожидалось limit=${limit}`);
                    assert.equal(response.data.groups[0]["count_in_group"], 5, 'Количество котов в группе не соответствуют');
                }
            );


        });

    });

    it('Найти кота по части начала имени @allure.id: 003', async () => {
        await allure.description(
            'Этот тест проверяет корректность имён списка котов, когда поиск кота происходит по части имени');
        await allure.owner('Кот Матроскин');
        await allure.tag("getCatByPartName");
        await allure.severity(Severity.NORMAL);
        await allure.label("feature", "");
        await allure.link(
            "https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA/get_cats_search_pattern",
            "Swagger UI");
        await allure.link('http://meowle.fintech-qa.ru', 'Meowle');

        await allure.step("Load data from remote server", async () => {
            const name = 'Бамби'
            const limit = 5;
            await allure.parameter("name", name);
            await allure.parameter("limit", limit.toString());
            await allure.parameter("time", new Date().toString(), {excluded: true});

            const response = await CoreApi.searchCatByPartName(name, limit);
            await allure.logStep(`выполнен запрос GET / Get-Метод получения списка котов части начали имени`);

            const data = JSON.stringify(response.data.cats, null, 2);
            await allure.logStep('получен список котов из запроса');
            await allure.attachment(
                'cats',
                data,
                'application/json'
            );
            await allure.step(`Проверка корректности имён котов из списка и начала имени ${name}`,async () => {
                const lenCatsList: number = response.data.cats.length;
                const lenName: number = name.length;
                // пройти по списку и сравнить имена
                for (let i = 0; i < lenCatsList; i++) {
                    // имя кота из списка, полученного из запроса
                    const catName: string = response.data.cats[i].name;
                    await allure.step(`Кот по имени ${catName}`, () =>{
                        assert.equal(catName.slice(0,lenName), name);
                    })
                }
            })
        })
    })
})