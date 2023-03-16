import { Box, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import { AtSign, ChevronLeft } from "react-feather";
import { useRouter } from "next/router";
import { Button, FInput, Form } from "@shared/ui";
import { Logo } from "@components/Logo";
import { $forgotPasswordFormValidationSchema, ForgotPasswordFormData, useFormStyles } from "@features/auth";

export interface ForgotPasswordFormProps {}

const ForgotPasswordForm = (_props: ForgotPasswordFormProps) => {
    const router = useRouter();
    const { classes } = useFormStyles();
    const theme = useMantineTheme();

    const config: FormikConfig<ForgotPasswordFormData> = {
        initialValues: {
            email: "",
        },
        validationSchema: $forgotPasswordFormValidationSchema,
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
                <Text className={classes.headingTitle}>Забыли пароль?</Text>
                <Text className={classes.headingDescription}>
                    Вспомнили пароль?
                    <Link href="/" className={classes.signUpLink}>
                        Войдите
                    </Link>
                </Text>
                <Form config={config} disableOverlay>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <FInput
                            name="email"
                            label="Введите email"
                            icon={<AtSign color={theme.colors.gray45[0]} />}
                            description="Пришлем вам ссылку на восстановление пароля"
                        />
                        <Button type="submit" variant="secondary" size="large" w="100%">
                            Выслать
                        </Button>
                    </Box>
                </Form>
            </Box>
        </Box>
    );
};

export default ForgotPasswordForm;
