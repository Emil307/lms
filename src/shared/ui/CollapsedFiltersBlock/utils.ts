import { FormikValues } from "formik";

interface GetCountAppliedFiltersProps<F extends FormikValues> {
    initialValues: F;
    currentValues?: F;
}

export const getCountAppliedFilters = <F extends FormikValues>({
    initialValues,
    currentValues,
}: GetCountAppliedFiltersProps<F>): number => {
    if (!currentValues) {
        return 0;
    }

    return Object.entries(currentValues).reduce((accumulator, currentParam) => {
        if (initialValues[currentParam[0] as keyof Partial<F>] === currentParam[1] || currentParam[1] === undefined) {
            return accumulator;
        }

        const count = Array.isArray(currentParam[1]) ? currentParam[1].length : 1;
        return accumulator + count;
    }, 0);
};
