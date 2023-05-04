import { useRouter } from "next/router";
import { FormikValues } from "formik";
import { TDefaultPageQueryParams, TFilterTable, TFunctionParams } from "../../types";

export const useTableQueryParams = <F extends FormikValues, R extends TFunctionParams<F>>(
    filterFields: TFilterTable<F>["initialValues"] | undefined
) => {
    const router = useRouter();
    const allParams = router.query;
    const { page = 1, perPage = 10, sortField, sortOrder, ...params } = allParams;

    const defaultParams = {
        page,
        perPage,
        sortField,
        sortOrder,
    } as TDefaultPageQueryParams;

    const preparePaginationParams = () => {
        return {
            perPage: Number(defaultParams.perPage),
            page: Number(defaultParams.page),
        };
    };

    const prepareSortParams = () => {
        if (!defaultParams.sortField || !defaultParams.sortOrder) {
            return undefined;
        }
        return { sort: { [defaultParams.sortField]: defaultParams.sortOrder } };
    };

    const prepareFiltersParams = () => {
        const necessaryFilterParams = {} as Partial<F>;
        if (!filterFields) {
            return necessaryFilterParams;
        }
        const currentFilterParams = { ...params } as Partial<F>;
        Object.keys(filterFields).forEach((fieldKey: keyof F) => {
            const value = currentFilterParams[fieldKey];
            if (Array.isArray(filterFields[fieldKey]) && !Array.isArray(value)) {
                necessaryFilterParams[fieldKey] = value ? ([value] as Partial<F>[keyof F]) : ([] as Partial<F>[keyof F]);
                return;
            }
            necessaryFilterParams[fieldKey] = value === "" ? undefined : value;
        });

        return necessaryFilterParams;
    };

    const filterParams = prepareFiltersParams();

    const paramsForRequest = {
        ...preparePaginationParams(),
        ...prepareSortParams(),
        ...filterParams,
    } as R;

    return { paramsForRequest, filterParams };
};
