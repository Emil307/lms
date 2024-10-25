import { Box, Flex, Text } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { Button, FCheckbox, FInput, FPhoneInput, Form, PASSWORD_INPUT_DESCRIPTION, Paragraph } from "@shared/ui";
import { $SignUpFormValidationSchema, SignUpFormValidationSchema, useFormStyles } from "@features/auth";
import { useSignUp } from "@entities/auth";
import { initialValues } from "./constants";

const SignUpForm = () => {
    const router = useRouter();
    const { classes } = useFormStyles();

    const { mutate: signUp, isLoading, isSuccess } = useSignUp();

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
                },
            );
        },
    };

    return (
        <Box className={classes.root}>
            <Flex className={classes.inner}>
                <Paragraph variant="text-small-m" color="neutralMain50">
                    Создайте аккаунт и начните свое обучение
                </Paragraph>
                <Flex direction="column" h="100%" justify="space-between">
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
                                        wrapperProps={{ sx: { marginBottom: 24 } }}
                                    />
                                    <Flex direction="column" gap={16} ta="center" align="flex-start" justify="center" pb={20}>
                                        <Button
                                            type="submit"
                                            size="large"
                                            loading={isLoading || isSuccess}
                                            disabled={!values.agreementWithConditionsAndTerms}>
                                            Создать аккаунт
                                        </Button>
                                    </Flex>
                                </Flex>
                            </>
                        )}
                    </Form>
                    <Flex direction="column" justify="center" align="center" gap={16} className={classes.buttonsWrapper}>
                        <Paragraph variant="small-m">У вас уже есть профиль?</Paragraph>
                        <Button component={Link} href={{ query: { ...router.query, action: "auth" } }} variant="secondary" size="large">
                            Войти
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default SignUpForm;
