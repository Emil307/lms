import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Bell, Edit3, Shield, User } from "react-feather";
import { useRouter } from "next/router";
import { Button, FControlPanel, FFileButton, FInput, FRadioGroup, FSwitch, ManagedForm, Radio } from "@shared/ui";
import { CreateUserResponse, useAdminStudentsFilters, usersApi } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification } from "@shared/utils";
import { MutationKeys } from "@shared/constant";
import { adaptCreateUserFormRequest, getInitialValuesForm } from "./utils";
import { $CreateStudentValidationFormRequest, CreateStudentValidationFormRequest } from "./types";
import { notificationLabels, notifications } from "./constants";
import useStyles from "./CreateStudentForm.styles";

export interface CreateStudentFormProps {
    onClose: () => void;
}

const CreateStudentForm = ({ onClose }: CreateStudentFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: options } = useAdminStudentsFilters();
    const defaultRole = String(options?.roles.at(0)?.id ?? 0);

    const createStudent = (values: CreateStudentValidationFormRequest) => {
        return usersApi.createUser(adaptCreateUserFormRequest(values));
    };

    const onSuccess = (response: CreateUserResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание ученика",
            message: "Ученик успешно создан",
        });
        router.push({ pathname: "/admin/students/[id]", query: { id: response.id.toString() } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания ученика",
        });
    };

    return (
        <ManagedForm<CreateStudentValidationFormRequest, CreateUserResponse>
            initialValues={getInitialValuesForm(defaultRole)}
            validationSchema={$CreateStudentValidationFormRequest}
            mutationKey={[MutationKeys.CREATE_USER]}
            mutationFunction={createStudent}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onClose}>
            {({ values, dirty, onCancel }) => (
                <Flex gap={32} direction="column">
                    <Flex gap={8} mt={24} align="center">
                        <Text color="gray45">Статус:</Text>
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

                    <Fieldset label="Настройки уведомлений" icon={<Bell />}>
                        <Box className={classes.notificationsContainer}>
                            {notifications.map((name, index) => (
                                <FControlPanel
                                    name={`notifications[${name}]`}
                                    key={index}
                                    label={notificationLabels[name as keyof typeof notificationLabels]}
                                    variant="secondary"
                                />
                            ))}
                        </Box>
                    </Fieldset>
                    <Flex gap={8}>
                        <Button variant="border" size="large" onClick={onCancel} w="100%" maw={252}>
                            Отменить
                        </Button>
                        <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default CreateStudentForm;
