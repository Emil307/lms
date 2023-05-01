import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateUserForm } from "@features/users";
import { breadCrumbsItems } from "./constants";

const UserCreate = () => {
    const router = useRouter();

    const handleCloseForm = () => {
        router.push("/admin/users");
    };

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark">
                Создание пользователя
            </Title>
            <CreateUserForm onClose={handleCloseForm} />
        </Box>
    );
};

export default UserCreate;
