/**
 * Функция для получения нужного склонения слова в зависимости от числа, стоящего перед ним.
 * @param {number} number - Число.
 * @param {string} one - Слово в Именительном падеже и Единственном числе.
 * @param {string} two - Слово в Родительном падеже и Единственном числе.
 * @param {string} five - Слово в Родительном падеже и Множественном числе.
 *
 * @returns {string} Слово в нужном склонении
 */
export const getPluralString = (number: number, one: string, two: string, five: string): string => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};
