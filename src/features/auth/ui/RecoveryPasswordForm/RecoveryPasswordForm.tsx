import { Box, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import { ChevronLeft, Shield } from "react-feather";
import { useRouter } from "next/router";
import { Button, FInput, Form } from "@shared/ui";
import { $recoveryPasswordFormValidationSchema, RecoveryPasswordFormData, useFormStyles } from "@features/auth";
import { Logo } from "@components/Logo";

export interface RecoveryPasswordFormProps {}

const RecoveryPasswordForm = (_props: RecoveryPasswordFormProps) => {
    const router = useRouter();
    const { classes } = useFormStyles();
    const theme = useMantineTheme();

    const config: FormikConfig<RecoveryPasswordFormData> = {
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: $recoveryPasswordFormValidationSchema,
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
                <Text className={classes.headingTitle}>Восстановление пароля</Text>
                <Form config={config} disableOverlay>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            marginBottom: 24,
                        }}>
                        <FInput
                            name="password"
                            label="Придумайте новый пароль"
                            type="password"
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            description="Пароль должен содержать не менее 8 символов, буквы латинского алфавита (a–z и A–Z), цифры (0–9). Не используйте пробел в пароле."
                        />
                        <FInput
                            name="confirmPassword"
                            label="Повторите новый пароль"
                            type="password"
                            icon={<Shield color={theme.colors.gray45[0]} />}
                            success="Пароли совпадают"
                        />
                    </Box>
                    <Button type="submit" variant="secondary" size="large" w="100%">
                        Сохранить
                    </Button>
                </Form>
            </Box>
        </Box>
    );
};

export default RecoveryPasswordForm;
