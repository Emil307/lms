import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import Link from "next/link";
import { AtSign, ChevronLeft } from "react-feather";
import { useRouter } from "next/router";
import { Button, FInput, Heading, ManagedForm, Paragraph } from "@shared/ui";
import { Logo } from "@components/Logo";
import { useFormStyles } from "@features/auth";
import { $RecoveryPasswordRequest, RecoveryPasswordRequest, RecoveryPasswordResponse, authApi } from "@entities/auth";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification, useMedia } from "@shared/utils";
import { initialValues } from "./constants";

export interface ForgotPasswordFormProps extends BoxProps {}

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const router = useRouter();
    const { classes } = useFormStyles();

    const isTablet = useMedia("md");

    const handleClickBack = () => router.push("/auth");

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
        <Box className={classes.root} {...props}>
            <Button variant="white" className={classes.buttonBack} onClick={handleClickBack}>
                <ChevronLeft />
            </Button>
            <Flex className={classes.inner}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>
                <Heading order={3}>Забыли пароль?</Heading>
                <Paragraph variant="text-small-m">
                    Вспомнили пароль?
                    <Link href="/auth" className={classes.signUpLink}>
                        Войдите
                    </Link>
                </Paragraph>
                <ManagedForm<RecoveryPasswordRequest, RecoveryPasswordResponse>
                    initialValues={initialValues}
                    validationSchema={$RecoveryPasswordRequest}
                    mutationKey={[MutationKeys.CHANGE_PASSWORD]}
                    mutationFunction={recoveryPassword}
                    onSuccess={onSuccess}
                    onError={onError}
                    disableOverlay>
                    {({ dirty, isLoading }) => {
                        return (
                            <Flex direction="column" gap={24}>
                                <FInput
                                    name="email"
                                    label="Введите email"
                                    icon={
                                        <ThemeIcon color="gray45">
                                            <AtSign />
                                        </ThemeIcon>
                                    }
                                    description="Пришлем вам ссылку на восстановление пароля"
                                />
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    size={isTablet ? "medium" : "large"}
                                    w="100%"
                                    disabled={!dirty}
                                    loading={isLoading}>
                                    Выслать
                                </Button>
                            </Flex>
                        );
                    }}
                </ManagedForm>
            </Flex>
        </Box>
    );
};

export default ForgotPasswordForm;
