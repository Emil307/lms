import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateAdminGroupForm } from "@features/groups";
import { breadCrumbsItems } from "./constants";

const CreateGroupPage = () => {
    const router = useRouter();

    const handleCloseForm = () => router.push("/admin/groups");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark" mb={24}>
                Создание группы
            </Title>
            <CreateAdminGroupForm onClose={handleCloseForm} maw={512} />
        </Box>
    );
};

export default CreateGroupPage;
