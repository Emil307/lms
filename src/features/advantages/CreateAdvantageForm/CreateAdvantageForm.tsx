import { Flex } from "@mantine/core";
import React from "react";
import { FControlButtons, FFileInput, FInput, ManagedForm } from "@shared/ui";
import { $CreateAdvantageRequest, Advantage, CreateAdvantageRequest, staticPageApi } from "@entities/staticPage";
import { EntityNames, MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import useStyles from "./CreateAdvantageForm.styles";
import { adaptCreateAdvantageRequest } from "@features/advantages/CreateAdvantageForm/utils";

export interface CreateAdvantageFormProps {
    onClose: () => void;
}

const CreateAdvantageForm = ({ onClose }: CreateAdvantageFormProps) => {
    const { classes } = useStyles();
    const createAdvantage = (values: CreateAdvantageRequest) => {
        return staticPageApi.createAdvantage(adaptCreateAdvantageRequest(values));
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
            invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STATIC_ADVANTAGE }}
            mutationFunction={createAdvantage}
            onSuccess={onSuccess}
            onError={onError}
            disableOverlay>
            <Flex direction="column" gap={8}>
                <FFileInput
                    className={classes.imageInput}
                    name="icon"
                    title="Изменить фото"
                    type="image"
                    fileFormats={["png", "gif", "jpeg", "jpg", "svg", "webp"]}
                    withDeleteButton
                    description="До 1Mb"
                />
                <FInput name="title" label="Заголовок" />
                <FInput name="description" label="Пояснение" />
            </Flex>
            <FControlButtons variant="modal" onClose={onClose} cancelButtonText="Закрыть" mt={24} />
        </ManagedForm>
    );
};

export default CreateAdvantageForm;
