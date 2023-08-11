import { Box, ThemeIcon, Flex, Group } from "@mantine/core";
import React from "react";
import { Heart, Trash2 } from "react-feather";
import { BreadCrumbs, Button, Heading } from "@shared/ui";
import { GetFavoriteCoursesResponse } from "@entities/course";
import { breadCrumbsItems } from "./constants";

//TODO: удалить после подключения api
const mockData: GetFavoriteCoursesResponse = {
    data: [],

    pagination: {
        count: 1,
        total: 3,
        perPage: 1,
        currentPage: 2,
        totalPages: 3,
        links: {
            previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
            next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
        },
    },
};

const FavoriteCoursesPage = () => {
    return (
        <Flex direction="column" gap={48}>
            <Flex direction="column" gap={32}>
                <Group sx={{ justifyContent: "space-between", rowGap: 24 }}>
                    <Box>
                        <BreadCrumbs items={breadCrumbsItems} mb={8} />
                        <Heading sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <ThemeIcon color="primaryHover">
                                <Heart />
                            </ThemeIcon>
                            Избранные курсы
                        </Heading>
                    </Box>
                    {mockData.data.length && (
                        <Button variant="border" leftIcon={<Trash2 />}>
                            Очистить
                        </Button>
                    )}
                </Group>
                {/* //TODO: Добавить как вернемся к задаче https://addamant.planfix.ru/task/94326 */}
                {/* <FavoriteCoursesList data={mockData} /> */}
            </Flex>
        </Flex>
    );
};

export default FavoriteCoursesPage;
