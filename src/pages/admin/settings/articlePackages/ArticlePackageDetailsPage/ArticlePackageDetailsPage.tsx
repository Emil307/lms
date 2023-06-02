import { Box, Loader, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { ArticlePackageSettings, InfoPanel } from "@widgets/admin/articlePackages";
import { AdminArticleList } from "@features/articlePackages";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "./types";

const ArticlePackageDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: articlePackageData, isLoading, isError } = useAdminArticlePackage(id);

    const handleChangeTab = (value: string | null) => {
        if (value) {
            router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id, tab: value } });
        }
    };

    const renderContent = () => {
        if (tab === "articles") {
            return <AdminArticleList articlePackageId={id} />;
        }

        return <ArticlePackageSettings id={id} />;
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ packageName: articlePackageData.name, id })} mb={8} />
            <Title color="dark">{articlePackageData.name}</Title>
            <InfoPanel id={id} />
            <Tabs value={tab || tabsList[0].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            {renderContent()}
        </Box>
    );
};

export default ArticlePackageDetailsPage;
