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
    message?: string;
};