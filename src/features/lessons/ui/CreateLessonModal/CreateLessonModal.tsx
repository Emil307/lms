import { Flex, ThemeIcon, Title, Text } from "@mantine/core";
import { AlignLeft as AlignLeftIcon } from "react-feather";
import React, { useState } from "react";
import { Button, FControlPanel, FInput, FTextarea, ManagedForm } from "@shared/ui";
import FileMarkIcon from "public/icons/file-mark.svg";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { $CreateLessonFormValues, CreateLessonFormValues, CreateLessonResponse, lessonApi } from "@entities/lesson";
import { createNotification, ToastType } from "@shared/utils";
import { useAttachLessonToCourseModule } from "@entities/courseModule";
import { initialValues } from "./constants";
import useStyles from "./CreateLessonModal.styles";

export interface CreateLessonModalProps {
    courseId?: string;
    moduleId?: string;
    lessonNumber?: number;
    onClose: () => void;
}

const CreateLessonModal = ({ courseId = "", moduleId = "", lessonNumber, onClose }: CreateLessonModalProps) => {
    const { classes } = useStyles();
    const [isSubmitting, setSubmitting] = useState(false);
    const { mutate: attachLessonToModule } = useAttachLessonToCourseModule({ courseId, moduleId });

    const createLesson = (values: CreateLessonFormValues) => {
        setSubmitting(true);
        return lessonApi.createLesson(values);
    };

    const onSuccessCreate = (response: CreateLessonResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание урока",
            message: "Урок успешно создан",
        });
        if (courseId && moduleId) {
            attachLessonToModule([String(response.id)], {
                onSuccess: () => {
                    onClose();
                },
                onError: () => {
                    setSubmitting(false);
                },
            });
        }
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания урока",
        });
        setSubmitting(false);
    };

    return (
        <ManagedForm<CreateLessonFormValues, CreateLessonResponse>
            initialValues={initialValues}
            validationSchema={$CreateLessonFormValues}
            mutationKey={[MutationKeys.CREATE_LESSON]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_LESSONS] }]}
            mutationFunction={createLesson}
            onSuccess={onSuccessCreate}
            onError={onError}
            disableOverlay>
            {({ dirty }) => (
                <Flex gap={24} direction="column">
                    <Flex gap={16} align="center">
                        <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                            <AlignLeftIcon />
                        </ThemeIcon>
                        <Title order={4}>{lessonNumber ? `Урок ${lessonNumber}` : "Данные урока"}</Title>
                    </Flex>
                    <Flex gap={8} direction="column">
                        <FInput name="name" label="Название урока" />
                        <FTextarea name="description" placeholder="Описание урока" minRows={9} />
                    </Flex>
                    <Flex gap={16} direction="column">
                        <Flex gap={16} align="center">
                            <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                                <FileMarkIcon className={classes.icon} />
                            </ThemeIcon>
                            <Title order={4}>Практические задания</Title>
                        </Flex>
                        <Text className={classes.description}>Активируйте необходимые модули проверки прохождения урока.</Text>
                    </Flex>
                    <Flex className={classes.root} direction="column">
                        <FControlPanel name="hasTest" label="Проверочный тест" variant="secondary" />
                        <FControlPanel name="hasHomework" label="Домашнее задание" variant="secondary" />
                    </Flex>
                    <Flex gap={8}>
                        <Button variant="border" size="large" onClick={onClose} disabled={isSubmitting} w="50%">
                            Отмена
                        </Button>
                        <Button type="submit" variant="secondary" size="large" loading={isSubmitting} disabled={!dirty} w="50%">
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default CreateLessonModal;