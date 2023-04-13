import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { CreateUserForm } from "@features/users";

const UserCreate = () => {
    const router = useRouter();
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Пользователи", href: { pathname: "/admin/users" } },
        { title: "Создание пользователя", href: { pathname: "/admin/users/create" } },
    ];

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
