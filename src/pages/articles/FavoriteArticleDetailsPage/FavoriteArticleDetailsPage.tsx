import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { ContentPanel, MainInfoPanel } from "@widgets/articles";
import { useFavoriteArticle } from "@entities/article";
import { TRouterQueries } from "@shared/types";
import { BreadCrumbs, Loader } from "@shared/ui";
import { ArticleTypes } from "@shared/constant";
import { getBreadCrumbsItems } from "./utils";

const FavoriteArticleDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: articleData, isLoading, isError } = useFavoriteArticle({ id });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ title: articleData.data.name })} mb={32} />
            <MainInfoPanel.Navigated articleData={articleData} type={ArticleTypes.FAVORITE} mb={16} />
            <ContentPanel data={articleData.data} articleType={ArticleTypes.FAVORITE} />
        </Box>
    );
};

export default FavoriteArticleDetailsPage;
