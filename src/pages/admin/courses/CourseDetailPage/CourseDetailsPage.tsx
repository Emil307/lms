import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs, Loader } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useUserRole } from "@entities/auth";
import { Roles } from "@app/routes";
import { InfoPanel, CourseSettings, CourseReviews, CourseArticles } from "@widgets/admin/courses";
import { useAdminCourse, useAvailableCourse } from "@entities/course";
import { ModuleList } from "@widgets/admin/courseModules";
import { CourseGroups } from "@widgets/admin/courses/Groups";
import { getBreadCrumbsItems, getTabList } from "./utils";

const CourseDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: courseData, isLoading, isError } = useAdminCourse(id);

    const userRole = useUserRole()

    useAvailableCourse({ userRole, courseId: courseData?.id, courseName: courseData?.name, availableGroup: courseData?.availableGroup })

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/courses/[id]", query: { id, tab: value } });
    };

    const tabList = getTabList({
        isInteractive: courseData?.type === "interactive",
        isPublished: !!courseData?.isFulfillment,
        isTeacher: userRole === Roles.teacher,
    });

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabList[0].value;
    }, [router.isReady, tab, tabList]);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!userRole) {
        return null;
    }

    const renderComponent = () => {
        switch (currentTab) {
            case "modulesAndLessons":
                return <ModuleList courseId={id} />;
            case "groups":
                return <CourseGroups courseId={id} />;
            case "articles":
                return <CourseArticles courseId={id} />;
            case "reviews":
                return <CourseReviews courseId={id} />;
            default:
                return <CourseSettings data={courseData} />;
        }
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ courseName: courseData.name })} mb={8} />
            <InfoPanel id={id} />
            <Tabs value={currentTab} tabs={tabList} onTabChange={handleChangeTab} maw={1162} my={32} />
            {renderComponent()}
        </Box>
    );
};

export default CourseDetailsPage;
