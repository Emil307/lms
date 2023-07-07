import { Flex, Group, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { Edit } from "react-feather";
import { BreadCrumbs, Button } from "@shared/ui";
import { AuthorInfo, MainInfoPanel, ProgramTrainingList } from "@widgets/course";
import { CourseDetailData } from "@entities/course";
import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
import { TRouterQueries } from "@shared/types";
import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
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
                <CoursePackageCarouselList
                    title={`Курс «${data.name}» содержится в пакетах`}
                    description="Выберите дополнительный курс по более выгодной цене."
                />
                {/* //TODO: тут нужно передавать курсИД чтобы получать отзывы определеноого курса */}
                <CourseReviewCarouselList
                    headerSlot={
                        <Group sx={{ justifyContent: "space-between", marginBottom: 32 }}>
                            <Group sx={{ columnGap: 24 }}>
                                <Title order={2} color="dark">
                                    Отзывы студентов
                                </Title>
                                {/* //TODO: Добавить как бекенд отдаст инфу о среднем рейтинге курса */}
                                {/* <Flex align="flex-end" gap={16}>
                                    <Flex gap={4}>
                                        <Flex align="center" gap={2}>
                                            <Rating defaultValue={1} count={1} readOnly size="small" />
                                            <Text className={classes.ratingValue}>{data.averageRating}</Text>
                                        </Flex>
                                        <Text className={classes.ratingMaxValue}>из 5</Text>
                                    </Flex>
                                    <Text className={classes.reviewInfo}>{`${data.reviewCount} ${getPluralString(
                                        data.averageRating,
                                        "отзыв",
                                        "отзыва",
                                        "отзывов"
                                    )}`}</Text>
                                </Flex> */}
                            </Group>
                            {/* //TODO: Добавить открытие модалки для написания отзыва */}
                            <Button variant="text" leftIcon={<Edit />}>
                                Написать отзыв
                            </Button>
                        </Group>
                    }
                />
            </Flex>
        </Flex>
    );
};

export default CourseDetailPage;
