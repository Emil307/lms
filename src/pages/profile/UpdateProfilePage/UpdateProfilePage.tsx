import { Box, Flex, LoadingOverlay, ThemeIcon } from "@mantine/core";
import React from "react";
import { Settings } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { BreadCrumbs, Heading } from "@shared/ui";
import { useMe } from "@entities/auth";
import { ChangePasswordForm } from "@features/auth";
import { UpdateProfileForm } from "@features/profile";
import { breadCrumbsItems } from "./constants";
import useStyles from "./UpdateProfilePage.styles";

const UpdateProfilePage = () => {
    const { classes } = useStyles();
    const { data: userData, isLoading } = useMe();

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () =>
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
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
                <ThemeIcon className={classes.titleIcon}>
                    <Settings />
                </ThemeIcon>
                <Heading>Настройки профиля</Heading>
            </Flex>
            <Box className={classes.content}>
                <UpdateProfileForm data={userData} isLoading={isLoading} onEditPassword={handleOpenChangePasswordModal} />
            </Box>
        </Box>
    );
};

export default UpdateProfilePage;
