import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, Loader, Button } from "@shared/ui";
import { useAdminCourse } from "@entities/course";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { LessonInfoPanel, LessonSettings, LessonMaterials, Test, Homework } from "@widgets/admin/lessons";
import { useCourseModule } from "@entities/courseModule";
import { useAdminLesson } from "@entities/lesson/api";
import { InfoCard } from "@components/InfoCard";
import { fields } from "./constants";
import { getBreadCrumbsItems, getTabList } from "./utils";
import { TLessonInfoCard, TQueryParams } from "./types";
import useStyles from "./LessonDetailPage.styles";

const LessonDetailPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const { id, tab, moduleId, lessonId } = router.query as unknown as TQueryParams;
    const { data: courseData, isFetching: isFetchingCourse, isError: isErrorCourse } = useAdminCourse(id);
    const { data: moduleData, isFetching: isFetchingModule, isError: isErrorModule } = useCourseModule({ courseId: id, moduleId });
    const { data: lessonData, isError: isErrorLesson } = useAdminLesson(lessonId);

    const userRole = useUserRole();

    const handleChangeTab = (value: string) => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]",
                query: { id, moduleId, lessonId, tab: value },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId, tab: value } });
    };

    const tabList = getTabList({ hasTest: lessonData?.hasTest, hasHomework: lessonData?.hasHomework });

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabList[0].value;
    }, [router.isReady, tab, tabList]);

    if (isErrorCourse || isErrorModule || isErrorLesson) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!router.isReady || !lessonData || isFetchingCourse || isFetchingModule) {
        return <Loader />;
    }

    const handleOpenUpdateLessonPage = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]/edit",
                query: { id, moduleId, lessonId },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]/edit", query: { lessonId } });
    };

    const handleOpenUpdateLessonTestPage = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]/edit/test",
                query: { id, moduleId, lessonId },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]/edit/test", query: { lessonId } });
    };

    const handleOpenUpdateLessonHomeworkPage = () => {
        if (courseData && moduleData) {
            return router.push({
                pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]/edit/homework",
                query: { id, moduleId, lessonId },
            });
        }
        router.push({ pathname: "/admin/lessons/[lessonId]/edit/homework", query: { lessonId } });
    };

    const renderComponent = () => {
        switch (currentTab) {
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

    const renderInfoCardActions = () => {
        if (userRole === Roles.teacher) {
            return null;
        }
        return (
            <Button variant="secondary" onClick={handleOpenUpdateLessonPage}>
                Редактировать
            </Button>
        );
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
            <Tabs value={currentTab} tabs={tabList} onTabChange={handleChangeTab} maw={1162} my={32} />
            <Box className={classes.wrapper}>
                {renderComponent()}
                <InfoCard<TLessonInfoCard>
                    variant="whiteBg"
                    fields={fields}
                    hideFieldIfEmpty
                    values={{ ...lessonData, moduleName: moduleData?.name }}
                    actionSlot={renderInfoCardActions()}
                />
            </Box>
        </Box>
    );
};

export default LessonDetailPage;
