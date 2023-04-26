import { Box, Title, ThemeIcon, Flex, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Folder, Heart } from "react-feather";
import { useRouter } from "next/router";
import { BreadCrumbs, Button, Tabs, TBreadCrumbItem } from "@shared/ui";
import { CourseBlockCard, CourseSettedCard } from "@features/courses";
import { CourseBlock, GetMyCoursesResponse } from "@entities/course";
import { List } from "@components/List";

const mockData: GetMyCoursesResponse = {
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
            dateEnd: "2023-02-01T13:13:11.000000Z",
            lessons: {
                total: 10,
                passed: 3,
            },
            practice: {
                total: 10,
                passed: 3,
            },
            isNew: false,
            onProgress: false,
            currentLesson: {
                id: 123,
                title: "lessonTitle",
            },
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
            dateEnd: "2023-02-01T13:13:11.000000Z",
            lessons: {
                total: 10,
                passed: 3,
            },
            practice: {
                total: 10,
                passed: 3,
            },
            isNew: true,
            onProgress: false,
            currentLesson: null,
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
            dateEnd: "2023-02-01T13:13:11.000000Z",
            lessons: {
                total: 10,
                passed: 3,
            },
            practice: {
                total: 10,
                passed: 3,
            },
            isNew: false,
            onProgress: false,
            currentLesson: null,
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
            dateEnd: "2023-02-01T13:13:11.000000Z",
            lessons: {
                total: 10,
                passed: 3,
            },
            practice: {
                total: 10,
                passed: 3,
            },
            isNew: true,
            onProgress: true,
            currentLesson: {
                id: 123,
                title: "lessonTitle",
            },
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

const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Мой профиль", href: { pathname: "/" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
];

const MyCoursesPage = () => {
    const router = useRouter();
    const tab = router.query.tab as string;
    const tabsList = [
        { id: 1, label: "Все", value: "all" },
        { id: 2, label: "В процессе", value: "inProgress" },
        { id: 3, label: "Новый", value: "isNew" },
        { id: 4, label: "Завершен", value: "isDone" },
    ];
    const [currentValueTab, setCurrentValueTab] = useState<string>(tab || tabsList[0].value);

    //TODO: вернуть эндпоинт после получения реального эндпоинта
    // const { data: myCoursesData } = useMyCourses();

    useEffect(() => {
        router.push({ pathname: "/my-courses", query: { tab: currentValueTab } });
    }, [currentValueTab]);

    const handleChangeTab = (value: string | null) => {
        if (value) {
            setCurrentValueTab(value);
        }
    };

    return (
        <Flex direction="column" gap={48}>
            <Flex direction="column" gap={32}>
                <Flex justify="space-between">
                    <Box>
                        <BreadCrumbs items={breadCrumbsItems} mb={8} />
                        <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <ThemeIcon color="primaryHover" variant="outline" sx={{ border: "none" }}>
                                <Folder />
                            </ThemeIcon>
                            Мои курсы
                        </Title>
                    </Box>
                    <Button variant="border" leftIcon={<Heart />}>
                        Избранные курсы
                    </Button>
                </Flex>

                <Tabs tabs={tabsList} value={currentValueTab} onTabChange={handleChangeTab} />

                <List<CourseBlock>
                    data={mockData.data}
                    renderItem={(props) => <CourseBlockCard {...props} />}
                    colProps={{ lg: 4, md: 4, sm: 6 }}
                    withPagination
                    pagination={mockData.pagination}
                />
            </Flex>
            {currentValueTab === "all" && (
                <Flex direction="column" gap={32}>
                    <Box>
                        <Title order={2} color="dark" mb={8}>
                            Назначенные курсы
                        </Title>
                        <Text
                            sx={(theme) => ({
                                fontWeight: 500,
                                fontSize: 18,
                                lineHeight: "24px",
                                color: theme.colors.gray45[0],
                            })}>
                            Курсы доступные по корпоративному профилю
                        </Text>
                    </Box>

                    <Flex direction="column" gap={32}>
                        <List<CourseBlock>
                            data={mockData.data}
                            renderItem={(props) => <CourseSettedCard {...props} />}
                            colProps={{ lg: 4, md: 4, sm: 6 }}
                        />
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};

export default MyCoursesPage;
