import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormikConfig, FormikProps, FormikValues } from "formik";
import dayjs from "dayjs";
import { ArrayParam, DateParam, NumberParam, StringParam, useQueryParams } from "use-query-params";
import { z } from "zod";
import { $BaseValidationSchema, TFilterTable } from "../../types";
import { BASE_FILTER_QUERY_NAME } from "../../constants";

type TParams<F> = {
    disableQueryParams: boolean;
    goToFirstPage?: () => void;
    filter?: TFilterTable<F>;
};

export const useDataGridFilters = <F extends FormikValues>({ filter, disableQueryParams, goToFirstPage }: TParams<F>) => {
    const router = useRouter();
    const formRef = useRef<FormikProps<F>>(null);
    const [formReady, setFormReady] = useState(false);

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
        if (formReady || !filter || disableQueryParams || !router.isReady || !formRef.current) {
            return;
        }
        formRef.current.setValues(getInitialFormValues());
        formRef.current.setFieldTouched(BASE_FILTER_QUERY_NAME);
        setFormReady(true);
    }, [disableQueryParams, router.isReady, formRef.current, formReady]);

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

    const formikConfig: FormikConfig<F> = useMemo(() => {
        return {
            initialValues: filter?.initialValues ?? ({} as F),
            validationSchema: $BaseValidationSchema.merge(filter?.validationSchema ?? z.object({})),
            onSubmit: handleSubmit,
        };
    }, [filter]);

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

    return { formikConfig, formRef, filterParamsForRequest: paramsForRequest, isEmptyFilter: isEmptyFilter() };
};
