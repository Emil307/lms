import { Flex, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ContentByTextEditor, Heading, Loader } from "@shared/ui";
import { MainInfoPanel, ProgramTrainingList } from "@widgets/course";
import { useAvailableCourse, useCourse } from "@entities/course";
import { TRouterQueries } from "@shared/types";
import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
import { isMyCourse } from "@shared/utils";
import { useUserRole } from "@entities/auth";
import { CourseCollectionsBlock, FaqBlock } from "@pages/main/MainPage/components";
import { MainBanner } from "@widgets/course/MainBanner";
import { BuyCourseBlock } from "@widgets/course/BuyCourseBlock";
import useStyles from "./CourseDetailsPage.styles";

const CourseDetailsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { id } = router.query as TRouterQueries;

    const { data: courseData, isLoading, isError } = useCourse({ id });

    const userRole = useUserRole();

    useAvailableCourse({
        userRole: userRole?.name,
        courseId: Number(id),
        courseName: courseData?.name,
        availableGroup: courseData && !isMyCourse(courseData) ? courseData.availableGroup : undefined,
    });

    //Если авторизованный пользователь попытается открыть данную страницу курса,
    //который считается 'моим курсом' => редирект на детальную страницу 'моего курса'
    useEffect(() => {
        if (courseData && isMyCourse(courseData)) {
            router.replace({ pathname: "/my-courses/[id]", query: { id: String(courseData.groupId) } });
        }
    }, [courseData]);

    if (isLoading || (courseData && isMyCourse(courseData))) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex className={classes.root}>
            <Flex direction="column" className={classes.blocksWrapper}>
                <Flex direction="column" maw={1320} w="100%" m="auto" className={classes.mainInfoWrapper}>
                    <MainBanner data={courseData} />
                    <Flex direction="column">
                        <MainInfoPanel data={courseData} />
                    </Flex>

                    <ContentByTextEditor data={courseData.description} className={classes.description} hideFancybox />
                    <ProgramTrainingList data={courseData} />
                </Flex>

                <CourseReviewCarouselList
                    headerSlot={
                        <Heading mb={48}>
                            <Flex direction="column" gap={24}>
                                <Heading order={1} ta="center" className={classes.title}>
                                    Отзывы о курсе
                                </Heading>
                                <Heading order={3} ta="center" className={classes.reviews}>
                                    Проверенные отзывы наших студентов
                                </Heading>
                            </Flex>
                        </Heading>
                    }
                    courseId={id}
                />
                <CourseCollectionsBlock />
                <BuyCourseBlock data={courseData} id="buy-course-block" />
                <FaqBlock mt={112} />
            </Flex>
        </Flex>
    );
};

export default CourseDetailsPage;
