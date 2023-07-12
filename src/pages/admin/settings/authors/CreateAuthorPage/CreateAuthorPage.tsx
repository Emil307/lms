import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateAuthorForm } from "@features/authors";
import { breadCrumbsItems } from "./constants";

const CreateAuthorPage = () => {
    const router = useRouter();

    const onCloseCreateForm = () => router.push({ pathname: "/admin/settings/authors" });

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading mb={24}>Создание автора</Heading>
            <CreateAuthorForm onClose={onCloseCreateForm} />
        </Box>
    );
};

export default CreateAuthorPage;
