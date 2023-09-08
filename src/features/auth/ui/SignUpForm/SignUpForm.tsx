import { Box, BoxProps, Flex, Grid, ThemeIcon } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import { AtSign, ChevronLeft, Shield, User } from "react-feather";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, FCheckbox, FInput, Form, Heading, Paragraph } from "@shared/ui";
import { Logo } from "@components/Logo";
import { $SignUpFormValidationSchema, SignUpFormValidationSchema, useFormStyles } from "@features/auth";
import { useSignUp } from "@entities/auth";
import { initialValues } from "./constants";

export interface SignUpFormProps extends BoxProps {}

const SignUpForm = (props: SignUpFormProps) => {
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
                }
            );
        },
    };
    const handleClickBack = () => router.push("/auth");

    return (
        <Box className={classes.root} {...props}>
            <Button variant="white" className={classes.buttonBack} onClick={handleClickBack}>
                <ChevronLeft />
            </Button>
            <Flex className={classes.inner}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>
                <Heading order={3} ta="center">
                    Создайте аккаунт <br /> и начните свое обучение
                </Heading>
                <Paragraph variant="text-small-m">
                    У вас уже есть профиль?
                    <Link href="/auth" className={classes.signUpLink}>
                        Войдите
                    </Link>
                </Paragraph>
                <Form config={config} disableOverlay>
                    {({ values }) => (
                        <>
                            <Flex direction="column" gap={8} mb={16}>
                                <Grid gutter={8}>
                                    <Grid.Col xs={6}>
                                        <FInput
                                            name="firstName"
                                            label="Ваше имя"
                                            onlyLetters
                                            icon={
                                                <ThemeIcon color="gray45">
                                                    <User />
                                                </ThemeIcon>
                                            }
                                        />
                                    </Grid.Col>
                                    <Grid.Col xs={6}>
                                        <FInput
                                            name="lastName"
                                            label="Ваша фамилия"
                                            onlyLetters
                                            icon={
                                                <ThemeIcon color="gray45">
                                                    <User />
                                                </ThemeIcon>
                                            }
                                        />
                                    </Grid.Col>
                                </Grid>
                                <FInput
                                    name="email"
                                    label="Введите email"
                                    icon={
                                        <ThemeIcon color="gray45">
                                            <AtSign />
                                        </ThemeIcon>
                                    }
                                />
                                <FInput
                                    name="passwords.password"
                                    label="Придумайте пароль"
                                    type="password"
                                    icon={
                                        <ThemeIcon color="gray45">
                                            <Shield />
                                        </ThemeIcon>
                                    }
                                    description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                                />
                                <FInput
                                    name="passwords.passwordConfirmation"
                                    label="Повторите пароль"
                                    type="password"
                                    icon={
                                        <ThemeIcon color="gray45">
                                            <Shield />
                                        </ThemeIcon>
                                    }
                                    success="Пароли совпадают"
                                />
                            </Flex>
                            <FCheckbox
                                name="agreementWithConditionsAndTerms"
                                label="Даю согласие на обработку персональных данных и принимаю пользовательское соглашение"
                                wrapperProps={{ sx: { marginBottom: 24 } }}
                            />
                            <Button
                                type="submit"
                                variant="secondary"
                                size="large"
                                w="100%"
                                loading={isLoading || isSuccess}
                                disabled={!values.agreementWithConditionsAndTerms}>
                                Начать обучение
                            </Button>
                        </>
                    )}
                </Form>
            </Flex>
        </Box>
    );
};

export default SignUpForm;
