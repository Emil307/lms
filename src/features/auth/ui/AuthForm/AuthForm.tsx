import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import Link from "next/link";
import { AtSign, ChevronLeft, Shield } from "react-feather";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/router";
import { Button, Checkbox, FInput, Form } from "@shared/ui";
import { Logo } from "@components";
import useStyles from "./AuthForm.styles";
import { $authFormValidationSchema, AuthData } from "../../api";

export interface AuthFormProps {}

const AuthForm = (_props: AuthFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const config: FormikConfig<AuthData> = {
        initialValues: {
            login: "",
            password: "",
        },
        validationSchema: toFormikValidationSchema($authFormValidationSchema),
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
                    Войдите в свой профиль, <br /> чтобы начать учиться
                </Text>
                <Text className={classes.headingDescription}>
                    Новый пользователь?
                    <Link href="/" className={classes.signUpLink}>
                        Создайте аккаунт
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
                        <FInput name="login" label="Email" icon={<AtSign color={theme.colors.gray45[0]} />} />
                        <FInput name="password" label="Пароль" type="password" icon={<Shield color={theme.colors.gray45[0]} />} />
                    </Box>

                    <Group sx={{ justifyContent: "space-between", marginBottom: 24 }}>
                        <Checkbox label="Запомнить меня" />
                        {/* TODO: Заменить HREF */}
                        <Link href="/" className={classes.recoveryPasswordLink}>
                            Забыли пароль?
                        </Link>
                    </Group>

                    <Button type="submit" variant="secondary" size="large" w="100%">
                        Войти
                    </Button>
                </Form>
            </Box>
        </Box>
    );
};

export default AuthForm;
