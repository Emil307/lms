import { Box, Flex, FlexProps, Image, ThemeIcon } from "@mantine/core";
import React from "react";
import { Bell, Info, Shield, UserCheck, User as UserIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading, Paragraph } from "@shared/ui";
import { useDetailsUser } from "@entities/user";
import { ChangeUserPasswordForm } from "@features/users";
import { checkRoleOrder, getFullName } from "@shared/utils";
import { useSession } from "@features/auth";
import { SettingsList as SettingsNotificationList } from "@widgets/notifications";
import { useUpdateAdminUserNotification } from "@entities/notification";
import { InfoCard } from "@components/InfoCard";
import { Roles } from "@app/routes";
import { fields } from "./constants";
import { useSettingUserStyles } from "./UserSettings.styles";
import { DeleteUserButton } from "./components";

export interface UserSettingsProps extends FlexProps {
    id: string;
}

const UserSettings = ({ id, ...props }: UserSettingsProps) => {
    const router = useRouter();
    const { classes } = useSettingUserStyles();
    const { data } = useDetailsUser(id);
    const { user: authUser } = useSession();
    const { mutate: updateNotification } = useUpdateAdminUserNotification(id);

    const isRoleOrder = checkRoleOrder(authUser?.roles[0].id, data?.roles[0].id) > -1;

    const dataProfile = {
        fio: getFullName({ data: data?.profile }),
        roleName: data?.roles[0].displayName ?? "",
        email: data?.email ?? "",
    };

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () =>
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            size: 408,
            children: (
                <ChangeUserPasswordForm
                    userData={{ id: data?.id, roleId: data?.roles[0].id, fio: dataProfile.fio }}
                    onClose={handleCloseChangePasswordModal}
                />
            ),
        });

    const openEditUserPage = () => router.push({ pathname: "/admin/users/[id]/edit", query: { id } });

    const handleChangeNotification = (notification: string, isActive: boolean) => {
        updateNotification({ notification, isActive });
    };

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Настройки пользователя</Heading>
                    <DeleteUserButton data={data} hidden={!isRoleOrder} />
                </Flex>
                <Fieldset label="Личные данные" icon={<UserIcon />}>
                    <DisplayField label="Фамилия" value={data?.profile.lastName} />
                    <DisplayField label="Имя" value={data?.profile.firstName} />
                    <DisplayField label="Отчество" value={data?.profile.patronymic} />
                </Fieldset>

                <Fieldset label="Системные данные" icon={<Shield />}>
                    <DisplayField label="Роль" value={data?.roles[0].displayName} />
                    <DisplayField label="Email" value={data?.email} />
                </Fieldset>

                {Roles.teacher === data?.roles[0].id && (
                    <Fieldset label="О преподавателе" icon={<UserCheck />}>
                        <Flex direction="column" gap={16} w="100%">
                            {data.profile.additionalImage?.absolutePath && (
                                <Flex direction="column" gap={4} w={376}>
                                    <Image radius="lg" src={data.profile.additionalImage.absolutePath} alt="User" />
                                    <Flex gap={4} align="center">
                                        <ThemeIcon size={16} color="primaryHover">
                                            <Info />
                                        </ThemeIcon>
                                        <Paragraph variant="text-smaller">Рекомендуемый размер изображения: 376х220 px</Paragraph>
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>
                        {data.profile.description && (
                            <Paragraph variant="small-m" color="gray45" mt={16}>
                                {data.profile.description}
                            </Paragraph>
                        )}
                    </Fieldset>
                )}

                <Fieldset label="Настройки уведомлений" icon={<Bell />}>
                    <SettingsNotificationList notifications={data?.notifications} variant="secondary" onChange={handleChangeNotification} />
                </Fieldset>
            </Flex>
            <Box>
                <InfoCard
                    avatar={{
                        src: data?.profile.avatar?.absolutePath,
                    }}
                    values={dataProfile}
                    variant="whiteBg"
                    fields={fields}
                    actionSlot={
                        isRoleOrder && (
                            <>
                                <Button variant="secondary" onClick={openEditUserPage} disabled={!isRoleOrder}>
                                    Редактировать данные
                                </Button>
                                <Button variant="border" onClick={handleOpenChangePasswordModal} disabled={!isRoleOrder}>
                                    Изменить пароль
                                </Button>
                            </>
                        )
                    }
                />
            </Box>
        </Flex>
    );
};

export default UserSettings;