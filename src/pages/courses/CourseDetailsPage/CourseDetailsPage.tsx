import { Flex, Group, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { AuthorsInfo, MainInfoPanel, ProgramTrainingList, TeacherList } from "@widgets/course";
import { useCourse } from "@entities/course";
import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
import { TRouterQueries } from "@shared/types";
import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
import { isMyCourse } from "@shared/utils";
import { getBreadCrumbsItems } from "./utils";
import useStyles from "./CourseDetailsPage.styles";
import { RatingInfo } from "./components";

const CourseDetailsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const { id } = router.query as TRouterQueries;

    const { data: courseData, isLoading, isError } = useCourse({ id });

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
            <BreadCrumbs items={getBreadCrumbsItems({ courseName: courseData.name })} />
            <Flex direction="column" gap={64}>
                <Flex direction="column" gap={16}>
                    <MainInfoPanel data={courseData} />
                    <AuthorsInfo data={courseData} />
                </Flex>
                <ProgramTrainingList data={courseData} />
                <TeacherList data={courseData.teachers} />
                <CoursePackageCarouselList
                    title={`Курс «${courseData.name}» содержится в пакетах`}
                    description="Выберите дополнительный курс по более выгодной цене."
                    courseId={id}
                    titleProps={{ order: 2 }}
                />
                <CourseReviewCarouselList
                    headerSlot={
                        <Group sx={{ justifyContent: "space-between", gap: 24, marginBottom: 32 }}>
                            <Group sx={{ columnGap: 24 }}>
                                <Title order={2} color="dark">
                                    Отзывы студентов
                                </Title>
                                <RatingInfo data={courseData.rating} />
                            </Group>
                        </Group>
                    }
                    courseId={id}
                />
            </Flex>
        </Flex>
    );
};

export default CourseDetailsPage;
