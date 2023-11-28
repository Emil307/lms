import { Flex } from "@mantine/core";
import React from "react";
import { FControlButtons, FInput, ManagedForm } from "@shared/ui";
import { categoryApi, CreateAdminCategoryResponse } from "@entities/category";
import { MutationKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import { initialValues, keysInvalidateQueries } from "./constants";
import { $CreateAdminCategoryFormValidation, CreateAdminCategoryFormValidation } from "./types";

export interface CreateCategoryFormProps {
    parentId?: number | null;
    isSubcategory?: boolean;
    onClose: () => void;
}

const CreateCategoryForm = ({ parentId = null, isSubcategory = false, onClose }: CreateCategoryFormProps) => {
    const createCategory = (values: CreateAdminCategoryFormValidation) => {
        return categoryApi.createAdminCategory({ ...values, parentId, isActive: isSubcategory });
    };

    const onSuccess = (response: CreateAdminCategoryResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание категории",
            message: `Категория "${response.name}" успешно создана`,
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания категории",
        });
    };

    return (
        <ManagedForm<CreateAdminCategoryFormValidation, CreateAdminCategoryResponse>
            mutationKey={[MutationKeys.CREATE_CATEGORY]}
            mutationFunction={createCategory}
            initialValues={initialValues}
            validationSchema={$CreateAdminCategoryFormValidation}
            onSuccess={onSuccess}
            keysInvalidateQueries={keysInvalidateQueries}
            onError={onError}
            disableOverlay>
            <Flex direction="column" gap={{ base: 24, xs: 32 }}>
                <FInput name="name" label={parentId ? "Название подкатегории" : "Название"} />
                <FControlButtons variant="modal" onClose={onClose} cancelButtonText="Отмена" />
            </Flex>
        </ManagedForm>
    );
};

export default CreateCategoryForm;
