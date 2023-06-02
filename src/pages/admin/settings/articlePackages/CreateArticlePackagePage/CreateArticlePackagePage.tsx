import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateArticlePackageForm } from "@features/articlePackages";
import { breadCrumbsItems } from "./constants";

const CreateArticlePackagePage = () => {
    const router = useRouter();

    const onCloseCreateForm = () => router.push({ pathname: "/admin/settings/article-packages" });

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark" mb={24}>
                Создать пакет
            </Title>
            <CreateArticlePackageForm onClose={onCloseCreateForm} />
        </Box>
    );
};

export default CreateArticlePackagePage;
