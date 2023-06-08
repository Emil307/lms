import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateArticleForm } from "@features/articles";
import { breadCrumbsItems } from "./constants";

const CreateArticlePage = () => {
    const router = useRouter();

    const handleCloseCreateForm = () => router.push("/admin/articles");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark" mb={24}>
                Создание статьи
            </Title>
            <CreateArticleForm onClose={handleCloseCreateForm} />
        </Box>
    );
};

export default CreateArticlePage;
