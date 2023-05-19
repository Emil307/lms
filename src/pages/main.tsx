import { Flex, Title } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { List } from "@components/List";
import { CourseSet, useCourseSets } from "@entities/courseSet";
import { Card as CourseSetCard, CardMore as CourseSetCardMore } from "@features/courseSets";
import { Card as CourseCard } from "@features/courses";
import { Course } from "@entities/course";
import { CourseTeacherCarouselList, StudentReviews } from "@widgets/course";
import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { Button } from "@shared/ui";
import IconComment from "public/icons/comment.svg";

//TODO: удалить после подключения API
const list: Course[] = [
    {
        id: 1,
        name: "Name",
        description: "Description",
        price: 1499,
        discountPrice: 1000,
        type: "interactive",
        startingDate: new Date("2023-05-10"),
        cover: null,
        category: null,
        discount: {
            type: "currency",
            amount: 499,
            startingDate: new Date("2023-05-10"),
            finishingDate: new Date("2023-05-10"),
        },
    },
    {
        id: 2,
        name: "Name",
        description: "Description",
        price: 1499,
        discountPrice: 1000,
        type: "interactive",
        startingDate: new Date("2023-05-10"),
        cover: null,
        category: null,
        discount: {
            type: "currency",
            amount: 499,
            startingDate: new Date("2023-05-10"),
            finishingDate: new Date("2023-05-10"),
        },
    },
    {
        id: 3,
        name: "Name",
        description: "Description",
        price: 1499,
        discountPrice: 1000,
        type: "interactive",
        startingDate: new Date("2023-05-10"),
        cover: null,
        category: null,
        discount: {
            type: "currency",
            amount: 499,
            startingDate: new Date("2023-05-10"),
            finishingDate: new Date("2023-05-10"),
        },
    },
    {
        id: 4,
        name: "Name",
        description: "Description",
        price: 1499,
        discountPrice: 1000,
        type: "interactive",
        startingDate: new Date("2023-05-10"),
        cover: null,
        category: null,
        discount: {
            type: "currency",
            amount: 499,
            startingDate: new Date("2023-05-10"),
            finishingDate: new Date("2023-05-10"),
        },
    },
    {
        id: 5,
        name: "Name",
        description: "Description",
        price: 1499,
        discountPrice: 1000,
        type: "interactive",
        startingDate: new Date("2023-05-10"),
        cover: null,
        category: null,
        discount: {
            type: "currency",
            amount: 499,
            startingDate: new Date("2023-05-10"),
            finishingDate: new Date("2023-05-10"),
        },
    },
    {
        id: 6,
        name: "Name",
        description: "Description",
        price: 1499,
        discountPrice: 1000,
        type: "interactive",
        startingDate: new Date("2023-05-10"),
        cover: null,
        category: null,
        discount: {
            type: "currency",
            amount: 499,
            startingDate: new Date("2023-05-10"),
            finishingDate: new Date("2023-05-10"),
        },
    },
];

const MainPage = () => {
    const { data: courseSetsData, isFetching } = useCourseSets({ perPage: 2, page: 1 });
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
            <CoursePackageCarouselList title="Пакетные предложения" titleProps={{ order: 1 }} />
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
