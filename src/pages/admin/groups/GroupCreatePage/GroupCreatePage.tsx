import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { CreateGroupForm } from "@features/groups";
import { breadCrumbsItems } from "./constants";

const GroupCreatePage = () => {
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
