import { Box, Title, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { UpdateArticlePackageForm } from "@features/articlePackages";
import { getBreadCrumbsItems } from "./utils";

interface TRouterQueries {
    id: string;
}

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
            <BreadCrumbs items={getBreadCrumbsItems({ packageName: articlePackageData.name, id })} mb={8} />
            <Title order={1} color="dark" mb={24}>
                {articlePackageData.name}
            </Title>
            <UpdateArticlePackageForm data={articlePackageData} onClose={handleCancel} />
        </Box>
    );
};

export default UpdateArticlePackagePage;