import { Box, Flex, LoadingOverlay, ThemeIcon } from "@mantine/core";
import React from "react";
import { Settings } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { BreadCrumbs, Heading } from "@shared/ui";
import { ProfileEditForm } from "@features/editProfile";
import { useMe } from "@entities/auth";
import { ChangePasswordForm } from "@features/auth";
import { breadCrumbsItems } from "./constants";

const UpdateProfilePage = () => {
    const { data: userData, isLoading } = useMe();

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () =>
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            centered: true,
            size: 408,
            children: <ChangePasswordForm onClose={handleCloseChangePasswordModal} />,
        });

    if (isLoading) {
        return <LoadingOverlay visible overlayBlur={2} />;
    }

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Flex gap={16} align="center" mb={32}>
                <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none" }}>
                    <Settings width={32} height={32} />
                </ThemeIcon>
                <Heading>Настройки профиля</Heading>
            </Flex>

            <Box
                sx={(theme) => ({
                    borderRadius: 24,
                    backgroundColor: theme.colors.white[0],
                    form: { border: "none", padding: 32, width: "100%" },
                })}>
                <ProfileEditForm data={userData} isLoading={isLoading} onEditPassword={handleOpenChangePasswordModal} />
            </Box>
        </Box>
    );
};

export default UpdateProfilePage;
