import { Box, Group, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { Course } from "@entities/course";
import { List } from "@components/List";
import { CourseCard } from "@features/courses";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";

//TODO: удалить после подключения API
const list: Course[] = [
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
            data: {
                isActive: true,
                type: "percentage",
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
        isInteractive: true,
        isDiscount: true,
        isPurchased: false,
        isFavorite: false,
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
        isFavorite: false,
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
        isInteractive: true,
        isDiscount: false,
        isPurchased: true,
        isFavorite: true,
    },
    {
        id: 4,
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
        isInteractive: true,
        isDiscount: false,
        isPurchased: true,
        isFavorite: true,
    },
];
const pagination = {
    total: 79,
    count: 4,
    per_page: 15,
    current_page: 6,
    total_pages: 6,
    links: {
        previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
        next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
    },
};

const CoursesPage = () => {
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "Курсы", href: { pathname: "/courses" } },
    ];

    // TODO: Обновить после добавления страницы с деталями курса
    const handleClickCard = () => undefined;

    return (
        <Group sx={{ flexDirection: "column", alignItems: "flex-start", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none" }}>
                        <Folder />
                    </ThemeIcon>
                    Курсы
                </Title>
            </Box>
            <List<Course>
                data={list}
                renderItem={(props) => <CourseCard {...props} />}
                colProps={{ sm: 6 }}
                onClick={handleClickCard}
                pagination={pagination}
                withPagination
            />
        </Group>
    );
};

export default CoursesPage;
