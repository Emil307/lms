import { Box, Title, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { IconBook2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { Carousel } from "@components/Carousel";
import { ArticleCategoryList, ArticlePackageCard, CategoryListFromPackage, Filters } from "@features/articles";
import { ArticlePackage, useArticlePackages } from "@entities/article";
import { breadCrumbsItems, tabsList } from "./constants";

const ArticleCollectionPage = () => {
    const router = useRouter();
    const { data: articlePackages } = useArticlePackages();

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "favorite":
                router.push({ pathname: `/article-collection/favorite` });
                break;
            case "my-courses":
                router.push({ pathname: `/article-collection/my-courses` });
                break;
            default:
                router.push({ pathname: `/article-collection` });
                break;
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none", height: 36, width: 36 }}>
                        <IconBook2 height={36} width={36} />
                    </ThemeIcon>
                    База знаний
                </Title>
            </Box>
            <Tabs tabs={tabsList} value={tabsList[0].value} onTabChange={handleChangeTab} />

            <Flex gap={32}>
                <Filters w={264} miw="max-content" />
                <Flex direction="column" gap={64} w="calc(100% - 296px)">
                    <Box>
                        <ArticleCategoryList />
                    </Box>

                    {articlePackages?.data && (
                        <Flex direction="column" gap={32}>
                            <Title order={2}>Пакетные предложения</Title>
                            <Carousel<ArticlePackage> data={articlePackages.data} slideSize="100%">
                                {(props) => (
                                    <ArticlePackageCard {...props} mih={340} w="100%">
                                        {(props) => <CategoryListFromPackage {...props} />}
                                    </ArticlePackageCard>
                                )}
                            </Carousel>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default ArticleCollectionPage;
