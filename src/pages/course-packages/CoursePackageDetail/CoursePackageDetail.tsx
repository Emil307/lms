import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { GetCoursePackageResponse } from "@entities/coursePackage";
import { CoursePackageList, MainInfoPanel } from "@widgets/coursePackage";
import { Carousel } from "@components/Carousel";
import { CourseCard } from "@features/courses";
import { Course } from "@entities/course";

const mockData: GetCoursePackageResponse = {
    id: 123,
    name: "coursePackageName",
    picture: {
        name: "fileName.jpg",
        path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
        type: "image/jpg",
        size: 12311,
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
                isPurchased: true,
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
                isInteractive: false,
                isDiscount: true,
                isPurchased: false,
                isFavorite: false,
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
                isFavorite: true,
            },
            {
                id: 5,
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
                id: 6,
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
                isInteractive: false,
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
            totalPages: 3,
            links: {
                previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
            },
        },
    },
    price: 32500,
    isDiscount: true,
    discount: {
        isActive: true,
        type: "value",
        value: 13,
        from: "2023-02-01T13:13:11.000000Z",
        to: "2023-11-11T13:13:11.000000Z",
    },
    isPurchased: false,
};

const CoursePackageDetailPage = () => {
    const router = useRouter();
    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: mockData.name, href: { pathname: "/course-packages/[id]", query: { id: String(router.query.id) } } },
    ];
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <BreadCrumbs items={breadCrumbsItems} />
            <MainInfoPanel data={mockData} />
            <Carousel<Course> data={mockData.courses.data} slideSize={424} mb={32}>
                {(props) => <CourseCard {...props} w={424} />}
            </Carousel>
            <CoursePackageList title="Другие пакетные предложения" />
        </Box>
    );
};

export default CoursePackageDetailPage;
