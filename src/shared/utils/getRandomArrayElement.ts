/**
 * Получение случайного элемента массива
 * @param array
 * @return {*}
 */
export const getRandomArrayElement = <T>(array: Array<T>) => {
    const rand = Math.floor(Math.random() * array.length);
    return array[rand];
};
