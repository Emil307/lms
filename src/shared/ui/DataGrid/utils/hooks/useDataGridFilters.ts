import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FormikConfig, FormikProps, FormikValues } from "formik";
import dayjs from "dayjs";
import { TFilterTable } from "../../types";

type TParams<F> = {
    disableQueryParams: boolean;
    goToFirstPage?: () => void;
    filter?: TFilterTable<F>;
};

export const useDataGridFilters = <F extends FormikValues>({ filter, disableQueryParams, goToFirstPage }: TParams<F>) => {
    const router = useRouter();
    const formRef = useRef<FormikProps<F>>(null);
    const [formStateForDisabledQuery, setFormStateForDisabledQuery] = useState<F | undefined>(filter?.initialValues);

    useEffect(() => {
        if (!filter || disableQueryParams || !router.isReady || !formRef.current) {
            return;
        }
        formRef.current.setValues(getInitialFormValues());
    }, [disableQueryParams, router.isReady, formRef.current]);

    if (!filter) {
        return;
    }

    const getParamsForRequest = () => {
        const necessaryFilterParams = {} as Partial<F>;

        if (disableQueryParams && formStateForDisabledQuery) {
            Object.keys(formStateForDisabledQuery).forEach((fieldKey: keyof F) => {
                const value = formStateForDisabledQuery[fieldKey];
                necessaryFilterParams[fieldKey] = value === "" ? undefined : value;
            });
            return necessaryFilterParams;
        }

        const { page, perPage, sortField, sortOrder, ...params } = router.query;
        const currentFilterParams = { ...params };
        Object.keys(filter.initialValues).forEach((fieldKey: keyof F) => {
            const value = currentFilterParams[fieldKey as string];
            if (Array.isArray(filter.initialValues[fieldKey]) && !Array.isArray(value)) {
                necessaryFilterParams[fieldKey] = value ? ([value] as F[keyof F]) : ([] as F[keyof F]);
                return;
            }
            if (typeof value === "string" && typeof filter.initialValues[fieldKey] !== "string" && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                necessaryFilterParams[fieldKey] = new Date(value) as F[keyof F];
                return;
            }
            necessaryFilterParams[fieldKey] = value === "" ? undefined : (value as F[keyof F]);
        });

        return necessaryFilterParams;
    };

    const paramsForRequest = getParamsForRequest();

    const getInitialFormValues = () => {
        const initialValues = { ...filter.initialValues };
        for (const key in filter.initialValues) {
            initialValues[key] = paramsForRequest[key] ?? filter.initialValues[key];
        }
        return initialValues;
    };

    const prepareQueryParams = (values: F) => {
        const params = {} as Record<string, any>;
        Object.keys(values).forEach((key) => {
            const value = values[key];
            if (value instanceof Date) {
                params[key] = dayjs(value).format("YYYY-MM-DD");
                return;
            }
            params[key] = value;
        });
        return params;
    };

    const isEmptyFilter = () => {
        if (!paramsForRequest || !Object.keys(paramsForRequest).length) {
            return true;
        }
        return Object.keys(paramsForRequest).every((key) => {
            const param = paramsForRequest[key];
            if (Array.isArray(param) && !param.length) {
                return true;
            }
            return !param;
        });
    };

    const handleSubmit = async (values: F) => {
        if (disableQueryParams) {
            setFormStateForDisabledQuery(values);
            goToFirstPage && goToFirstPage();
            return;
        }
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, ...(goToFirstPage ? { page: "1" } : {}), ...prepareQueryParams(values) },
            },
            undefined,
            { shallow: true }
        );
    };

    const formikConfig: FormikConfig<F> = {
        initialValues: filter.initialValues,
        validationSchema: filter.validationSchema,
        onSubmit: handleSubmit,
    };

    return { formikConfig, formRef, filterParams: paramsForRequest, isEmptyFilter: isEmptyFilter() };
};
