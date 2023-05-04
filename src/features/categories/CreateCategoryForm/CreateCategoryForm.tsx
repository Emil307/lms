import { Box, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import axios from "axios";
import { Button, FInput, Form } from "@shared/ui";
import { $CreateAdminCategoryRequest, CreateAdminCategoryRequest, useCreateCategory } from "@entities/category";
import { initialValues } from "./constants";

export interface CreateCategoryFormProps {
    parentId?: number;
    onClose: () => void;
}

const CreateCategoryForm = ({ parentId, onClose }: CreateCategoryFormProps) => {
    const createCategory = useCreateCategory(parentId);

    const config: FormikConfig<CreateAdminCategoryRequest> = {
        initialValues: initialValues,
        validationSchema: $CreateAdminCategoryRequest,
        onSubmit: (values, { setFieldError }) => {
            createCategory.mutate(values, {
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
            });
        },
    };
    return (
        <Box>
            <Form config={config}>
                <FInput name="name" label={parentId ? "Название подкатегории" : "Название"} />
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

export default CreateCategoryForm;
