import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { ContentPanel, MainInfoPanel } from "@widgets/articles";
import { useArticleByCategory } from "@entities/article";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useCategory } from "@entities/category";
import { ArticleTypes } from "@shared/constant";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "./types";

const ArticleByCategoryDetailsPage = () => {
    const router = useRouter();
    const { id, categoryId } = router.query as TRouterQueries;
    const categoryData = useCategory({ id: categoryId });
    const articleByCategory = useArticleByCategory({ id, categoryId });

    if (!router.isReady || articleByCategory.isLoading) {
        return <Loader />;
    }

    if (articleByCategory.isError || categoryData.isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    title: articleByCategory.data.data.name,
                    categoryName: categoryData.data?.name,
                    categoryId,
                })}
                mb={32}
            />
            <MainInfoPanel.Navigated articleData={articleByCategory.data} type={ArticleTypes.BY_CATEGORY} mb={16} />
            <ContentPanel data={articleByCategory.data.data} articleType={ArticleTypes.BY_CATEGORY} categoryId={categoryId} />
        </Box>
    );
};

export default ArticleByCategoryDetailsPage;
