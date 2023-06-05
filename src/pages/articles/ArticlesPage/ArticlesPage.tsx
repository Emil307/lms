import { Box, Title, ThemeIcon, Flex, Loader, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { ArticleCategoryList, Filters } from "@features/articles";
import { CarouselList as ArticlePackageCarouselList } from "@widgets/articlePackages";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { useCategory } from "@entities/category";
import { FavoriteList, List as ArticleList } from "@widgets/articles";
import { initialFilterValues, tabsList } from "./constants";
import { TRouterQueries } from "./types";
import { adaptArticleCategoriesFiltersForm, getBreadCrumbsItems, getTitle, prepareQueryParams } from "./utils";
import { ArticleListFromCategory } from "./components";

const ArticlesPage = () => {
    const router = useRouter();
    const [filterParams, setFilterParams] = useState<ArticleAndArticleCategoryFiltersForm>(initialFilterValues);
    const queryParams = router.query as TRouterQueries;
    const { tab, categoryId } = queryParams;

    const categoryData = useCategory(categoryId);

    const titleContent = getTitle({ tab, categoryId, categoryName: categoryData.data?.name });

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        setFilterParams({ ...initialFilterValues, ...adaptArticleCategoriesFiltersForm(queryParams) });
    }, [router.isReady, queryParams]);

    const handleChangeTab = (value: string | null) => {
        if (value) {
            const { categoryId, ...rest } = filterParams;
            router.push({ pathname: "/articles", query: { ...rest, tab: value } });
        }
    };

    const handleSubmitFilters = (values: ArticleAndArticleCategoryFiltersForm) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: "1", ...prepareQueryParams(values) },
            },
            undefined,
            { shallow: true }
        );
    };

    const handleBackToArticleCategoryList = () => {
        handleChangeTab("all");
    };

    const renderContent = () => {
        switch (tab) {
            case "favorite":
                return <FavoriteList filterParams={filterParams} />;

            case "my-articles":
                /* TODO: Поменять на МОИ СТАТЬИ как сделает этот рут бек*/
                return <ArticleList />;

            default:
                if (categoryId) {
                    return <ArticleListFromCategory filterParams={filterParams} onBackList={handleBackToArticleCategoryList} />;
                }
                return (
                    <>
                        <ArticleCategoryList filterParams={filterParams} />
                        <ArticlePackageCarouselList />
                    </>
                );
        }
    };

    if (!router.isReady || (categoryId && categoryData.isLoading)) {
        return <Loader />;
    }

    if (categoryData.isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ category: categoryData.data, tab, filterParams })} mb={8} />
            <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32 }}>
                <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none", height: 36, width: 36 }}>
                    {titleContent.icon}
                </ThemeIcon>
                {titleContent.label}
            </Title>
            <Flex direction="column" gap={32}>
                <Tabs tabs={tabsList} value={tab || tabsList[0].value} onTabChange={handleChangeTab} />
                <Flex gap={32}>
                    <Filters data={filterParams} onSubmitFilters={handleSubmitFilters} w={264} />
                    <Flex direction="column" gap={64} sx={{ flex: 1 }}>
                        {renderContent()}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ArticlesPage;
