import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { FControlButtons, FInput, ManagedForm } from "@shared/ui";
import { CreateAdminTagResponse, tagApi } from "@entities/tag";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues, keysInvalidateQueries } from "./constants";
import { $CreateTagFormValidation, CreateTagFormValidation } from "./types";

export interface CreateTagFormProps extends BoxProps {
    onClose: () => void;
}

const CreateTagForm = ({ onClose, ...props }: CreateTagFormProps) => {
    const createAdminTag = (values: CreateTagFormValidation) => {
        return tagApi.createAdminTag(values);
    };

    const onSuccess = (response: CreateAdminTagResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание тега",
            message: `Тег "${response.name}" успешно создан`,
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания тега",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<CreateTagFormValidation, CreateAdminTagResponse>
                initialValues={initialValues}
                validationSchema={$CreateTagFormValidation}
                mutationKey={[MutationKeys.CREATE_ADMIN_TAG]}
                keysInvalidateQueries={keysInvalidateQueries}
                mutationFunction={createAdminTag}
                onSuccess={onSuccess}
                onError={onError}
                disableOverlay>
                <Flex direction="column" gap={{ base: 24, xs: 32 }}>
                    <FInput name="name" label="Название" />
                    <FControlButtons variant="modal" cancelButtonText="Отмена" onClose={onClose} />
                </Flex>
            </ManagedForm>
        </Box>
    );
};

export default CreateTagForm;
