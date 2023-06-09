import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateAuthorForm } from "@features/authors";
import { breadCrumbsItems } from "./constants";

const CreateAuthorPage = () => {
    const router = useRouter();

    const onCloseCreateForm = () => router.push({ pathname: "/admin/settings/authors" });

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark" mb={24}>
                Создание автора
            </Title>
            <CreateAuthorForm onClose={onCloseCreateForm} />
        </Box>
    );
};

export default CreateAuthorPage;
