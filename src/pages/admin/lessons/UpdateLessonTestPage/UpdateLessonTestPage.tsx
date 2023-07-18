import { Box, Text } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { useRouter } from "next/router";
import { TQueryParams } from "./types";
import { useAdminCourse } from "@entities/course";
import { useCourseModule } from "@entities/courseModule";
import { useAdminLesson, useAdminLessonTest } from "@entities/lesson";
import { getBreadCrumbsItems } from "./utils";
import { UpdateTest } from "@widgets/admin/lessons";

const UpdateLessonTestPage = () => {
    const router = useRouter();
    const { id, moduleId, lessonId } = router.query as unknown as TQueryParams;
    const { data: courseData, isFetching: isFetchingCourse, isError: isErrorCourse } = useAdminCourse(id);
    const { data: moduleData, isFetching: isFetchingModule, isError: isErrorModule } = useCourseModule({ courseId: id, moduleId });
    const { data: lessonData, isError: isErrorLesson } = useAdminLesson(lessonId);

    const { data: test, isError: isErrorTest } = useAdminLessonTest(lessonId);

    if (isErrorCourse || isErrorModule || isErrorLesson || isErrorTest) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!router.isReady || !lessonData || isFetchingCourse || isFetchingModule || test === undefined) {
        return <Loader />;
    }

    const renderTitle = () => {
        if (!test || !test.tasks.length) {
            return "Создание теста";
        }
        return "Редактирование теста";
    };

    const onCloseUpdate = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/module/[moduleId]/lesson/[lessonId]",
                query: { id, moduleId, lessonId, tab: "test" },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId, tab: "test" } });
    };

    return (
        <Box>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    courseName: courseData?.name,
                    courseId: id,
                    moduleId,
                    moduleName: moduleData?.name,
                    lessonId,
                    lessonName: lessonData.name,
                })}
                mb={8}
            />
            <Heading mb={32}>{renderTitle()}</Heading>
            <UpdateTest test={test} lessonId={lessonId} onClose={onCloseUpdate} />
        </Box>
    );
};

export default UpdateLessonTestPage;
