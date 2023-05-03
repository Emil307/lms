import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Edit3, Shield, User, UserCheck } from "react-feather";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { Button, FFileButton, FFileInput, FInput, FRadioGroup, FSwitch, FTextarea, ManagedForm, Radio } from "@shared/ui";
import { $updateUserRequest, UpdateUserRequest, useAdminUsersFilters, UserDetailResponse, usersApi } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { ChangeUserPasswordForm } from "@features/users";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { getInitialValuesForm } from "./constants";
import { adaptDataForEditForm } from "./utils";
import useStyles from "./EditUserForm.styles";

export interface EditUserFormProps {
    data?: UserDetailResponse;
    onClose: () => void;
}

const EditUserForm = ({ data, onClose }: EditUserFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data: options } = useAdminUsersFilters();

    const currentRole = String(options?.roles.find((role) => role.id === data?.roles[0].id)?.id);

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () => {
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            centered: true,
            size: 408,
            children: (
                <ChangeUserPasswordForm userData={{ id: data?.id, roleId: data?.roles[0].id }} onClose={handleCloseChangePasswordModal} />
            ),
        });
    };

    const updateUser = (values: UpdateUserRequest) => {
        return usersApi.updateUser({ ...values, avatarId: values.avatar?.id, additionalImageId: values.additionalImage?.id, id: data?.id });
    };

    const onSuccess = (response: UserDetailResponse) => {
        router.push({ pathname: "/admin/users/[id]", query: { id: String(response.id) } });
    };

    return (
        <ManagedForm<UpdateUserRequest, UserDetailResponse>
            initialValues={{ ...getInitialValuesForm(currentRole), ...adaptDataForEditForm(data) }}
            validationSchema={$updateUserRequest}
            mutationKey={[MutationKeys.UPDATE_USER, data?.id]}
            mutationFunction={updateUser}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_USER, String(data?.id)] }]}
            hasConfirmModal
            onClose={onClose}
            onSuccess={onSuccess}>
            {({ values, dirty, onClose }) => (
                <Flex direction="column" gap={32}>
                    <Flex gap={32} align="center">
                        <Box className={classes.infoItem}>
                            ID: <span>{data?.id}</span>
                        </Box>
                        <Flex gap={8}>
                            <Text className={classes.infoItem}>Статус:</Text>
                            <FSwitch name="isActive" variant="secondary" label="Деактивировать" labelPosition="left" />
                        </Flex>

                        {/* TODO: Добавить Последний вход и последнее изменение когда будет сделано на беке  */}
                    </Flex>

                    <Fieldset label="Личные данные" icon={<User />}>
                        <>
                            <Flex gap={24}>
                                <Avatar
                                    src={values.avatar?.absolutePath || data?.profile.avatar?.absolutePath}
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
                        </>
                    </Fieldset>
                    <Fieldset label="Системные данные" icon={<Shield />}>
                        <Flex direction="column" gap={16}>
                            <FRadioGroup name="roleId">
                                {options?.roles.map((item) => {
                                    return <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />;
                                })}
                            </FRadioGroup>
                            <Flex wrap="wrap" gap={8}>
                                <FInput name="email" label="Email" size="sm" w={252} disabled />
                                <Button type="button" variant="border" size="medium" onClick={handleOpenChangePasswordModal}>
                                    Изменить пароль
                                </Button>
                            </Flex>
                        </Flex>
                    </Fieldset>
                    {options?.roles.find((item) => item.name === "teacher")?.id === Number(values.roleId) && (
                        <Fieldset label="О преподавателе" icon={<UserCheck />}>
                            <Flex direction="column" gap={24}>
                                <FFileInput
                                    name="additionalImage"
                                    title="Загрузите файл"
                                    type="image"
                                    withDeleteButton
                                    h={220}
                                    w={376}
                                    description="Рекомендуемый размер изображения: 376х220 px"
                                />
                                <FTextarea w={772} autosize minRows={4} name="description" />
                            </Flex>
                        </Fieldset>
                    )}

                    {/* TODO: - нотификация в разработке на бэке, как появится -> добавить  */}
                    <Flex gap={8}>
                        <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
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

export default EditUserForm;
