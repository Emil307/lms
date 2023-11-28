import { Flex, ActionIcon } from "@mantine/core";
import React from "react";
import { IconSend } from "@tabler/icons-react";
import { FormikHelpers } from "formik";
import { FTextarea, ManagedForm } from "@shared/ui";
import { ToastType, createNotification } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { CreateHomeworkAnswerMessageResponse, lessonApi } from "@entities/lesson";
import { initialValues } from "./constants";
import { $CreateHomeworkAnswerMessageFormValidation, CreateHomeworkAnswerMessageFormValidation } from "./types";
import useStyles from "./CreateMessageForm.styles";

interface CreateMessageFormProps {
    homeworkAnswerId: string;
    courseId: string;
}

const CreateMessageForm = ({ homeworkAnswerId, courseId }: CreateMessageFormProps) => {
    const { classes } = useStyles();

    const onSuccess = (
        _response: CreateHomeworkAnswerMessageResponse,
        { resetForm }: Omit<FormikHelpers<CreateHomeworkAnswerMessageFormValidation>, "setFieldError">
    ) => {
        resetForm();
        createNotification({
            type: ToastType.SUCCESS,
            title: "Сообщение успешно отправлено",
        });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка отправки сообщения",
        });
    };

    return (
        <ManagedForm<CreateHomeworkAnswerMessageFormValidation, CreateHomeworkAnswerMessageResponse>
            initialValues={initialValues}
            validationSchema={$CreateHomeworkAnswerMessageFormValidation}
            mutationKey={[MutationKeys.CREATE_LESSON_HOMEWORK_MESSAGE]}
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_LESSON_HOMEWORK_MESSAGES] },
                { queryKey: [QueryKeys.GET_NOTIFICATIONS] },
                { queryKey: [QueryKeys.GET_NEW_NOTIFICATIONS] },
            ]}
            mutationFunction={(values) => lessonApi.createHomeworkAnswerMessage({ ...values, homeworkAnswerId, courseId })}
            disabledLoadingOnSuccess
            onSuccess={onSuccess}
            onError={onError}>
            {({ dirty }) => {
                return (
                    <Flex direction="column" gap={32} sx={{ position: "relative" }}>
                        <FTextarea name="content" placeholder="Введите сообщение" className={classes.messageBlock} variant="filled" />
                        <ActionIcon className={classes.sendIcon} type="submit" disabled={!dirty}>
                            <IconSend />
                        </ActionIcon>
                    </Flex>
                );
            }}
        </ManagedForm>
    );
};

export default CreateMessageForm;
