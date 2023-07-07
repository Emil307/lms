import { Box, Title, ThemeIcon, Flex, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, Loader } from "@shared/ui";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { useCategory } from "@entities/category";
import { initialFilterValues, tabsList } from "./constants";
import { TRouterQueries } from "./types";
import { adaptArticleCategoriesFiltersForm, getBreadCrumbsItems, getTitle, prepareQueryParams } from "./utils";
import { ArticleCategories, ArticlesFromCategory, FavoriteArticles, MyArticles } from "./components";

const ArticlesPage = () => {
    const router = useRouter();
    const [filterParams, setFilterParams] = useState<ArticleAndArticleCategoryFiltersForm>(initialFilterValues);
    const queryParams = router.query as TRouterQueries;
    const { tab, categoryId } = queryParams;

    const categoryData = useCategory({ id: categoryId });

    const titleContent = getTitle({ tab, categoryId, categoryName: categoryData.data?.name });

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        setFilterParams({ ...initialFilterValues, ...adaptArticleCategoriesFiltersForm(queryParams) });
    }, [router.isReady, queryParams]);

    const handleChangeTab = (value: string | null) => {
        if (value) {
            router.push({ pathname: "/articles", query: { tab: value } });
        }
    };

    const handleSubmitFilters = (values: ArticleAndArticleCategoryFiltersForm) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: "1", ...prepareQueryParams(values) },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleBackToArticleCategoryList = () => handleChangeTab("all");

    const renderContent = () => {
        switch (tab) {
            case "favorite":
                return <FavoriteArticles filterParams={filterParams} onSubmitFilters={handleSubmitFilters} />;

            case "my-articles":
                return <MyArticles filterParams={filterParams} onSubmitFilters={handleSubmitFilters} />;

            default:
                if (categoryId) {
                    return (
                        <ArticlesFromCategory
                            filterParams={filterParams}
                            onSubmitFilters={handleSubmitFilters}
                            onBackList={handleBackToArticleCategoryList}
                        />
                    );
                }
                return <ArticleCategories filterParams={filterParams} onSubmitFilters={handleSubmitFilters} />;
        }
    };

    if (!router.isReady || (categoryId && categoryData.isFetching)) {
        return <Loader />;
    }

    if (categoryData.isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ categoryTitle: categoryData.data?.name, tab, filterParams })} mb={8} />
            <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32 }}>
                <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none", height: 36, width: 36 }}>
                    {titleContent.icon}
                </ThemeIcon>
                {titleContent.label}
            </Title>
            <Flex direction="column" gap={32}>
                <Tabs tabs={tabsList} value={tab || tabsList[0].value} onTabChange={handleChangeTab} />
                {renderContent()}
            </Flex>
        </Box>
    );
};

export default ArticlesPage;
