import { Flex, Text } from "@mantine/core";
import React from "react";
import { FControlButtons, FInput, Loader, ManagedForm } from "@shared/ui";
import { UpdateAdminCategoryResponse, categoryApi, useAdminCategory } from "@entities/category";
import { EntityNames, MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { $UpdateAdminCategoryFormValidation, UpdateAdminCategoryFormValidation } from "./types";
import { adaptUpdateCategoryForm } from "./utils";

export interface UpdateCategoryFormProps {
    id: string;
    onClose: () => void;
}

const UpdateCategoryForm = ({ id, onClose }: UpdateCategoryFormProps) => {
    const { data: categoryData, isLoading, isError } = useAdminCategory({ id });

    const updateCategory = (values: UpdateAdminCategoryFormValidation) => {
        return categoryApi.updateAdminCategory({ ...values, id: String(categoryData?.id) });
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
            title: "Ошибка обновления категории",
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <ManagedForm<UpdateAdminCategoryFormValidation, UpdateAdminCategoryResponse>
            mutationKey={[MutationKeys.UPDATE_CATEGORY, id]}
            mutationFunction={updateCategory}
            initialValues={{ ...initialValues, ...adaptUpdateCategoryForm(categoryData) }}
            validationSchema={$UpdateAdminCategoryFormValidation}
            onSuccess={onSuccess}
            invalidateQueriesWithPredicateParams={{ entityName: EntityNames.CATEGORY }}
            onError={onError}
            disableOverlay>
            <Flex direction="column" gap={{ base: 24, xs: 32 }}>
                <FInput name="name" label={categoryData.parentId ? "Название подкатегории" : "Название"} />
                <FControlButtons variant="modal" onClose={onClose} cancelButtonText="Отмена" />
            </Flex>
        </ManagedForm>
    );
};

export default UpdateCategoryForm;
