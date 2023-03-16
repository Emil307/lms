import { Box, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import { AtSign, ChevronLeft, Shield, User } from "react-feather";
import { useRouter } from "next/router";
import { Button, FCheckbox, FInput, Form } from "@shared/ui";
import { Logo } from "@components/Logo";
import { $signUpFormValidationSchema, SignUpFormData, useFormStyles } from "@features/auth";

export interface SignUpFormProps {}

const SignUpForm = (_props: SignUpFormProps) => {
    const router = useRouter();
    const { classes } = useFormStyles();
    const theme = useMantineTheme();

    const config: FormikConfig<SignUpFormData> = {
        initialValues: {
            username: "",
            email: "",
            passwords: {
                password: "",
                confirmPassword: "",
            },
            agreementWithConditionsAndTerms: false,
        },
        validationSchema: $signUpFormValidationSchema,
        onSubmit: () => {
            return;
        },
    };
    const handleClickBack = () => router.back();

    return (
        <Box className={classes.root}>
            <Button variant="white" className={classes.buttonBack} onClick={handleClickBack}>
                <ChevronLeft />
            </Button>
            <Box className={classes.inner}>
                <Logo />
                <Text className={classes.headingTitle}>
                    Создайте аккаунт <br /> и начните свое обучение
                </Text>
                <Text className={classes.headingDescription}>
                    У вас уже есть профиль?
                    <Link href="/" className={classes.signUpLink}>
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
                        <FInput name="username" label="Как к вам обращаться?" icon={<User color={theme.colors.gray45[0]} />} />
                        <FInput name="email" label="Введите email" icon={<AtSign color={theme.colors.gray45[0]} />} />
                        <FInput
                            name="passwords.password"
                            label="Придумайте пароль"
                            type="password"
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                        />
                        <FInput
                            name="passwords.confirmPassword"
                            label="Повторите пароль"
                            type="password"
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            success="Пароли совпадают"
                        />
                    </Box>
                    <FCheckbox
                        sx={{ marginBottom: 24 }}
                        name="agreementWithConditionsAndTerms"
                        label="Даю согласие на обработку персональных данных и принимаю пользовательское соглашение"
                    />
                    <Button type="submit" variant="secondary" size="large" w="100%">
                        Начать обучение
                    </Button>
                </Form>
            </Box>
        </Box>
    );
};

export default SignUpForm;
