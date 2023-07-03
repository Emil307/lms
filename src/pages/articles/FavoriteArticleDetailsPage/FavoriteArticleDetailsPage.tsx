import { Flex, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { ContentPanel, MainInfoPanel } from "@widgets/articles";
import { useFavoriteArticle } from "@entities/article";
import { TRouterQueries } from "@shared/types";
import { BreadCrumbs, Loader } from "@shared/ui";
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
        <Flex direction="column" gap={32}>
            <BreadCrumbs items={getBreadCrumbsItems({ title: articleData.data.name, id })} />
            <MainInfoPanel.Navigated articleData={articleData} />
            <ContentPanel data={articleData.data} />
        </Flex>
    );
};

export default FavoriteArticleDetailsPage;
