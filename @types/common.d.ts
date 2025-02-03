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
}