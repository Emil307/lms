import { Flex, Avatar } from "@mantine/core";
import React from "react";
import { Edit3, Shield, User, UserCheck } from "react-feather";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import dayjs from "dayjs";
import {
    Button,
    FFileButton,
    FFileInput,
    FInput,
    FRadioGroup,
    FSwitch,
    FTextarea,
    LastUpdatedInfo,
    ManagedForm,
    Paragraph,
    Radio,
} from "@shared/ui";
import { useAdminUsersFilters, UserDetailResponse, userApi, UpdateAdminUserResponse } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { ChangeUserPasswordForm } from "@features/users";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, checkRoleOrder, createNotification, getFullName, useMedia } from "@shared/utils";
import { useMe } from "@entities/auth";
import { Roles } from "@app/routes";
import { getInitialValuesForm } from "./constants";
import { adaptDataForUpdateForm, adaptUpdateUserRequest } from "./utils";
import useStyles from "./UpdateUserForm.styles";
import { $UpdateUserFormValidation, UpdateUserFormValidation } from "./types";

export interface UpdateUserFormProps {
    data?: UserDetailResponse;
    onClose: () => void;
}

const UpdateUserForm = ({ data, onClose }: UpdateUserFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data: profileData } = useMe();
    const { data: options } = useAdminUsersFilters();

    const isMobile = useMedia("xs");

    const filteredRoles = options?.roles.filter((role) => checkRoleOrder(profileData?.roles[0].id, role.id) >= 0);
    const currentRole = String(filteredRoles?.find((role) => role.id === data?.roles[0].id)?.id);

    const userFullName = getFullName({ data: data?.profile });

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () => {
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            size: 408,
            children: (
                <ChangeUserPasswordForm
                    userData={{ id: data?.id, roleId: data?.roles[0].id, fio: userFullName }}
                    onClose={handleCloseChangePasswordModal}
                />
            ),
        });
    };

    const updateUser = (values: UpdateUserFormValidation) => {
        return userApi.updateUser({ ...adaptUpdateUserRequest(values), id: String(data?.id) });
    };

    const onSuccess = (response: UpdateAdminUserResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        router.push({ pathname: "/admin/users/[id]", query: { id: String(response.id) } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления пользователя",
        });
    };

    return (
        <ManagedForm<UpdateUserFormValidation, UpdateAdminUserResponse>
            initialValues={{ ...getInitialValuesForm(currentRole), ...adaptDataForUpdateForm(data) }}
            validationSchema={$UpdateUserFormValidation}
            mutationKey={[MutationKeys.UPDATE_USER, data?.id]}
            mutationFunction={updateUser}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_USER, String(data?.id)] }]}
            hasConfirmModal
            onCancel={onClose}
            onSuccess={onSuccess}
            onError={onError}>
            {({ values, dirty, onCancel }) => (
                <Flex direction="column" gap={32}>
                    <Flex className={classes.infoPanel}>
                        <Flex gap={8}>
                            <Paragraph variant="text-small-m" color="gray45">
                                ID:
                            </Paragraph>
                            <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                        </Flex>
                        <Flex gap={8}>
                            <Paragraph variant="text-small-m" color="gray45">
                                Статус:
                            </Paragraph>
                            <FSwitch name="isActive" variant="secondary" label="Деактивировать" labelPosition="left" />
                        </Flex>
                        <Flex gap={8}>
                            <Paragraph variant="text-small-m" color="gray45">
                                Последний вход:
                            </Paragraph>
                            <Paragraph variant="text-small-m">
                                {data?.lastLoginAt ? dayjs(data.lastLoginAt).format("DD.MM.YYYY HH:mm") : "-"}
                            </Paragraph>
                        </Flex>
                        <LastUpdatedInfo data={data?.lastUpdated} />
                    </Flex>

                    <Fieldset label="Личные данные" icon={<User />} legendProps={{ mb: 24 }} showDivider={false}>
                        <Flex align="center" gap={16} mb={16}>
                            <Avatar src={values.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                                <AvatarIcon />
                            </Avatar>
                            <Flex direction="column" gap={8}>
                                <Flex direction="column" gap={4}>
                                    <Paragraph variant="small-semi" lineClamp={1}>
                                        {userFullName}
                                    </Paragraph>
                                    <Paragraph variant="text-small-m" color="primaryHover">
                                        {data?.roles[0].displayName}
                                    </Paragraph>
                                </Flex>
                                <FFileButton name="avatar" label="Изменить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                            </Flex>
                        </Flex>
                        <Flex gap={8} wrap="wrap">
                            <FInput name="firstName" label="Имя" size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                            <FInput name="lastName" label="Фамилия" size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                            <FInput name="patronymic" label="Отчество" size="sm" miw={{ base: "100%", xs: 252 }} />
                        </Flex>
                    </Fieldset>
                    <Fieldset label="Системные данные" icon={<Shield />}>
                        <Flex direction="column" gap={16} w="100%">
                            <FRadioGroup name="roleId" className={classes.filterRadioGroup}>
                                {filteredRoles?.map((item) => (
                                    <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />
                                ))}
                            </FRadioGroup>
                            <Flex wrap="wrap" gap={8}>
                                <FInput name="email" label="Email" size="sm" miw={{ base: "100%", xs: 252 }} disabled />
                                <Button type="button" variant="border" size="medium" onClick={handleOpenChangePasswordModal}>
                                    Изменить пароль
                                </Button>
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
                                    maxFileSize={1024 * 1024 * 8}
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
    );
};

export default UpdateUserForm;
