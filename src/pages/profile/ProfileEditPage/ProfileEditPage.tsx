import { Box, Flex, LoadingOverlay, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Settings } from "react-feather";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { ProfileEditForm } from "@features/editProfile";
import { useMe } from "@entities/auth";
import { breadCrumbsItems } from "./constants";

const ProfileEditPage = () => {
    const router = useRouter();
    const { data: userData, isLoading } = useMe();

    const handleEditPassword = () => router.push("/profile/edit");

    const handleCloseEditForm = () => {
        router.push("/profile");
    };

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
                <Title order={1} color="dark">
                    Настройки профиля
                </Title>
            </Flex>

            <Box
                sx={(theme) => ({
                    borderRadius: 24,
                    backgroundColor: theme.colors.white[0],
                    form: { border: "none", padding: 32, width: "100%" },
                })}>
                <ProfileEditForm data={userData} onEditPassword={handleEditPassword} onClose={handleCloseEditForm} isLoading={isLoading} />
            </Box>
        </Box>
    );
};

export default ProfileEditPage;
