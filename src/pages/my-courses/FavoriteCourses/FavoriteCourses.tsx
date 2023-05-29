import { Box, Title, ThemeIcon, Flex, Group } from "@mantine/core";
import React from "react";
import { Heart, Trash2 } from "react-feather";
import { BreadCrumbs, Button } from "@shared/ui";
import { breadCrumbsItems } from "./constants";

const mockData = [];

const FavoriteCoursesPage = () => {
    return (
        <Flex direction="column" gap={48}>
            <Flex direction="column" gap={32}>
                <Group sx={{ justifyContent: "space-between", rowGap: 24 }}>
                    <Box>
                        <BreadCrumbs items={breadCrumbsItems} mb={8} />
                        <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none" }}>
                                <Heart />
                            </ThemeIcon>
                            Избранные курсы
                        </Title>
                    </Box>
                    {mockData.length && (
                        <Button variant="border" leftIcon={<Trash2 />}>
                            Очистить
                        </Button>
                    )}
                </Group>
                {/* TODO: Подключить реальный эндпоинт */}
                {/* <FavoriteCoursesList data={mockData} /> */}
            </Flex>
        </Flex>
    );
};

export default FavoriteCoursesPage;
