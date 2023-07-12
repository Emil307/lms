import { Box, Flex, LoadingOverlay, ThemeIcon } from "@mantine/core";
import React from "react";
import { Bell, Settings, Shield, User as UserIcon } from "react-feather";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { BreadCrumbs, Button, DisplayField, Heading } from "@shared/ui";
import { User, useMe } from "@entities/auth";
import { Fieldset } from "@components/Fieldset";
import { ChangePasswordForm } from "@features/auth";
import { SettingsList as SettingsNotificationList } from "@widgets/notifications";
import { useUpdateUserNotification } from "@entities/notification";
import { InfoCard } from "@components/InfoCard";
import { breadCrumbsItems, fields } from "./constants";
import useStyles from "./ProfilePage.styles";

const ProfilePage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data: userData, isLoading } = useMe();
    const { mutate: updateNotification } = useUpdateUserNotification();

    const handleRedirectEditProfile = () => router.push("/profile/edit");

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () =>
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            centered: true,
            size: 408,
            children: <ChangePasswordForm onClose={handleCloseChangePasswordModal} />,
        });

    const handleChangeNotification = (notification: string, isActive: boolean) => {
        updateNotification({ notification, isActive });
    };

    if (isLoading) {
        return <LoadingOverlay visible overlayBlur={2} />;
    }

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Flex gap={12} align="center" mb={32}>
                <ThemeIcon className={classes.titleIcon}>
                    <Settings />
                </ThemeIcon>
                <Heading>Настройки профиля</Heading>
            </Flex>
            <Flex className={classes.content}>
                <Flex direction="column" gap={24} sx={{ flex: 1 }}>
                    <Fieldset label="Личные данные" icon={<UserIcon />}>
                        <DisplayField label="Фамилия" value={userData?.profile.lastName} />
                        <DisplayField label="Имя" value={userData?.profile.firstName} />
                        <DisplayField label="Отчество" value={userData?.profile.patronymic} />
                    </Fieldset>

                    <Fieldset label="Системные данные" icon={<Shield />}>
                        <DisplayField label="Роль" value={userData?.roles[0].displayName} />
                        <DisplayField label="Email" value={userData?.email} />
                    </Fieldset>

                    <Fieldset label="Настройки уведомлений" icon={<Bell />}>
                        <SettingsNotificationList
                            notifications={userData?.notifications}
                            variant="primary"
                            onChange={handleChangeNotification}
                        />
                    </Fieldset>
                </Flex>
                <Box>
                    <InfoCard<User>
                        variant="grayBg"
                        avatar={{
                            src: userData?.profile.avatar?.absolutePath,
                        }}
                        fields={fields}
                        values={userData}
                        actionSlot={
                            <>
                                <Button variant="secondary" onClick={handleRedirectEditProfile}>
                                    Редактировать данные
                                </Button>
                                <Button variant="border" onClick={handleOpenChangePasswordModal}>
                                    Изменить пароль
                                </Button>
                            </>
                        }
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default ProfilePage;
