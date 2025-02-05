import { assert } from 'chai';
import CoreApi from '../src/http/CoreApi';

describe('Проверка функционала добавления котов', async () => {
    it('Получение кота по id', async () => {
        const name = 'Бамбино';

        const response = await CoreApi.getCatById(130185);

        assert.equal(response.data.cat.name, name, 'Имена не соответствуют');
    });
})