import { Box, Flex, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import { AtSign, ChevronLeft, Shield, User } from "react-feather";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, FCheckbox, FInput, Form } from "@shared/ui";
import { Logo } from "@components/Logo";
import { $SignUpFormValidationSchema, SignUpFormData, useFormStyles } from "@features/auth";
import { useSignUp } from "@entities/auth";

export interface SignUpFormProps {}

const SignUpForm = (_props: SignUpFormProps) => {
    const router = useRouter();
    const { classes } = useFormStyles();
    const theme = useMantineTheme();

    const { mutate: signUp, isLoading, isSuccess } = useSignUp();

    const config: FormikConfig<SignUpFormData> = {
        initialValues: {
            lastName: "",
            firstName: "",
            email: "",
            passwords: {
                password: "",
                passwordConfirmation: "",
            },
            agreementWithConditionsAndTerms: false,
        },
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
        <Box className={classes.root}>
            <Button variant="white" className={classes.buttonBack} onClick={handleClickBack}>
                <ChevronLeft />
            </Button>
            <Box className={classes.inner}>
                <Link href="/" className={classes.logoLink}>
                    <Logo />
                </Link>
                <Text className={classes.headingTitle}>
                    Создайте аккаунт <br /> и начните свое обучение
                </Text>
                <Text className={classes.headingDescription}>
                    У вас уже есть профиль?
                    <Link href="/auth" className={classes.signUpLink}>
                        Войдите
                    </Link>
                </Text>
                <Form config={config} disableOverlay>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            marginBottom: 16,
                        }}>
                        <Flex gap={8}>
                            <FInput name="firstName" label="Ваше имя" icon={<User color={theme.colors.gray45[0]} />} />
                            <FInput name="lastName" label="Ваша фамилия" icon={<User color={theme.colors.gray45[0]} />} />
                        </Flex>

                        <FInput name="email" label="Введите email" icon={<AtSign color={theme.colors.gray45[0]} />} />
                        <FInput
                            name="passwords.password"
                            label="Придумайте пароль"
                            type="password"
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                        />
                        <FInput
                            name="passwords.passwordConfirmation"
                            label="Повторите пароль"
                            type="password"
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            success="Пароли совпадают"
                        />
                    </Box>
                    <FCheckbox
                        name="agreementWithConditionsAndTerms"
                        label="Даю согласие на обработку персональных данных и принимаю пользовательское соглашение"
                        wrapperProps={{ sx: { marginBottom: 24 } }}
                    />
                    <Button type="submit" variant="secondary" size="large" w="100%" loading={isLoading || isSuccess}>
                        Начать обучение
                    </Button>
                </Form>
            </Box>
        </Box>
    );
};

export default SignUpForm;
