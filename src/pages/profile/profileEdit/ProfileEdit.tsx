import { Box, Group, LoadingOverlay, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle, Settings } from "react-feather";
import { closeAllModals, openModal } from "@mantine/modals";
import { BreadCrumbs, Button, TBreadCrumbItem } from "@shared/ui";
import { ProfileEditForm } from "@features/editProfile";
import { useMe } from "@entities/auth";

export interface ProfileEditPageProps {}

const ProfileEditPage = (_props: ProfileEditPageProps) => {
    const theme = useMantineTheme();

    const { data: userData, isLoading } = useMe();

    //TODO: После добавления страниц поменять урлы
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Мой профиль", href: { pathname: "/" } },
        { title: "Настройки профиля", href: { pathname: "/" } },
        { title: "Редактирование данных", href: { pathname: "/profile/edit" } },
    ];

    const handleEditPassword = () => undefined;
    const handleClose = (dirty: boolean) => {
        if (dirty) {
            openModal({
                title: "Предупреждение",
                centered: true,
                size: 408,
                children: (
                    <>
                        <Group sx={{ flexWrap: "nowrap" }} pb={32}>
                            <ThemeIcon
                                sx={{
                                    minWidth: 48,
                                    background: theme.colors.secondary16,
                                    svg: {
                                        color: theme.colors.secondary,
                                    },
                                }}
                                color="secondary"
                                radius={50}
                                w={48}
                                h={48}>
                                <AlertTriangle />
                            </ThemeIcon>
                            <Text sx={(theme) => ({ fontWeight: 500, fontSize: 16, lineHeight: "24px", color: theme.colors.dark })}>
                                Вы хотите сохранить изменения перед закрытием?
                            </Text>
                        </Group>
                        <Group sx={{ flexWrap: "nowrap" }}>
                            <Button variant="border" fullWidth onClick={closeAllModals}>
                                Закрыть
                            </Button>
                            <Button variant="secondary" fullWidth>
                                Сохранить
                            </Button>
                        </Group>
                    </>
                ),
            });
        }
    };

    if (isLoading) {
        return <LoadingOverlay visible overlayBlur={2} />;
    }

    return (
        <Group sx={{ flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Group sx={{ gap: 12 }}>
                    <Settings width={32} height={32} color={theme.colors.primaryHover[0]} />
                    <Text
                        sx={(theme) => ({
                            fontWeight: 600,
                            fontSize: 32,
                            lineHeight: "40px",
                            color: theme.colors.dark,
                        })}>
                        Настройки профиля
                    </Text>
                </Group>
            </Box>

            <Box sx={(theme) => ({ borderRadius: 24, backgroundColor: theme.colors.white, form: { border: "none", padding: 32 } })}>
                <ProfileEditForm data={userData} onEditPassword={handleEditPassword} onClose={handleClose} isLoading={isLoading} />
            </Box>
        </Group>
    );
};

export default ProfileEditPage;
