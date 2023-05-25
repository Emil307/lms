import { Discount } from "@shared/types";

/**
 * Функция для получения суммы после применения скидки.
 * @param {number} number - Сумма.
 * @param {number} discount - Размер скидки.
 * @param {Discount["type"]} discountType - Тип скидки (процент или число).
 *
 * @returns {number} Сумма со скидкой
 */
export const getDiscountedAmount = (number: number, discount: number, discountType: Discount["type"] = "currency") => {
    if (discountType === "percentage") {
        return Math.floor(number - number * (discount / 100));
    }
    return number - discount;
};
