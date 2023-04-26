import { Flex, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CourseSet, useCourseSets } from "@entities/courseSet";
import { List } from "@components/List";
import { CourseCard } from "@features/courses";
import { Course } from "@entities/course";
import { CourseSetCard, CourseSetCardMore } from "@features/course-set";
import { getBreadCrumbsItems } from "./utils";

//TODO: Удалить после подключения эндпоинта
const data: CourseSet = {
    id: 123,
    name: "coursePackageName",
    picture: {
        data: {
            name: "fileName.jpg",
            path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
            type: "image/jpg",
            size: 12311,
        },
    },
    description: "courseDescription",
    courses: {
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
                isInteractive: true,
                isDiscount: true,
                isPurchased: false,
                isFavorite: false,
            },
        ],
        pagination: {
            count: 1,
            total: 3,
            perPage: 1,
            currentPage: 2,
            totalPages: 1,
            links: {
                previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
            },
        },
    },
    price: 32500,
    isDiscount: true,
    discount: {
        data: {
            is_active: true,
            type: "percentage",
            value: 13,
            from: "2023-02-01T13:13:11.000000Z",
            to: "2023-11-11T13:13:11.000000Z",
        },
    },
    isPurchased: true,
};

const CourseSetDetailPage = () => {
    const router = useRouter();
    const courseSetId = router.query.id || 0;

    const { data: courseSetsData, isLoading: isCourseSetsLoading } = useCourseSets({});

    return (
        <Flex direction="column">
            <BreadCrumbs items={getBreadCrumbsItems({ id: String(courseSetId), courseSetName: data.name })} mb={8} />
            <Flex direction="column" gap={32}>
                <Title order={1} color="dark">
                    {data.name}
                </Title>
                <Flex direction="column" gap={32}>
                    <List<Course>
                        data={data.courses.data}
                        renderItem={(props) => <CourseCard {...props} />}
                        withPagination
                        pagination={data.courses.pagination}
                    />
                </Flex>
            </Flex>
            <Flex direction="column" gap={32}>
                <Title order={2} color="dark">
                    Другие актуальные подборки
                </Title>
                <Flex direction="column" gap={32}>
                    <List<CourseSet>
                        data={courseSetsData?.data}
                        renderItem={(props) => <CourseSetCard {...props} />}
                        isLoading={isCourseSetsLoading}
                        //TODO: поменять число после подключения эндпоинта
                        cardMore={<CourseSetCardMore countCardSet={10} h="100%" />}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CourseSetDetailPage;
