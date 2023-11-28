import { Box, Collapse, Flex } from "@mantine/core";
import React from "react";
import { FControlButtons, FSwitch, FTextEditor, FVideoInput, Heading, ManagedForm, Paragraph } from "@shared/ui";
import { createNotification, ToastType } from "@shared/utils";
import { AdminLesson, lessonApi, UpdateLessonContentFormValues, UpdateLessonContentResponse } from "@entities/lesson";
import { EntityNames, MutationKeys } from "@shared/constant";
import PositivelyIcon from "@public/icons/positively.svg";
import FalsyIcon from "@public/icons/falsy.svg";
import useStyles from "./UpdateLesson.styles";
import { UpdateLessonButton } from "./components";
import { adaptDataForUpdateLessonContentRequest, getInitialValues } from "./utils";

interface UpdateLessonProps {
    data: AdminLesson;
    moduleName?: string;
    onClose: () => void;
}

const UpdateLesson = ({ data, moduleName, onClose }: UpdateLessonProps) => {
    const { classes } = useStyles();
    const lessonId = String(data.id);

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
        <Flex className={classes.container}>
            <Box className={classes.card}>
                <Flex className={classes.heading}>
                    <Flex gap={2} direction="column">
                        {moduleName && <Paragraph variant="text-small-m">{moduleName}</Paragraph>}
                        <Heading order={3}>{data.name}</Heading>
                    </Flex>
                    <UpdateLessonButton data={data} />
                </Flex>
                <Paragraph variant="small-m" color="neutral_gray" className={classes.lessonDescription}>
                    {data.description}
                </Paragraph>
                <Flex className={classes.testAndHomeworkWrapper}>
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
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.LESSON }}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
                validateOnChange={false}>
                {({ values, onCancel }) => (
                    <Flex gap={32} direction="column">
                        <Flex className={classes.wrapper}>
                            <FVideoInput name="videos" editMode />
                            <Flex gap={24} direction="column" className={classes.card}>
                                <Flex gap={18} align="center">
                                    <Heading order={3}>Содержание урока</Heading>
                                    <FSwitch name="hasContent" variant="secondary" />
                                </Flex>
                                <Collapse in={values.hasContent}>
                                    <FTextEditor name="content" contentHeight={512} />
                                </Collapse>
                            </Flex>
                        </Flex>
                        <FControlButtons onClose={onCancel} />
                    </Flex>
                )}
            </ManagedForm>
        </Flex>
    );
};

export default UpdateLesson;
