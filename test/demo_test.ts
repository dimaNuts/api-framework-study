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
            console.info('тест id:001 🚀:', `выполнен запрос GET /get-by-id c параметром id = ${id}`)

            await allure.logStep(`Выполнен запрос GET /get-by-id c параметром id = ${id}`);
            await allure.logStep(`Получены данные о коте из ответа по запросу`);
            await allure.attachment(
                'cat',
                JSON.stringify(response.data.cat, null, 2),
                'application/json'
            );

            assert.equal(response.data.cat.name, name, 'Имена не соответствуют');
            await allure.logStep(
                `Выполнена проверка на эквивалент имён: ожидаемого и фактического, полученного из запроса`);
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

            const response = await CoreApi.getAllByLetter(limit, order, gender);
            console.info('тест id:002 🚀:', 'Выполнен запрос GET /список котов по группам');
            await allure.logStep(`Выполнен запрос GET / Get-Метод получения списка котов сгруппированный по группам `);

            const data = JSON.stringify(response.data, null, 2);
            await allure.logStep('Список котов из запроса, сгруппированных в алфавитном порядке');
            await allure.attachment(
                'CatsList',
                data,
                'application/json'
            );

            await allure.step(
                'Выполнена проверка количества котов в группе из запроса с ожидаемым',
                () => {
                    allure.logStep(`Фактическое количество котов в группе из ответа`);
                    allure.attachment('actual_limit', response.data.groups[0]["count_in_group"].toString(), 'text/plain');
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
            console.info('тест id:003 🚀:', `Выполнен запрос GET / Get-Метод получения списка котов части начали имени`);
            await allure.logStep(`Выполнен запрос GET / Get-Метод получения списка котов части начали имени`);

            const data = JSON.stringify(response.data.cats, null, 2);
            await allure.logStep('Получен список котов из запроса');
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
                        // проверяем имя кота(сделан срез по длине начало имени)
                        assert.equal(catName.slice(0,lenName), name);
                    })
                }
            })
        })
    });

    it(`Добавление кота(котов) @allure.id: 004`, async () => {
        await allure.description(`Этот тест проверяет данные добавленного кота`);
        await allure.owner('Кот Матроскин');
        await allure.tag("addCats");
        await allure.severity(Severity.BLOCKER);
        await allure.label("feature", "");
        await allure.link(
            'https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5/post_cats_add',
            "Swagger UI");
        await allure.link('http://meowle.fintech-qa.ru', 'Meowle');

        // данные нового(одидаемого) кота
        const expectancyCat = {
            name: "Кот Матроскин",
            description: "Кот Матроскин отличается умом и сообразительностью",
            gender: "male",
        };
        await allure.parameter('name', expectancyCat.name);
        await allure.parameter('description', expectancyCat.description);
        await allure.parameter('gender', expectancyCat.gender);


        await allure.step("Load data from remote server", async () => {
            const response = await CoreApi.addCats(expectancyCat);
            await allure.parameter("time", new Date().toString(), {excluded: true});

            // проверяем, что код добавлен
            await allure.step(`Проверяем, что кот "${expectancyCat.name}" добавлен, статус ответа "200"
            и нет сообщения "Такое имя уже есть!"`, () => {
                const status: number = 200;
                allure.logStep(`Актуальный статус код ${response.status}, ожидался ${status}`);
                assert.ok(
                    response.status === status,
                    `Актуальный статус код ${response.status}, ожидался ${status}`
                );
                const errDes = response.data.cats[0].errorDescription;
                assert.isUndefined(errDes, "Такое имя уже есть!");
                allure.logStep(`Значения поля errorDescription : ${errDes}`);
            });
            console.info('тест id:004 🚀:', 'Получен ответ на запрос POST / новый кот');

            await allure.logStep(`Результат добавления списка котов`);
            const data = JSON.stringify(response.data.cats, null, 2);
            await allure.attachment(
                'Cats',
                data,
                'application/json'
            );
            // Фактические поля  name/description/gender кота из запроса
            const actualFieldByCat = {
                name: response.data.cats[0].name.toLowerCase(),
                description: response.data.cats[0].description.toLowerCase(),
                gender: response.data.cats[0].gender.toLowerCase(),
            };
            // переводим к нижнему регистру, так как при добавлении кота регистр меняется
            let expectancyCatToLowerCase =  {};
            for (let key in expectancyCat) {
                expectancyCatToLowerCase[key] = expectancyCat[key].toLowerCase();
            }
            await allure.logStep(`Значения полей ожидаемого и добавленного кота`);
            const actualCat = JSON.stringify(actualFieldByCat, null, 2);
            await allure.attachment(`expectancy_Cat`,
                JSON.stringify(expectancyCat, null, 2), 'application/json');
            await allure.attachment(`actual_Cat`,
                actualCat,'application/json');
            await allure.logStep(`Результат сравнения добавленного кота и ожидаемого,
             переводим к нижнему регистру, так как при добавлении кота регистр меняется `);
            assert.deepEqual(actualFieldByCat, expectancyCatToLowerCase);
        });
    });

    it(`Удаление существующего кота по id @allure.id: 005`, async () => {
        const id = 130387;
        const response = await CoreApi.removeCat(id);
        const data = JSON.stringify(response.data, null, 2);
        await allure.attachment('Удаленный кот', data, 'application/json');

    });
})