import { InvalidateOptions, InvalidateQueryFilters, MutationKey, QueryKey, useMutation } from "@tanstack/react-query";
import { FormikConfig, FormikHelpers, FormikProps, FormikValues } from "formik";
import React, { useRef } from "react";
import axios from "axios";
import { closeModal, openModal } from "@mantine/modals";
import { ConfirmActionModal } from "@shared/ui/ConfirmActionModal";
import { queryClient } from "@app/providers";
import Form, { FormProps } from "./Form";

type ExtendedProps<F extends FormikValues = FormikValues> = Omit<FormProps<F>, "config">;

export interface ManagedFormProps<F extends FormikValues, R> extends Omit<ExtendedProps<F>, "children"> {
    mutationKey: MutationKey;
    keysInvalidateQueries?: { queryKey?: QueryKey; filters?: InvalidateQueryFilters<unknown>; options?: InvalidateOptions }[];
    mutationFunction: (params: F) => Promise<R>;
    onSuccess: (response: R) => void;
    onError?: (error: unknown) => void;
    onCancel?: () => void;
    initialValues: FormikConfig<F>["initialValues"];
    validationSchema?: FormikConfig<F>["validationSchema"];
    hasConfirmModal?: boolean;
    children: React.ReactNode | ((props: FormikProps<F> & { onCancel: () => void }) => React.ReactNode);
}

export default function ManagedForm<F extends FormikValues, R>({
    mutationKey,
    keysInvalidateQueries,
    mutationFunction,
    onSuccess,
    onCancel = () => undefined,
    onError = () => undefined,
    initialValues,
    validationSchema,
    children,
    ...form
}: ManagedFormProps<F, R>) {
    const formRef = useRef<FormikProps<F>>(null);
    const { isLoading, mutate } = useMutation<R, unknown, F>(mutationKey, { mutationFn: mutationFunction });

    const handleCloseConfirmModal = () => closeModal("CONFIRM_ACTION");

    const handleCloseWithoutSave = () => {
        handleCloseConfirmModal();
        onCancel();
    };

    const handleCloseWithSave = () => {
        handleCloseConfirmModal();
        formRef.current?.submitForm();
    };

    const handleCancel = (dirty: boolean) => {
        if (!dirty) {
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

    const handleSubmit = (values: F, { setFieldError }: FormikHelpers<F>) => {
        mutate(values, {
            onSuccess: (response) => {
                keysInvalidateQueries?.map((params) => queryClient.invalidateQueries(params));
                onSuccess(response);
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

    const cfg: FormikConfig<F> = {
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    };

    return (
        <Form {...form} config={cfg} isLoading={isLoading} customRef={formRef}>
            {(formikProps) =>
                typeof children === "function"
                    ? children({
                          ...formikProps,
                          onCancel: () => handleCancel(formikProps.dirty),
                      })
                    : children
            }
        </Form>
    );
}
