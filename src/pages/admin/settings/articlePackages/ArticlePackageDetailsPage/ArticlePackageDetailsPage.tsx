import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader, Tabs } from "@shared/ui";
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

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    const renderContent = () => {
        if (currentTab === "articles") {
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
            <BreadCrumbs items={getBreadCrumbsItems({ name: articlePackageData.name, id })} mb={8} />
            <Heading mb={24}>{articlePackageData.name}</Heading>
            <InfoPanel id={id} mb={24} />
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} mb={32} />
            {renderContent()}
        </Box>
    );
};

export default ArticlePackageDetailsPage;
