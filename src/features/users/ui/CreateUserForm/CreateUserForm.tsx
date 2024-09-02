import { Box, Flex } from "@mantine/core";
import React from "react";
import { Bell, Shield, User, UserCheck } from "react-feather";
import { useRouter } from "next/router";
import {
    FAvatarInput,
    FControlButtons,
    FControlPanel,
    FFileInput,
    FInput,
    FRadioGroup,
    FSwitch,
    FTextarea,
    ManagedForm,
    Paragraph,
    PASSWORD_INPUT_DESCRIPTION,
    Radio,
} from "@shared/ui";
import { CreateUserResponse, useAdminUsersFilters, userApi } from "@entities/user";
import { Fieldset } from "@components/Fieldset";
import { EntityNames, MutationKeys } from "@shared/constant";
import { useMe } from "@entities/auth";
import { ToastType, checkRoleOrder, createNotification } from "@shared/utils";
import { Roles } from "@app/routes";
import { adaptCreateUserFormRequest, getInitialValuesForm, getNotificationList } from "./utils";
import { notificationLabels } from "./constants";
import { $CreateUserValidationFormRequest, CreateUserValidationFormRequest } from "./types";
import useStyles from "./CreateUserForm.styles";

export interface CreateUserFormProps {
    onClose: () => void;
}

const CreateUserForm = ({ onClose }: CreateUserFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: profileData } = useMe();
    const { data: options } = useAdminUsersFilters();

    const filteredRoles = options?.roles.filter((role) => checkRoleOrder(profileData?.roles[0].id, role.id) >= 0);
    const defaultRole = String(filteredRoles?.at(0)?.id ?? 0);

    const createUser = (values: CreateUserValidationFormRequest) => {
        return userApi.createUser(adaptCreateUserFormRequest(values));
    };

    const onSuccess = (response: CreateUserResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание пользователя",
            message: "Пользователь успешно создан",
        });
        router.push({ pathname: "/admin/users/[id]", query: { id: String(response.id) } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания пользователя",
        });
    };

    return (
        <ManagedForm<CreateUserValidationFormRequest, CreateUserResponse>
            initialValues={getInitialValuesForm(defaultRole)}
            validationSchema={$CreateUserValidationFormRequest}
            mutationKey={[MutationKeys.CREATE_USER]}
            invalidateQueriesWithPredicateParams={{ entityName: EntityNames.USER }}
            mutationFunction={createUser}
            onSuccess={onSuccess}
            onError={onError}>
            {({ values }) => (
                <Flex direction="column" gap={32} maw={772}>
                    <Flex align="center" gap={8}>
                        <Paragraph variant="text-small-m" color="gray45">
                            Статус:
                        </Paragraph>
                        <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                    </Flex>
                    <Fieldset label="Личные данные" icon={<User />} legendProps={{ mb: 24 }} showDivider={false}>
                        <FAvatarInput
                            name="avatar"
                            label="Изменить аватар"
                            description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                        />
                        <Flex gap={8} wrap="wrap" mt={16}>
                            <FInput name="firstName" label="Имя" onlyLetters size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                            <FInput name="lastName" label="Фамилия" onlyLetters size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                            <FInput name="patronymic" label="Отчество" onlyLetters size="sm" miw={{ base: "100%", xs: 252 }} />
                        </Flex>
                    </Fieldset>
                    <Fieldset label="Системные данные" icon={<Shield />} maw={772}>
                        <Flex direction="column" gap={16}>
                            <FRadioGroup name="roleId" className={classes.rolesRadioGroup}>
                                {filteredRoles?.map((item) => (
                                    <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />
                                ))}
                            </FRadioGroup>
                            <Flex gap={8} wrap="wrap">
                                <FInput className={classes.formInput} name="email" label="Email" size="sm" withAsterisk />
                                <FInput
                                    name="password"
                                    type="password"
                                    label="Пароль"
                                    size="sm"
                                    className={classes.formInput}
                                    description={PASSWORD_INPUT_DESCRIPTION}
                                    withAsterisk
                                />
                                <FInput
                                    className={classes.formInput}
                                    name="passwordConfirmation"
                                    type="password"
                                    label="Повторите пароль"
                                    size="sm"
                                    withAsterisk
                                />
                            </Flex>
                        </Flex>
                    </Fieldset>
                    {Roles.teacher === Number(values.roleId) && (
                        <Fieldset label="О преподавателе" icon={<UserCheck />} legendProps={{ mb: 24 }} showDivider={false}>
                            <Flex direction="column" gap={24} w="100%">
                                <FFileInput
                                    name="additionalImage"
                                    title="Загрузите файл"
                                    type="image"
                                    description="Рекомендуемый размер изображения: 376х220 px, до 1Mb"
                                    withDeleteButton
                                    className={classes.additionalImageFileInput}
                                />
                                <FTextarea
                                    name="description"
                                    minRows={4}
                                    autosize
                                    placeholder="Достижения и регалии"
                                    description="до 190 символов"
                                    className={classes.descriptionTextarea}
                                />
                            </Flex>
                        </Fieldset>
                    )}

                    <Fieldset label="Настройки уведомлений" icon={<Bell />} legendProps={{ mb: 24 }}>
                        <Box className={classes.notificationsContainer}>
                            {getNotificationList(values.roleId).map((notificationName, index) => (
                                <FControlPanel
                                    name={`notifications[${notificationName}]`}
                                    key={index}
                                    label={notificationLabels[notificationName as keyof typeof notificationLabels]}
                                    variant="secondary"
                                />
                            ))}
                        </Box>
                    </Fieldset>
                    <FControlButtons onClose={onClose} />
                </Flex>
            )}
        </ManagedForm>
    );
};

export default CreateUserForm;
