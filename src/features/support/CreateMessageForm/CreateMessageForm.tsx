import { Box, Flex, BoxProps, ActionIcon } from "@mantine/core";
import React from "react";
import { IconSend } from "@tabler/icons-react";
import { FormikHelpers } from "formik";
import { FTextarea, ManagedForm } from "@shared/ui";
import { ToastType, createNotification } from "@shared/utils";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { CreateSupportMessageResponse, supportApi } from "@entities/support";
import { initialValues } from "./constants";
import useStyles from "./CreateMessageForm.styles";
import { $CreateMessageFormValidation, CreateMessageFormValidation } from "./types";

export interface CreateMessageFormProps extends BoxProps {
    setScrollAfterSendMessage: (value: boolean) => void;
}

const CreateMessageForm = ({ setScrollAfterSendMessage, ...props }: CreateMessageFormProps) => {
    const { classes } = useStyles();

    const onSuccess = (
        _response: CreateSupportMessageResponse,
        { resetForm }: Omit<FormikHelpers<CreateMessageFormValidation>, "setFieldError">
    ) => {
        resetForm();
        setScrollAfterSendMessage(true);
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
        <Box {...props}>
            <ManagedForm<CreateMessageFormValidation, CreateSupportMessageResponse>
                initialValues={initialValues}
                validationSchema={$CreateMessageFormValidation.partial()}
                mutationKey={[MutationKeys.CREATE_SUPPORT_MESSAGE]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_SUPPORT_MESSAGES] },
                    { queryKey: [QueryKeys.GET_ADMIN_SUPPORT_MESSAGES] },
                    { queryKey: [QueryKeys.GET_ADMIN_SUPPORT_CONVERSATIONS] },
                ]}
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.NOTIFICATION }}
                mutationFunction={(values) => supportApi.createSupportMessage(values)}
                onSuccess={onSuccess}
                onError={onError}
                disableOverlay>
                {({ dirty }) => {
                    return (
                        <Flex direction="column" gap={32} pos="relative">
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

export default CreateMessageForm;
