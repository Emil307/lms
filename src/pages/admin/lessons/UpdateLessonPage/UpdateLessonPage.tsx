import { useRouter } from "next/router";
import { TQueryParams } from "./types";
import { useAdminCourse } from "@entities/course";
import { useCourseModule } from "@entities/courseModule";
import { useAdminLesson } from "@entities/lesson";
import { Text, Box, Flex } from "@mantine/core";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import React from "react";
import { getBreadCrumbsItems } from "./utils";
import { UpdateLesson } from "@widgets/admin/lessons";

const UpdateLessonPage = () => {
    const router = useRouter();
    const { id, moduleId, lessonId } = router.query as unknown as TQueryParams;
    const { data: courseData, isFetching: isFetchingCourse, isError: isErrorCourse } = useAdminCourse(id);
    const { data: moduleData, isFetching: isFetchingModule, isError: isErrorModule } = useCourseModule({ courseId: id, moduleId });
    const { data: lessonData, isError: isErrorLesson } = useAdminLesson(lessonId);

    if (isErrorCourse || isErrorModule || isErrorLesson) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!router.isReady || !lessonData || isFetchingCourse || isFetchingModule) {
        return <Loader />;
    }

    const onCloseUpdateForm = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/module/[moduleId]/lesson/[lessonId]",
                query: { id, moduleId, lessonId },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId } });
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
            <Box maw={1162} w="100%">
                <Flex gap={48} align="center" mb={32}>
                    <Heading order={2}>Редактирование данных урока</Heading>
                </Flex>
                <UpdateLesson data={lessonData} moduleName={moduleData?.name} onClose={onCloseUpdateForm} />
            </Box>
        </Box>
    );
};

export default UpdateLessonPage;
