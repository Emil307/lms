import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminArticle } from "@entities/article";
import { useUserRole } from "@entities/auth";
import { InfoPanel } from "@widgets/admin/articles/InfoPanel";
import { ArticleSettings } from "@widgets/admin/articles";
import { AdminArticleCourseList, AdminArticleMaterialList } from "@features/articles";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const ArticleDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: articleData, isLoading, isError } = useAdminArticle({ id });

    const userRole = useUserRole();

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    const renderContent = () => {
        switch (currentTab) {
            case "materials":
                return <AdminArticleMaterialList articleId={id} />;
            case "courses":
                return <AdminArticleCourseList articleId={id} />;
            default:
                return <ArticleSettings id={id} />;
        }
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!userRole) {
        return null;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ articleName: articleData.name, id })} mb={8} />
            <Heading mb={24}>{articleData.name}</Heading>
            <InfoPanel id={id} mb={32} />
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} mb={32} />
            {renderContent()}
        </Box>
    );
};

export default ArticleDetailsPage;
