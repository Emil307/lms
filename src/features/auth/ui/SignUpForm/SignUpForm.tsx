import { Box, Flex, Text } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { Button, FCheckbox, FInput, FPhoneInput, Form, PASSWORD_INPUT_DESCRIPTION, Paragraph } from "@shared/ui";
import { $SignUpFormValidationSchema, SignUpFormValidationSchema, useFormStyles } from "@features/auth";
import { useSignUp } from "@entities/auth";
import { getPath } from "@features/auth/ui/utils";
import { useMedia } from "@shared/utils";
import { initialValues } from "./constants";

const SignUpForm = () => {
    const { classes } = useFormStyles();

    const { mutate: signUp, isLoading, isSuccess } = useSignUp();
    const isTablet = useMedia("md");

    const config: FormikConfig<SignUpFormValidationSchema> = {
        initialValues,
        validationSchema: $SignUpFormValidationSchema,
        onSubmit: (values, { setFieldError }) => {
            signUp(
                { ...values, ...values.passwords },
                {
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            for (const errorField in error.response?.data.errors) {
                                if (["password", "passwordConfirmation"].includes(errorField)) {
                                    setFieldError(`passwords.${errorField}`, error.response?.data.errors[errorField][0]);
                                }
                                setFieldError(errorField, error.response?.data.errors[errorField][0]);
                            }
                        }
                    },
                }
            );
        },
    };

    return (
        <Box className={classes.root}>
            <Flex className={classes.inner}>
                <Paragraph variant="small-semi" color="gray45">
                    Создайте аккаунт и начните свое обучение
                </Paragraph>
                <Form config={config} disableOverlay>
                    {({ values }) => (
                        <>
                            <Flex direction="column">
                                <Flex direction="column" gap={8} mb={16}>
                                    <FInput name="firstName" label="Имя" onlyLetters />
                                    <FInput name="lastName" label="Фамилия" onlyLetters />
                                    <FPhoneInput name="phone" label="Телефон" />
                                    <FInput name="email" label="Введите email" description="Отправим код подтверждения" />
                                    <FInput
                                        name="passwords.password"
                                        label="Придумайте пароль"
                                        type="password"
                                        description={PASSWORD_INPUT_DESCRIPTION}
                                    />
                                    <FInput
                                        name="passwords.passwordConfirmation"
                                        label="Повторите пароль"
                                        type="password"
                                        success="Пароли совпадают"
                                    />
                                </Flex>
                                <FCheckbox
                                    name="agreementWithConditionsAndTerms"
                                    label={
                                        <Paragraph variant="text-small-m">
                                            Даю согласие на обработку персональных данных и принимаю
                                            <Text className={classes.link} component={Link} href="/user-agreement" target="_blank">
                                                {" пользовательское соглашение"}
                                            </Text>
                                        </Paragraph>
                                    }
                                    color="green"
                                    wrapperProps={{ sx: { marginBottom: 48 } }}
                                />
                                <Flex direction="column" gap={16} ta="center" align="flex-start" justify="center" pb={20}>
                                    <Button
                                        className={classes.signInButton}
                                        type="submit"
                                        variant="primary"
                                        loading={isLoading || isSuccess}
                                        disabled={!values.agreementWithConditionsAndTerms}>
                                        Создать аккаунт
                                    </Button>
                                </Flex>
                            </Flex>
                            <Flex
                                pos="absolute"
                                bottom={isTablet ? 24 : 96}
                                direction="column"
                                gap={16}
                                ta="center"
                                align="stretch"
                                justify="center"
                                className={classes.absoluteButton}>
                                <Paragraph variant="small-m">У вас уже есть профиль?</Paragraph>
                                <Link href={`${getPath()}?action=auth`}>
                                    <Button variant="white" className={classes.signUpButton} size="medium" w={40}>
                                        Войти
                                    </Button>
                                </Link>
                            </Flex>
                        </>
                    )}
                </Form>
            </Flex>
        </Box>
    );
};

export default SignUpForm;
