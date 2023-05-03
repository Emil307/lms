import { Box, Title, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { IconBook2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { ArticleCourseList, Filters } from "@features/articles";
import { breadCrumbsItems, tabsList } from "./constants";

const ArticleCoursesPage = () => {
    const router = useRouter();

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

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none", height: 36, width: 36 }}>
                        <IconBook2 height={36} width={36} />
                    </ThemeIcon>
                    Мои курсы
                </Title>
            </Box>
            <Tabs tabs={tabsList} value={tabsList[1].value} onTabChange={handleChangeTab} />

            <Flex gap={32}>
                <Filters w={264} miw="max-content" />
                <Flex direction="column" w="calc(100% - 296px)">
                    <ArticleCourseList />
                </Flex>
            </Flex>
        </Box>
    );
};

export default ArticleCoursesPage;
