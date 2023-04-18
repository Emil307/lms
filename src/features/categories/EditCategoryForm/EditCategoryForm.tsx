import { Box, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import axios from "axios";
import { Button, FInput, Form } from "@shared/ui";
import { $updateAdminCategoryRequest, AdminCategory, UpdateAdminCategoryRequest, useUpdateCategory } from "@entities/category";
import { initialValues } from "./constants";

export interface EditCategoryFormProps {
    parentId?: number;
    data?: AdminCategory;
    onClose: () => void;
}

const EditCategoryForm = ({ data, parentId, onClose }: EditCategoryFormProps) => {
    const updateCategory = useUpdateCategory(String(data?.id));

    const config: FormikConfig<UpdateAdminCategoryRequest> = {
        initialValues: {
            ...initialValues,
            ...data,
        },
        enableReinitialize: true,
        validationSchema: $updateAdminCategoryRequest,
        onSubmit: (values, { setFieldError }) => {
            updateCategory.mutate(
                { ...values, parentId },
                {
                    onSuccess: () => {
                        onClose();
                    },
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            for (const errorField in error.response?.data.errors) {
                                setFieldError(errorField, error.response?.data.errors[errorField][0]);
                            }
                        }
                    },
                }
            );
        },
    };
    return (
        <Box>
            <Form config={config}>
                <FInput name="name" label="Название" />

                <Flex mt={32} gap={8}>
                    <Button variant="border" size="large" onClick={onClose} w="100%">
                        Отмена
                    </Button>
                    <Button type="submit" variant="secondary" size="large" w="100%">
                        Сохранить
                    </Button>
                </Flex>
            </Form>
        </Box>
    );
};

export default EditCategoryForm;
