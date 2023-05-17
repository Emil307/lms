import { Box, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import axios from "axios";
import { Button, FInput, Form } from "@shared/ui";
import { $createAdminTagRequest, CreateAdminTagRequest, useCreateTag } from "@entities/tag";
import { initialValues } from "./constants";

export interface CreateTagFormProps {
    onClose: () => void;
}

const CreateTagForm = ({ onClose }: CreateTagFormProps) => {
    const createTag = useCreateTag();

    const config: FormikConfig<CreateAdminTagRequest> = {
        initialValues: initialValues,
        validationSchema: $createAdminTagRequest,
        onSubmit: (values, { setFieldError }) => {
            createTag.mutate(values, {
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
    //TODO: на ManagedForm
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

export default CreateTagForm;
