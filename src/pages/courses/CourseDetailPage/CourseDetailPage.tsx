import { Flex } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { AuthorInfo, MainInfoPanel, ProgramTrainingList, StudentReviews, CourseTeacherList } from "@widgets/course";
import { CourseDetailData } from "@entities/course";
import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

//TODO: удалить после подключения API
const data: CourseDetailData = {
    name: "Оптимизация управления финансами",
    picture: {
        data: null,
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
            type: "currency",
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

const CourseDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    return (
        <Flex direction="column" gap={32}>
            <BreadCrumbs items={getBreadCrumbsItems({ courseName: data.name, id })} />
            <Flex direction="column" gap={64}>
                <Flex direction="column" gap={16}>
                    <MainInfoPanel data={data} />
                    <AuthorInfo data={data} />
                </Flex>
                <ProgramTrainingList />
                <CourseTeacherList />
                <CoursePackageCarouselList
                    title={`Курс «${data.name}» содержится в пакетах`}
                    description="Выберите дополнительный курс по более выгодной цене."
                />
                <StudentReviews />
            </Flex>
        </Flex>
    );
};

export default CourseDetailPage;
