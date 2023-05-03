import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { CreateUserForm } from "@features/users";
import { breadCrumbsItems } from "./constants";

const UserCreate = () => {
    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark">
                Создание пользователя
            </Title>
            <CreateUserForm />
        </Box>
    );
};

export default UserCreate;
