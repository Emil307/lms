import { Box, Title, Text, Flex, Avatar } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { useMantineTheme } from "@mantine/core";
import { Edit3, Shield, User, UserCheck } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, FFileButton, FFileInput, FInput, Form, FRadioGroup, FSwitch, FTextarea, Radio } from "@shared/ui";
import { useCreateUser } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { useRoles } from "@entities/roles";
import { useUploadAvatar, useUploadImage } from "@entities/storage";

import { $schemaValidatorCreateUser, UserCreateForm } from "./types";

const CreateUser = () => {
    const router = useRouter();
    const theme = useMantineTheme();
    const roles = useRoles();
    const createUser = useCreateUser();

    const handlerCancel = () => {
        router.push("/admin/users");
    };
    const config: FormikConfig<UserCreateForm> = {
        initialValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            description: "",
            isActive: false,
            roleId: String(roles.data?.data.at(0)?.id ?? 0),
            avatar: null,
            additionalImage: null,
        },
        enableReinitialize: true,
        validationSchema: $schemaValidatorCreateUser,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await createUser.mutateAsync({
                    ...values,
                    avatarId: values.avatar?.id ?? null,
                    additionalImageId: values.additionalImage?.id ?? null,
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    for (const errorField in error.response?.data.errors) {
                        setFieldError(errorField, error.response?.data.errors[errorField][0]);
                    }
                }
            }
        },
    };
    return (
        <Box>
            <Form config={config}>
                {({ values }) => (
                    <>
                        <Title order={1}>Создание пользователя</Title>
                        <Flex gap={8} mt={24} align="center">
                            <Text
                                sx={{
                                    color: theme.colors.gray45[0],
                                }}>
                                Статус:
                            </Text>
                            <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                        </Flex>
                        <Fieldset mt={32} label="Личные данные" icon={<User />}>
                            <Box>
                                <Flex gap={24}>
                                    <Avatar src={values.avatar?.absolutePath} alt="avatar" w={84} h={84} radius={50}>
                                        <AvatarIcon />
                                    </Avatar>
                                    <FFileButton
                                        name="avatar"
                                        label="Изменить аватар"
                                        buttonProps={{ leftIcon: <Edit3 /> }}
                                        useUploadFile={useUploadAvatar}
                                    />
                                </Flex>
                                <Flex mt={24} gap={8}>
                                    <FInput name="firstName" label="Имя" size="sm" w={252} withAsterisk />
                                    <FInput name="lastName" label="Фамилия" size="sm" w={252} withAsterisk />
                                    <FInput name="patronymic" label="Отчество" size="sm" w={252} />
                                </Flex>
                            </Box>
                        </Fieldset>
                        <Fieldset mt={32} label="Системные данные" icon={<Shield />}>
                            <Box>
                                <FRadioGroup name="roleId">
                                    {roles.data?.data.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />;
                                    })}
                                </FRadioGroup>
                                <Flex mt={24} gap={8}>
                                    <FInput name="email" label="Email" size="sm" w={252} withAsterisk />
                                    <FInput name="password" type="password" label="Пароль" size="sm" w={252} withAsterisk />
                                    <FInput
                                        name="passwordConfirmation"
                                        type="password"
                                        label="Повторите пароль"
                                        size="sm"
                                        w={252}
                                        withAsterisk
                                    />
                                </Flex>
                            </Box>
                        </Fieldset>
                        {roles.data?.data.find((item) => item.name === "teacher")?.id === Number(values.roleId) && (
                            <Fieldset mt={24} label="О преподавателе" icon={<UserCheck />}>
                                <FFileInput
                                    name="additionalImage"
                                    title="Загрузите файл"
                                    useUploadFile={useUploadImage}
                                    type="image"
                                    withDeleteButton
                                    w={376}
                                />
                                <FTextarea w={600} autosize minRows={4} name="description" />
                            </Fieldset>
                        )}

                        {/* TODO - нотификация в разработке на бэке, как появится добавить */}
                        <Flex mt={32} gap={8}>
                            <Button variant="border" size="large" onClick={handlerCancel}>
                                Отмена
                            </Button>
                            <Button type="submit" variant="secondary" size="large">
                                Сохранить
                            </Button>
                        </Flex>
                    </>
                )}
            </Form>
        </Box>
    );
};

export default CreateUser;
