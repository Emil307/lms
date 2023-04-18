import { Box, Title, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { Heart } from "react-feather";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { ArticleList, Filters } from "@features/articles";
import { breadCrumbsItems, tabsList } from "./constants";

const ArticleCollectionFavoritePage = () => {
    const router = useRouter();

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
                        <Heart height={36} width={36} />
                    </ThemeIcon>
                    Избранное
                </Title>
            </Box>
            <Tabs tabs={tabsList} value={tabsList[2].value} onTabChange={handleChangeTab} />

            <Flex gap={32}>
                <Filters w={264} miw="max-content" />
                <Flex direction="column" w="calc(100% - 296px)">
                    <ArticleList />
                </Flex>
            </Flex>
        </Box>
    );
};

export default ArticleCollectionFavoritePage;
