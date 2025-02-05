/**
 * Набор минимальной информации для добавления кота
 * @property name - имя
 * @property description - описание
 * @property gender - пол
 */
export type CatMinInfo  = {
    name: string;
    description: string;
    gender: 'male' | 'female' | 'unisex';
};


/**
 * Полная информация о коте
 * @property id - id
 * @property name - имя
 * @property description - описание
 * @property tags - тэги
 * @property gender - пол
 * @property likes - количество лайков
 * @property dislikes - количество дизлайков
 * @property [message=] - сообщение
 */
export type Cat  = {
    id: number;
    name: string;
    description: string;
    tags: string;
    gender: 'male' | 'female' | 'unisex';
    likes: number;
    dislikes: number;
    // ? означает, что поле не обязательное
    message?: string;
};


/**
 * Объект может вернуть post метод [cats_add]{@link https://meowle.fintech-qa.ru/api/core/api-docs-ui/#/%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5/post_cats_add}
 * При попытке создания котика с именем, которое уже есть
 */
export type FailAddCat  = { cats: { cat: CatMinInfo[]; errorDescription: string } };


/**
 *  Ответ при успешном добавлении кота
 */
export type CatsLIst = { cats: Cat[] };