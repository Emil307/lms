import { useRouter } from "next/router";
import { Box, Text } from "@mantine/core";
import React from "react";
import { useAdminCourse } from "@entities/course";
import { useCourseModule } from "@entities/courseModule";
import { useAdminLesson, useAdminLessonHomework } from "@entities/lesson";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { getBreadCrumbsItems } from "@pages/admin/lessons/UpdateLessonTestPage/utils";
import { UpdateHomework } from "@widgets/admin/lessons";
import { TQueryParams } from "./types";

const UpdateLessonHomeworkPage = () => {
    const router = useRouter();
    const { id, moduleId, lessonId } = router.query as unknown as TQueryParams;
    const { data: courseData, isFetching: isFetchingCourse, isError: isErrorCourse } = useAdminCourse(id);
    const { data: moduleData, isFetching: isFetchingModule, isError: isErrorModule } = useCourseModule({ courseId: id, moduleId });
    const { data: lessonData, isError: isErrorLesson } = useAdminLesson(lessonId);

    const { data: homework, isError: isErrorHomework } = useAdminLessonHomework(lessonId);

    if (isErrorCourse || isErrorModule || isErrorLesson || isErrorHomework) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!router.isReady || !lessonData || isFetchingCourse || isFetchingModule || homework === undefined) {
        return <Loader />;
    }

    const renderTitle = () => {
        if (!homework) {
            return "Создание задания";
        }
        return "Редактирование задания";
    };

    const onCloseUpdate = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]",
                query: { id, moduleId, lessonId, tab: "homework" },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId, tab: "homework" } });
    };

    return (
        <Box>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    courseName: courseData?.name,
                    courseId: id,
                    moduleId,
                    moduleName: moduleData?.name,
                    lessonName: lessonData.name,
                })}
                mb={8}
            />
            <Heading mb={32}>{renderTitle()}</Heading>
            <UpdateHomework homework={homework} lessonId={lessonId} onClose={onCloseUpdate} />
        </Box>
    );
};

export default UpdateLessonHomeworkPage;
