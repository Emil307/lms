import { Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { Folder as FolderIcon } from "react-feather";
import { FControlButtons, FInput, FTextarea, Heading, ManagedForm } from "@shared/ui";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
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
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADMIN_COURSE_MODULES, [EntityNames.COURSE_MODULE, EntityNames.COURSE], courseId] },
            ]}
            onError={onError}
            disableOverlay>
            {() => (
                <Flex gap={24} direction="column">
                    <Flex gap={16} align="center">
                        <ThemeIcon color="primaryHover">
                            <FolderIcon />
                        </ThemeIcon>
                        <Heading order={4}>Модуль {moduleNumber}</Heading>
                    </Flex>
                    <Flex gap={8} direction="column">
                        <FInput name="name" label="Наименование" />
                        <FTextarea name="description" placeholder="Описание модуля" minRows={9} />
                    </Flex>
                    <FControlButtons variant="modal" cancelButtonText="Отмена" onClose={onClose} />
                </Flex>
            )}
        </ManagedForm>
    );
};

export default CreateCourseModuleModal;
