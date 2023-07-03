import { Flex } from "@mantine/core";
import React from "react";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { categoryApi, CreateAdminCategoryResponse } from "@entities/category";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import { initialValues } from "./constants";
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

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание категории",
            message: "Категория успешно создана",
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
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADMIN_CATEGORIES] },
                { queryKey: [QueryKeys.GET_ADMIN_SUBCATEGORIES_PAGINATE] },
            ]}
            onError={onError}
            disableOverlay>
            <FInput name="name" label={parentId ? "Название подкатегории" : "Название"} />
            <Flex mt={32} gap={8}>
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

export default CreateCategoryForm;
