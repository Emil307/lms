import { Box, Text, Flex, Avatar } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { Edit3, User } from "react-feather";
import axios from "axios";
import dayjs from "dayjs";
import { Button, FFileButton, FInput, Form, FSwitch, FTextarea } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { $UpdateAuthorRequest, Author, UpdateAuthorRequest, useUpdateAuthor } from "@entities/author";
import AvatarIcon from "@public/icons/avatar.svg";
import UserDescriptionIcon from "@public/icons/userDescription.svg";
import useStyles from "./EditAuthorForm.styles";
import { initialValues } from "./constants";
import { adaptDataForEditAuthorForm } from "./utils";

export interface EditAuthorFormProps {
    data?: Author;
    onClose?: () => void;
}

const EditAuthorForm = ({ data, onClose = () => undefined }: EditAuthorFormProps) => {
    const { classes } = useStyles();

    const updateAuthor = useUpdateAuthor(String(data?.id));

    const config: FormikConfig<UpdateAuthorRequest> = {
        initialValues: {
            ...initialValues,
            ...adaptDataForEditAuthorForm(data),
        },
        enableReinitialize: true,
        validationSchema: $UpdateAuthorRequest,
        onSubmit: (values, { setFieldError }) => {
            updateAuthor.mutate(
                { ...values, avatarId: values.avatar?.id },
                {
                    onSuccess: () => {
                        onClose();
                    },
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            for (const errorField in error.response?.data.errors) {
                                setFieldError(errorField, error.response?.data.errors[errorField][0]);
                            }
                        }
                    },
                }
            );
        },
    };

    //TODO: на ManagedForm
    return (
        <Box>
            <Form config={config}>
                {({ values, dirty }) => {
                    const labelStatus = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <Flex direction="column" gap={32}>
                            <Flex mt={24} gap={32} align="center">
                                <Box className={classes.infoItem}>
                                    ID: <span>{data?.id}</span>
                                </Box>
                                <Flex gap={8}>
                                    <Text className={classes.infoItem}>Статус:</Text>
                                    <FSwitch name="isActive" variant="secondary" label={labelStatus} labelPosition="left" />
                                </Flex>
                                <Box className={classes.infoItem}>
                                    Создание: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                                </Box>
                                <Box className={classes.infoItem}>
                                    {/* TODO: - информации о последних изменениях на бэке пока нет (кто именно изменил автора) */}
                                    Изменение: <span>{data?.updatedAt ? dayjs(data.updatedAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                                </Box>
                            </Flex>
                            <Fieldset label="Личные данные" icon={<User />}>
                                <Box>
                                    <Flex gap={24}>
                                        <Avatar
                                            src={values.avatar?.absolutePath}
                                            alt="avatar"
                                            w={84}
                                            h={84}
                                            radius={50}
                                            styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                                            <AvatarIcon />
                                        </Avatar>
                                        <FFileButton name="avatar" label="Изменить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                                    </Flex>
                                    <Flex mt={24} gap={8}>
                                        <FInput name="firstName" label="Имя" size="sm" w={252} withAsterisk />
                                        <FInput name="lastName" label="Фамилия" size="sm" w={252} withAsterisk />
                                        <FInput name="patronymic" label="Отчество" size="sm" w={252} />
                                    </Flex>
                                </Box>
                            </Fieldset>
                            <Fieldset label="Об авторе" icon={<UserDescriptionIcon />}>
                                <FTextarea
                                    name="about"
                                    description="до 230 символов"
                                    w="100%"
                                    maw={772}
                                    sx={{
                                        textarea: {
                                            minHeight: 190,
                                        },
                                    }}
                                />
                            </Fieldset>
                            <Flex gap={8}>
                                <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                                    Отмена
                                </Button>
                                <Button type="submit" variant="secondary" size="large" disabled={!dirty} w="100%" maw={252}>
                                    Сохранить
                                </Button>
                            </Flex>
                        </Flex>
                    );
                }}
            </Form>
        </Box>
    );
};

export default EditAuthorForm;
