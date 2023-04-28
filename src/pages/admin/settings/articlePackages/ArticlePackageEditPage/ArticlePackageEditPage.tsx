import { Box, Loader, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { EditArticlePackageForm } from "@features/articlePackages";
import { getBreadCrumbsItems } from "./utils";

interface TRouterQueries {
    id: string;
}

const ArticlePackageEditPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: articlePackageData, isLoading } = useAdminArticlePackage(id);

    const handleCancel = () => router.push("/admin/settings/article-packages");

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ packageName: articlePackageData?.name, id })} mb={8} />
            <Title order={1} color="dark" mb={24}>
                {articlePackageData?.name}
            </Title>
            <EditArticlePackageForm data={articlePackageData} onClose={handleCancel} />
        </Box>
    );
};

export default ArticlePackageEditPage;
