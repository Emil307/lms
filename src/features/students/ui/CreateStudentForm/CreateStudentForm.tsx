import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { Bell, Shield, User } from "react-feather";
import { useRouter } from "next/router";
import {
    FAvatarInput,
    FControlButtons,
    FControlPanel,
    FInput,
    FPhoneInput,
    FSwitch,
    ManagedForm,
    Paragraph,
    PASSWORD_INPUT_DESCRIPTION,
} from "@shared/ui";
import { CreateUserResponse, useAdminStudentsFilters, userApi } from "@entities/user";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification } from "@shared/utils";
import { EntityNames, MutationKeys } from "@shared/constant";
import { Roles } from "@shared/types";
import { adaptCreateUserFormRequest } from "./utils";
import { $CreateStudentValidationFormRequest, CreateStudentValidationFormRequest } from "./types";
import { initialValues, notificationLabels, notifications } from "./constants";
import useStyles from "./CreateStudentForm.styles";

export interface CreateStudentFormProps extends Omit<BoxProps, "children"> {
    onClose: () => void;
}

const CreateStudentForm = ({ onClose, ...props }: CreateStudentFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const { data: studentFilters } = useAdminStudentsFilters();

    const createStudent = (values: CreateStudentValidationFormRequest) => {
        return userApi.createUser({
            ...adaptCreateUserFormRequest(values),
            roleId: studentFilters?.roles.find((role) => role.name === Roles.student)?.id!,
        });
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
                initialValues={initialValues}
                validationSchema={$CreateStudentValidationFormRequest}
                mutationKey={[MutationKeys.CREATE_USER]}
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STUDENT }}
                mutationFunction={createStudent}
                onSuccess={onSuccess}
                onError={onError}>
                {() => (
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
                                <Flex gap={8} wrap="wrap" maw={772}>
                                    <FInput name="firstName" label="Имя" onlyLetters size="sm" className={classes.formInput} withAsterisk />
                                    <FInput
                                        name="lastName"
                                        label="Фамилия"
                                        onlyLetters
                                        size="sm"
                                        className={classes.formInput}
                                        withAsterisk
                                    />
                                    <FInput name="patronymic" label="Отчество" onlyLetters size="sm" className={classes.formInput} />
                                    <FPhoneInput name="phone" label="Телефон" size="sm" className={classes.formInput} withAsterisk />
                                </Flex>
                            </Flex>
                        </Fieldset>
                        <Fieldset label="Системные данные" icon={<Shield />} legendProps={{ mb: 24 }} maw={772}>
                            <Flex direction="column" gap={24} w="100%">
                                <Flex gap={8} wrap="wrap">
                                    <FInput name="email" label="Email" size="sm" className={classes.formInput} withAsterisk />
                                    <FInput
                                        name="password"
                                        type="password"
                                        label="Пароль"
                                        size="sm"
                                        description={PASSWORD_INPUT_DESCRIPTION}
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
                                {notifications.map((name) => (
                                    <FControlPanel
                                        name={`notifications[${name}]`}
                                        key={name}
                                        label={notificationLabels[name as keyof typeof notificationLabels]}
                                        variant="secondary"
                                    />
                                ))}
                            </Box>
                        </Fieldset>
                        <FControlButtons onClose={onClose} />
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default CreateStudentForm;
