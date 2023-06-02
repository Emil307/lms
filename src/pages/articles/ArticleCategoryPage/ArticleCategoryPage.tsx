import { Box, Title, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { IconArrowNarrowLeft, IconBook2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { BreadCrumbs, Button, Tabs } from "@shared/ui";
import { Carousel } from "@components/Carousel";
import { ArticleList, Filters } from "@features/articles";
import { ArticlePackageFromList, useArticlePackages } from "@entities/articlePackage";
import { Card as ArticlePackageCard } from "@features/articlePackages";
import { CategoryListFromPackage } from "@widgets/admin/articlePackages";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const ArticleCategoryPage = () => {
    const router = useRouter();
    const { data: articlePackages } = useArticlePackages();

    const handleChangeTab = (value: string | null) => {
        switch (value) {
            case "favorite":
                router.push({ pathname: `/articles/favorite` });
                break;
            case "my-courses":
                router.push({ pathname: `/articles/my-courses` });
                break;
            default:
                router.push({ pathname: `/articles` });
                break;
        }
    };
    const handleClickBackToList = () => router.push("/articles");

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                {/* TODO: Поменять title и query при подключении нормального реального эндпоинта */}
                <BreadCrumbs items={getBreadCrumbsItems({ title: "Консалтинг", categoryId: "123" })} mb={8} />
                <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none", height: 36, width: 36 }}>
                        <IconBook2 height={36} width={36} />
                    </ThemeIcon>
                    {/* TODO: Поменять на title категории при подключении нормального реального эндпоинта */}
                    Консалтинг
                </Title>
            </Box>
            <Tabs tabs={tabsList} value={tabsList[1].value} onTabChange={handleChangeTab} />

            <Flex gap={32}>
                <Filters w={264} miw="max-content" />
                <Flex direction="column" gap={64} w="calc(100% - 296px)">
                    <Flex direction="column" gap={32}>
                        <Button variant="white" w="min-content" leftIcon={<IconArrowNarrowLeft />} onClick={handleClickBackToList}>
                            Все категории
                        </Button>
                        <ArticleList />
                    </Flex>

                    {articlePackages?.data && (
                        <Flex direction="column" gap={32}>
                            <Title order={2}>Пакетные предложения</Title>
                            <Carousel<ArticlePackageFromList> data={articlePackages.data} slideSize="100%">
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

export default ArticleCategoryPage;
