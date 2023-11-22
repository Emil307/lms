import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader, Tabs } from "@shared/ui";
import { CoursePackageSettings, InfoPanel } from "@widgets/admin/coursePackages";
import { useAdminCoursePackage } from "@entities/coursePackage";
import { CourseList } from "@features/coursePackages";
import { tabsList } from "./constants";
import { getBreadCrumbsItems } from "./utils";
import { TRouterQueries } from "./types";

const CoursePackageDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data: coursePackageData, isLoading, isError } = useAdminCoursePackage(id);

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    const renderContent = () => {
        if (currentTab === "courses") {
            return <CourseList coursePackageId={id} />;
        }
        return <CoursePackageSettings id={id} />;
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ packageName: coursePackageData.name })} mb={8} />
            <Heading mb={24}>{coursePackageData.name}</Heading>
            <InfoPanel id={id} mb={24} />
            <Tabs value={currentTab} tabs={tabsList} onTabChange={handleChangeTab} maw={1162} mb={32} />
            {renderContent()}
        </Box>
    );
};

export default CoursePackageDetailsPage;
