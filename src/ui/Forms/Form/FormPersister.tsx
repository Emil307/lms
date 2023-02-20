/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStorage } from "@mantine/hooks";
import { FormikValues, useFormikContext } from "formik";
import React, { useEffect, useId } from "react";

export type FormPersisterProps<T extends FormikValues> = {
    enabled?: boolean;
    initialValues: T;
};

export default function FormPersister<T extends FormikValues>({
    initialValues,
    enabled,
    children = null,
}: React.PropsWithChildren<FormPersisterProps<T>>): JSX.Element {
    const context = useFormikContext<T>();
    const id = useId();
    const [value, setValue] = useLocalStorage<T>({ key: id, defaultValue: initialValues, getInitialValueInEffect: false });

    useEffect(() => {
        if (!enabled) return;
        context.setValues(value);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        setValue(context.values);
    }, [context.values, enabled, setValue]);

    return children as JSX.Element;
}
