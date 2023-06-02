import { InvalidateOptions, InvalidateQueryFilters, MutationKey, QueryKey, useMutation } from "@tanstack/react-query";
import { FormikConfig, FormikHelpers, FormikProps, FormikValues } from "formik";
import React, { useRef } from "react";
import axios from "axios";
import { closeModal, openModal } from "@mantine/modals";
import { ConfirmActionModal } from "@shared/ui/ConfirmActionModal";
import { queryClient } from "@app/providers";
import { DetectorFormUpdate } from "@shared/ui/Forms/Form/components";
import Form, { FormProps } from "./Form";

type ExtendedProps<F extends FormikValues = FormikValues> = Omit<FormProps<F>, "config">;

export interface ManagedFormProps<F extends FormikValues, R> extends Omit<ExtendedProps<F>, "children"> {
    mutationKey: MutationKey;
    keysInvalidateQueries?: { queryKey?: QueryKey; filters?: InvalidateQueryFilters<unknown>; options?: InvalidateOptions }[];
    mutationFunction: (params: F) => Promise<R>;
    onChange?: (formikProps: FormikProps<F>) => void;
    onSuccess: (response: R, formikHelpers: Omit<FormikHelpers<F>, "setFieldError">) => void;
    onError?: (error: unknown) => void;
    onCancel?: () => void;
    initialValues: FormikConfig<F>["initialValues"];
    validationSchema?: FormikConfig<F>["validationSchema"];
    validateOnChange?: boolean;
    hasConfirmModal?: boolean;
    children: React.ReactNode | ((props: FormikProps<F> & { onCancel: () => void }) => React.ReactNode);
}

export default function ManagedForm<F extends FormikValues, R>({
    mutationKey,
    keysInvalidateQueries = [],
    mutationFunction,
    onSuccess,
    onChange = () => undefined,
    onCancel = () => undefined,
    onError = () => undefined,
    initialValues,
    validationSchema,
    validateOnChange = true,
    children,
    ...form
}: ManagedFormProps<F, R>) {
    const formRef = useRef<FormikProps<F>>(null);
    const { isLoading, mutate } = useMutation<R, unknown, F>(mutationKey, { mutationFn: mutationFunction });

    const handleCloseConfirmModal = () => closeModal("CONFIRM_ACTION");

    const handleCloseWithoutSave = () => {
        handleCloseConfirmModal();
        formRef.current?.resetForm({ values: initialValues });
        onCancel();
    };

    const handleCloseWithSave = () => {
        handleCloseConfirmModal();
        formRef.current?.submitForm();
    };

    const handleCancel = (dirty: boolean) => {
        if (!dirty) {
            formRef.current?.resetForm({ values: initialValues });
            return onCancel();
        }

        openModal({
            modalId: "CONFIRM_ACTION",
            title: "Предупреждение",
            centered: true,
            size: 408,
            children: <ConfirmActionModal onSubmit={handleCloseWithSave} onClose={handleCloseWithoutSave} />,
        });
    };

    const handleSubmit = (values: F, { setFieldError, ...formikHelpers }: FormikHelpers<F>) => {
        mutate(values, {
            onSuccess: (response) => {
                keysInvalidateQueries.forEach(({ queryKey, filters, options }) => {
                    queryClient.invalidateQueries(queryKey, { refetchType: "all", ...filters }, options);
                });
                onSuccess(response, formikHelpers);
            },
            onError: (error) => {
                if (axios.isAxiosError(error)) {
                    for (const errorField in error.response?.data.errors) {
                        setFieldError(errorField, error.response?.data.errors[errorField][0]);
                    }
                }
                onError(error);
            },
        });
    };

    const renderForm = (formikProps: FormikProps<F>) => {
        if (typeof children === "function") {
            return children({
                ...formikProps,
                onCancel: () => handleCancel(formikProps.dirty),
            });
        }
        return children;
    };

    const cfg: FormikConfig<F> = {
        initialValues,
        validationSchema,
        enableReinitialize: true,
        validateOnChange: validateOnChange,
        onSubmit: handleSubmit,
    };

    return (
        <Form {...form} config={cfg} isLoading={isLoading} customRef={formRef}>
            {(formikProps) => (
                <>
                    {renderForm(formikProps)}
                    <DetectorFormUpdate onChange={() => onChange(formikProps)} />
                </>
            )}
        </Form>
    );
}
