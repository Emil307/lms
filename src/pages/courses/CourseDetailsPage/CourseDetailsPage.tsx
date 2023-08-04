import { Flex, Group, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Edit } from "react-feather";
import { BreadCrumbs, Button, Heading, Loader, Rating } from "@shared/ui";
import { AuthorsInfo, MainInfoPanel, ProgramTrainingList } from "@widgets/course";
import { useCourse } from "@entities/course";
import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
import { TRouterQueries } from "@shared/types";
import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
import { getPluralString, isMyCourse } from "@shared/utils";
import { useSession } from "@features/auth";
import { getBreadCrumbsItems } from "./utils";
import useStyles from "./CourseDetailsPage.styles";

const CourseDetailsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { id } = router.query as TRouterQueries;

    const { user } = useSession();
    const { data: courseData, isLoading, isError } = useCourse({ id });

    //Если авторизованный пользователь попытается открыть данную страницу курса,
    //который считается 'моим курсом' => редирект на детальную страницу 'моего курса'
    useEffect(() => {
        if (courseData && isMyCourse(courseData)) {
            router.push({ pathname: "/my-courses/[id]", query: { id: String(courseData.groupId) } });
        }
    }, [courseData]);

    const handleOpenAuthPage = () => {
        router.push({ pathname: "/auth", query: { redirect: router.asPath } });
    };

    if (isLoading || (courseData && isMyCourse(courseData))) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex className={classes.root}>
            <BreadCrumbs items={getBreadCrumbsItems({ courseName: courseData.name, id })} />
            <Flex direction="column" gap={64}>
                <Flex direction="column" gap={16}>
                    <MainInfoPanel data={courseData} />
                    <AuthorsInfo data={courseData} />
                </Flex>
                <ProgramTrainingList data={courseData} />
                <CoursePackageCarouselList
                    title={`Курс «${courseData.name}» содержится в пакетах`}
                    description="Выберите дополнительный курс по более выгодной цене."
                    courseId={id}
                />
                <CourseReviewCarouselList
                    headerSlot={
                        <Group sx={{ justifyContent: "space-between", marginBottom: 32 }}>
                            <Group sx={{ columnGap: 24 }}>
                                <Title order={2} color="dark">
                                    Отзывы студентов
                                </Title>
                                <Flex align="flex-end" gap={16}>
                                    <Flex gap={4}>
                                        <Flex align="center" gap={2}>
                                            <Rating defaultValue={1} count={1} readOnly size="small" />
                                            <Heading order={2}>{courseData.rating.averageRating}</Heading>
                                        </Flex>
                                        <Heading order={2} color="gray45">
                                            из 5
                                        </Heading>
                                    </Flex>
                                    <Text className={classes.reviewInfo}>{`${courseData.rating.reviewsCount} ${getPluralString(
                                        courseData.rating.reviewsCount,
                                        "отзыв",
                                        "отзыва",
                                        "отзывов"
                                    )}`}</Text>
                                </Flex>
                            </Group>

                            {user?.id && (
                                <Button variant="text" leftIcon={<Edit />} onClick={handleOpenAuthPage}>
                                    Написать отзыв
                                </Button>
                            )}
                        </Group>
                    }
                    courseId={id}
                />
            </Flex>
        </Flex>
    );
};

export default CourseDetailsPage;
