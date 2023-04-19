import { Box, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import axios from "axios";
import { Button, FInput, Form } from "@shared/ui";
import { $createAdvantageRequest, CreateAdvantageRequest, useCreateAdvantage } from "@entities/staticPage";
import { initialValues } from "./constants";

export interface CreateAdvantageFormProps {
    onClose: () => void;
}

const CreateAdvantageForm = ({ onClose }: CreateAdvantageFormProps) => {
    const createAdvantage = useCreateAdvantage();

    const config: FormikConfig<CreateAdvantageRequest> = {
        initialValues: initialValues,
        validationSchema: $createAdvantageRequest,
        onSubmit: (values, { setFieldError }) => {
            createAdvantage.mutate(values, {
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
                <Flex direction="column" gap={8}>
                    <FInput name="title" label="Заголовок" />
                    <FInput name="description" label="Пояснение" />
                </Flex>
                <Flex mt={24} gap={8}>
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

export default CreateAdvantageForm;
