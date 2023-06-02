import { Box, Loader, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Tabs } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { CourseInfoPanel, CourseSettings } from "@widgets/admin/courses";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { useAdminCourse } from "@entities/course";

const CourseDetailPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: courseData, isLoading, isError } = useAdminCourse(id);

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/courses/[id]", query: { id, tab: value } });
    };

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        if (!currentTab) {
            handleChangeTab(tabsList[0].value);
        }
    }, [router.isReady]);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    //TODO: Добавить табы, когда будет готово на бэке
    const renderComponent = () => {
        switch (tab) {
            case "settings":
                return <CourseSettings data={courseData} />;
            case "modulesAndLessons":
                return null;
            case "groups":
                return null;
            case "statistics":
                return null;
            case "reviews":
                return null;
            default:
                return null;
        }
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ courseName: courseData.name, courseId: courseData.id })} mb={8} />
            <CourseInfoPanel id={id} />
            <Tabs value={tab} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} my={32} />
            {renderComponent()}
        </Box>
    );
};

export default CourseDetailPage;
