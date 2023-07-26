import { Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { Folder as FolderIcon } from "react-feather";
import { Button, FInput, FTextarea, Heading, ManagedForm } from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import { $CreateCourseModuleFormValues, courseModuleApi } from "@entities/courseModule";
import { CreateCourseModuleFormValues, CreateCourseModuleResponse } from "@entities/courseModule";
import { initialValues } from "./constants";

export interface CreateCourseModuleModalProps {
    courseId: string;
    moduleNumber: number;
    onClose: () => void;
}

const CreateCourseModuleModal = ({ courseId, moduleNumber, onClose }: CreateCourseModuleModalProps) => {
    const createCourseModule = (values: CreateCourseModuleFormValues) => {
        return courseModuleApi.createModule({ ...values, courseId });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание модуля",
            message: "Модуль успешно создан",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания модуля",
        });
    };

    return (
        <ManagedForm<CreateCourseModuleFormValues, CreateCourseModuleResponse>
            mutationKey={[MutationKeys.CREATE_COURSE_MODULE]}
            mutationFunction={createCourseModule}
            initialValues={initialValues}
            validationSchema={$CreateCourseModuleFormValues}
            onSuccess={onSuccess}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_COURSE_MODULES, courseId] }]}
            onError={onError}
            disableOverlay>
            {({ isLoading }) => (
                <Flex gap={24} direction="column">
                    <Flex gap={16}>
                        <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                            <FolderIcon />
                        </ThemeIcon>
                        <Heading order={4}>Модуль {moduleNumber}</Heading>
                    </Flex>
                    <Flex gap={8} direction="column">
                        <FInput name="name" label="Наименование" />
                        <FTextarea name="description" placeholder="Описание модуля" minRows={9} />
                    </Flex>
                    <Flex gap={8}>
                        <Button variant="border" size="large" onClick={onClose} disabled={isLoading} w="50%">
                            Отмена
                        </Button>
                        <Button type="submit" variant="secondary" size="large" loading={isLoading} w="50%">
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default CreateCourseModuleModal;
