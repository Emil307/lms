import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateArticlePackageForm } from "@features/articlePackages";
import { breadCrumbsItems } from "./constants";

const CreateArticlePackagePage = () => {
    const router = useRouter();

    const onCloseCreateForm = () => router.push({ pathname: "/admin/settings/article-packages" });

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading mb={24}>Создать пакет</Heading>
            <CreateArticlePackageForm onClose={onCloseCreateForm} />
        </Box>
    );
};

export default CreateArticlePackagePage;
