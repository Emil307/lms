import { AdminLesson, lessonApi, UpdateLessonContentFormValues, UpdateLessonContentResponse } from "@entities/lesson";
import useStyles from "./UpdateLesson.styles";
import { closeModal, openModal } from "@mantine/modals";
import { UpdateLessonModal } from "@features/lessons";
import { Button, FSwitch, FTextEditor, FVideoInput, Heading, ManagedForm, Paragraph } from "@shared/ui";
import PositivelyIcon from "@public/icons/positively.svg";
import FalsyIcon from "@public/icons/falsy.svg";
import { Box, Collapse, Flex } from "@mantine/core";
import { Edit3 as EditIcon } from "react-feather";
import React from "react";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { adaptDataForUpdateLessonContentRequest, getInitialValues } from "@widgets/admin/lessons/UpdateLesson/utils";
import { createNotification, ToastType } from "@shared/utils";

interface UpdateLessonProps {
    data: AdminLesson;
    moduleName?: string;
    onClose: () => void;
}

const UpdateLesson = ({ data, moduleName, onClose }: UpdateLessonProps) => {
    const { classes } = useStyles();
    const lessonId = String(data.id);

    const closeDeleteLessonModal = () => closeModal("UPDATE_LESSON");

    const handleCloseUpdateLessonModal = () => closeDeleteLessonModal();

    const handleOpenUpdateLessonModal = () => {
        openModal({
            modalId: "UPDATE_LESSON",
            title: "Редактирование урока",
            centered: true,
            children: <UpdateLessonModal data={data} onClose={handleCloseUpdateLessonModal} />,
        });
    };

    const handleUpdateLessonContent = (data: UpdateLessonContentFormValues) => {
        return lessonApi.updateLessonContent(adaptDataForUpdateLessonContentRequest({ ...data, id: lessonId }));
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Редактирование урок",
            message: "Урок успешно обновлен",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления урока",
        });
    };

    const renderLabelValue = (isTrue: boolean) => {
        if (isTrue) {
            return (
                <>
                    <Paragraph variant="small-m">Да</Paragraph>
                    <PositivelyIcon className={classes.icon} />
                </>
            );
        }
        return (
            <>
                <Paragraph variant="small-m">Нет</Paragraph>
                <FalsyIcon className={classes.icon} />
            </>
        );
    };

    return (
        <Flex gap={16} direction="column">
            <Box className={classes.card}>
                <Flex gap={16} align="center" justify="space-between">
                    <Flex gap={2} direction="column">
                        {moduleName && <Paragraph variant="text-small-m">{moduleName}</Paragraph>}
                        <Heading order={3}>{data.name}</Heading>
                    </Flex>
                    <Button
                        className={classes.button}
                        variant="white"
                        size="small"
                        onClick={handleOpenUpdateLessonModal}
                        leftIcon={<EditIcon />}>
                        Редактировать
                    </Button>
                </Flex>
                <Paragraph variant="small-m" color="neutral_gray" className={classes.lessonDescription}>
                    {data.description}
                </Paragraph>
                <Flex gap={24}>
                    <Flex gap={6}>
                        <Paragraph variant="small-semi">Проверочный тест:</Paragraph>
                        {renderLabelValue(data.hasTest)}
                    </Flex>
                    <Flex gap={6}>
                        <Paragraph variant="small-semi">Домашнее задание:</Paragraph>
                        {renderLabelValue(data.hasHomework)}
                    </Flex>
                </Flex>
            </Box>

            <ManagedForm<UpdateLessonContentFormValues, UpdateLessonContentResponse>
                initialValues={getInitialValues(data)}
                mutationKey={[MutationKeys.UPDATE_LESSON_CONTENT]}
                mutationFunction={handleUpdateLessonContent}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_MODULE_LESSONS] },
                    { queryKey: [QueryKeys.GET_ADMIN_LESSONS] },
                    { queryKey: [QueryKeys.GET_ADMIN_LESSON] },
                    { queryKey: [QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT] },
                ]}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
                validateOnChange={false}
                hasConfirmModal>
                {({ values, dirty, onCancel }) => (
                    <Flex gap={32} direction="column">
                        <Flex gap={16} direction="column">
                            <FVideoInput name="videos" editMode />
                            <Flex gap={24} direction="column" className={classes.card}>
                                <Flex gap={18} align="center">
                                    <Heading order={3}>Содержание урока</Heading>
                                    <FSwitch name="hasContent" variant="secondary" />
                                </Flex>
                                <Collapse in={values.hasContent}>
                                    <FTextEditor name="content" h={560} />
                                </Collapse>
                            </Flex>
                        </Flex>
                        <Flex gap={8}>
                            <Button variant="border" size="large" onClick={onCancel} w="100%" maw={252}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="secondary" size="large" disabled={!dirty} w="100%" maw={252}>
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </ManagedForm>
        </Flex>
    );
};

export default UpdateLesson;
