import { MutationKey, useMutation } from "@tanstack/react-query";
import { FormikConfig, FormikHelpers, FormikProps, FormikValues } from "formik";
import React, { useRef, useState } from "react";
import axios from "axios";
import { closeModal, openModal } from "@mantine/modals";
import { ConfirmActionModal } from "@shared/ui/ConfirmActionModal";
import { DetectorFormUpdate } from "@shared/ui/Forms/Form/components";
import { InvalidateQueriesWithPredicateProps, invalidateQueriesWithPredicate } from "@shared/utils";
import { queryClient } from "@app/providers";
import { InvalidateQueriesKey } from "@shared/types";
import Form, { FormProps } from "./Form";

type ExtendedProps<F extends FormikValues = FormikValues> = Omit<FormProps<F>, "config">;

export interface ManagedFormProps<F extends FormikValues, R> extends Omit<ExtendedProps<F>, "children"> {
    mutationKey: MutationKey;
    invalidateQueriesWithPredicateParams?: InvalidateQueriesWithPredicateProps;
    keysInvalidateQueries?: InvalidateQueriesKey[];
    mutationFunction: (params: F) => Promise<R>;
    onChange?: (formikProps: FormikProps<F>) => void;
    onSuccess: (response: R, formikHelpers: FormikHelpers<F>) => void;
    onError?: (error: unknown) => void;
    onCancel?: () => void;
    initialValues: FormikConfig<F>["initialValues"];
    validationSchema?: FormikConfig<F>["validationSchema"];
    validateOnChange?: boolean;
    disabledLoadingOnSuccess?: boolean;
    children: React.ReactNode | ((props: FormikProps<F> & { onCancel: () => void; isLoading: boolean }) => React.ReactNode);
}

export default function ManagedForm<F extends FormikValues, R>({
    mutationKey,
    keysInvalidateQueries = [],
    invalidateQueriesWithPredicateParams,
    mutationFunction,
    onSuccess,
    onChange = () => undefined,
    onCancel = () => undefined,
    onError = () => undefined,
    initialValues,
    validationSchema,
    validateOnChange = true,
    disabledLoadingOnSuccess = false,
    children,
    ...form
}: ManagedFormProps<F, R>) {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const formRef = useRef<FormikProps<F>>(null);
    const { mutate } = useMutation<R, unknown, F>(mutationKey, { mutationFn: mutationFunction });

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
            children: <ConfirmActionModal onSubmit={handleCloseWithSave} onClose={handleCloseWithoutSave} />,
        });
    };

    const handleSubmit = (values: F, formikHelpers: FormikHelpers<F>) => {
        setIsSubmiting(true);
        mutate(values, {
            onSuccess: (response) => {
                if (invalidateQueriesWithPredicateParams) {
                    invalidateQueriesWithPredicate(invalidateQueriesWithPredicateParams);
                }
                keysInvalidateQueries.forEach(({ queryKey, filters, options }) => {
                    queryClient.invalidateQueries(queryKey, filters, options);
                });
                onSuccess(response, formikHelpers);
                if (disabledLoadingOnSuccess) {
                    setIsSubmiting(false);
                }
            },
            onError: (error) => {
                if (axios.isAxiosError(error)) {
                    for (const errorField in error.response?.data.errors) {
                        formikHelpers.setFieldError(errorField, error.response?.data.errors[errorField][0]);
                    }
                }
                onError(error);
                setIsSubmiting(false);
            },
        });
    };

    const renderForm = (formikProps: FormikProps<F>) => {
        if (typeof children === "function") {
            return children({
                ...formikProps,
                isLoading: isSubmiting,
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
        <Form {...form} config={cfg} isLoading={isSubmiting} customRef={formRef}>
            {(formikProps) => (
                <>
                    {renderForm(formikProps)}
                    <DetectorFormUpdate onChange={() => onChange(formikProps)} />
                </>
            )}
        </Form>
    );
}
