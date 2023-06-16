import { Flex, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { ContentPanel } from "@widgets/articles";
import { useArticle } from "@entities/article";
import { TRouterQueries } from "@shared/types";
import { Loader } from "@shared/ui";

const ArticleDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    //TODO: Поменять когда бек поправит
    const { data: articleData, isLoading, isError } = useArticle(id);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    //TODO: ПРоверить всё, тк это добавлено чтобы решить build
    return (
        <Flex direction="column" gap={32}>
            {/* TODO: Вернуть как исправят беки issues */}
            {/* <BreadCrumbs items={getBreadCrumbsItems({ title: articleData.data.name, id, isFavorite: articleData.data.isFavorite })} /> */}
            {/* <MainInfoPanel articleData={articleData} /> */}
            <ContentPanel data={articleData} />
        </Flex>
    );
};

export default ArticleDetailsPage;
