import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Bell, Edit3, Shield, User, UserCheck } from "react-feather";
import { useRouter } from "next/router";
import { Button, FControlPanel, FFileButton, FFileInput, FInput, FRadioGroup, FSwitch, FTextarea, ManagedForm, Radio } from "@shared/ui";
import { CreateUserResponse, useAdminUsersFilters, userApi } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys } from "@shared/constant";
import { useMe } from "@entities/auth";
import { ToastType, checkRoleOrder, createNotification } from "@shared/utils";
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
            mutationFunction={createUser}
            onSuccess={onSuccess}
            onError={onError}
            hasConfirmModal
            onCancel={onClose}>
            {({ values, dirty, onCancel }) => (
                <Flex gap={32} direction="column">
                    <Flex gap={8} mt={24} align="center">
                        <Text color="gray45">Статус:</Text>
                        <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                    </Flex>
                    <Fieldset label="Личные данные" icon={<User />}>
                        <Box>
                            <Flex gap={24} mt={8}>
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
                    <Fieldset label="Системные данные" icon={<Shield />}>
                        <Box>
                            <FRadioGroup name="roleId">
                                {filteredRoles?.map((item) => {
                                    return <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />;
                                })}
                            </FRadioGroup>
                            <Flex mt={16} gap={8}>
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
                    {options?.roles.find((item) => item.name === "teacher")?.id === Number(values.roleId) && (
                        <Fieldset label="О преподавателе" icon={<UserCheck />} showDivider={false}>
                            <Flex mt={8} direction="column" gap={24}>
                                <FFileInput
                                    name="additionalImage"
                                    title="Загрузите файл"
                                    type="image"
                                    description="Рекомендуемый размер изображения: 376х220 px, до 1Mb"
                                    maxFileSize={1024 * 1024 * 8}
                                    withDeleteButton
                                    w={376}
                                    h={220}
                                />
                                <FTextarea
                                    name="description"
                                    minRows={4}
                                    autosize
                                    placeholder="Достижения и регалии"
                                    description="до 190 символов"
                                    w={600}
                                />
                            </Flex>
                        </Fieldset>
                    )}

                    <Fieldset label="Настройки уведомлений" icon={<Bell />}>
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

export default CreateUserForm;
