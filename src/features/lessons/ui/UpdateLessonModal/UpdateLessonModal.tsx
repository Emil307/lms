import { Flex, ThemeIcon, Title, Text } from "@mantine/core";
import { AlignLeft as AlignLeftIcon } from "react-feather";
import React from "react";
import { Button, FControlPanel, FInput, FTextarea, ManagedForm } from "@shared/ui";
import FileMarkIcon from "public/icons/file-mark.svg";
import { MutationKeys, QueryKeys } from "@shared/constant";
import {
    $UpdateLessonFormValues,
    AdminLessonFromList,
    lessonApi,
    UpdateLessonFormValues,
    UpdateLessonResponse,
} from "@entities/lesson";
import { createNotification, ToastType } from "@shared/utils";
import { getInitialValues } from "./utils";
import useStyles from "./UpdateLessonModal.styles";

export interface UpdateLessonModalProps {
    data: AdminLessonFromList;
    onClose: () => void;
    lessonNumber: number;
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
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADMIN_MODULE_LESSONS] },
                { queryKey: [QueryKeys.GET_ADMIN_LESSONS] },
                { queryKey: [QueryKeys.GET_ADMIN_LESSON] },
            ]}
            mutationFunction={updateLesson}
            onSuccess={onSuccess}
            onError={onError}
            disableOverlay>
            {({ isLoading, dirty }) => (
                <Flex gap={24} direction="column">
                    <Flex gap={16} align="center">
                        <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                            <AlignLeftIcon />
                        </ThemeIcon>
                        <Title order={4}>Урок {lessonNumber}</Title>
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
                        <Button variant="border" size="large" onClick={onClose} disabled={isLoading} w="50%">
                            Отмена
                        </Button>
                        <Button type="submit" variant="secondary" size="large" loading={isLoading} disabled={!dirty} w="50%">
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default UpdateLessonModal;
