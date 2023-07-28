import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { CreateAdminTagResponse, tagApi } from "@entities/tag";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { $CreateTagFormValidation, CreateTagFormValidation } from "./types";

export interface CreateTagFormProps extends BoxProps {
    onClose: () => void;
}

const CreateTagForm = ({ onClose, ...props }: CreateTagFormProps) => {
    const createAdminTag = (values: CreateTagFormValidation) => {
        return tagApi.createAdminTag(values);
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание тега",
            message: "Тег успешно создан",
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
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_TAGS] }]}
                mutationFunction={createAdminTag}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
                hasConfirmModal>
                {({ onCancel }) => (
                    <Flex direction="column" gap={{ base: 24, xs: 32 }}>
                        <FInput name="name" label="Название" />
                        <Flex gap={8}>
                            <Button variant="border" size="large" onClick={onCancel} w="100%">
                                Отмена
                            </Button>
                            <Button type="submit" variant="secondary" size="large" w="100%">
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default CreateTagForm;
