import { Box, Flex, BoxProps, ActionIcon } from "@mantine/core";
import React from "react";
import { IconSend } from "@tabler/icons-react";
import { FormikHelpers } from "formik";
import { FTextarea, ManagedForm } from "@shared/ui";
import { ToastType, createNotification } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { CreateAdminSupportMessageResponse, supportApi } from "@entities/support";
import { initialValues } from "./constants";
import { $CreateAdminMessageFormValidation, CreateAdminMessageFormValidation } from "./types";
import useStyles from "./CreateAdminMessageForm.styles";

export interface CreateAdminMessageFormProps extends BoxProps {
    conversationId?: number;
}

const CreateAdminMessageForm = ({ conversationId, ...props }: CreateAdminMessageFormProps) => {
    const { classes } = useStyles();

    const onSuccess = (
        _response: CreateAdminSupportMessageResponse,
        { resetForm }: Omit<FormikHelpers<CreateAdminMessageFormValidation>, "setFieldError">,
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

    if (!conversationId) {
        return null;
    }

    return (
        <Box {...props}>
            <ManagedForm<CreateAdminMessageFormValidation, CreateAdminSupportMessageResponse>
                initialValues={initialValues}
                validationSchema={$CreateAdminMessageFormValidation.partial()}
                mutationKey={[MutationKeys.CREATE_ADMIN_SUPPORT_MESSAGE]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_SUPPORT_MESSAGES] }]}
                mutationFunction={(values) => supportApi.createAdminSupportMessage({ ...values, conversationId })}
                onSuccess={onSuccess}
                onError={onError}
                hasConfirmModal>
                {({ dirty }) => {
                    return (
                        <Flex direction="column" gap={32} sx={{ position: "relative" }}>
                            <FTextarea name="message" placeholder="Введите сообщение" className={classes.messageBlock} variant="filled" />
                            <ActionIcon className={classes.sendIcon} type="submit" disabled={!dirty}>
                                <IconSend />
                            </ActionIcon>
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default CreateAdminMessageForm;
