import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { useMantineTheme } from "@mantine/core";
import { Edit3, Shield, User, UserCheck } from "react-feather";
import { useRouter } from "next/router";
import { Button, FFileButton, FFileInput, FInput, FRadioGroup, FSwitch, FTextarea, ManagedForm, Radio } from "@shared/ui";
import { $CreateUserRequest, CreateUserRequest, useAdminUsersFilters, UserCreateResponse, usersApi } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys } from "@shared/constant";
import { useMe } from "@entities/auth";
import { ToastType, checkRoleOrder, createNotification } from "@shared/utils";
import { getInitialValuesForm } from "./utils";

const CreateUserForm = () => {
    const router = useRouter();
    const theme = useMantineTheme();
    const { data: profileData } = useMe();
    const { data: options } = useAdminUsersFilters();
    const filteredRoles = options?.roles.filter((role) => checkRoleOrder(profileData?.roles[0].id, role.id) >= 0);
    const defaultRole = String(filteredRoles?.at(0)?.id ?? 0);

    const createUser = (values: CreateUserRequest) => {
        return usersApi.createUser({ ...values, avatarId: values.avatar?.id, additionalImageId: values.additionalImage?.id });
    };

    const onSuccess = (response: UserCreateResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание пользователя",
            message: "Пользователь успешно создан",
        });
        router.push({ pathname: "/admin/users/[id]", query: { id: String(response.id) } });
    };

    const onCancel = () => {
        router.push("/admin/users");
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания пользователя",
        });
    };

    return (
        <ManagedForm<CreateUserRequest, UserCreateResponse>
            initialValues={getInitialValuesForm(defaultRole)}
            validationSchema={$CreateUserRequest}
            mutationKey={[MutationKeys.CREATE_USER]}
            mutationFunction={createUser}
            onSuccess={onSuccess}
            onError={onError}>
            {({ values, dirty }) => (
                <Flex gap={32} direction="column">
                    <Flex gap={8} mt={24} align="center">
                        <Text
                            sx={{
                                color: theme.colors.gray45[0],
                            }}>
                            Статус:
                        </Text>
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

                    {/* TODO: - нотификация в разработке на бэке, как появится -> добавить */}
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
