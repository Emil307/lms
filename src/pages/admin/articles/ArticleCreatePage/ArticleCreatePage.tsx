import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { ArticleCreateForm } from "@features/articles";
import { breadCrumbsItems } from "./constants";

const ArticleCreatePage = () => {
    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark" mb={24}>
                Создание статьи
            </Title>
            <ArticleCreateForm />
        </Box>
    );
};

export default ArticleCreatePage;
