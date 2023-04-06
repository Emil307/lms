import { Flex, Title } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { List } from "@components/List";
import { CourseSet, useCourseSets } from "@entities/courseSet";
import { CourseSetCard, CourseSetCardMore } from "@features/course-set";
import { CourseCard } from "@features/courses";
import { Course } from "@entities/course";
import { CourseTeacherCarouselList, StudentReviews } from "@widgets/course";
import { CoursePackageList } from "@widgets/coursePackage";
import { FaqAccordionList } from "@features/faq";
import { Button } from "@shared/ui";
import IconComment from "public/icons/comment.svg";

//FIXME: удалить после подключения API
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
            data: {},
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
            data: {},
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
            data: {},
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

const MainPage = () => {
    const { data: courseSetsData, isFetching } = useCourseSets({ perPage: 2 });
    const titleCourseSets = `Топовые подборки курсов ${new Date().getFullYear()}`;

    return (
        <Flex direction="column" gap={64}>
            <Flex direction="column" gap={32}>
                <Title order={1} color="dark">
                    {titleCourseSets}
                </Title>
                <List<CourseSet>
                    //TODO: Когда будет нормальный эндпоинт убрать slice
                    data={courseSetsData?.data.slice(0, 2)}
                    renderItem={(props) => <CourseSetCard {...props} />}
                    colProps={{ lg: 4, md: 4, sm: 6 }}
                    isLoading={isFetching}
                    //TODO: поменять число после подключения эндпоинта
                    cardMore={<CourseSetCardMore countCardSet={20} mih={256} h="100%" />}
                />
            </Flex>
            <Flex direction="column" gap={32}>
                <Title order={1} color="dark">
                    Популярные курсы
                </Title>
                <List<Course> data={list} renderItem={(props) => <CourseCard {...props} />} colProps={{ lg: 4, md: 4, sm: 6 }} />
                <Button variant="white" leftIcon={<Folder />} w="min-content" mx="auto">
                    Смотреть все курсы
                </Button>
            </Flex>
            <StudentReviews titleProps={{ order: 1 }} />
            <CoursePackageList title="Пакетные предложения" titleProps={{ order: 1 }} />
            <CourseTeacherCarouselList titleProps={{ order: 1 }} />
            <Flex direction="column" gap={32}>
                <Title order={1} color="dark">
                    Вопрос-ответ
                </Title>
                <FaqAccordionList />
                <Button variant="white" leftIcon={<IconComment />} w="min-content" mx="auto">
                    Задать свой вопрос
                </Button>
            </Flex>
        </Flex>
    );
};

export default MainPage;
