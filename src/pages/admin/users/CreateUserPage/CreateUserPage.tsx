import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateUserForm } from "@features/users";
import { breadCrumbsItems } from "./constants";

const CreateUserPage = () => {
    const router = useRouter();

    const handleCloseForm = () => router.push("/admin/users");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading mb={24}>Создание пользователя</Heading>
            <CreateUserForm onClose={handleCloseForm} />
        </Box>
    );
};

export default CreateUserPage;
