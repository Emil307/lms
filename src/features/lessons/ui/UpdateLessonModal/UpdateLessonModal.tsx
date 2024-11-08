import { Flex, ThemeIcon, Text } from "@mantine/core";
import { AlignLeft as AlignLeftIcon } from "react-feather";
import React from "react";
import { FControlButtons, FControlPanel, FInput, FTextarea, Heading, ManagedForm } from "@shared/ui";
import FileMarkIcon from "public/icons/file-mark.svg";
import { EntityNames, MutationKeys } from "@shared/constant";
import { $UpdateLessonFormValues, AdminLessonFromList, lessonApi, UpdateLessonFormValues, UpdateLessonResponse } from "@entities/lesson";
import { createNotification, ToastType } from "@shared/utils";
import { CourseModuleLesson } from "@entities/courseModule";
import { getInitialValues } from "./utils";
import useStyles from "./UpdateLessonModal.styles";

export interface UpdateLessonModalProps {
    data: AdminLessonFromList | CourseModuleLesson;
    onClose: () => void;
    lessonNumber?: number;
}

const UpdateLessonModal = ({ data, onClose, lessonNumber }: UpdateLessonModalProps) => {
    const { classes } = useStyles();

    const updateLesson = (values: UpdateLessonFormValues) => {
        return lessonApi.updateLesson({ ...values, id: String(data.id) });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Редактирование урока",
            message: `Урок "${data.name}" успешно изменен`,
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления урока",
        });
    };

    return (
        <ManagedForm<UpdateLessonFormValues, UpdateLessonResponse>
            initialValues={getInitialValues(data)}
            validationSchema={$UpdateLessonFormValues}
            mutationKey={[MutationKeys.UPDATE_LESSON]}
            invalidateQueriesWithPredicateParams={{ entityName: EntityNames.LESSON }}
            mutationFunction={updateLesson}
            onSuccess={onSuccess}
            onError={onError}
            disableOverlay>
            {() => (
                <Flex gap={24} direction="column">
                    <Flex gap={16} align="center">
                        <ThemeIcon color="primaryHover">
                            <AlignLeftIcon />
                        </ThemeIcon>
                        <Heading order={4}>{lessonNumber ? `Урок ${lessonNumber}` : "Данные урока"}</Heading>
                    </Flex>
                    <Flex gap={8} direction="column">
                        <FInput name="name" label="Название урока" />
                        <FTextarea name="description" placeholder="Описание урока" minRows={9} />
                    </Flex>
                    <Flex gap={16} direction="column">
                        <Flex gap={16} align="center">
                            <ThemeIcon color="primaryHover">
                                <FileMarkIcon className={classes.icon} />
                            </ThemeIcon>
                            <Heading order={4}>Практические задания</Heading>
                        </Flex>
                        <Text className={classes.description}>Активируйте необходимые модули проверки прохождения урока.</Text>
                    </Flex>
                    <Flex className={classes.root} direction="column">
                        <FControlPanel name="hasTest" label="Проверочный тест" variant="secondary" />
                        <FControlPanel name="hasHomework" label="Домашнее задание" variant="secondary" />
                    </Flex>
                    <FControlButtons variant="modal" cancelButtonText="Отмена" onClose={onClose} />
                </Flex>
            )}
        </ManagedForm>
    );
};

export default UpdateLessonModal;
