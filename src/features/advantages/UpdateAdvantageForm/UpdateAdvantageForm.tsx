import { Flex } from "@mantine/core";
import React from "react";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { $UpdateAdvantageRequest, Advantage, UpdateAdvantageRequest, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";

export interface UpdateAdvantageFormProps {
    data?: Advantage;
    onClose: () => void;
}

const UpdateAdvantageForm = ({ data, onClose }: UpdateAdvantageFormProps) => {
    const updateAdvantage = (values: UpdateAdvantageRequest) => {
        return staticPageApi.updateAdvantage({ ...values, id: data?.id });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления карточки преимущества",
        });
    };

    return (
        <ManagedForm<UpdateAdvantageRequest, Advantage>
            initialValues={{
                ...initialValues,
                ...data,
            }}
            validationSchema={$UpdateAdvantageRequest}
            mutationKey={[MutationKeys.UPDATE_ADVANTAGE]}
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADVANTAGE, String(data?.id)] },
                { queryKey: [QueryKeys.GET_ADMIN_ADVANTAGES] },
            ]}
            mutationFunction={updateAdvantage}
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

export default UpdateAdvantageForm;
