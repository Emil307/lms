import { Flex } from "@mantine/core";
import React from "react";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { $CreateAdvantageRequest, Advantage, CreateAdvantageRequest, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";

export interface CreateAdvantageFormProps {
    onClose: () => void;
}

const CreateAdvantageForm = ({ onClose }: CreateAdvantageFormProps) => {
    const createAdvantage = (values: CreateAdvantageRequest) => {
        return staticPageApi.createAdvantage(values);
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание карточки преимущества",
            message: "Карточка успешно создана",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания карточки преимущества",
        });
    };

    return (
        <ManagedForm<CreateAdvantageRequest, Advantage>
            initialValues={initialValues}
            validationSchema={$CreateAdvantageRequest}
            mutationKey={[MutationKeys.CREATE_ADVANTAGE]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_ADVANTAGES] }]}
            mutationFunction={createAdvantage}
            onSuccess={onSuccess}
            onError={onError}>
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
        </ManagedForm>
    );
};

export default CreateAdvantageForm;
