/**
 * Функция для получения ответа старше ли одна роль на другой или равны
 * @param {number} firstRoleId - проверяемая роль.
 * @param {number} secondRoleId - Роль для сравнения.
 *
 * @returns {number}  1 - старше
 *                   -1 - младше
 *                    0 - равны
 */
export const checkRoleOrder = (firstRoleId?: number, secondRoleId?: number): number => {
    if (!firstRoleId || !secondRoleId || firstRoleId > secondRoleId) {
        return -1;
    }

    if (firstRoleId < secondRoleId) {
        return 1;
    }

    return 0;
};
