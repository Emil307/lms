import { Flex } from "@mantine/core";
import React from "react";
import { Button, FInput, ManagedForm } from "@shared/ui";
import { $CreateAdminCategoryRequest, AdminCategory, categoryApi, CreateAdminCategoryRequest } from "@entities/category";
import { initialValues } from "./constants";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";

export interface CreateCategoryFormProps {
    parentId?: number;
    isActive?: boolean;
    onClose: () => void;
}

const CreateCategoryForm = ({ parentId, isActive = false, onClose }: CreateCategoryFormProps) => {
    const createCategory = (values: CreateAdminCategoryRequest) => {
        return categoryApi.createAdminCategory({ parentId, isActive, ...values });
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
        <ManagedForm<CreateAdminCategoryRequest, AdminCategory>
            mutationKey={[MutationKeys.CREATE_CATEGORY]}
            mutationFunction={createCategory}
            initialValues={initialValues}
            validationSchema={$CreateAdminCategoryRequest}
            onSuccess={onSuccess}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_CATEGORIES] }, { queryKey: [QueryKeys.GET_ADMIN_SUBCATEGORIES] }]}
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
