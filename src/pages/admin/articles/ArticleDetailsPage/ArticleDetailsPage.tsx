import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminArticle } from "@entities/article";
import { InfoPanel } from "@widgets/admin/articles/InfoPanel";
import { ArticleSettings } from "@widgets/admin/articles";
import { AdminArticleCourseList, ArticleMaterialList } from "@features/articles";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const ArticleDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: articleData, isLoading, isError } = useAdminArticle(id);

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id, tab: value } });
    };

    const renderContent = () => {
        switch (tab) {
            case "materials":
                return <ArticleMaterialList articleId={id} mt={32} />;
            case "courses":
                return <AdminArticleCourseList articleId={id} mt={32} />;
            default:
                return <ArticleSettings id={id} mt={32} />;
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
            <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            {renderContent()}
        </Box>
    );
};

export default ArticleDetailsPage;
