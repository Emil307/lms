import { Box, Loader, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminArticlePackage } from "@entities/articlePackage";
import { InfoPanel } from "@widgets/admin/articlePackages";
import { ArticleList } from "@features/articlePackages";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const ArticlePackageArticlesPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: articlePackageData, isLoading, isError } = useAdminArticlePackage(id);

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "courses":
                router.push({ pathname: "/admin/settings/article-packages/[id]/articles", query: { id } });
                break;

            default:
                router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id } });
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
            <BreadCrumbs items={getBreadCrumbsItems({ packageName: articlePackageData.name, id })} mb={8} />
            <Title color="dark">{articlePackageData.name}</Title>
            <InfoPanel id={id} />
            <Tabs value={tabsList[1].value} tabs={tabsList} onTabChange={handleChangeTab} mt={32} />
            <ArticleList articlePackageId={id} />
        </Box>
    );
};

export default ArticlePackageArticlesPage;
