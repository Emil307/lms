import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { CreateGroupForm } from "@features/groups";

const GroupCreatePage = () => {
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Группы", href: { pathname: "/admin/groups" } },
        { title: "Создание группы", href: { pathname: "/admin/groups/create" } },
    ];

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark">
                Создание группы
            </Title>
            <CreateGroupForm />
        </Box>
    );
};

export default GroupCreatePage;
