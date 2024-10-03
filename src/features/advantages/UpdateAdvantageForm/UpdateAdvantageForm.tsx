import { Flex } from "@mantine/core";
import React from "react";
import { FControlButtons, FFileInput, FInput, Loader, ManagedForm } from "@shared/ui";
import { $UpdateAdvantageRequest, Advantage, UpdateAdvantageRequest, staticPageApi, useAdvantage } from "@entities/staticPage";
import { EntityNames, MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import useStyles from "@features/advantages/CreateAdvantageForm/CreateAdvantageForm.styles";
import { adaptCreateAdvantageRequest } from "@features/advantages/CreateAdvantageForm/utils";
import { initialValues } from "./constants";

export interface UpdateAdvantageFormProps {
    list: Advantage;
    onClose: () => void;
}

const UpdateAdvantageForm = ({ list, onClose }: UpdateAdvantageFormProps) => {
    const { classes } = useStyles();
    const { data, isLoading } = useAdvantage(list.id);

    if (isLoading) return <Loader />;

    const updateAdvantage = (values: UpdateAdvantageRequest) => {
        const adaptValues = adaptCreateAdvantageRequest(values);
        return staticPageApi.updateAdvantage({ ...adaptValues, id: data?.id });
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
            invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STATIC_ADVANTAGE }}
            mutationFunction={updateAdvantage}
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
            <FControlButtons variant="modal" cancelButtonText="Отмена" onClose={onClose} mt={24} />
        </ManagedForm>
    );
};

export default UpdateAdvantageForm;
