import { useRouter } from "next/router";
import React from "react";
import { Box, Text } from "@mantine/core";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useAdminCourse } from "@entities/course";
import { CourseModuleInfoPanel } from "@widgets/admin/courseModules";
import { useCourseModule } from "@entities/courseModule";
import { ModuleLessonsList } from "@widgets/admin/lessons";
import { getBreadCrumbsItems } from "./utils";
import { TQueryParams } from "./types";

const CourseModuleDetailPage = () => {
    const router = useRouter();
    const { id: courseId, moduleId } = router.query as TQueryParams;

    const { data: courseData, isLoading: courseLoading, isError: courseError } = useAdminCourse(courseId);
    const { data: moduleData, isLoading: moduleLoading, isError: moduleError } = useCourseModule({ courseId, moduleId });

    if (!router.isReady || courseLoading || moduleLoading) {
        return <Loader />;
    }

    if (courseError || moduleError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    courseName: courseData.name,
                    courseId,
                    moduleName: moduleData.name,
                    moduleId,
                })}
                mb={8}
            />
            <CourseModuleInfoPanel courseId={courseId} moduleId={moduleId} />
            <ModuleLessonsList courseId={courseId} moduleId={moduleId} moduleName={moduleData.name} />
        </Box>
    );
};

export default CourseModuleDetailPage;
