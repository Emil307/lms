import { Title, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { Folder as FolderIcon } from "react-feather";
import { Button, FInput, FTextarea, ManagedForm } from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import { CourseModule, courseModuleApi, UpdateCourseModuleFormValues, UpdateCourseModuleResponse } from "@entities/courseModule";
import { $UpdateCourseModuleFormValues } from "@entities/courseModule";
import { getInitialValues } from "./utils";

export interface UpdateCourseModuleModalProps {
    courseId: string;
    module: CourseModule;
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
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_COURSE_MODULES, courseId] },
                { queryKey: [QueryKeys.GET_COURSE_MODULE, courseId, moduleId] },
            ]}
            onError={onError}
            disableOverlay>
            {({ isLoading }) => (
                <Flex gap={24} direction="column">
                    <Flex gap={16}>
                        <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                            <FolderIcon />
                        </ThemeIcon>
                        <Title order={4}>Модуль {moduleNumber}</Title>
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

export default UpdateCourseModuleModal;
