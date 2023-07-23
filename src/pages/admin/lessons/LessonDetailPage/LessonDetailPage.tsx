import { Box, Flex, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, Loader, Button } from "@shared/ui";
import { useAdminCourse } from "@entities/course";
import { LessonInfoPanel, LessonSettings, LessonMaterials, Test } from "@widgets/admin/lessons";
import { useCourseModule } from "@entities/courseModule";
import { useAdminLesson } from "@entities/lesson/api";
import { InfoCard } from "@components/InfoCard";
import { fields, tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { TLessonInfoCard, TQueryParams } from "./types";
import Homework from "../../../../widgets/admin/lessons/Homework/Homework";

const LessonDetailPage = () => {
    const router = useRouter();
    const { id, tab, moduleId, lessonId } = router.query as unknown as TQueryParams;
    const { data: courseData, isFetching: isFetchingCourse, isError: isErrorCourse } = useAdminCourse(id);
    const { data: moduleData, isFetching: isFetchingModule, isError: isErrorModule } = useCourseModule({ courseId: id, moduleId });
    const { data: lessonData, isError: isErrorLesson } = useAdminLesson(lessonId);

    const handleChangeTab = (value: string) => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/module/[moduleId]/lesson/[lessonId]",
                query: { id, moduleId, lessonId, tab: value },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    if (isErrorCourse || isErrorModule || isErrorLesson) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!router.isReady || !lessonData || isFetchingCourse || isFetchingModule) {
        return <Loader />;
    }

    const handleOpenUpdateLessonPage = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/module/[moduleId]/lesson/[lessonId]/edit",
                query: { id, moduleId, lessonId },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]/edit", query: { lessonId } });
    };

    const handleOpenUpdateLessonTestPage = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/module/[moduleId]/lesson/[lessonId]/edit/test",
                query: { id, moduleId, lessonId },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]/edit/test", query: { lessonId } });
    };

    const handleOpenUpdateLessonHomeworkPage = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/module/[moduleId]/lesson/[lessonId]/edit/homework",
                query: { id, moduleId, lessonId },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]/edit/homework", query: { lessonId } });
    };

    const renderComponent = () => {
        switch (tab) {
            case "settings":
                return <LessonSettings data={lessonData} moduleName={moduleData?.name} />;
            case "materials":
                return <LessonMaterials lessonId={lessonId} lessonName={lessonData.name} />;
            case "test":
                return <Test lessonId={lessonId} onUpdate={handleOpenUpdateLessonTestPage} />;
            case "homework":
                return <Homework lessonId={lessonId} onUpdate={handleOpenUpdateLessonHomeworkPage} />;
            default:
                return <LessonSettings data={lessonData} moduleName={moduleData?.name} />;
        }
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
            <LessonInfoPanel id={lessonId} />
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} my={32} />
            <Flex gap={56} align="start">
                <Box maw={1162} w="100%">
                    {renderComponent()}
                </Box>
                <InfoCard<TLessonInfoCard>
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    values={{ ...lessonData, moduleName: moduleData?.name }}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateLessonPage}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Flex>
        </Box>
    );
};

export default LessonDetailPage;
