import { Box, Group, LoadingOverlay, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { Settings, Shield, User as UserIcon } from "react-feather";
import { BreadCrumbs, Button, DisplayField, TBreadCrumbItem } from "@shared/ui";
import { ProfileInfo, ProfileInfoDisplayFields } from "@components/ProfileInfo";
import { User, useMe } from "@entities/auth";
import { Fieldset } from "@components/Fieldset";

const fields: ProfileInfoDisplayFields<User> = [
    { name: "profile.data.firstName", label: "Имя" },
    { name: "role.data.name", label: "Роль" },
    { name: "email", label: "Email" },
];

const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Мой профиль", href: { pathname: "/" } },
    { title: "Настройки профиля", href: { pathname: "/profile/settings" } },
];

const ProfileSettingsPage = () => {
    const theme = useMantineTheme();

    const { data: userData, isLoading } = useMe();

    if (isLoading) {
        return <LoadingOverlay visible overlayBlur={2} />;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Group sx={{ gap: 12 }}>
                    <Settings width={32} height={32} color={theme.colors.primaryHover[0]} />
                    <Text
                        sx={(theme) => ({
                            fontWeight: 600,
                            fontSize: 32,
                            lineHeight: "40px",
                            color: theme.colors.dark[0],
                        })}>
                        Настройки профиля
                    </Text>
                </Group>
            </Box>
            <Box
                sx={(theme) => ({
                    display: "grid",
                    gridTemplateColumns: "1fr 334px",
                    padding: 32,
                    gap: 56,
                    borderRadius: 24,
                    backgroundColor: theme.colors.white[0],
                })}>
                <Group sx={() => ({ flexDirection: "column", alignItems: "flex-start", gap: 24 })}>
                    <Fieldset label="Личные данные" icon={<UserIcon />}>
                        <DisplayField label="Фамилия" value={userData?.profile.data.lastName} />
                        <DisplayField label="Имя" value={userData?.profile.data.firstName} />
                        <DisplayField label="Отчество" value={userData?.profile.data.patronymic} />
                    </Fieldset>

                    <Fieldset label="Системные данные" icon={<Shield />}>
                        <DisplayField label="Роль" value={userData?.role.data.displayName} />
                        <DisplayField label="Email" value={userData?.email} />
                    </Fieldset>

                    {/* TODO: Скрыто, так нет функционала для работы с уведомлениями */}
                    {/* <Fieldset label="Настройки уведомлений" icon={<Bell />}>
                        <Box
                            sx={(theme) => ({
                                padding: 4,
                                borderRadius: 12,
                                backgroundColor: theme.colors.light[0],
                            })}
                            w="100%">
                            {notifications.map((notification) => (
                                <ControlPanel
                                    key={notification.id}
                                    label={notification.label}
                                    variant="primary"
                                    checked={notification.value}
                                    onChange={() => handleChange(notification.id)}
                                />
                            ))}
                        </Box>
                    </Fieldset> */}
                </Group>
                <Box>
                    <ProfileInfo
                        //TODO: добавить аватар, когда будет возможность
                        // avatarSrc={userData.avatarSrc}
                        fields={fields}
                        values={userData}
                        actionSlot={
                            <>
                                <Button variant="secondary">Редактировать данные</Button>
                                <Button variant="border">Изменить пароль</Button>
                            </>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileSettingsPage;
