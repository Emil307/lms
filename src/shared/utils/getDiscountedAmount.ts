/**
 * Функция для получения cуммы после применения скидки.
 * @param {number} number - Сумма.
 * @param {number} discount - Процент скидки.
 *
 * @returns {number} Сумма со скидкой
 */
export const getDiscountedAmount = (number: number, discount: number) => {
    return Math.floor(number - number * (discount / 100));
};
