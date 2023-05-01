import { Box, Loader, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminArticle } from "@entities/article";
import { ArticleEditForm } from "@features/articles";
import { getBreadCrumbsItems } from "./utils";

const ArticleEditPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: articleData, isLoading } = useAdminArticle(id);

    const handleCancel = () => {
        router.push("/admin/articles");
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ articleName: articleData?.name, id })} mb={8} />
            <Title order={1} color="dark">
                {articleData?.name}
            </Title>
            <ArticleEditForm data={articleData} onClose={handleCancel} />
        </Box>
    );
};

export default ArticleEditPage;
