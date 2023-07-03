import { Flex, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { ContentPanel, MainInfoPanel } from "@widgets/articles";
import { useArticleByCategory } from "@entities/article";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useCategory } from "@entities/category";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "./types";

const ArticleByCategoryDetailsPage = () => {
    const router = useRouter();
    const { id, categoryId } = router.query as TRouterQueries;
    const categoryData = useCategory(categoryId);
    const articleByCategory = useArticleByCategory({ id, categoryId });

    if (!router.isReady || articleByCategory.isLoading) {
        return <Loader />;
    }

    if (articleByCategory.isError || categoryData.isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex direction="column" gap={32}>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    title: articleByCategory.data.data.name,
                    categoryName: categoryData.data?.name,
                    id,
                    categoryId,
                })}
            />
            <MainInfoPanel.Navigated articleData={articleByCategory.data} />
            <ContentPanel data={articleByCategory.data.data} />
        </Flex>
    );
};

export default ArticleByCategoryDetailsPage;
