import { Box, ThemeIcon, Text, BoxProps as MBoxProps } from "@mantine/core";
import { FormikConfig } from "formik";
import { AtSign, PhoneCall, User } from "react-feather";
import Link from "next/link";
import { Button, FCheckbox, FInput, Form, Heading } from "@shared/ui";
import { $ContactUsRequest, ContactUsRequest } from "@entities/staticPage";
import useStyles from "./ContactUsForm.styles";

export interface ContactUsFormProps extends MBoxProps {}

const ContactUsForm = (props: ContactUsFormProps) => {
    const { classes } = useStyles();
    const config: FormikConfig<ContactUsRequest> = {
        initialValues: {
            username: "",
            phoneNumber: "",
            email: "",
            description: "",
            isAgree: false,
        },
        validationSchema: $ContactUsRequest,
        onSubmit: () => {
            return;
        },
    };

    return (
        <Box {...props} className={classes.root}>
            <Box className={classes.heading}>
                <Heading order={2}>Свяжитесь с нами</Heading>
                <Text className={classes.headingDescription}>Закажите бесплатную консультацию, просто заполнив форму.</Text>
            </Box>

            <Form config={config} disableOverlay>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                    }}>
                    <FInput
                        name="username"
                        label="Как к вам обращаться?"
                        icon={
                            <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                                <User />
                            </ThemeIcon>
                        }
                        withAsterisk
                    />
                    <FInput
                        name="phoneNumber"
                        label="Телефон"
                        icon={
                            <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                                <PhoneCall />
                            </ThemeIcon>
                        }
                        withAsterisk
                    />
                    <FInput
                        name="email"
                        label="Email"
                        icon={
                            <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                                <AtSign />
                            </ThemeIcon>
                        }
                    />
                    <FCheckbox
                        name="isAgree"
                        label={
                            <Text className={classes.checkboxLabel}>
                                {"Я даю согласие на "}
                                <Link href="/" className={classes.link}>
                                    обработку персональных данных
                                </Link>
                            </Text>
                        }
                        mt={8}
                    />
                </Box>

                <Button mt={24} type="submit" variant="secondary">
                    Отправить
                </Button>
            </Form>
        </Box>
    );
};

export default ContactUsForm;
