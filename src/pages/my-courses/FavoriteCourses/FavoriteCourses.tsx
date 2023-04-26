import { Box, Title, ThemeIcon, Flex, Group } from "@mantine/core";
import React from "react";
import { Heart, Trash2 } from "react-feather";
import { BreadCrumbs, Button } from "@shared/ui";
import { FavoriteCoursesList } from "@widgets/courses";
import { GetFavoriteCoursesResponse } from "@entities/course";
import { breadCrumbsItems } from "./constants";

//TODO: удалить после подключения api
const mockData: GetFavoriteCoursesResponse = {
    data: [
        {
            id: 1,
            name: "courseTitle",
            picture: {
                data: {
                    name: "fileName.jpg",
                    path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                    type: "image/jpg",
                    size: 12311,
                },
            },
            dateStart: "2023-02-01T13:13:11.000000Z",
            lessonCount: 11,
            price: 9500,
            discount: {
                data: null,
            },
            categories: {
                data: {
                    id: 12,
                    name: "categoryName",
                    slug: "categorySlug",
                },
            },
            isInteractive: false,
            isDiscount: false,
            isPurchased: true,
            isFavorite: true,
        },
        {
            id: 2,
            name: "courseTitle",
            picture: {
                data: {
                    name: "fileName.jpg",
                    path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                    type: "image/jpg",
                    size: 12311,
                },
            },
            dateStart: "2023-02-01T13:13:11.000000Z",
            lessonCount: 11,
            price: 9500,
            discount: {
                data: {
                    isActive: true,
                    type: "value",
                    value: 13,
                    from: "2023-02-01T13:13:11.000000Z",
                    to: "2023-11-11T13:13:11.000000Z",
                },
            },
            categories: {
                data: {
                    id: 12,
                    name: "categoryName",
                    slug: "categorySlug",
                },
            },
            isInteractive: false,
            isDiscount: true,
            isPurchased: false,
            isFavorite: true,
        },
        {
            id: 3,
            name: "courseTitle",
            picture: {
                data: {
                    name: "fileName.jpg",
                    path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                    type: "image/jpg",
                    size: 12311,
                },
            },
            dateStart: "2023-02-01T13:13:11.000000Z",
            lessonCount: 11,
            price: 9500,
            discount: {
                data: null,
            },
            categories: {
                data: {
                    id: 12,
                    name: "categoryName",
                    slug: "categorySlug",
                },
            },
            isInteractive: false,
            isDiscount: false,
            isPurchased: false,
            isFavorite: true,
        },
    ],

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
                        <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none" }}>
                                <Heart />
                            </ThemeIcon>
                            Избранные курсы
                        </Title>
                    </Box>
                    {mockData.data.length && (
                        <Button variant="border" leftIcon={<Trash2 />}>
                            Очистить
                        </Button>
                    )}
                </Group>
                <FavoriteCoursesList data={mockData} />
            </Flex>
        </Flex>
    );
};

export default FavoriteCoursesPage;
