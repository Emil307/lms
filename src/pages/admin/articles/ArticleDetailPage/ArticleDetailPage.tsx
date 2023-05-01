import { Box, Loader, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminArticle } from "@entities/article";
import { InfoPanel } from "@widgets/admin/articles/InfoPanel";
import { ArticleSettings } from "@widgets/admin/articles";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const ArticleDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: articleData, isLoading, isError } = useAdminArticle(id);

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "materials":
                router.push({ pathname: "/admin/articles/[id]/materials", query: { id } });
                break;
            case "bindToCourse":
                //TODO: Когда будет страница с привязкой к курсу
                router.push({ pathname: "/admin/articles/[id]", query: { id } });
                break;
            default:
                router.push({ pathname: "/admin/articles/[id]", query: { id } });
                break;
        }
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ articleName: articleData.name, id })} mb={8} />
            <InfoPanel id={id} />
            <Tabs value={tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            <ArticleSettings id={id} />
        </Box>
    );
};

export default ArticleDetailPage;
