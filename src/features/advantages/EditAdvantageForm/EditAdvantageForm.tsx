import { Box, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import axios from "axios";
import { Button, FInput, Form } from "@shared/ui";
import { $updateAdvantageRequest, Advantage, UpdateAdvantageRequest, useUpdateAdvantage } from "@entities/staticPage";
import { initialValues } from "./constants";

export interface EditAdvantageFormProps {
    data?: Advantage;
    onClose: () => void;
}

const EditAdvantageForm = ({ data, onClose }: EditAdvantageFormProps) => {
    const updateAdvantage = useUpdateAdvantage(String(data?.id));

    const config: FormikConfig<UpdateAdvantageRequest> = {
        initialValues: {
            ...initialValues,
            ...data,
        },
        enableReinitialize: true,
        validationSchema: $updateAdvantageRequest,
        onSubmit: (values, { setFieldError }) => {
            updateAdvantage.mutate(values, {
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

export default EditAdvantageForm;
