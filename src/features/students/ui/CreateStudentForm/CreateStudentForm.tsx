import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { Bell, Shield, User } from "react-feather";
import { useRouter } from "next/router";
import { Button, FAvatarInput, FControlPanel, FInput, FRadioGroup, FSwitch, ManagedForm, Paragraph, Radio } from "@shared/ui";
import { CreateUserResponse, useAdminStudentsFilters, userApi } from "@entities/user";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification, useMedia } from "@shared/utils";
import { MutationKeys } from "@shared/constant";
import { adaptCreateUserFormRequest, getInitialValuesForm } from "./utils";
import { $CreateStudentValidationFormRequest, CreateStudentValidationFormRequest } from "./types";
import { notificationLabels, notifications } from "./constants";
import useStyles from "./CreateStudentForm.styles";

export interface CreateStudentFormProps extends Omit<BoxProps, "children"> {
    onClose: () => void;
}

const CreateStudentForm = ({ onClose, ...props }: CreateStudentFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const isMobile = useMedia("xs");

    const { data: options } = useAdminStudentsFilters();
    const defaultRole = String(options?.roles.at(0)?.id ?? 0);

    const createStudent = (values: CreateStudentValidationFormRequest) => {
        return userApi.createUser(adaptCreateUserFormRequest(values));
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
        <Box {...props}>
            <ManagedForm<CreateStudentValidationFormRequest, CreateUserResponse>
                initialValues={getInitialValuesForm(defaultRole)}
                validationSchema={$CreateStudentValidationFormRequest}
                mutationKey={[MutationKeys.CREATE_USER]}
                mutationFunction={createStudent}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}>
                {({ dirty, onCancel }) => (
                    <Flex direction="column" gap={32}>
                        <Flex align="center" gap={8}>
                            <Paragraph variant="text-small-m" color="gray45">
                                Статус:
                            </Paragraph>
                            <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                        </Flex>
                        <Fieldset label="Личные данные" icon={<User />} legendProps={{ mb: 24 }} maw={772}>
                            <Flex direction="column" gap={24} w="100%">
                                <FAvatarInput
                                    name="avatar"
                                    label="Загрузить аватар"
                                    description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                                />
                                <Flex gap={8} wrap="wrap">
                                    <FInput name="firstName" label="Имя" size="sm" className={classes.formInput} withAsterisk />
                                    <FInput name="lastName" label="Фамилия" size="sm" className={classes.formInput} withAsterisk />
                                    <FInput name="patronymic" label="Отчество" size="sm" className={classes.formInput} />
                                </Flex>
                            </Flex>
                        </Fieldset>
                        <Fieldset label="Системные данные" icon={<Shield />} legendProps={{ mb: 24 }} maw={772}>
                            <Flex direction="column" gap={24} w="100%">
                                <FRadioGroup name="roleId" className={classes.rolesRadioGroup}>
                                    {options?.roles.map((item) => (
                                        <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />
                                    ))}
                                </FRadioGroup>
                                <Flex gap={8} wrap="wrap">
                                    <FInput name="email" label="Email" size="sm" className={classes.formInput} withAsterisk />
                                    <FInput
                                        name="password"
                                        type="password"
                                        label="Пароль"
                                        size="sm"
                                        className={classes.formInput}
                                        withAsterisk
                                    />
                                    <FInput
                                        name="passwordConfirmation"
                                        type="password"
                                        label="Повторите пароль"
                                        size="sm"
                                        className={classes.formInput}
                                        withAsterisk
                                    />
                                </Flex>
                            </Flex>
                        </Fieldset>

                        <Fieldset label="Настройки уведомлений" icon={<Bell />} legendProps={{ mb: 24 }} maw={772}>
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
                        <Flex className={classes.actions}>
                            <Button variant="border" size={isMobile ? "medium" : "large"} onClick={onCancel}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="secondary" size={isMobile ? "medium" : "large"} disabled={!dirty}>
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default CreateStudentForm;
