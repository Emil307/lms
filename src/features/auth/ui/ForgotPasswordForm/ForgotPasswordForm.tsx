import { Box, Flex } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Button, FInput, ManagedForm, Paragraph } from "@shared/ui";
import { useFormStyles } from "@features/auth";
import { $RecoveryPasswordRequest, RecoveryPasswordRequest, RecoveryPasswordResponse, authApi } from "@entities/auth";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";

const ForgotPasswordForm = () => {
    const router = useRouter();

    const { classes } = useFormStyles();
    const recoveryPassword = (values: RecoveryPasswordRequest) => {
        return authApi.recoveryPassword(values);
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Восстановление пароля",
            message: "Письмо отправлено на указанный email",
        });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка восстановления пароля",
        });
    };

    return (
        <Box className={classes.root}>
            <Flex className={classes.contentWrapper}>
                <Flex className={classes.inner}>
                    <Paragraph variant="text-small-m" color="gray45">
                        Пришлем вам ссылку на восстановление пароля
                    </Paragraph>
                    <ManagedForm<RecoveryPasswordRequest, RecoveryPasswordResponse>
                        initialValues={initialValues}
                        validationSchema={$RecoveryPasswordRequest}
                        mutationKey={[MutationKeys.CHANGE_PASSWORD]}
                        mutationFunction={recoveryPassword}
                        onSuccess={onSuccess}
                        onError={onError}
                        disabledLoadingOnSuccess
                        disableOverlay>
                        {({ dirty, isSubmitting }) => {
                            return (
                                <Flex direction="column" justify="space-between">
                                    <Flex direction="column" gap={24}>
                                        <FInput name="email" label="Email" />
                                        <Flex justify="flex-start" pb={20}>
                                            <Button type="submit" variant="primary" size="large" disabled={!dirty} loading={isSubmitting}>
                                                Выслать
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            );
                        }}
                    </ManagedForm>
                </Flex>
                <Flex direction="column" gap={16} ta="center" align="center" justify="center">
                    <Paragraph variant="small-m">Вспомнили пароль?</Paragraph>
                    <Button component={Link} href={{ query: { ...router.query, action: "auth" } }} variant="secondary" size="large">
                        Войти
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ForgotPasswordForm;
