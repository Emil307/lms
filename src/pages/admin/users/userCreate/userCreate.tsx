import { Box } from "@mantine/core";
import React from "react";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { CreateUser } from "@features/users";

const UserCreate = () => {
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Пользователи", href: { pathname: "/admin/users" } },
        { title: "Создание пользователя", href: { pathname: "/admin/users/create" } },
    ];

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} />
            <Box mt={8}>
                <CreateUser />
            </Box>
        </Box>
    );
};

export default UserCreate;
