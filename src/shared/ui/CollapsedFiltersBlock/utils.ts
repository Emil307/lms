/**
 * Функция для получения кол-ва примененных фильтров
 * @template F - Тип фильтра Formik.
 */

export const getCountAppliedFilters = <F>(data?: Partial<F>, initialValues?: F): number => {
    if (!data || !initialValues) {
        return 0;
    }

    return Object.entries(data).reduce((accumulator, currentParam) => {
        if (initialValues[currentParam[0] as keyof Partial<F>] === currentParam[1] || currentParam[1] === undefined) {
            return accumulator;
        }

        const count = Array.isArray(currentParam[1]) ? currentParam[1].length : 1;
        return accumulator + count;
    }, 0);
};
