import { Flex } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { AuthorInfo, MainInfoPanel, ProgramTrainingList, StudentReviews, CourseTeacherList } from "@widgets/course";
import { CourseDetailData } from "@entities/course";
import { CoursePackageList } from "@widgets/coursePackage";

export interface CourseDetailPageProps {}

//FIXME: удалить после подключения API
const data: CourseDetailData = {
    name: "Оптимизация управления финансами",
    picture: {
        data: {
            name: "fileName.jpg",
            path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
            type: "image/jpg",
            size: 12311,
        },
    },
    dateStart: "2023-02-01T13:13:11.000000Z",
    dateEnd: "2023-02-05T13:13:11.000000Z",
    availableSeats: 3,
    lessonCount: 11,
    price: 9500,
    rating: 4.8,
    reviewCount: 4,
    discount: {
        data: {
            isActive: true,
            type: "value",
            value: 13,
            from: "2023-02-01T13:13:11.000000Z",
            to: "2023-11-11T13:13:11.000000Z",
        },
    },
    description:
        "Бизнес-аналитик изучает процессы в компании и даёт рекомендации, как больше зарабатывать и не разориться. Вы научитесь собирать данные о финансах и бизнес-процессах, проводить продуктовые интервью и определять стратегии развития. Сможете получить профессию, которая особенно востребована во время нестабильности.",
    categories: {
        data: [
            {
                id: 1,
                name: "categoryName 1",
                slug: "categorySlug",
            },
            {
                id: 2,
                name: "categoryName 2",
                slug: "categorySlug",
            },
        ],
    },
    tags: {
        data: [
            {
                id: 1,
                name: "tagName 1",
                slug: "tagSlug",
            },
            {
                id: 2,
                name: "tagName 2",
                slug: "tagSlug",
            },
            {
                id: 3,
                name: "tagName 3",
                slug: "tagSlug",
            },
            {
                id: 4,
                name: "tagName 4",
                slug: "tagSlug",
            },
        ],
    },
    author: null,
    isInteractive: false,
    isDiscount: true,
    isPurchased: true,
    isFavorite: true,
    lessons: {
        total: 10,
        passed: 3,
    },
    practice: {
        total: 10,
        passed: 3,
    },
    isNew: true,
    currentLesson: null,
};

const CourseDetailPage = (_props: CourseDetailPageProps) => {
    const router = useRouter();

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "Курсы", href: { pathname: "/" } },
        { title: data.name, href: { pathname: "/courses/[id]", query: { id: String(router.query.id) } } },
    ];

    return (
        <Flex direction="column" gap={32}>
            <BreadCrumbs items={breadCrumbsItems} />
            <Flex direction="column" gap={64}>
                <Flex direction="column" gap={16}>
                    <MainInfoPanel data={data} />
                    <AuthorInfo data={data} />
                </Flex>
                <ProgramTrainingList />
                <CourseTeacherList />
                <CoursePackageList
                    title={`Курс «${data.name}» содержится в пакетах`}
                    description="Выберите дополнительный курс по более выгодной цене."
                />
                <StudentReviews />
            </Flex>
        </Flex>
    );
};

export default CourseDetailPage;
