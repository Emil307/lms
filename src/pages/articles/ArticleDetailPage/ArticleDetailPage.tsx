import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { ContentPanel, MainInfoPanel } from "@widgets/article";
import { useArticle } from "@entities/article";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const ArticleDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data, isLoading, isError } = useArticle(id);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    //TODO: ПРоверить всё, тк это добавлено чтобы решить build
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* TODO: Поменять title и query при подключении нормального реального эндпоинта */}
            <BreadCrumbs items={getBreadCrumbsItems({ title: "Оптимизация управления финансами", articleId: "123" })} />
            <MainInfoPanel data={data} />
            <ContentPanel data={data} />
        </Box>
    );
};

export default ArticleDetailPage;
