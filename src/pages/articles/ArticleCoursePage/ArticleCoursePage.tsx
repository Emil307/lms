import { Box, Title, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { IconArrowNarrowLeft, IconBook2 } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { BreadCrumbs, Button, Tabs } from "@shared/ui";
import { ArticleList, Filters } from "@features/articles";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";

const ArticleCoursePage = () => {
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
    const handleClickBackToList = () => router.push("/articles/my-courses");

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                {/* TODO: Поменять title и query при подключении нормального реального эндпоинта */}
                <BreadCrumbs items={getBreadCrumbsItems({ title: "Оптимизация управления финансами", courseId: "123" })} mb={8} />
                <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none", height: 36, width: 36 }}>
                        <IconBook2 height={36} width={36} />
                    </ThemeIcon>
                    {/* TODO: Поменять на title курса при подключении нормального реального эндпоинта */}
                    Оптимизация управления финансами
                </Title>
            </Box>
            <Tabs tabs={tabsList} value={tabsList[0].value} onTabChange={handleChangeTab} />

            <Flex gap={32}>
                <Filters w={264} miw="max-content" />
                <Flex direction="column" gap={64} w="calc(100% - 296px)">
                    <Flex direction="column" gap={32}>
                        <Button variant="white" w="min-content" leftIcon={<IconArrowNarrowLeft />} onClick={handleClickBackToList}>
                            Все курсы
                        </Button>
                        <ArticleList />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default ArticleCoursePage;
