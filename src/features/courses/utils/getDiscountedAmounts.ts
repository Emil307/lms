/**
 * Функция для получения cуммы после применения скидки.
 * @param {number} sum - Сумма.
 * @param {number} discount - Процент скидки.
 *
 * @returns {number} Сумма со скидкой
 */
export const getDiscountedAmounts = (sum: number, discount: number) => {
    return Math.floor(sum - sum * (discount / 100));
};
