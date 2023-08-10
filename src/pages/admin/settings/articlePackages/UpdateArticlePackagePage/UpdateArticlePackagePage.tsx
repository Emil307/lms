import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { UpdateArticlePackageForm } from "@features/articlePackages";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const UpdateArticlePackagePage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: articlePackageData, isLoading, isError } = useAdminArticlePackage(id);

    const handleCancel = () => router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id } });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: articlePackageData.name, id })} mb={8} />
            <Heading mb={24}>{articlePackageData.name}</Heading>
            <UpdateArticlePackageForm data={articlePackageData} onClose={handleCancel} />
        </Box>
    );
};

export default UpdateArticlePackagePage;
