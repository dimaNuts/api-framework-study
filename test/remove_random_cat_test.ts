import {assert} from "chai";
import * as allure from "allure-js-commons";
import {Severity} from "allure-js-commons";
import CoreApi from "../src/http/CoreApi";


describe('Удалить случайного кота по id', async () => {
    it('Удалить случайного кота по id, проверить, что кота больше нет @allure.id: 006', async () => {

        await allure.step("Удаление случайного кота по его id", async () => {
            await allure.description(`
        # НАЙТИ СЛУЧАЙНОГО КОТА ПО ЕГО ID
        # УДАЛИТЬ
        # ПРОВЕРИТЬ, ЧТО КОТА БОЛЬШЕ НЕТ`);
            await allure.owner('Кот Матроскин');
            await allure.severity(Severity.BLOCKER);
            await allure.tags("getAllByLetter", "removeCat");
            await allure.link("https://meowle.fintech-qa.ru", "Meowle");
            await allure.link("https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/", "Swagger UI");
            await allure.parameter("time", new Date().toString(), {excluded: true});

            const limit = 5;
            const order = '';
            const gender = '';
            await allure.parameter("limit", limit.toString());
            await allure.parameter("gender", gender);
            await allure.parameter("order", order);

            await allure.logStep(`Получаем список всех котов/Метод получения всех котов [allByLetter]`);
            console.log(`Дергаем api со списком всех котов`);

            const response = await CoreApi.getAllByLetter(limit, order, gender);

            const catsList = response.data.groups;
            await allure.attachment('CatsList', JSON.stringify(catsList, null, 2), 'application/json');

            await allure.logStep('Используя рандом находим в списке группу случайного кота по букве');

            const randNumTitle = Math.floor(Math.random() * catsList.length);

            await allure.logStep(`Выбран случайный порядковый номер ${randNumTitle} буквы ${catsList[randNumTitle]["title"]} в списке котов`);

            const cats = catsList[randNumTitle].cats;
            await allure.logStep(`Список котов по букве ${catsList[randNumTitle]["title"]}:`);

            await allure.attachment('Cats', JSON.stringify(cats, null, 2), 'application/json');

            const randomCat = catsList[randNumTitle].cats[Math.floor(Math.random() * cats.length)];
            await allure.logStep(`Выбран случайный кот`);
            await allure.attachment('Cat', JSON.stringify(randomCat, null, 2), 'application/json');

            const catId = randomCat.id;
            console.info(`Выбран id = ${catId} кота, которого надо удалить из списка`);
            await allure.logStep(`Выбран id = ${catId} кота, которого надо удалить из списка`);

            const removeCat = await CoreApi.removeCat(catId);
            console.info(`Кот удален(R.I.P)`);

            await allure.logStep(`Кот удален(R.I.P)`);
            await allure.attachment(
                'removedCat',
                JSON.stringify(removeCat.data, null, 2),
                'application/json'
            );

            //проверяем, что кота больше нет
            const expectedStatus: number = 404;
            const catNull = await CoreApi.removeCat(catId);
            // const answer = catNull.statusText вернет Not Found
            const answer = JSON.stringify(catNull.data, null, 2);
            console.info(`Произведена повторная попытка удалить кота по id = ${catId}, получен ответ: ${catNull.statusText}`);
            await allure.logStep(`Произведена повторная попытка удалить кота по id = ${catId}, получен ответ:`);

            //сравниваем статус ответа с ожидаемым статусом
            assert.ok(
                catNull.status === expectedStatus,
                `Кот не удален,статус ${catNull.status}, ожидался ${expectedStatus}`
            );

            await allure.attachment('CatNotFound', answer, 'application/json');
        });
    });
})
