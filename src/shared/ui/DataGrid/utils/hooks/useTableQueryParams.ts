import { useRouter } from "next/router";
import { TDefaultPageQueryParams, TFunctionParams } from "../../types";
import { FormikValues } from "formik";

export const useTableQueryParams = <F extends FormikValues, R extends TFunctionParams<F>>(filterFields: Array<keyof F>) => {
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
        const currentFilterParams = { ...params } as Partial<F>;
        filterFields.forEach((fieldKey) => {
            const value = currentFilterParams[fieldKey];
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
