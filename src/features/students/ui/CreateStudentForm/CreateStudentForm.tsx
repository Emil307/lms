import { Box, Text, Flex, Avatar } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { useMantineTheme } from "@mantine/core";
import { Edit3, Shield, User } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, FFileButton, FInput, Form, FRadioGroup, FSwitch, Radio } from "@shared/ui";
import { $CreateUserRequest, useAdminStudentsFilters, useCreateUser, CreateUserRequest } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification } from "@shared/utils";

export interface CreateStudentFormProps {
    onClose: () => void;
}

const CreateStudentForm = ({ onClose }: CreateStudentFormProps) => {
    const router = useRouter();
    const theme = useMantineTheme();
    const { data: options } = useAdminStudentsFilters();
    const defaultRole = String(options?.roles.at(0)?.id ?? 0);

    const createUser = useCreateUser();

    const config: FormikConfig<CreateUserRequest> = {
        initialValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            description: "",
            isActive: false,
            roleId: defaultRole,
            avatar: null,
            additionalImage: null,
        },
        enableReinitialize: true,
        validationSchema: $CreateUserRequest,
        onSubmit: (values, { setFieldError }) => {
            createUser.mutate(
                { ...values, avatarId: values.avatar?.id },
                {
                    onSuccess: (response) => {
                        createNotification({
                            type: ToastType.SUCCESS,
                            title: "Создание ученика",
                            message: "Ученик добавлен",
                        });
                        router.push({ pathname: "/admin/students/[id]", query: { id: response.id.toString() } });
                    },
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            for (const errorField in error.response?.data.errors) {
                                setFieldError(errorField, error.response?.data.errors[errorField][0]);
                            }

                            createNotification({
                                type: ToastType.WARN,
                                title: "Ошибка создания ученика",
                            });
                        }
                    },
                }
            );
        },
    };

    //TODO: переписать на ManagedForm
    return (
        <Form config={config}>
            {({ values, dirty }) => (
                <>
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
                                <Avatar
                                    src={values.avatar?.absolutePath}
                                    alt="avatar"
                                    w={84}
                                    h={84}
                                    radius={50}
                                    styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                                    <AvatarIcon />
                                </Avatar>
                                <FFileButton name="avatar" label="Загрузить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
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
                                {options?.roles.map((item) => {
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

                    {/* TODO: - нотификация в разработке на бэке, как появится -> добавить */}
                    <Flex mt={32} gap={8}>
                        <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                            Отменить
                        </Button>
                        <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Flex>
                </>
            )}
        </Form>
    );
};

export default CreateStudentForm;
