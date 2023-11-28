import { Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { Folder as FolderIcon } from "react-feather";
import { FControlButtons, FInput, FTextarea, Heading, ManagedForm } from "@shared/ui";
import { EntityNames, MutationKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import {
    courseModuleApi,
    CourseModuleWithoutLessons,
    UpdateCourseModuleFormValues,
    UpdateCourseModuleResponse,
} from "@entities/courseModule";
import { $UpdateCourseModuleFormValues } from "@entities/courseModule";
import { getInitialValues } from "./utils";

export interface UpdateCourseModuleModalProps {
    courseId: string;
    module: CourseModuleWithoutLessons;
    moduleNumber: number;
    onClose: () => void;
}

const UpdateCourseModuleModal = ({ courseId, module, moduleNumber, onClose }: UpdateCourseModuleModalProps) => {
    const moduleId = String(module.id);

    const updateCourseModule = (values: UpdateCourseModuleFormValues) => {
        return courseModuleApi.updateModule({ ...values, courseId, moduleId });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Редактирование модуля",
            message: "Модуль успешно изменен",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка изменения модуля",
        });
    };

    return (
        <ManagedForm<UpdateCourseModuleFormValues, UpdateCourseModuleResponse>
            mutationKey={[MutationKeys.UPDATE_COURSE_MODULE]}
            mutationFunction={updateCourseModule}
            initialValues={getInitialValues(module)}
            validationSchema={$UpdateCourseModuleFormValues}
            onSuccess={onSuccess}
            invalidateQueriesWithPredicateParams={{ entityName: EntityNames.COURSE_MODULE }}
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

export default UpdateCourseModuleModal;
