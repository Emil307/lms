import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormikConfig, FormikProps, FormikValues } from "formik";
import dayjs from "dayjs";
import { TFilterTable } from "../../types";
import { ArrayParam, DateParam, NumberParam, StringParam, useQueryParams } from "use-query-params";

type TParams<F> = {
    disableQueryParams: boolean;
    goToFirstPage?: () => void;
    filter?: TFilterTable<F>;
};

export const useDataGridFilters = <F extends FormikValues>({ filter, disableQueryParams, goToFirstPage }: TParams<F>) => {
    const router = useRouter();
    const formRef = useRef<FormikProps<F>>(null);

    const initialFilterParams: F = useMemo(() => {
        return Object.keys(filter?.initialValues || {}).reduce((acc, cur) => {
            if (Array.isArray(filter?.initialValues[cur])) {
                return { ...acc, [cur]: ArrayParam };
            }
            if (filter?.initialValues[cur] === null) {
                return { ...acc, [cur]: DateParam };
            }
            return { ...acc, [cur]: StringParam };
        }, {} as F);
    }, [filter?.initialValues]);

    const [query, setQuery] = useQueryParams({
        ...initialFilterParams,
        page: NumberParam,
    });

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

    const createNewFilterParams = (values: F) => {
        const newParams = {} as Partial<F>;
        Object.keys(values).forEach((fieldKey: keyof F) => {
            const value = values[fieldKey];
            newParams[fieldKey] = value === "" ? undefined : value;
        });
        return newParams;
    };

    const getFilterParamsForRequest = () => {
        const necessaryFilterParams = {} as Partial<F>;

        if (disableQueryParams && formStateForDisabledQuery) {
            return createNewFilterParams(formStateForDisabledQuery);
        }

        Object.keys(filter.initialValues).forEach((fieldKey: keyof F) => {
            const value = query[fieldKey] as F[keyof F];
            if (!value) {
                return;
            }
            if ((value as unknown) instanceof Date) {
                necessaryFilterParams[fieldKey] = dayjs(value).format("YYYY-MM-DD") as F[keyof F];
            }
            necessaryFilterParams[fieldKey] = value;
        });

        return necessaryFilterParams;
    };

    const paramsForRequest = getFilterParamsForRequest();

    const getInitialFormValues = () => {
        if (disableQueryParams && formStateForDisabledQuery) {
            return formStateForDisabledQuery;
        }
        const initialValues = { ...filter.initialValues };
        for (const key in filter.initialValues) {
            initialValues[key] = (query[key] as F[keyof F]) ?? filter.initialValues[key];
        }
        return initialValues;
    };

    const isEmptyFilter = () => !paramsForRequest || !Object.keys(paramsForRequest).length;

    const handleSubmit = async (values: F) => {
        if (disableQueryParams) {
            setFormStateForDisabledQuery(values);
            goToFirstPage && goToFirstPage();
            return;
        }
        setQuery({
            ...createNewFilterParams(values),
            page: goToFirstPage ? 1 : undefined,
        });
    };

    const formikConfig: FormikConfig<F> = {
        initialValues: filter.initialValues,
        validationSchema: filter.validationSchema,
        onSubmit: handleSubmit,
    };

    return { formikConfig, formRef, filterParamsForRequest: paramsForRequest, isEmptyFilter: isEmptyFilter() };
};
